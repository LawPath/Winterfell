import React, { Component } from 'react';
export default class HiddenInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  render() {
    return <input type="hidden" name={this.props.name} value={this.state.value} />;
  }
}

HiddenInput.defaultProps = {
  name: '',
  value: '',
};
