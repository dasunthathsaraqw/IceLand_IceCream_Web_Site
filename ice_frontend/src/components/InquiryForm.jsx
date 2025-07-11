import React, { useState, useEffect, useRef } from 'react';

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    console.log('Form Data before send:', formData);
    
    // Simulate email sending for demo
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  const BackgroundCircles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#60B5FF]/20 to-[#FF9149]/20 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute top-1/3 -left-20 w-32 h-32 bg-gradient-to-br from-[#FF9149]/20 to-[#AFDDFF]/20 rounded-full blur-2xl opacity-20"></div>
      <div className="absolute -bottom-16 right-1/4 w-36 h-36 bg-gradient-to-br from-[#AFDDFF]/20 to-[#60B5FF]/20 rounded-full blur-xl opacity-40"></div>
    </div>
  );

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <BackgroundCircles />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FF9149] mb-4 animate-fade-in tracking-tight">
            📧 Contact Us
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Have a question or want to learn more about our delicious ice creams? We'd love to hear from you!
          </p>
        </div>

        <div 
          ref={formRef}
          className={`max-w-lg mx-auto transform transition-all duration-1000 ${
            visibleSections.includes('form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="bg-gradient-to-br from-white/90 to-[#AFDDFF]/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-[#60B5FF]/20">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] rounded-full flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#60B5FF]">Send Inquiry</h3>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-4 bg-white/90 rounded-xl text-gray-700 border-2 transition-all duration-300 focus:outline-none placeholder-gray-500 ${
                    focusedField === 'name' 
                      ? 'border-[#60B5FF] shadow-lg shadow-[#60B5FF]/20' 
                      : 'border-[#AFDDFF] hover:border-[#60B5FF]/50'
                  }`}
                  required
                />
                {focusedField === 'name' && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-[#60B5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`w-full p-4 bg-white/90 rounded-xl text-gray-700 border-2 transition-all duration-300 focus:outline-none placeholder-gray-500 ${
                    focusedField === 'email' 
                      ? 'border-[#60B5FF] shadow-lg shadow-[#60B5FF]/20' 
                      : 'border-[#AFDDFF] hover:border-[#60B5FF]/50'
                  }`}
                  required
                />
                {focusedField === 'email' && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-[#60B5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  rows={4}
                  className={`w-full p-4 bg-white/90 rounded-xl text-gray-700 border-2 transition-all duration-300 focus:outline-none resize-none placeholder-gray-500 ${
                    focusedField === 'message' 
                      ? 'border-[#60B5FF] shadow-lg shadow-[#60B5FF]/20' 
                      : 'border-[#AFDDFF] hover:border-[#60B5FF]/50'
                  }`}
                  required
                />
                {focusedField === 'message' && (
                  <div className="absolute right-4 top-4">
                    <svg className="w-5 h-5 text-[#60B5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="group w-full bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] text-white px-8 py-4 rounded-xl hover:from-[#FF9149] hover:to-[#FF9149] transition-all duration-300 font-semibold text-base flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105"
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
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                  <p className="text-green-700 text-center font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inquiry sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                  <p className="text-red-700 text-center font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Failed to send inquiry. Please try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;