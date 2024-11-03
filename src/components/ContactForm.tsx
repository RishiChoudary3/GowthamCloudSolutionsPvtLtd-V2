import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const services = [
  'Web Development',
  'Mobile Solutions',
  'Cloud Services',
  'IT Consulting and Support',
  'Software Development',
  'AI Chatbots'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    marketing: false
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        'service_62wq3qn', // Replace with your EmailJS service ID
        'template_5unuurb', // Replace with your EmailJS template ID
        {
          to_email: 'admin@gowthamcloudsolutions.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          marketing: formData.marketing ? 'Yes' : 'No'
        },
        'O3UTEkdxnZazWtF2E' // Replace with your EmailJS public key
      );

      setStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        marketing: false
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service you are looking for</label>
        <select
          id="service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a service</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="marketing"
          name="marketing"
          checked={formData.marketing}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
          I agree to receive marketing communications
        </label>
      </div>

      {status.message && (
        <div className={`p-4 rounded-md ${
          status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold
          ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'} transition`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}