import React from 'react';
import JobCard from '../components/JobCard';
import {
  Globe,
  MonitorSmartphone,
  Server,
  Users,
  Cpu,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const jobListings = [
  {
    title: 'Senior Salesforce Administrator',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '5+ years',
    description: [
      'Configure and maintain Salesforce org',
      'Implement security and sharing rules',
      'Create and maintain workflows, process builders, and flows',
      'Provide user training and support',
      'Manage data quality and integrity',
    ],
    requirements: [
      'Salesforce Administrator Certification',
      '5+ years of Salesforce administration experience',
      'Experience with Sales Cloud and Service Cloud',
      'Strong understanding of Salesforce security model',
      'Excellent problem-solving skills',
    ],
  },
  {
    title: 'Salesforce Developer',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '3-5 years',
    description: [
      'Develop custom solutions using Apex and Lightning Web Components',
      'Create and maintain integrations',
      'Debug and optimize existing implementations',
      'Write test classes and maintain code coverage',
      'Collaborate with administrators and business analysts',
    ],
    requirements: [
      'Salesforce Platform Developer I/II Certification',
      'Strong experience with Apex, SOQL, and Lightning Web Components',
      'Knowledge of REST/SOAP APIs',
      'Experience with version control systems',
      'Good understanding of Salesforce best practices',
    ],
  },
  {
    title: 'Junior Salesforce Administrator',
    location: 'Remote',
    type: 'Full-time',
    experience: '0-2 years',
    description: [
      'Assist in day-to-day Salesforce administration',
      'Help with user management and support',
      'Create and maintain reports and dashboards',
      'Support data maintenance activities',
      'Document processes and procedures',
    ],
    requirements: [
      'Salesforce Administrator Certification (or in progress)',
      'Basic understanding of Salesforce platform',
      'Strong analytical and problem-solving skills',
      'Excellent communication skills',
      'Willingness to learn and grow',
    ],
  },
];

export default function Jobs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            Gowtham Cloud Solutions Pvt Ltd
          </span>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-200 transition">
              Home
            </a>
            <a href="/#services" className="hover:text-blue-200 transition">
              Services
            </a>
            <a href="/#about" className="hover:text-blue-200 transition">
              About
            </a>
            <a href="/jobs" className="hover:text-blue-200 transition">
              Jobs
            </a>
            <a href="/#contact" className="hover:text-blue-200 transition">
              Contact
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
          <p className="text-xl">
            Join our team and build amazing solutions with us
          </p>
        </div>
      </header>

      {/* Job Listings */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {jobListings.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}
