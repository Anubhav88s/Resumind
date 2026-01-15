/**
 * Interface representing a project recommendation.
 */

/**
 * Dummy data for project recommendations.
 */
export const projects = [
    {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce application with user authentication, product catalog, and payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        difficulty: 'Advanced',
    },
    {
        id: '2',
        title: 'Task Management App',
        description: 'A productivity tool to organize tasks with drag-and-drop functionality.',
        technologies: ['React', 'Redux', 'Firebase'],
        difficulty: 'Intermediate',
    },
    {
        id: '3',
        title: 'Social Media Dashboard',
        description: 'A dashboard to view and manage social media posts across different platforms.',
        technologies: ['Vue.js', 'Firebase', 'Chart.js'],
        difficulty: 'Intermediate',
    },

    // Frontend Projects
    {
        id: '4',
        title: 'Weather Dashboard',
        description: 'A responsive weather app that fetches data from a public API and displays forecasts.',
        technologies: ['React', 'OpenWeatherMap API', 'CSS Grid'],
        difficulty: 'Beginner',
    },
    {
        id: '5',
        title: 'Portfolio Website',
        description: 'Design and build a personal portfolio to showcase your skills and projects.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Framer Motion'],
        difficulty: 'Beginner',
    },

    // Backend Projects
    {
        id: '6',
        title: 'RESTful API for Blog',
        description: 'Build a backend API for a blogging platform with authentication and CRUD operations.',
        technologies: ['Express.js', 'MongoDB', 'JWT'],
        difficulty: 'Intermediate',
    },
    {
        id: '7',
        title: 'Real-time Chat Server',
        description: 'Implement a scalable chat server handling multiple rooms and concurrent users.',
        technologies: ['Go', 'WebSocket', 'Redis'],
        difficulty: 'Advanced',
    },

    // AI/ML Projects
    {
        id: '8',
        title: 'Image Classification Model',
        description: 'Train a CNN model to classify images from the CIFAR-10 dataset.',
        technologies: ['Python', 'TensorFlow', 'Keras'],
        difficulty: 'Intermediate',
    },
    {
        id: '9',
        title: 'Sentiment Analysis Tool',
        description: 'Analyze customer reviews to determine positive or negative sentiment.',
        technologies: ['Python', 'NLTK', 'Scikit - learn'],
        difficulty: 'Beginner',
    },

    // Data Science Projects
    {
        id: '10',
        title: 'House Price Prediction',
        description: 'Predict housing prices based on various features using regression techniques.',
        technologies: ['Python', 'Pandas', 'XGBoost'],
        difficulty: 'Intermediate',
    },
    {
        id: '11',
        title: 'Customer Churn Analysis',
        description: 'Analyze customer data to identify factors contributing to churn.',
        technologies: ['R', 'Tableau', 'SQL'],
        difficulty: 'Advanced',
    },

    // DevOps Projects
    {
        id: '12',
        title: 'CI/CD Pipeline',
        description: 'Set up a complete CI/CD pipeline for a web application using GitHub Actions.',
        technologies: ['GitHub Actions', 'Docker', 'AWS'],
        difficulty: 'Intermediate',
    },
    {
        id: '13',
        title: 'Kubernetes Cluster Setup',
        description: 'Deploy a microservices application on a Kubernetes cluster.',
        technologies: ['Kubernetes', 'Helm', 'Terraform'],
        difficulty: 'Advanced',
    },

    // Product Manager Projects
    {
        id: '14',
        title: 'Product Roadmap Case Study',
        description: 'Create a detailed product roadmap for a hypothetical feature launch.',
        technologies: ['Jira', 'Figma', 'Notion'],
        difficulty: 'Intermediate',
    },

    // MERN Projects
    {
        id: 'mern-1',
        title: 'MERN Social Network',
        description: 'A social networking site with posts, likes, comments, and real-time notifications.',
        technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
        difficulty: 'Advanced',
    },
    {
        id: 'mern-2',
        title: 'MERN E-learning Platform',
        description: 'An online learning platform with video courses, quizzes, and progress tracking.',
        technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
        difficulty: 'Advanced',
    },

    {
        id: '15',
        title: 'Market Research Report',
        description: 'Conduct and document market research for a new mobile app idea.',
        technologies: ['Google Analytics', 'SurveyMonkey', 'Excel'],
        difficulty: 'Beginner',
    }
];

/**
 * Helper function to recommend projects based on the user's role.
 * Uses a keyword mapping strategy to find relevant projects even if the role name doesn't exactly match.
 * 
 * @param role - The user's role.
 * @returns An array of Project objects.
 */
export const getRecommendedProjects = (role) => {
    if (!role) return [];

    // Normalize role for case-insensitivity, trim whitespace, and handle variations
    const normalizedRole = role.toLowerCase().trim().replace('fullstack', 'full stack');

    // Define keywords mapping for roles to project technologies or titles
    // This allows for smarter matching (e.g., "Frontend" matches projects with "React" or "CSS")
    const roleKeywords = {
        'full stack': ['react', 'node', 'full stack', 'next.js', 'vue'],
        'mern': ['mern', 'mongo', 'express', 'react', 'node'],
        'frontend': ['react', 'css', 'html', 'frontend', 'ui'],
        'backend': ['api', 'database', 'server', 'backend', 'sql', 'go'],
        'ai': ['python', 'tensorflow', 'model', 'ai', 'machine learning'],
        'ml': ['python', 'tensorflow', 'model', 'ai', 'machine learning'],
        'data scientist': ['python', 'pandas', 'analysis', 'data'],
        'data analyst': ['sql', 'tableau', 'analysis', 'data'],
        'devops': ['docker', 'kubernetes', 'aws', 'ci/cd', 'pipeline'],
        'product manager': ['roadmap', 'market', 'product', 'jira'],
    };

    // Find matching keywords for the role
    let keywords = [];
    for (const [key, values] of Object.entries(roleKeywords)) {
        if (normalizedRole.includes(key)) {
            keywords = [...keywords, ...values];
        }
    }

    // If no specific keywords found, try to match role name directly in project title/desc
    if (keywords.length === 0) {
        keywords = [normalizedRole];
    }

    return projects.filter(project => {
        // Create a searchable string from project details
        const projectText = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
        // Check if any of the keywords are present in the project details
        return keywords.some(keyword => projectText.includes(keyword));
    });
};
