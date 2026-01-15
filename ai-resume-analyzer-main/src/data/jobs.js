/**
 * Interface defining the structure of a Job object.
 * Used for type safety throughout the application.
 */
/**
 * Interface defining the structure of a Job object.
 * Used for type safety throughout the application.
 */

/**
 * Dummy data for jobs.
 * This array contains a diverse list of jobs for various roles like Full Stack, Frontend, Backend, etc.
 * In a real application, this data would likely come from a database or an external API.
 */
export const jobs = [
  // MERN Stack Developer (2)
  {
    id: 'mern-1',
    title: 'MERN Stack Developer',
    company: 'FullScale Io',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    postedAt: '1 day ago',
  },
  {
    id: 'mern-2',
    title: 'Junior MERN Developer',
    company: 'StartUp Fast',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '$10k - $20k',
    postedAt: '3 days ago',
  },

  // Full Stack Developer (2)
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupHub',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    postedAt: '1 day ago',
  },
  {
    id: '19',
    title: 'Lead Full Stack Developer',
    company: 'InnovateX',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$160k - $200k',
    postedAt: '2 days ago',
  },
  {
    id: '20',
    title: 'Junior Full Stack Dev',
    company: 'WebStart',
    location: 'Remote',
    type: 'Full-time',
    salary: '$70k - $90k',
    postedAt: '4 days ago',
  },
  {
    id: '21',
    title: 'Full Stack JavaScript Engineer',
    company: 'CodeCrafters',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90 - $120 / hr',
    postedAt: '1 week ago',
  },

  // Frontend Developer (2)
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
    postedAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Senior Frontend Engineer',
    company: 'WebFlow Systems',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130k - $160k',
    postedAt: '3 days ago',
  },

  // Backend Developer (2)
  {
    id: '5',
    title: 'Backend Engineer',
    company: 'DataSystems Inc.',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $160k',
    postedAt: '3 days ago',
  },
  {
    id: '6',
    title: 'Senior Backend Developer',
    company: 'CloudScale',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140k - $170k',
    postedAt: '5 days ago',
  },

  // AI/ML Developer (2)
  {
    id: '7',
    title: 'AI/ML Engineer',
    company: 'FutureTech AI',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$160k - $200k',
    postedAt: '2 days ago',
  },
  {
    id: '8',
    title: 'Machine Learning Developer',
    company: 'Cognitive Systems',
    location: 'Remote',
    type: 'Contract',
    salary: '$80 - $120 / hr',
    postedAt: '1 week ago',
  },

  // Data Scientist (2)
  {
    id: '9',
    title: 'Lead Data Scientist',
    company: 'BigData Corp',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$150k - $190k',
    postedAt: '4 days ago',
  },
  {
    id: '10',
    title: 'Junior Data Scientist',
    company: 'Analytics Pro',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$90k - $110k',
    postedAt: '6 days ago',
  },

  // Analyst (2)
  {
    id: '11',
    title: 'Business Analyst',
    company: 'FinTech Global',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$85k - $115k',
    postedAt: '1 week ago',
  },
  {
    id: '12',
    title: 'System Analyst',
    company: 'Enterprise Solutions',
    location: 'Dallas, TX',
    type: 'Full-time',
    salary: '$80k - $100k',
    postedAt: '3 days ago',
  },

  // Data Analyst (2)
  {
    id: '13',
    title: 'Senior Data Analyst',
    company: 'MarketInsights',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $130k',
    postedAt: '2 days ago',
  },
  {
    id: '14',
    title: 'Product Data Analyst',
    company: 'Consumer Goods Co.',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$90k - $120k',
    postedAt: '5 days ago',
  },

  // Others to keep list diverse
  {
    id: '15',
    title: 'DevOps Engineer',
    company: 'CloudNet',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$120k - $160k',
    postedAt: '2 weeks ago',
  },
  {
    id: '16',
    title: 'Product Manager',
    company: 'InnovateX',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $150k',
    postedAt: '5 days ago',
  },
  {
    id: '17',
    title: 'Senior DevOps Engineer',
    company: 'ScaleUp Systems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150k - $190k',
    postedAt: '3 days ago',
  },
  {
    id: '18',
    title: 'Technical Product Manager',
    company: 'Sa',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $170k',
    postedAt: '1 week ago',
  },
];

/**
 * Helper function to filter jobs based on the user's role.
 * 
 * @param role - The role identified from the user's resume (e.g., "Full Stack Developer").
 * @returns An array of Job objects that match the given role.
 */
export const getRecommendedJobs = (role) => {
  if (!role) return [];

  // Normalize role for case-insensitivity, trim whitespace, and handle variations
  // We specifically handle 'fullstack' vs 'full stack' to ensure consistent matching.
  const normalizedRole = role.toLowerCase().trim().replace('fullstack', 'full stack');

  return jobs.filter(job => {
    const normalizedTitle = job.title.toLowerCase().replace('fullstack', 'full stack');

    // Check for inclusion (case-insensitive due to toLowerCase above)
    // Matches if the role is part of the job title OR if the job title is part of the role.
    return normalizedTitle.includes(normalizedRole) ||
      normalizedRole.includes(normalizedTitle);
  });
};
