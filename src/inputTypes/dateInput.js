import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ name, labelId, classes, onBlur, id, onFocus }) => {
  const [inputValue, setInputValue] = useState(value.type ? moment(value.value) : value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange({ type: 'date', value: date });
  };

  return (
    <div>
      <DatePicker
        name={name}
        id={id}
        aria-labelledby={labelId}
        className={classes.input}
        selected={inputValue}
        onChange={handleChange}
        onSelect={onBlur}
        onFocus={() => onFocus(id)}
        dateFormat="LL"
      />
    </div>
  );
};

DateInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: moment(),
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default DateInput;
