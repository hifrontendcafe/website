'use client';

import type { PortableTextReactComponents } from '@portabletext/react';
import { OrderedList, UnorderedList } from '../MDX';
import RichText from '../RichText';

const components: Partial<PortableTextReactComponents> = {
  list: {
    // eslint-disable-next-line react/display-name
    number: ({ children }) => (
      <OrderedList className="pl-9">{children}</OrderedList>
    ),
    // eslint-disable-next-line react/display-name
    bullet: ({ children }) => (
      <UnorderedList className="pl-9">{children}</UnorderedList>
    ),
  },
};

type DocsRichTextProps = {
  body: Array<{ _key: string; _type: string }>;
};

const DocsRichText: React.FC<DocsRichTextProps> = ({ body }) => {
  return <RichText components={components} value={body} />;
};

export default DocsRichText;
