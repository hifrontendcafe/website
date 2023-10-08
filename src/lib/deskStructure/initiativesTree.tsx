// import { FaPeopleCarry } from 'react-icons/fa';
// import { GiTeacher } from 'react-icons/gi';
// import { IoIosColorFilter } from 'react-icons/io';
import { StructureBuilder } from 'sanity/desk';

export function initiativesTree(S: StructureBuilder) {
  return (
    S.listItem()
      .title('Iniciativas')
      // .icon(FaPeopleCarry)
      .child(
        S.list()
          .title('Iniciativas')
          .items([
            S.listItem()
              .title('Mentorias')
              // .icon(GiTeacher)
              .child(
                S.list()
                  .title('Mentorias')
                  .items([
                    S.listItem()
                      .title('Mentores')
                      .schemaType('mentor')
                      .child(S.documentTypeList('mentor').title('Mentores')),
                    S.listItem()
                      .title('Temas')
                      .schemaType('topic')
                      .child(S.documentTypeList('topic').title('Temas')),
                  ]),
              ),
            S.listItem()
              .title('CMYK+')
              // .icon(IoIosColorFilter)
              .child(
                S.list()
                  .title('CMYK+')
                  .items([
                    S.listItem()
                      .title('Proyectos')
                      .schemaType('cmyk')
                      .child(S.documentTypeList('cmyk').title('Proyectos')),
                    S.listItem()
                      .title('Participantes')
                      .schemaType('cmykParticipant')
                      .child(
                        S.documentTypeList('cmykParticipant').title(
                          'Participantes',
                        ),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Reactivistas')
              .schemaType('reactGroup')
              .child(
                S.documentTypeList('reactGroup').title(
                  'Grupos de Reactivistas',
                ),
              ),
          ]),
      )
  );
}
