import { useState } from 'react';
import './EditInput.css'

const EditInput = ({ inputName, defaultValue = "", myRef, type = "text", placeholder }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleChange = (e) => {
    myRef.current = e.target.value;
    setCurrentValue(e.target.value);
  }

  return (
    <div className="profile-details-item">
      <label className="edit-form-label" htmlFor={inputName} >{inputName}</label>
      <input
        id={inputName}
        className="edit-form-input"
        type={type}
        value={currentValue}
        placeholder={placeholder}
        ref={myRef}
        onChange={handleChange}
      />
    </div>
  );
}

export default EditInput;