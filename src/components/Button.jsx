const Button = ({ title, onClick, className = "" }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
