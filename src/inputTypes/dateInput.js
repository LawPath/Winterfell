import React, { createRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';
import IconInput from '../formGroups/inputFormGroup';

const calendarIconUrl = 'https://assets.lawpath.com/images/svg/calendar.svg';

const CustomInput = ({ style, onChange, onFocus, placeholder, value, isSecure, id, onClick }) => {
  const inputRef = useRef();
  return (
    <IconInput
      showIcon={true}
      showTooltip={false}
      onClick={() => {
        inputRef.current.click();
      }}
      iconUrl={calendarIconUrl}
    >
      <input
        ref={inputRef}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        isSecure={isSecure}
        id={id}
        className={style}
        onClick={onClick}
        onFocus={onFocus}
        autoComplete="off"
      />
    </IconInput>
  );
};

export default class DateInputType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value && this.props.value.type && moment(this.props.value.value),
    };
  }

  handleChange = (date) => {
    // Null checked: Date when typed manually
    if (date === null) {
      return;
    }

    this.setState({
      value: date,
    });
    this.props.onChange({ type: 'date', value: moment(date) });
  };

  render() {
    const { onFocus } = this.props;
    return (
      <DatePicker
        customInput={
          <CustomInput style={this.props.classes.input} onFocus={() => onFocus(this.props.id)} />
        }
        name={`${this.props.name}`}
        id={`${this.props.id}`}
        aria-labelledby={`${this.props.labelId}`}
        selected={this.state.value}
        value={this.state.value}
        onSelect={this.props.onBlur}
        onFocus={() => onFocus(this.props.id)}
        onChange={this.handleChange}
        dateFormat="DD MMM YYYY"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    );
  }
}

DateInputType.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object,
  onFocus: PropTypes.func,
  labelId: PropTypes.string.isRequired,
};

DateInputType.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: moment(),
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};
