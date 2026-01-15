/**
 * Interface defining a group of keywords for a specific role.
 */

/**
 * Dummy data for keywords.
 * Lists high-impact keywords for various roles to help with ATS optimization.
 */
export const keywords = [
    {
        role: 'Full Stack Developer',
        keywords: [
            'React', 'Node.js', 'TypeScript', 'GraphQL', 'REST API', 'Docker', 'AWS', 'CI/CD',
            'Microservices', 'System Design', 'Scalability', 'Agile', 'Git', 'Testing', 'Redux'
        ]
    },
    {
        role: 'MERN Stack Developer',
        keywords: [
            'MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Mongoose', 'RESTful APIs',
            'JWT', 'Authentication', 'Socket.io', 'Tailwind CSS', 'Vite', 'Git', 'Heroku'
        ]
    },
    {
        role: 'Frontend Developer',
        keywords: [
            'React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design',
            'Web Performance', 'Accessibility', 'Figma', 'State Management', 'Next.js', 'Tailwind CSS'
        ]
    },
    {
        role: 'Backend Developer',
        keywords: [
            'Node.js', 'Python', 'Java', 'Go', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'Redis',
            'API Design', 'Authentication', 'Security', 'Docker', 'Kubernetes', 'Cloud Computing'
        ]
    },
    {
        role: 'AI/ML Engineer',
        keywords: [
            'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'Neural Networks',
            'NLP', 'Computer Vision', 'Data Preprocessing', 'Model Deployment', 'MLOps', 'Pandas'
        ]
    },
    {
        role: 'Data Scientist',
        keywords: [
            'Python', 'R', 'SQL', 'Machine Learning', 'Statistical Analysis', 'Data Visualization',
            'Tableau', 'Power BI', 'Big Data', 'Spark', 'Hadoop', 'A/B Testing', 'Predictive Modeling'
        ]
    },
    {
        role: 'DevOps Engineer',
        keywords: [
            'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Terraform',
            'Ansible', 'Linux', 'Bash Scripting', 'Monitoring', 'Prometheus', 'Grafana', 'Security'
        ]
    },
    {
        role: 'Product Manager',
        keywords: [
            'Product Strategy', 'Roadmap', 'Agile', 'Scrum', 'User Research', 'Data Analysis',
            'Stakeholder Management', 'Jira', 'A/B Testing', 'Go-to-Market', 'KPIs', 'UX Design'
        ]
    },
    {
        role: 'Data Analyst',
        keywords: [
            'SQL', 'Excel', 'Tableau', 'Power BI', 'Python', 'R', 'Data Cleaning', 'Data Visualization',
            'Reporting', 'Statistical Analysis', 'Business Intelligence', 'Dashboards'
        ]
    }
];

/**
 * Helper function to get recommended keywords for a role.
 * 
 * @param role - The user's role.
 * @returns An array of keyword strings.
 */
export const getRecommendedKeywords = (role) => {
    if (!role) return [];

    const normalizedRole = role.toLowerCase().trim().replace('fullstack', 'full stack');

    // Strategy 1: Direct match (or partial match of role name)
    let match = keywords.find(group => {
        const groupRole = group.role.toLowerCase();
        return groupRole === normalizedRole ||
            groupRole.includes(normalizedRole) ||
            normalizedRole.includes(groupRole);
    });

    if (match) return match.keywords;

    // Strategy 2: Keyword based matching (if "Junior MERN Developer" doesn't match "MERN Stack Developer" strictly via includes depending on direction)
    // We check if any of our known role keys are present in the user's role string
    const roleKeys = {
        'mern': 'MERN Stack Developer',
        'full stack': 'Full Stack Developer',
        'frontend': 'Frontend Developer',
        'backend': 'Backend Developer',
        'ai': 'AI/ML Engineer',
        'ml': 'AI/ML Engineer',
        'data scientist': 'Data Scientist',
        'data analyst': 'Data Analyst',
        'devops': 'DevOps Engineer',
        'product': 'Product Manager'
    };

    for (const [key, targetRole] of Object.entries(roleKeys)) {
        if (normalizedRole.includes(key)) {
            match = keywords.find(k => k.role === targetRole);
            if (match) return match.keywords;
        }
    }

    // Default fallback: If it contains "developer" or "engineer", give generic dev keywords? 
    // Or just return Full Stack as a safe catch-all if we really want to show something.
    // For now, return empty if no match found.
    return [];
};
