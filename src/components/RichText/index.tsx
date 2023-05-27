'use client';

import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  UnorderedList,
  OrderedList,
  Link,
  Strong,
  Image,
} from '@/components/MDX';

type RichTextProps = {
  // TODO: Add correct types from Sanity (when install).
  value: Array<{ _key: string; _type: string }>;
  components?: Partial<PortableTextReactComponents>;
};

const RichText: React.FC<RichTextProps> = ({ value, components }) => {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h1: Heading1,
          h2: Heading2,
          h3: Heading3,
          normal: Paragraph,
          ...(components?.block as any),
        },
        types: {
          image: Image,
        },
        marks: {
          link: Link,
          strong: Strong,
          ...(components?.marks as any),
        },
        list: {
          bullet: UnorderedList,
          number: OrderedList,
          ...(components?.list as any),
        },
      }}
    />
  );
};

export default RichText;
