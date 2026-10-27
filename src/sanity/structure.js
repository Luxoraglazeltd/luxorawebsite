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
                .title('Product Brochure')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Product Brochure')
                    .filter('_type == "downloadDocument" && category == "brochure"')
                ),
              S.listItem()
                .title('Technical Data Sheet')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Technical Data Sheet')
                    .filter('_type == "downloadDocument" && category == "datasheet"')
                ),
              S.listItem()
                .title('Installation Guide')
                .child(
                  S.documentTypeList('downloadDocument')
                    .title('Installation Guide')
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
