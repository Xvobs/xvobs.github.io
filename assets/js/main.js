// Main JavaScript file for portfolio site

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });
  }

  // Load projects data
  loadProjects();
});

// Load and render projects
function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const projects = [
    {
      "title": "PDS-LLM",
      "description": "PDS-LLM is a sophisticated, enterprise-grade knowledge management platform that leverages Large Language Models (LLMs) to enhance information retrieval and decision-making processes within organizations.",
      "tags": ["Python", "React", "Langchain", "Business Development"],
      "demo": "https://pds-llm.dev",
      "featured": true
    },
    {
      "title": "Trip Tonic",
      "description": "Co-Founder. Trip Tonic is your ultimate travel planning companion, designed to make organizing trips with friends and family effortless and enjoyable.",
      "tags": ["OpenAI API", "Browser Extension", "Web Development", "Product Development"],
      "github": "",
      "demo": "https://trip-tonic.com/",
      "featured": false
    },
    {
      "title": "StudyMateAI",
      "description": "Co-Founder of a browser extension that leverages OpenAI language models for comfortable information processing. Includes a landing & product page.",
      "tags": ["OpenAI API", "Browser Extension", "Web Development", "Product Development"],
      "github": "",
      "demo": "https://dfuh18.github.io",
      "featured": false
    },
    {
      "title": "AI Tracking Algorithm",
      "description": "Developed an AI-supported tracking algorithm in Python as part of my Bachelor thesis at Fujitsu Services GmbH.",
      "tags": ["Python", "Artificial Intelligence", "Computer Vision", "Tracking"],
      "github": "",
      "demo": "",
      "featured": false
    },
  ];

  if (projects.length === 0) {
    projectsGrid.innerHTML = '<div class="col-span-full text-gray-400">No projects yet.</div>';
    return;
  }

  projectsGrid.innerHTML = projects.map(project => `
    <div class="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div class="flex items-start justify-between mb-4">
        <h3 class="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">${escapeHtml(project.title)}</h3>
        ${project.featured ? '<span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">Featured</span>' : ''}
      </div>
      <p class="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">${escapeHtml(project.description)}</p>
      
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.tags.map(tag => `<span class="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-md">${escapeHtml(tag)}</span>`).join('')}
      </div>
      
      <div class="flex items-center gap-4 pt-4 border-t border-gray-50 mt-auto">
        ${project.demo && isValidUrl(project.demo) ? `
          <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm font-medium text-white bg-primary hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            <span>View Demo</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>` : ''}
        ${project.github && isValidUrl(project.github) ? `
          <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            <svg class="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
            Code
          </a>` : ''}
      </div>
    </div>
  `).join('');
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to validate URLs
function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    // Only allow http and https protocols
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}
