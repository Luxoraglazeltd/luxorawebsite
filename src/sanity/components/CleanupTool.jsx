'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {Box, Button, Card, Dialog, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {TrashIcon, RefreshIcon} from '@sanity/icons'
import {apiVersion} from '../env'

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

// Every uploaded file or photo that no document uses any more. Drafts count as "using" a
// file, so something attached only to an unpublished draft is never listed here.
const UNUSED_QUERY = `*[_type in ["sanity.fileAsset", "sanity.imageAsset"] && count(*[references(^._id)]) == 0]
  | order(size desc) {
    _id, _type, originalFilename, size, mimeType, url, _createdAt,
    "width": metadata.dimensions.width, "height": metadata.dimensions.height
  }`

const USED_QUERY = 'count(*[references($id)])'

function Row({asset, onDelete}) {
  const isImage = asset._type === 'sanity.imageAsset'
  return (
    <Card padding={3} radius={2} border>
      <Flex align="center" gap={3}>
        {isImage ? (
          <img
            src={`${asset.url}?w=120&h=120&fit=crop`}
            alt=""
            width={60}
            height={60}
            style={{objectFit: 'cover', borderRadius: 3, flexShrink: 0}}
          />
        ) : null}
        <Box flex={1} style={{minWidth: 0}}>
          <Stack space={2}>
            <Text size={1} weight="semibold" style={{wordBreak: 'break-word'}}>
              {asset.originalFilename || (isImage ? 'Photo' : 'File')}
            </Text>
            <Text size={1} muted>
              {formatSize(asset.size)}
              {isImage && asset.width ? ` · ${asset.width}×${asset.height}` : ''}
              {' · uploaded '}
              {new Date(asset._createdAt).toLocaleDateString()}
              {' · '}
              <a href={asset.url} target="_blank" rel="noreferrer" style={{color: 'inherit'}}>
                open
              </a>
            </Text>
          </Stack>
        </Box>
        <Button
          icon={TrashIcon}
          text="Delete"
          tone="critical"
          mode="ghost"
          onClick={() => onDelete(asset)}
        />
      </Flex>
    </Card>
  )
}

function Section({title, items, onDelete}) {
  const total = items.reduce((sum, item) => sum + (item.size || 0), 0)
  return (
    <Stack space={3}>
      <Text size={2} weight="bold">
        {title} ({items.length}
        {items.length ? `, ${formatSize(total)}` : ''})
      </Text>
      {items.length === 0 ? (
        <Text size={1} muted>
          Nothing to clean up here.
        </Text>
      ) : (
        items.map((asset) => <Row key={asset._id} asset={asset} onDelete={onDelete} />)
      )}
    </Stack>
  )
}

// A Studio tool for removing uploaded files and photos that nothing uses any more.
export function CleanupTool() {
  // 'raw' so unpublished drafts are included when checking whether a file is still in use
  const client = useClient({apiVersion}).withConfig({perspective: 'raw', useCdn: false})
  const [assets, setAssets] = useState(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(null) // the asset waiting for confirmation
  const [working, setWorking] = useState(false)
  const [notice, setNotice] = useState('')

  // State is only set after the request returns, so this is safe to call from an effect
  const load = useCallback(
    () =>
      client
        .fetch(UNUSED_QUERY)
        .then((list) => {
          setAssets(list)
          setError('')
        })
        .catch((err) => setError(err?.message || 'Could not load the list.')),
    [client],
  )

  useEffect(() => {
    load()
  }, [load])

  const files = useMemo(() => (assets || []).filter((a) => a._type === 'sanity.fileAsset'), [assets])
  const photos = useMemo(() => (assets || []).filter((a) => a._type === 'sanity.imageAsset'), [assets])

  async function confirmDelete() {
    if (!pending) return
    setWorking(true)
    setError('')
    try {
      // Check again right now: someone may have attached it since the list loaded
      const stillUsedBy = await client.fetch(USED_QUERY, {id: pending._id})
      if (stillUsedBy > 0) {
        setError(`"${pending.originalFilename || 'This file'}" is now in use, so it was not deleted.`)
      } else {
        await client.delete(pending._id)
        setNotice(`Deleted ${pending.originalFilename || 'the file'} (${formatSize(pending.size)}).`)
      }
    } catch (err) {
      setError(err?.message || 'Could not delete. Please try again.')
    }
    setWorking(false)
    setPending(null)
    load()
  }

  return (
    <Box padding={4} style={{maxWidth: 760, margin: '0 auto'}}>
      <Stack space={5}>
        <Stack space={3}>
          <Flex align="center" justify="space-between" gap={3}>
            <Text size={3} weight="bold">
              Clean up unused files
            </Text>
            <Button icon={RefreshIcon} text="Refresh" mode="ghost" onClick={load} />
          </Flex>
          <Text size={1} muted>
            These files and photos are not used by any post, project, gallery photo or download,
            including unpublished drafts. Deleting one frees storage and cannot be undone.
          </Text>
        </Stack>

        {notice && (
          <Card padding={3} radius={2} tone="positive" border>
            <Text size={1}>{notice}</Text>
          </Card>
        )}
        {error && (
          <Card padding={3} radius={2} tone="critical" border>
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {assets === null && !error ? (
          <Flex align="center" gap={3}>
            <Spinner muted />
            <Text size={1}>Checking what is unused…</Text>
          </Flex>
        ) : (
          assets && (
            <>
              <Section title="Files (PDFs and documents)" items={files} onDelete={setPending} />
              <Section title="Photos" items={photos} onDelete={setPending} />
            </>
          )
        )}
      </Stack>

      {pending && (
        <Dialog
          id="confirm-delete-asset"
          header="Delete this permanently?"
          width={1}
          onClose={working ? undefined : () => setPending(null)}
          footer={
            <Flex gap={2} justify="flex-end" padding={3}>
              <Button text="Cancel" mode="ghost" disabled={working} onClick={() => setPending(null)} />
              <Button
                text={working ? 'Deleting…' : 'Yes, delete it'}
                tone="critical"
                disabled={working}
                onClick={confirmDelete}
              />
            </Flex>
          }
        >
          <Box padding={4}>
            <Stack space={3}>
              <Text size={1} weight="semibold" style={{wordBreak: 'break-word'}}>
                {pending.originalFilename || 'This file'} ({formatSize(pending.size)})
              </Text>
              <Text size={1}>This cannot be undone. Nothing on the website uses it.</Text>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}
