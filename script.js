// Dynamic Typing Text Implementation
const typingTextElement = document.getElementById('typing-text');

// Array of roles to cycle through
const roles = [
    "Software Engineer & Innovator",
    "Full-Stack Developer",
    "Backend Architecture Expert",
    "Frontend UI/UX Creator",
    "Mobile App Developer",
    "Java Backend Engineer",
    "Web Application Builder",
    "Software Architect",
    "DevOps & Automation Enthusiast",
    "R&D Engineer",
    "Technology Innovator",
    "Problem Solver",
    "Tech Researcher",
    "AI/ML Enthusiast",
    "Data Science Explorer",
    "Software Researcher",
    "Product Researcher",
    "Technology Explorer",
    "R&D Specialist",
    "Developer & Researcher",
    "Tech Innovator",
    "R&D Software Engineer",
    "Creative Technologist",
    "Software Innovator"
];


let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeText() {
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = deletingSpeed;
    } else {
        // Typing text
        typingTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    // Check if we've finished typing the current role
    if (!isDeleting && currentCharIndex === currentRole.length) {
        // Pause at the end of the role
        typingSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to the next role
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before starting next role
    }

    setTimeout(typeText, typingSpeed);
}

// Start the typing animation after a short delay
setTimeout(typeText, 1000);

///////////////////////////////////////////////////////////////////

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width') + '%';
        bar.style.width = width;
    });
}

// Simple intersection observer for skill bars
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    root: null,
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(skillsSection);

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Three.js 3D Background for Hero Section
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: new THREE.Color(0x00d9ff),
        transparent: true,
        opacity: 0.8
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x = mouseY * 0.5;
        particlesMesh.rotation.y = mouseX * 0.5;

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js when the page loads
window.addEventListener('load', initThreeJS);

// GSAP Animations
gsap.from('.hero-content h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.hero-content p', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.8,
    ease: 'power3.out'
});

gsap.from('.hero-btns', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 1.1,
    ease: 'power3.out'
});

// Scroll animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Floating elements animation
gsap.to('.floating-element', {
    y: 'random(-20, 20)',
    x: 'random(-10, 10)',
    rotation: 'random(-180, 180)',
    duration: 'random(3, 6)',
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.1
});
