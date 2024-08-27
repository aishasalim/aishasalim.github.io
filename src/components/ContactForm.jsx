import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

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

    emailjs.sendForm('service_vz3gqvm', 'template_2hnobyv', e.target, 'RR6ECD9KTmFySUbpu')
      .then(() => {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setShowPopup(true);
      })
      .catch(error => {
        console.error('Email send error:', error);
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
<section id="contact" className="pb-10 pt-[8em] mb-10 max-w-2xl px-3 mx-auto" ref={formRef}>
  <h2 className="text-4xl font-bold mb-8 text-center">Let's Connect 👋</h2>

  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <p className="mb-6 text-lg">I'm based in Houston and happy to collaborate with people! <br /></p>
    <form onSubmit={handleSubmit}>
      <ul>
        <li className="mb-4">
          <input 
            type="text" 
            name="name" 
            placeholder='Your Name' 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700"
          />
        </li>
        <li className="mb-4">
          <input 
            type="email" 
            name="email" 
            placeholder='Your Email' 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700"
          />
        </li>
        <li className="mb-4">
          <textarea 
            name="message" 
            placeholder='Your Message' 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="w-full min-h-[10em] p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded border border-gray-200 dark:border-gray-700"
          />
        </li>
      </ul>
      <button type="submit" className="hover:bg-gray-300 dark:hover:bg-gray-800 bg-transparent border px-4 py-2 rounded-2xl hover:bg-opacity-20 transition-colors duration-200">
        Send Email
      </button>
    </form>

    {showPopup && (
      <div className="mt-6 p-4 bg-green-100 dark:bg-green-800 rounded border border-green-200 dark:border-green-700">
        <div className="flex justify-between items-center">
          <p className="text-green-700 dark:text-green-200">Your message has been sent!</p>
          <button 
            onClick={handleClosePopup} 
            className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
          >
            OK!
          </button>
        </div>
      </div>
    )} 
  </div>
</section>

  );
};

export default ContactForm;