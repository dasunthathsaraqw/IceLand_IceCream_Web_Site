import React, { useState, useEffect, useRef} from 'react';
import emailjs from "@emailjs/browser";

const InquiryForm = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setTimeout(() => setVisibleSections(prev => [...prev, 'header']), 100);
            } else if (entry.target === formRef.current) {
              setTimeout(() => setVisibleSections(prev => [...prev, 'form']), 300);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    emailjs.init('h9EBYd38kGKFVk32d');
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    console.log('Form Data before send:', formData); // Debug
    emailjs.send(
      'service_vq8oktm',
      'template_g7rsl3i',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message
      },
      'h9EBYd38kGKFVk32d'
    )
    .then(
      () => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 3000);
      },
      (error) => {
        setStatus('error');
        console.error('Email sending failed:', error.text);
        setTimeout(() => setStatus(null), 3000);
      }
    );
  };

  const BackgroundCircles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-32 right-1/3 w-72 h-72 bg-gradient-to-br from-blue-200 to-yellow-300 rounded-full blur-3xl opacity-25 animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-100 to-orange-200 rounded-full blur-2xl opacity-30 animate-bounce" style={{animationDuration: '6s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200 to-yellow-300 rounded-full blur-2xl opacity-20 animate-bounce" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 right-16 w-24 h-24 bg-blue-200 rounded-full blur-xl opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
      <div className="absolute top-3/4 left-16 w-28 h-28 bg-orange-300 rounded-full blur-xl opacity-30 animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 right-1/5 w-20 h-20 bg-yellow-200 rounded-full blur-xl opacity-35 animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
    </div>
  );

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden min-h-screen"
    >
      <BackgroundCircles />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-orange-600 mx-auto rounded-full shadow-lg mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or want to place a bulk order? Reach out, and we'll get back to you soon!
          </p>
        </div>

        <div 
          ref={formRef}
          className={`max-w-2xl mx-auto transform transition-all duration-1000 ${
            visibleSections.includes('form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Send Inquiry</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Inquiry form">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 bg-gray-50 rounded-xl text-lg text-gray-700 border-2 transition-all duration-300 focus:outline-none ${
                    focusedField === 'name' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  required
                />
                {focusedField === 'name' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 bg-gray-50 rounded-xl text-lg text-gray-700 border-2 transition-all duration-300 focus:outline-none ${
                    focusedField === 'email' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  required
                />
                {focusedField === 'email' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Inquiry"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full p-4 bg-gray-50 rounded-xl text-lg text-gray-700 border-2 transition-all duration-300 focus:outline-none resize-none ${
                    focusedField === 'message' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  required
                />
                {focusedField === 'message' && (
                  <div className="absolute right-3 top-4">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center justify-center"
                aria-label="Send inquiry"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 4 7.938l3-2.647z"/>
                    </svg>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-blue-600 mt-4 text-center">Inquiry sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4 text-center">Failed to send inquiry. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-blue-50/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/4 bg-gradient-to-t from-orange-50/30 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default InquiryForm;