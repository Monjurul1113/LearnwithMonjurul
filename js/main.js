// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: '#64ffda'
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 1,
                color: '#64ffda'
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.4,
            width: 1.5
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: ['grab', 'bubble']
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.8
                }
            },
            bubble: {
                distance: 200,
                size: 6,
                duration: 0.3,
                opacity: 1,
                speed: 3
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS
(function() {
    // Replace with your EmailJS public key
    emailjs.init("HBoWgw_nDFUGwl5Yh");
})();

// Email sending function
function sendEmail(e) {
    e.preventDefault();

    // Get the form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const buttonText = document.getElementById('button-text');
    const buttonLoading = document.getElementById('button-loading');
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline-block';

    // Replace with your EmailJS service ID and template ID
    emailjs.send("service_jrxzlxl", "template_5ibt0zf", {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Md Monjurul Ajha", // Your name
        reply_to: email,
    })
    .then(function(response) {
        // Success
        showNotification('Message sent successfully!', 'success');
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        // Error
        showNotification('Failed to send message. Please try again.', 'error');
    })
    .finally(function() {
        // Reset button state
        buttonText.style.display = 'inline-block';
        buttonLoading.style.display = 'none';
    });

    return false;
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form Submission
document.getElementById('contact-form').addEventListener('submit', sendEmail);

// Scroll Animation for Elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', theme);
    
    // Update particles color based on theme
    if (window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS.particles;
        const newColor = theme === 'light' ? '#007acc' : '#64ffda';
        particles.color.value = newColor;
        particles.line_linked.color = newColor;
        particles.shape.stroke.color = newColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
};

// Initialize theme
applyTheme(getCurrentTheme());

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
