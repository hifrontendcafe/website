export const UnorderedList: React.FC = ({ children }) => (
  <ul className="leading-7 list-disc text-secondary pl-9">{children}</ul>
);

export const OrderedList: React.FC = ({ children }) => (
  <ol className="leading-7 list-decimal text-secondary pl-9">{children}</ol>
);

export const ListItem: React.FC = ({ children }) => <li>{children}</li>;
