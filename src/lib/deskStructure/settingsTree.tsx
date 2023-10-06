// import { BsGear } from 'react-icons/bs';
import { StructureBuilder } from 'sanity/desk';

export function settingsTree(S: StructureBuilder) {
  return (
    S.listItem()
      .title('Settings')
      // .icon(BsGear)
      .child(S.document().schemaType('settings').documentId('settings'))
  );
}
