import React from 'react';
import classnames from 'classnames';

const Select = ({ label, name, value, options, onChange, onExit, error, blankOption = true }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className='control-label'>{label}</label>
      <select
        name={name}
        className='form-control'
        value={value}
        onChange={onChange}
        onBlur={onExit}
      >
        {blankOption ? <option value="">Please select...</option> : null}
        {options.map(option => <option value={option}>{option}</option>)}
      </select>
      {error &&
        <span className='help-block'>{error}</span>
      }
    </div>
  );
};

export default Select;
