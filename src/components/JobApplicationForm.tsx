import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

export default function JobApplicationForm({ jobTitle, onClose }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    resume: null as File | null
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const base64Resume = formData.resume ? await convertFileToBase64(formData.resume) : '';
      
      await emailjs.send(
        'service_62wq3qn',
        'template_gtgx6el',
        {
          to_email: 'hr@gowthamcloudsolutions.com',
          job_title: jobTitle,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          resume: base64Resume
        },
        'O3UTEkdxnZazWtF2E'
      );

      setStatus({
        type: 'success',
        message: 'Thank you for your application! We will review it and get back to you soon.'
      });
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Apply for {jobTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

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
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 5 years in web development"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
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
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}