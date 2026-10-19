'use client'

import {useEffect, useState} from 'react'
import {useClient, useSchema, useValidationStatus} from 'sanity'
import {apiVersion} from '../env'

const MAX_IMAGE_BYTES = 2 * 1024 * 1024 // 2 MB per image
const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1)

// Finds every uploaded image on a document (main image, gallery, images inside text),
// remembering the path so the message can name the field.
function collectImages(value, path = [], found = []) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectImages(item, [...path, i], found))
  } else if (value && typeof value === 'object') {
    if (typeof value.asset?._ref === 'string' && value.asset._ref.startsWith('image-')) {
      found.push({ref: value.asset._ref, path})
    }
    Object.entries(value).forEach(([key, child]) => {
      if (key !== 'asset' && !key.startsWith('_')) collectImages(child, [...path, key], found)
    })
  }
  return found
}

// Wraps Sanity's Publish action. Normally Publish is greyed out and does nothing when a
// required field is empty, so clients don't know why. Here the button stays clickable and,
// if something is missing, a pop-up lists exactly which fields need filling in.
export function withPublishChecks(originalPublishAction) {
  function CheckedPublishAction(props) {
    const original = originalPublishAction(props)
    const schema = useSchema()
    const {validation} = useValidationStatus(props.id, props.type)
    const client = useClient({apiVersion})
    const [open, setOpen] = useState(false)
    const [sizes, setSizes] = useState({}) // image asset id -> file size in bytes

    const doc = props.draft || props.published
    const images = doc ? collectImages(doc) : []
    const imageIds = [...new Set(images.map((image) => image.ref))].sort()
    const imageIdsKey = imageIds.join('|')

    // Look up the stored file size of each image. If this fails, images are not blocked.
    useEffect(() => {
      if (!imageIdsKey) return undefined
      let cancelled = false
      client
        .fetch('*[_id in $ids]{_id, size}', {ids: imageIdsKey.split('|')})
        .then((rows) => {
          if (cancelled) return
          setSizes(Object.fromEntries((rows || []).map((row) => [row._id, row.size])))
        })
        .catch(() => {})
      return () => {
        cancelled = true
      }
    }, [client, imageIdsKey])

    if (!original) return original

    const errors = validation.filter((marker) => marker.level === 'error')
    const documentType = schema.get(props.type)

    const oversized = images
      .filter((image) => sizes[image.ref] > MAX_IMAGE_BYTES)
      .map((image) => {
        const field = documentType?.fields?.find((f) => f.name === image.path[0])
        const name = field?.type?.title || field?.title || image.path[0] || 'An image'
        const position = typeof image.path[1] === 'number' ? `, photo ${image.path[1] + 1}` : ''
        return {label: `${name}${position}`, bytes: sizes[image.ref]}
      })

    if (errors.length === 0 && oversized.length === 0) return original

    const fieldTitle = (marker) => {
      const name = marker.path?.[0]
      const field = documentType?.fields?.find((f) => f.name === name)
      return field?.type?.title || field?.title || name || 'A field'
    }

    return {
      ...original,
      disabled: false,
      tone: 'positive',
      onHandle: () => setOpen(true),
      dialog: open && {
        type: 'dialog',
        header:
          errors.length > 0
            ? 'Please complete these fields before publishing'
            : 'Please fix these photos before publishing',
        onClose: () => {
          setOpen(false)
          props.onComplete()
        },
        content: (
          <div style={{padding: '4px 0 12px'}}>
            <p style={{margin: '0 0 12px'}}>
              This cannot be published yet. Please fix the following, then press Publish again:
            </p>
            <ul style={{margin: 0, paddingLeft: 20, lineHeight: 1.8}}>
              {errors.map((marker, i) => (
                <li key={i}>
                  <strong>{fieldTitle(marker)}</strong>: {marker.message}
                </li>
              ))}
              {oversized.map((item, i) => (
                <li key={`size-${i}`}>
                  <strong>{item.label}</strong> is too large ({formatMb(item.bytes)} MB). Please
                  remove it and add it again using the Upload button.
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    }
  }

  CheckedPublishAction.action = 'publish'
  return CheckedPublishAction
}
