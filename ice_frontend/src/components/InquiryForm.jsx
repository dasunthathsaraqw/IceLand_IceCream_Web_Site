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
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute top-1/3 -left-20 w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full blur-2xl opacity-20"></div>
      <div className="absolute -bottom-16 right-1/4 w-36 h-36 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-full blur-xl opacity-40"></div>
    </div>
  );

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-12 bg-white relative overflow-hidden z-0"
    >
      <BackgroundCircles />
      <div className="container mx-auto px-4 md:px-8 relative z-1">
        <div 
          ref={headerRef}
          className={`text-center mb-10 transform transition-all duration-1000 ${
            visibleSections.includes('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-4 animate-fade-in">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
          </div>
        </div>

        <div 
          ref={formRef}
          className={`max-w-lg mx-auto transform transition-all duration-1000 ${
            visibleSections.includes('form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="bg-[#FFECDB] p-6 rounded-lg shadow-sm border border-[#FF9149]">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 bg-[#FF9149] rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-[#FF9149]">Send Inquiry</h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full p-3 bg-white rounded-md text-sm text-gray-700 border border-[#FF9149] transition-all duration-200 focus:outline-none focus:border-[#E07B39] ${
                    focusedField === 'name' ? 'shadow-sm' : 'hover:border-[#E07B39]'
                  }`}
                  required
                />
                {focusedField === 'name' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-[#FF9149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`w-full p-3 bg-white rounded-md text-sm text-gray-700 border border-[#FF9149] transition-all duration-200 focus:outline-none focus:border-[#E07B39] ${
                    focusedField === 'email' ? 'shadow-sm' : 'hover:border-[#E07B39]'
                  }`}
                  required
                />
                {focusedField === 'email' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-[#FF9149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`w-full p-3 bg-white rounded-md text-sm text-gray-700 border border-[#FF9149] transition-all duration-200 focus:outline-none focus:border-[#E07B39] resize-none ${
                    focusedField === 'message' ? 'shadow-sm' : 'hover:border-[#E07B39]'
                  }`}
                  required
                />
                {focusedField === 'message' && (
                  <div className="absolute right-3 top-3">
                    <svg className="w-4 h-4 text-[#FF9149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="group w-full bg-[#FF9149] text-[#FFFFFF] px-6 py-3 rounded-md hover:bg-[#E07B39] transition-all duration-200 font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="#FFFFFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 4 7.938l3-2.647z"/>
                    </svg>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-[#16A34A] mt-3 text-center text-sm">✅ Inquiry sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-[#E07B39] mt-3 text-center text-sm">❌ Failed to send inquiry. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;