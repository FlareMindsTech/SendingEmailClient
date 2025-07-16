import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const EmailForm = () => {
  const navigate = useNavigate(); // ✅ CALL INSIDE COMPONENT

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'scheduledAt') {
    const localDate = new Date(value); // No offset calculation
    setFormData((prev) => ({
      ...prev,
      [name]: localDate.toISOString(), // ✅ Convert directly
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();

const formDataToSend = new FormData();
formDataToSend.append('to', formData.to); // ✅ Required
formDataToSend.append('subject', formData.subject || ''); // ✅ Optional fallback
formDataToSend.append('text', formData.text || '');
formDataToSend.append('scheduledAt', formData.scheduledAt || '');
  // if (formData.scheduledAt) {
  //   formDataToSend.append('scheduledAt', formData.scheduledAt);
  // }
  if (file) {
    // If keeping backend as upload.single('file')
formDataToSend.append('file', file);

  }

  try {
    const response = await fetch('https://sendingemailserver01.onrender.com/api/schedule-email', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.text();
    if (response.ok) {
      alert('Mail scheduled or sent successfully ✅');
    } else {
      alert(`Failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error sending mail:', error);
    alert('Something went wrong ❌');
  }
};

  return (
    <MDBContainer className='py-5'>
      {/* 🔙 Back Button */}
      <div className="d-flex align-items-center mb-4">
        <MDBIcon
          fas
          icon="arrow-left"
          className="me-3 text-primary"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard/user-module')}
        />
        <h3 className='mb-0'>Send / Schedule Email</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label='To (email)'
              type='email'
              name='to'
              className='mb-3'
              required
              onChange={handleChange}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label='Subject'
              type='text'
              name='subject'
              className='mb-3'
              onChange={handleChange}
            />
          </MDBCol>
        </MDBRow>

        <MDBTextArea
          label='Message'
          name='text'
          rows={4}
          className='mb-3'
          onChange={handleChange}
        />

        <MDBInput
          label='Schedule At (optional)'
          type='datetime-local'
          name='scheduledAt'
          className='mb-3'
          onChange={handleChange}
        />

        <MDBInput
          type='file'
          accept='.pdf'
          className='mb-4'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <MDBBtn type='submit' className='w-100'>
          Send / Schedule
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default EmailForm;
