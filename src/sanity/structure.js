// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost').title('Blog Post'),
      S.documentTypeListItem('project').title('Project'),
      S.documentTypeListItem('galleryImage').title('Gallery Image'),
      S.divider(),
      S.listItem()
        .title('Download Documents')
        .child(
          S.list()
            .title('Download Documents')
            .items([
              S.listItem()
                .title('Product Brochures')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Product Brochures')
                    .filter('_type == "downloadDocument" && category == "brochure"')
                ),
              S.listItem()
                .title('Technical Data Sheets')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Technical Data Sheets')
                    .filter('_type == "downloadDocument" && category == "datasheet"')
                ),
              S.listItem()
                .title('Installation Guides')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Installation Guides')
                    .filter('_type == "downloadDocument" && category == "installation"')
                ),
              S.listItem()
                .title('Warranty Information')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Warranty Information')
                    .filter('_type == "downloadDocument" && category == "warranty"')
                ),
              S.divider(),
              S.listItem()
                .title('All Downloads')
                .child(
                  S.documentTypeList('downloadDocument').title('All Downloads')
                ),
            ])
        ),
    ])
