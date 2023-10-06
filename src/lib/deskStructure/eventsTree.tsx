// import { BsGear } from 'react-icons/bs';
// import { MdEventSeat } from 'react-icons/md';
import { StructureBuilder } from 'sanity/desk';

const currentDateTime = new Date().toISOString();

export function eventsTree(S: StructureBuilder) {
  return (
    S.listItem()
      .title('Eventos')
      // .icon(MdEventSeat)
      .child(
        S.list()
          .title('Eventos')
          .items([
            S.listItem()
              .title('Eventos Proximos')
              .schemaType('event')
              .child(
                S.documentTypeList('event')
                  .title('Eventos Proximos')
                  .filter('_type == "event" && date >= $currentDateTime')
                  .params({ currentDateTime }),
              ),
            S.listItem()
              .title('Eventos Anteriores')
              // .icon(() => <MdEventSeat style={{ opacity: 0.66 }} />)
              .schemaType('event')
              .child(
                S.documentTypeList('event')
                  .title('Eventos Anteriores')
                  .filter('_type == "event" && date < $currentDateTime')
                  .params({ currentDateTime }),
              ),
            S.listItem()
              .title('Canales con eventos')
              .schemaType('eventChannel')
              .child(
                S.documentTypeList('eventChannel').title('Canales con eventos'),
              ),
            S.listItem()
              .title('Categorias')
              .schemaType('category')
              .child(
                S.documentTypeList('category').title('Categorias de Eventos'),
              ),
            S.listItem()
              .title('Tags')
              .schemaType('tag')
              .child(S.documentTypeList('tag').title('Tags de Eventos')),
            S.listItem()
              .title('Settings')
              // .icon(BsGear)
              .schemaType('eventsSettings')
              .child(
                S.document()
                  .schemaType('eventsSettings')
                  .documentId('eventsSettings'),
              ),
          ]),
      )
  );
}
