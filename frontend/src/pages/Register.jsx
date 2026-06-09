import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, ArrowRight, Globe } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to change routes programmatically

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on new attempts

    try {
      const response = await axios.post(
        'https://dailynews-ai-platform.onrender.com/api/auth/register',
        formData
      );

      // Save JWT token string safely inside the client browser storage
      response.data.token;
      localStorage.setItem('token', response.data.token);

      // Redirect home instantly
      // To this:
      navigate('/');
    } catch (err) {
      // Capture error messages coming back directly from backend routes
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md"><Globe className="w-6 h-6" /></div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">DailyNews <span className="text-indigo-600 font-extrabold">AI</span></span>
        </div>
        <h2 className="text-center text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Sign in</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-100 rounded-2xl sm:px-10">

          {/* Display alert banners if errors happen */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-4 w-4 text-slate-400" /></div>
                <input type="text" name="username" required value={formData.username} onChange={handleChange} className="block w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-slate-400" /></div>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-slate-400" /></div>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="block w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-indigo-100 hover:shadow-none">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;