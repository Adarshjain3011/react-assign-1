import { useState } from 'react';
import './App.css';
import Button from './Button';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    time: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const data = [
    { name: 'Full Name', type: 'text', required: true },
    { name: 'Email Address', type: 'email', required: true },
    { name: 'Department', type: 'select', required: true, data: ['1', '2', '3'] },
    { name: 'Time', type: 'select', required: true, data: ['4:00 PM', '5:00 PM', '6:00 PM'] },
    { name: 'Message', type: 'textarea', required: true },
  ];

  const getFieldKey = (name) => name.toLowerCase().replace(/\s/g, '');

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const fullNameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullNameRegex.test(formData.fullName)) {
      newErrors.fullName = 'Please enter a valid full name (at least 3 characters).';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.department) {
      newErrors.department = 'Please select a department.';
    }
    if (!formData.time) {
      newErrors.time = 'Please select a time.';
    }
    if (!formData.message) {
      newErrors.message = 'Message cannot be empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className="main-head">
      <div className="main">
        <p>Make an Appointment</p>
        <form className="main-form" onSubmit={handleSubmit}>

          {data.map((field, index) => {
            const key = getFieldKey(field.name);

            return (
              <div key={index}>
                <label htmlFor={key}>{field.name}</label>
                {field.type === 'select' ? (
                  <select
                    id={key}
                    defaultValue=""
                    onChange={(e) => handleChange(e, key)}
                    required={field.required}
                  >
                    <option value="" disabled>
                      Select {field.name}
                    </option>
                    {field.data.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={key}
                    placeholder={field.name}
                    value={formData[key]}
                    onChange={(e) => handleChange(e, key)}
                    required={field.required}
                    className="text-area"
                  />
                ) : (
                  <input
                    id={key}
                    type={field.type}
                    placeholder={field.name}
                    value={formData[key]}
                    onChange={(e) => handleChange(e, key)}
                    required={field.required}
                  />
                )}
                {errors[key] && <p className="error" aria-live="polite">{errors[key]}</p>}
              </div>
            );
          })}

          <Button text="Book Appointment" />
        </form>
      </div>
    </div>
  );
}

export default App;
