export default function Button({ className, children, type, ...htmlProps }) {
  // const className = `btn btn-${variant} btn-${size}`;

  return (
    <>
      <button type={type} className={className} {...htmlProps}>
        {children}
      </button>
    </>
  );
}
