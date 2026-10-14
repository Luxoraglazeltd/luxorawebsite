'use client'

import {useState} from 'react'
import {useSchema, useValidationStatus} from 'sanity'

// Wraps Sanity's Publish action. Normally Publish is greyed out and does nothing when a
// required field is empty, so clients don't know why. Here the button stays clickable and,
// if something is missing, a pop-up lists exactly which fields need filling in.
export function withPublishChecks(originalPublishAction) {
  function CheckedPublishAction(props) {
    const original = originalPublishAction(props)
    const schema = useSchema()
    const {validation} = useValidationStatus(props.id, props.type)
    const [open, setOpen] = useState(false)

    if (!original) return original

    const errors = validation.filter((marker) => marker.level === 'error')
    if (errors.length === 0) return original

    const documentType = schema.get(props.type)
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
        header: 'Please complete these fields before publishing',
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
            </ul>
          </div>
        ),
      },
    }
  }

  CheckedPublishAction.action = 'publish'
  return CheckedPublishAction
}
