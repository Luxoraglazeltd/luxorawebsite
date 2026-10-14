'use client'

// Wraps the Studio so the Publish button stands out on the dark theme.
// Only affects /studio. The public website's styles are not touched.
const PUBLISH_BUTTON_CSS = `
  button[data-testid="action-publish"] {
    background: #C9A84C !important;
    color: #0D0D0D !important;
    font-weight: 700 !important;
    box-shadow: 0 0 0 2px #E8C87A !important;
  }
  button[data-testid="action-publish"] * {
    color: #0D0D0D !important;
  }
  button[data-testid="action-publish"]:hover:not([disabled]) {
    background: #E8C87A !important;
  }
  /* Nothing to publish yet (or fields still need fixing): dimmed but still clearly visible */
  button[data-testid="action-publish"][disabled] {
    opacity: 0.55 !important;
  }
`

// Sanity sizes its whole interface in rem, so raising the base size on phones
// makes every label, field and button larger together. Phones only; desktop untouched.
const PHONE_SCALE_CSS = `
  @media (max-width: 767px) {
    html { font-size: 120%; }
  }
`

export function StudioLayout(props) {
  return (
    <>
      <style>{PUBLISH_BUTTON_CSS + PHONE_SCALE_CSS}</style>
      {props.renderDefault(props)}
    </>
  )
}
