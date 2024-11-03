import React, { useState } from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';

interface JobProps {
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string[];
  requirements: string[];
}

export default function JobCard({ title, location, type, experience, description, requirements }: JobProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
        
        <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            {type}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {experience}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Job Description:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setShowApplicationForm(true)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>

      {showApplicationForm && (
        <JobApplicationForm
          jobTitle={title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </>
  );
}