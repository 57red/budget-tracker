function Button({ text, className, onClick, dataBsToggle, dataBsTarget }) {
  return (
    <button
      className={className}
      onClick={onClick}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
    >
      {text}
    </button>
  );
}

export default Button;
