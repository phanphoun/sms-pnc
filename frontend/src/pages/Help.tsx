import React from 'react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-down {
          animation: slideDown 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 scroll-smooth">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 animate-slide-down">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300 cursor-pointer">SMS Help Center</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 animate-slide-down" style={{ animationDelay: '0.2s' }}>
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:scale-105 transform">Home</a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:scale-105 transform">About</a>
                <a href="#server" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:scale-105 transform">Server</a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:scale-105 transform">Contact</a>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Welcome to SMS Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
            Your comprehensive guide to the Student Management System. Get help with login issues,
            learn about our features, and connect with support when you need it.
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <a
              href="#about"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1"
            >
              Get Help
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">About Our System</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              The Student Management System (SMS) is a comprehensive platform designed to streamline
              educational administration and enhance the learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 animate-bounce" style={{ animationDelay: '0.8s' }}>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User Management</h3>
              <p className="text-gray-600">
                Efficiently manage students, teachers, and administrators with role-based access control.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 animate-bounce" style={{ animationDelay: '1s' }}>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Management</h3>
              <p className="text-gray-600">
                Organize courses, track enrollments, and manage academic records with ease.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 animate-bounce" style={{ animationDelay: '1.2s' }}>
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Grade Tracking</h3>
              <p className="text-gray-600">
                Record and monitor student performance with comprehensive grading tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Server Section */}
      <section id="server" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">Server & Technical Support</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Information about our backend infrastructure and technical assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">System Requirements</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 animate-slide-right" style={{ animationDelay: '0.4s' }}>
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Modern web browser (Chrome, Firefox, Safari, Edge)
                  </li>
                  <li className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 animate-slide-right" style={{ animationDelay: '0.6s' }}>
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.1s' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Stable internet connection
                  </li>
                  <li className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 animate-slide-right" style={{ animationDelay: '0.8s' }}>
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.2s' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    JavaScript enabled
                  </li>
                </ul>
              </div>

              <div className="hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Troubleshooting</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 animate-fade-in" style={{ animationDelay: '1s' }}>
                    <h4 className="font-medium text-gray-900 mb-2">Login Issues</h4>
                    <p className="text-sm text-gray-600">
                      If you're having trouble logging in, try clearing your browser cache or contact your administrator.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                    <h4 className="font-medium text-gray-900 mb-2">Slow Performance</h4>
                    <p className="text-sm text-gray-600">
                      Check your internet connection and try refreshing the page. If issues persist, contact support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-slide-left" style={{ animationDelay: '0.7s' }}>
                  <span className="text-gray-700">Web Server</span>
                  <span className="flex items-center text-green-600 animate-pulse">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-slide-left" style={{ animationDelay: '0.9s' }}>
                  <span className="text-gray-700">Database</span>
                  <span className="flex items-center text-green-600 animate-pulse" style={{ animationDelay: '0.1s' }}>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-slide-left" style={{ animationDelay: '1.1s' }}>
                  <span className="text-gray-700">API Services</span>
                  <span className="flex items-center text-green-600 animate-pulse" style={{ animationDelay: '0.2s' }}>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Need help? Our support team is here to assist you. Contact us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce hover:animate-pulse transition-all duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <a href="mailto:support@sms.com" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline">
                support@sms.com
              </a>
            </div>

            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
              <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: '0.7s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600 mb-4">When we're available</p>
              <p className="text-gray-700 font-medium">
                Mon - Fri: 9 AM - 5 PM<br />
                Sat - Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 animate-slide-up">
              <h3 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300">Student Management System</h3>
              <p className="text-gray-400 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Empowering education through modern technology and streamlined administration.
              </p>
              <div className="flex space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110 transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">About</a></li>
                <li><a href="#server" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Server Status</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Contact</a></li>
              </ul>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Login</Link></li>
                <li><a href="mailto:support@sms.com" className="text-gray-400 hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Email Support</a></li>
                <li><a href="tel:+15551234567" className="text-gray-400 hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">Phone Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
              © 2024 Student Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Help;
