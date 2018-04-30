import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);

    console.log("this.props.value", this.props.value);
    console.log("this.props.value.type", this.props.value.type);
    console.log("this.props.value.value", this.props.value.value);
    this.state = {
      value: this.props.value.type ? this.props.value.value : this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      value: date
    }, this.props.onChange.bind(null, { type: 'date', value: date }));
  }

  render() {
    const { onFocus } = this.props;
    return (
      <div>
        <DatePicker
          name={`${this.props.name}`}
          id={`${this.props.id}`}
          aria-labelledby={`${this.props.labelId}`}
          className={this.props.classes.input}
          selected={this.state.value}
          onSelect={this.props.onBlur}
          onFocus={() => onFocus(this.props.id)}
          onChange={this.handleChange}
          dateFormat="LL"
        />
      </div>);
  }
}

DateInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: moment(),
  onChange: () => {
  },
  onBlur: () => {
  },
  onFocus: () => {
  }
};
