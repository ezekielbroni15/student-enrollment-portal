import React from "react";

class ClassButton extends React.Component {
  render() {
    const { title, onClick, className = "" } = this.props;

    return (
      <button className={`button ${className}`} onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default ClassButton;
