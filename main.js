// Main JavaScript file for Portfolio
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.initializeAnimations();
        this.initializeNavigation();
        this.initializeTypedJS();
        this.initializeContactForm();
        this.loadProjects();
        this.initializeScrollEffects();
    }

    // Initialize AOS animations
    initializeAnimations() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize navigation functionality
    initializeNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Initialize Typed.js for hero subtitle
    initializeTypedJS() {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed(typedElement, {
                strings: [
                    'Web Developer',
                    'Frontend Developer',
                    'Backend Developer',
                    'Full Stack Developer',
                    'UI/UX Designer'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // Initialize contact form
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleContactForm(contactForm);
            });
        }
    }

    // Handle contact form submission
    async handleContactForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                created_at: new Date().toISOString()
            };

            // Validate form data
            if (!this.validateContactForm(data)) {
                throw new Error('Please fill in all fields correctly.');
            }

            // Send to Supabase
            const { data: result, error } = await config.supabase.client
                .from(config.contact.tableName)
                .insert([data]);

            if (error) {
                throw new Error(error.message);
            }

            // Show success message
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();

        } catch (error) {
            console.error('Contact form error:', error);
            this.showMessage(error.message || 'Something went wrong. Please try again.', 'error');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Validate contact form data
    validateContactForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.trim().length < 2) {
            return false;
        }
        
        if (!data.email || !emailRegex.test(data.email)) {
            return false;
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            return false;
        }
        
        return true;
    }

    // Show success/error messages
    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert before the form
        const contactForm = document.getElementById('contact-form');
        contactForm.parentNode.insertBefore(messageDiv, contactForm);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Load projects from Supabase
    async loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        try {
            // For demo purposes, we'll use static data
            // In production, you would fetch from Supabase
            const projects = this.getDemoProjects();
            this.renderProjects(projects);

            // Uncomment the following code when you have Supabase set up
            /*
            const { data: projects, error } = await config.supabase.client
                .from(config.projects.tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            this.renderProjects(projects);
            */

        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback to demo projects
            const projects = this.getDemoProjects();
            this.renderProjects(projects);
        }
    }

    // Get demo projects data
    getDemoProjects() {
        return [
            {
                id: 1,
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.',
                technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            },
            {
                id: 2,
                title: 'Task Management App',
                description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
                technologies: ['Vue.js', 'Supabase', 'Tailwind CSS'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            },
            {
                id: 3,
                title: 'Weather Dashboard',
                description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and interactive maps using weather APIs.',
                technologies: ['JavaScript', 'Chart.js', 'OpenWeather API'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            },
            {
                id: 4,
                title: 'Portfolio Website',
                description: 'A modern, responsive portfolio website built with vanilla JavaScript, featuring smooth animations and contact form integration.',
                technologies: ['JavaScript', 'CSS3', 'Supabase', 'Vercel'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            },
            {
                id: 5,
                title: 'Blog Platform',
                description: 'A content management system for blogs with markdown support, user authentication, and SEO optimization.',
                technologies: ['Next.js', 'MongoDB', 'Markdown'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            },
            {
                id: 6,
                title: 'Social Media Dashboard',
                description: 'A comprehensive dashboard for managing multiple social media accounts with analytics and scheduling features.',
                technologies: ['React', 'Firebase', 'Chart.js'],
                image_url: null,
                live_url: '#',
                github_url: '#'
            }
        ];
    }

    // Render projects in the grid
    renderProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-aos="fade-up">
                <div class="project-image">
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.live_url}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.github_url}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Code
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initialize scroll effects
    initializeScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add active class to nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style); 