export const Link = ({ href, children }) => {
  return (
    <a
      href={href}
      style={{
        color: 'rgba(245, 158, 11)',
        fontStyle: 'italic',
        fontWeight: '500',
        margin: '0 2px',
        textDecoration: 'none',
      }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
