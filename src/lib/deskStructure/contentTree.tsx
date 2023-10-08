// import { BsBookHalf } from 'react-icons/bs';
import { StructureBuilder } from 'sanity/desk';

export function contentTree(S: StructureBuilder) {
  return (
    S.listItem()
      .title('Contenido')
      // .icon(BsBookHalf)
      .child(
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Documentos')
              .schemaType('docs')
              .child(S.documentTypeList('docs').title('Documentos')),
            S.listItem()
              .title('Featured cards')
              .schemaType('featuredCards')
              .child(S.documentTypeList('featuredCards').title('Cards')),
            S.listItem()
              .title('Páginas')
              .schemaType('page')
              .child(S.documentTypeList('page').title('Páginas')),
            S.listItem()
              .title('Tecnologías')
              .schemaType('technology')
              .child(S.documentTypeList('technology').title('Tecnologías')),
            S.listItem()
              .title('Roles')
              .schemaType('role')
              .child(S.documentTypeList('role').title('Roles')),
            S.listItem()
              .title('Seniorities')
              .schemaType('seniority')
              .child(S.documentTypeList('seniority').title('Seniorities')),
            S.listItem()
              .title('URLs externas')
              .schemaType('externalUrl')
              .child(S.documentTypeList('externalUrl').title('URLs externas')),
            S.listItem()
              .title('Nav items')
              .schemaType('navItem')
              .child(S.documentTypeList('navItem').title('Nav Items')),
            S.listItem()
              .title('Certificados')
              .schemaType('fec-certificate')
              .child(
                S.documentTypeList('fec-certificate').title('Certificado'),
              ),
          ]),
      )
  );
}
