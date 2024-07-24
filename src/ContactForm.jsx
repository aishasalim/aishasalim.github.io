import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Email sent successfully:', result);
        setShowPopup(true);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Email send error:', error);
        // Handle error
      });
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const message = "Hi, Aisha! 👋 I would like to connect with you!🚀";
    let index = 0;

    const typeEffect = () => {
      setFormData(prevFormData => ({
        ...prevFormData,
        message: message.slice(0, index + 1)
      }));
      index++;
      if (index < message.length) {
        setTimeout(typeEffect, 100); // Adjust typing speed here
      }
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeEffect();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <div id="services" className="shall-we-section" ref={formRef}>
      <div className="shall-we-copy">
        <div className="pointill-s">
          <h2 className="h2-title-category---light shall-we"><strong>Let's Connect 👋</strong></h2>
        </div>
        <p>I'm based in Houston and happy to collaborate with people! <br /></p>
        <form onSubmit={handleSubmit}>
          <ul>
            <li className="unordered-list-item">
              <input type="text" name="name" placeholder='Your Name' value={formData.name} onChange={handleChange} required />
            </li>
            <li className="unordered-list-item">
              <input type="email" name="email" placeholder='Your Email' value={formData.email} onChange={handleChange} required />
            </li>
            <li className="unordered-list-item">
              <textarea name="message" placeholder='Your Message' value={formData.message} onChange={handleChange} required />
            </li>
          </ul>
          <button type="submit" className="email-button w-button">Send Email</button>
        </form>
        {showPopup && ( 
          <div className="popup-backdrop">
            <div className="popup">
              <p>Your message has been sent!</p>
              <button onClick={handleClosePopup}>OK!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
