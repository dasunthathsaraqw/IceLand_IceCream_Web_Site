import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-800 via-blue-700 to-orange-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 right-20 w-3 h-3 bg-orange-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-20 right-10 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>

      <div className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-3">
                  🍦 IceCream Delight
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Crafting happiness one scoop at a time since 1990. Premium ice creams made with love and local ingredients.
                </p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="md:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-300 to-orange-300 bg-clip-text text-transparent">
                  ✨ Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.091c0-.895.208-1.409 1.409-1.409h2.591v-4h-3.409c-3.409 0-5.591 2-5.591 5.591v3.909z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://twitter.com" 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.423.724-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.397 0-.79-.023-1.176-.068 2.187 1.405 4.787 2.224 7.561 2.224 9.054 0 14.003-7.496 14.003-13.986 0-.21 0-.42-.015-.629.962-.695 1.8-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://instagram.com" 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.233.308 2.686.644.476.337.863.748 1.197 1.082.335.334.745.722 1.082 1.197.336.453.582 1.32.644 2.686.058 1.265.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.062 1.366-.308 2.233-.644 2.686-.337.476-.748.863-1.082 1.197-.334.335-.722.745-1.197 1.082-.453.336-1.32.582-2.686.644-1.265.058-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.366-.062-2.233-.308-2.686-.644-.476-.337-.863-.748-1.197-1.082-.335-.334-.745-.722-1.082-1.197-.336-.453-.582-1.32-.644-2.686-.058-1.265-.07-1.646-.07-4.85s.012-3.585.07-4.85c.062-1.366.308-2.233.644-2.686.337-.476.748-.863 1.082-1.197.334-.335.722-.745 1.197-1.082.453-.336 1.32-.582 2.686-.644 1.265-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.375.062-2.346.287-3.182.619-.95.367-1.742.846-2.518 1.621-.776.776-1.254 1.568-1.621 2.518-.332.836-.557 1.807-.619 3.182-.058 1.28-.072 1.689-.072 4.947s.014 3.668.072 4.948c.062 1.375.287 2.346.619 3.182.367.95.846 1.741 1.621 2.518.776.776 1.568 1.254 2.518 1.621.836.332 1.807.557 3.182.619 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.375-.062 2.346-.287 3.182-.619.95-.367 1.741-.846 2.518-1.621.776-.776 1.254-1.568 1.621-2.518.332-.836.557-1.807.619-3.182.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.062-1.375-.287-2.346-.619-3.182-.367-.95-.846-1.742-1.621-2.518-.776-.776-1.568-1.254-2.518-1.621-.836-.332-1.807-.557-3.182-.619-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.44s.645-1.441 1.441-1.441c.796 0 1.441.645 1.441 1.441s-.645 1.44-1.441 1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="md:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  📞 Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-300">📧</span>
                    <a href="mailto:info@icecreamdelight.com" className="text-blue-100 hover:text-yellow-300 transition-colors text-sm">
                      info@icecreamdelight.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-300">📱</span>
                    <a href="tel:+1-800-ICE-CREAM" className="text-blue-100 hover:text-orange-300 transition-colors text-sm">
                      +1-800-ICE-CREAM
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-300">📍</span>
                    <span className="text-blue-100 text-sm">123 Sweet Street, Ice Cream City</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-300 to-blue-300 bg-clip-text text-transparent">
                  🔗 Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="#products" className="block text-blue-100 hover:text-yellow-300 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    → Our Products
                  </a>
                  <a href="#promotions" className="block text-blue-100 hover:text-orange-300 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    → Special Offers
                  </a>
                  <a href="#about" className="block text-blue-100 hover:text-yellow-300 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    → About Us
                  </a>
                  <a href="#contact" className="block text-blue-100 hover:text-orange-300 transition-colors text-sm hover:translate-x-1 transform duration-200">
                    → Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <span className="text-2xl animate-bounce">🍦</span>
                  <span className="text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🍨</span>
                  <span className="text-2xl animate-bounce" style={{animationDelay: '1s'}}>🧁</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Made with ❤️ and lots of ice cream
                </p>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-blue-200 text-sm">
                  &copy; {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">IceCream Delight</span>. All rights reserved.
                </p>
                <p className="text-blue-300 text-xs mt-1">
                  🌟 Spreading sweetness since 1990 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;