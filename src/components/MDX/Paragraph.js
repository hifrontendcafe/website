export const Paragraph = ({ children }) => (
  <p
    style={{
      letterSpacing: '0',
      color: 'rgb(63, 69, 81)',
      textRendering: 'optimizeLegibility',
      fontSize: '1.2rem',
      fontWeight: '500',
      lineHeight: '1.6',
    }}
  >
    {children}
  </p>
);
