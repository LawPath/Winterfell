import React, { Component } from 'react';

export default class Button extends Component {
  handleClick(e) {
    e.preventDefault();

    this.props.onClick();
  }

  render() {
    return (
      <button href="#" className={this.props.className} onClick={this.handleClick.bind(this)}>
        {this.props.text}
      </button>
    );
  }
}

Button.defaultProps = {
  text: 'Submit',
  className: undefined,
  onClick: () => {},
};
