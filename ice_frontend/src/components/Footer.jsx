import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#60B5FF] via-[#AFDDFF] to-[#FF9149] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white uppercase tracking-wider">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="group p-2 rounded-full bg-white/20 hover:bg-[#FF9149] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.091c0-.895.208-1.409 1.409-1.409h2.591v-4h-3.409c-3.409 0-5.591 2-5.591 5.591v3.909z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                className="group p-2 rounded-full bg-white/20 hover:bg-[#FF9149] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.423.724-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.397 0-.79-.023-1.176-.068 2.187 1.405 4.787 2.224 7.561 2.224 9.054 0 14.003-7.496 14.003-13.986 0-.21 0-.42-.015-.629.962-.695 1.8-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                className="group p-2 rounded-full bg-white/20 hover:bg-[#FF9149] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.233.308 2.686.644.476.337.863.748 1.197 1.082.335.334.745.722 1.082 1.197.336.453.582 1.32.644 2.686.058 1.265.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.062 1.366-.308 2.233-.644 2.686-.337.476-.748.863-1.082 1.197-.334.335-.722.745-1.197 1.082-.453.336-1.32.582-2.686.644-1.265.058-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.366-.062-2.233-.308-2.686-.644-.476-.337-.863-.748-1.197-1.082-.335-.334-.745-.722-1.082-1.197-.336-.453-.582-1.32-.644-2.686-.058-1.265-.07-1.646-.07-4.85s.012-3.585.07-4.85c.062-1.366.308-2.233.644-2.686.337-.476.748-.863 1.082-1.197.334-.335.722-.745 1.197-1.082.453-.336 1.32-.582 2.686-.644 1.265-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.375.062-2.346.287-3.182.619-.95.367-1.742.846-2.518 1.621-.776.776-1.254 1.568-1.621 2.518-.332.836-.557 1.807-.619 3.182-.058 1.28-.072 1.689-.072 4.947s.014 3.668.072 4.948c.062 1.375.287 2.346.619 3.182.367.95.846 1.741 1.621 2.518.776.776 1.568 1.254 2.518 1.621.836.332 1.807.557 3.182.619 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.375-.062 2.346-.287 3.182-.619.95-.367 1.741-.846 2.518-1.621.776-.776 1.254-1.568 1.621-2.518.332-.836.557-1.807.619-3.182.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.062-1.375-.287-2.346-.619-3.182-.367-.95-.846-1.742-1.621-2.518-.776-.776-1.568-1.254-2.518-1.621-.836-.332-1.807-.557-3.182-.619-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.44s.645-1.441 1.441-1.441c.796 0 1.441.645 1.441 1.441s-.645 1.44-1.441 1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white uppercase tracking-wider">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-white/90 hover:text-[#FFECDB] transition-colors cursor-pointer">
                Email: info@icecreamdelight.com
              </p>
              <p className="text-sm text-white/90 hover:text-[#FFECDB] transition-colors cursor-pointer">
                Phone: +1-800-ICE-CREAM
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-base font-semibold text-white uppercase tracking-wider">Company</h3>
            <div className="space-y-2">
              <p className="text-sm text-white/90">
                IceCream Delight
              </p>
              <p className="text-sm text-white/80">
                Crafting sweet moments since 2020
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-white/80">
              © {new Date().getFullYear()} IceCream Delight. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-sm text-white/80 hover:text-[#FFECDB] transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-sm text-white/80 hover:text-[#FFECDB] transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;