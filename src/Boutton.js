export default function Button({ children, ...htmlProps }) {
  // const className = `btn btn-${variant} btn-${size}`;

  return (
    <>
      <button {...htmlProps}>{children}</button>
    </>
  );
}
