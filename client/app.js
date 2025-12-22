// ============================================
// RAKESH'S PORTFOLIO - app.js (BACKEND ONLY)
// ============================================

const API_BASE_URL = 'https://rakeshgr18.vercel.app';

console.log('🚀 App.js loading...');

// ===== RESUME DOWNLOAD FUNCTION =====
function downloadResume() {
    try {
        const link = document.createElement('a');
        link.href = 'assets/resume/Rakesh_GR_Resume.pdf';
        link.download = 'Rakesh_GR_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('✅ Resume download triggered');
    } catch (error) {
        console.error('❌ Resume error:', error);
        window.open('assets/resume/Rakesh_GR_Resume.pdf', '_blank');
    }
}

// ===== WAIT FOR DOM TO BE READY =====
function initializeApp() {
    try {
        console.log('🔧 Initializing app...');

        // ===== NAVBAR & NAVIGATION =====
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (!navbar || !hamburger || !navMenu) {
            console.warn('⚠️ Navbar elements not found');
            return;
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        console.log('✅ Navigation initialized');
    } catch (error) {
        console.error('❌ Navigation error:', error);
    }

    // ===== SCROLL ANIMATIONS =====
    try {
        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in'
        );
        animatedElements.forEach(el => observer.observe(el));
        console.log('✅ Animations initialized');
    } catch (error) {
        console.error('❌ Animation error:', error);
    }

    // ===== TYPING EFFECT =====
    try {
        const typedText = document.querySelector('.typed-text');
        if (typedText) {
            const text = typedText.textContent;
            typedText.textContent = '';
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typedText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            setTimeout(typeWriter, 500);
        }
    } catch (error) {
        console.error('❌ Typing effect error:', error);
    }

    // ===== CONTACT FORM (BACKEND ONLY) =====
    try {
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        const successMessage = document.getElementById('successMessage');

        if (!contactForm) {
            console.warn('⚠️ Contact form not found');
            return;
        }

        // Character counter
        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                const count = messageInput.value.length;
                charCount.textContent = count;
                if (count > 500) {
                    messageInput.value = messageInput.value.substring(0, 500);
                    charCount.textContent = 500;
                }
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation functions
        function validateName() {
            const formGroup = nameInput.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (nameInput.value.trim() === '') {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Name is required';
                return false;
            } else if (nameInput.value.trim().length < 2) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Name must be at least 2 characters';
                return false;
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
                return true;
            }
        }

        function validateEmail() {
            const formGroup = emailInput.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (emailInput.value.trim() === '') {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Email is required';
                return false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid email address';
                return false;
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
                return true;
            }
        }

        function validateSubject() {
            const formGroup = subjectInput.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (subjectInput.value.trim() === '') {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Subject is required';
                return false;
            } else if (subjectInput.value.trim().length < 3) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Subject must be at least 3 characters';
                return false;
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
                return true;
            }
        }

        function validateMessage() {
            const formGroup = messageInput.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (messageInput.value.trim() === '') {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Message is required';
                return false;
            } else if (messageInput.value.trim().length < 10) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Message must be at least 10 characters';
                return false;
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
                return true;
            }
        }

        if (nameInput) nameInput.addEventListener('blur', validateName);
        if (emailInput) emailInput.addEventListener('blur', validateEmail);
        if (subjectInput) subjectInput.addEventListener('blur', validateSubject);
        if (messageInput) messageInput.addEventListener('blur', validateMessage);

        // Submit -> send to backend
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                alert('Please fix validation errors before submitting.');
                return;
            }

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalHTML = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '⏳ Sending...';
                submitBtn.disabled = true;
            }

            const payload = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            try {
                console.log('🚀 Sending to backend:', `${API_BASE_URL}/api/contact`, payload);

                const res = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                let data = {};
                try {
                    data = await res.json();
                } catch (_) {
                    data = {};
                }

                console.log('✅ Backend response:', res.status, data);

                if (!res.ok || data.success === false) {
                    throw new Error(data.error || 'Failed to send');
                }

                if (successMessage) {
                    successMessage.style.display = 'block';
                    setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
                }

                contactForm.reset();
                if (charCount) charCount.textContent = '0';
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
            } catch (error) {
                console.error('❌ Contact submit error:', error);
                alert('Failed to send. Please try again.');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }
            }
        });

        console.log('✅ Contact form initialized');
    } catch (error) {
        console.error('❌ Contact form error:', error);
    }

    // ===== PARALLAX EFFECTS =====
    try {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const hero = document.querySelector('.hero');
                    if (hero && scrolled < window.innerHeight) {
                        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                    }
                    const floatingCards = document.querySelectorAll('.floating-card');
                    floatingCards.forEach((card, index) => {
                        const speed = 0.2 + (index * 0.1);
                        card.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
        console.log('✅ Parallax initialized');
    } catch (error) {
        console.error('❌ Parallax error:', error);
    }

    // ===== 3D TILT EFFECTS =====
    try {
        const cards = document.querySelectorAll('.project-card, .service-card, .skills-category');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
        console.log('✅ Tilt effects initialized');
    } catch (error) {
        console.error('❌ Tilt error:', error);
    }

    // ===== RESUME BUTTONS =====
    try {
        const navResumeBtn = document.getElementById('navResumeBtn');
        const aboutResumeBtn = document.getElementById('aboutResumeBtn');

        if (navResumeBtn) {
            navResumeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadResume();
            });
        }

        if (aboutResumeBtn) {
            aboutResumeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadResume();
            });
        }

        console.log('✅ Resume buttons initialized');
    } catch (error) {
        console.error('❌ Resume buttons error:', error);
    }

    console.log('✅ ALL FEATURES LOADED SUCCESSFULLY');
}

// ===== START APP WHEN DOM IS READY =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

console.log('✅ App.js fully loaded');

