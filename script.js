// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Stagger animation for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .timeline-item, .skill-category, .cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .tech-badge, .skill-tag').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Typing effect enhancement
const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
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

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.hero-subtitle');
const originalText = subtitle.textContent;
let charIndex = 0;

function typeEffect() {
    if (charIndex < originalText.length) {
        subtitle.textContent = originalText.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 100);
    }
}

// Uncomment the line below to enable typing effect
// setTimeout(() => { subtitle.textContent = ''; typeEffect(); }, 500);

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Validation functions
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        return 'Name should only contain letters';
    }
    return '';
}

function validateEmail(email) {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateSubject(subject) {
    const trimmed = subject.trim();
    if (trimmed.length < 3) {
        return 'Subject must be at least 3 characters long';
    }
    return '';
}

function validateMessage(message) {
    const trimmed = message.trim();
    if (trimmed.length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Show error
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorElement.textContent = message;
}

// Show success
function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation on blur
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameInput, error);
    } else {
        showSuccess(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, error);
    } else {
        showSuccess(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    const error = validateSubject(subjectInput.value);
    if (error) {
        showError(subjectInput, error);
    } else {
        showSuccess(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        showError(messageInput, error);
    } else {
        showSuccess(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const subjectError = validateSubject(subjectInput.value);
    const messageError = validateMessage(messageInput.value);
    
    // Show errors if any
    if (nameError) showError(nameInput, nameError);
    else showSuccess(nameInput);
    
    if (emailError) showError(emailInput, emailError);
    else showSuccess(emailInput);
    
    if (subjectError) showError(subjectInput, subjectError);
    else showSuccess(subjectInput);
    
    if (messageError) showError(messageInput, messageError);
    else showSuccess(messageInput);
    
    // If any errors, don't submit
    if (nameError || emailError || subjectError || messageError) {
        formStatus.textContent = 'Please fix the errors above before submitting.';
        formStatus.className = 'form-status error';
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    
    try {
        // Submit form data to Vercel API
        const response = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
            
            // Clear validation states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        formStatus.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
        formStatus.className = 'form-status error';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
    }
});
