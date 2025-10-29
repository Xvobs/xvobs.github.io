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
async function loadProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  try {
    const response = await fetch('assets/data/projects.json');
    const projects = await response.json();

    if (projects.length === 0) {
      projectsGrid.innerHTML = '<div class="col-span-full text-gray-400">No projects yet.</div>';
      return;
    }

    projectsGrid.innerHTML = projects.map(project => `
      <div class="bg-white border rounded-lg p-5 hover:shadow-md transition">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-lg">${escapeHtml(project.title)}</h3>
          ${project.featured ? '<span class="text-xs bg-primary text-white px-2 py-1 rounded">Featured</span>' : ''}
        </div>
        <p class="text-gray-600 text-sm mb-4">${escapeHtml(project.description)}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tags.map(tag => `<span class="text-xs px-2 py-1 bg-gray-100 rounded">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="flex items-center space-x-3 text-sm">
          ${project.github ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener" class="text-primary hover:underline">GitHub →</a>` : ''}
          ${project.demo ? `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener" class="text-primary hover:underline">Demo →</a>` : ''}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsGrid.innerHTML = '<div class="col-span-full text-gray-400">Failed to load projects.</div>';
  }
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
