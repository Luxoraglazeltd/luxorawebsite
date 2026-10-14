'use client'

import {useRef, useState} from 'react'
import {Box, Button, Dialog, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {UploadIcon} from '@sanity/icons'
import {compressImageFile} from '../lib/compressImageFile'

const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1)

// Replaces Studio's default image upload so every photo is compressed first.
function CompressedImageSourceComponent({onSelect, onClose}) {
  const inputRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | working | error
  const [message, setMessage] = useState('')

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setStatus('working')
    setMessage('Optimizing your photo…')
    try {
      const compressed = await compressImageFile(file)
      onSelect([{kind: 'file', value: compressed}])
      onClose()
    } catch (error) {
      setStatus('error')
      setMessage(
        `Could not prepare this photo (${formatMb(file.size)} MB). Please try a JPG or PNG image.`,
      )
    }
  }

  return (
    <Dialog
      id="compressed-image-upload"
      header="Upload photo"
      width={1}
      onClose={status === 'working' ? undefined : onClose}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={1} muted>
            Photos are automatically optimized for the website when you upload them. Any size is
            fine.
          </Text>
          {status === 'working' ? (
            <Flex align="center" gap={3}>
              <Spinner muted />
              <Text size={1}>{message}</Text>
            </Flex>
          ) : (
            <>
              {status === 'error' && (
                <Text size={1} style={{color: 'var(--card-badge-critical-fg-color)'}}>
                  {message}
                </Text>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{display: 'none'}}
              />
              <Button
                icon={UploadIcon}
                text="Choose a photo"
                tone="primary"
                onClick={() => inputRef.current?.click()}
              />
            </>
          )}
        </Stack>
      </Box>
    </Dialog>
  )
}

export const compressedImageSource = {
  name: 'luxora-compressed-upload',
  title: 'Upload photo',
  component: CompressedImageSourceComponent,
  icon: UploadIcon,
  uploadMode: 'component',
}
