import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ label, name, type, value, onChange, onExit, error }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className='control-label'>{label}</label>
      <input
        type={type}
        name={name}
        className='form-control'
        value={value}
        onChange={onChange}
        onBlur={onExit}
      />
      {error &&
        <span className='help-block'>{error}</span>
      }
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
