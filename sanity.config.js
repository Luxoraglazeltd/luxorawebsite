'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {buildLegacyTheme} from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {compressedImageSource} from './src/sanity/components/CompressedImageSource'
import {StudioLayout} from './src/sanity/components/StudioLayout'
import {withPublishChecks} from './src/sanity/actions/checkedPublish'

const luxoraTheme = buildLegacyTheme({
  '--black': '#0D0D0D',
  '--white': '#FFFFFF',
  '--gray': '#A8A8A8',
  '--gray-base': '#CCCCCC',

  '--component-bg': '#1C1C1C',
  '--component-text-color': '#CCCCCC',

  '--brand-primary': '#C9A84C',

  '--default-button-color': '#2A2A2A',
  '--default-button-primary-color': '#C9A84C',
  // Publish is a "success" button: bright green so it stands out on the dark background
  '--default-button-success-color': '#2FBF71',
  '--default-button-warning-color': '#9A7A2E',
  '--default-button-danger-color': '#B03A2E',

  '--state-info-color': '#C9A84C',
  '--state-success-color': '#2FBF71',
  '--state-warning-color': '#9A7A2E',
  '--state-danger-color': '#B03A2E',

  '--main-navigation-color': '#141414',
  '--main-navigation-color--inverted': '#E8C87A',

  '--focus-color': '#E8C87A',
})

export default defineConfig({
  basePath: '/studio',
  title: 'Luxora Glaze CMS',
  projectId,
  dataset,
  theme: luxoraTheme,
  studio: {components: {layout: StudioLayout}},
  // Publish stays clickable and explains which required fields are missing
  document: {
    actions: (prev) =>
      prev.map((action) => (action.action === 'publish' ? withPublishChecks(action) : action)),
  },
  // The Upload button opens the compressing "Upload photo" dialog. Drag-and-drop is
  // enabled, but a photo dropped straight onto the field skips compression.
  form: {
    image: {
      assetSources: () => [compressedImageSource],
    },
  },
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
