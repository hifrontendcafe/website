import { StructureBuilder } from 'sanity/desk';

// https://www.sanity.io/schemas/how-to-list-and-group-image-asset-documents-540ba73a

const AssetPreview = ({ document }) => {
  const { displayed } = document;
  return (
    displayed.url && (
      <div style={{ padding: '1em' }}>
        <img src={`${displayed.url}?w=600`} style={{ maxWidth: '100%' }} />
      </div>
    )
  );
};

const AssetDoc = (assetId: string, S: StructureBuilder) =>
  S.document()
    .schemaType('sanity.imageAsset')
    .documentId(assetId)
    .views([
      S.view.component(AssetPreview).title('Image preview'),
      S.view.form().title('Meta-information'),
    ]);

const assetsTree = (S: StructureBuilder) =>
  S.listItem()
    .title('Assets')
    .child(
      S.list()
        .title('Assets')
        .items([
          S.listItem()
            .title('All images')
            .child(
              S.documentTypeList('sanity.imageAsset').child((assetId) =>
                AssetDoc(assetId, S),
              ),
            ),
          // List images with width over 1000px
          S.listItem()
            .title('Large images (1000px+)')
            .child(
              S.documentList()
                .title('Large images')
                .filter(
                  '_type == "sanity.imageAsset" && metadata.dimensions.width > 1000',
                )
                .child((assetId) => AssetDoc(assetId, S)),
            ),
          // List images with the file extension of “gif”
          S.listItem()
            .title('GIFs')
            .child(
              S.documentList()
                .title('GIFs')
                .filter('_type == "sanity.imageAsset" && extension == "gif"')
                .child((assetId) => AssetDoc(assetId, S)),
            ),
          // List images that has been uploaded with the unsplash asset selector
          S.listItem()
            .title('From Unsplash')
            .child(
              S.documentList()
                .title('From Unsplash')
                .filter(
                  '_type == "sanity.imageAsset" && source.name == "unsplash"',
                )
                .child((assetId) => AssetDoc(assetId, S)),
            ),
        ]),
    );

export default assetsTree;
