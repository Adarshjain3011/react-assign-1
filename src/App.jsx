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

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const fullNameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullNameRegex.test(formData.fullName)) {
      newErrors.fullName = 'Please enter a valid full name (at least 3 characters)';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Process the form data here (e.g., send it to a server)
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className='main-head'>
      <div className='main'>
        <p>Make an Appointment</p>
        <form className='main-form' onSubmit={handleSubmit}>

          
          {data.map((val, index) => {
            if (val.type === 'select') {
              return (
                <div key={index}>
                  <select
                    value={formData[val.name.toLowerCase().replace(' ', '')]}
                    onChange={(e) => handleChange(e, val.name.toLowerCase().replace(' ', ''))}
                    required={val.required}
                  >
                    <option value="" disabled>
                      {val.name}
                    </option>
                    {val.data.map((val1, idx) => (
                      <option key={idx} value={val1}>{val1}</option>
                    ))}
                  </select>
                </div>
              );
            }

            if (val.type === 'textarea') {
              return (
                <div key={index}>
                  <textarea
                    placeholder={val.name}
                    className='text-area'
                    value={formData[val.name.toLowerCase().replace(' ', '')]}
                    onChange={(e) => handleChange(e, val.name.toLowerCase().replace(' ', ''))}
                    required={val.required}
                  />
                </div>
              );
            }

            return (
              <div key={index}>
                <input
                  type={val.type}
                  placeholder={val.name}
                  value={formData[val.name.toLowerCase().replace(' ', '')]}
                  onChange={(e) => handleChange(e, val.name.toLowerCase().replace(' ', ''))}
                  required={val.required}
                />
                {errors[val.name.toLowerCase().replace(' ', '')] && (
                  <p className="error">{errors[val.name.toLowerCase().replace(' ', '')]}</p>
                )}
              </div>
            );
          })}

          <Button text="Book Appointment"/>
        </form>
      </div>
    </div>
  );
}

export default App;


