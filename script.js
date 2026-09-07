/* =============================================
   PRELOADER
   ============================================= */
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.classList.add('fade-out');
    }, 800); // Delay 0.8 detik
});

/* =============================================
   THEME TOGGLE (DARK MODE / LIGHT MODE)
   ============================================= */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Cek tema tersimpan di localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

/* =============================================
   HAMBURGER MENU (MOBILE NAVBAR)
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* =============================================
   ACTIVE NAVIGATION ON SCROLL
   ============================================= */
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

/* =============================================
   BACK TO TOP BUTTON
   ============================================= */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =============================================
   TYPING ANIMATION
   ============================================= */
const typingText = document.getElementById('typingText');
// GANTI PROFESI/KEAHLIAN: Ubah daftar di bawah ini
const professions = [
    'Pelajar',
    'Mahasiswa',
    'Desainer Grafis',
    'Content Creator',
    'Web Developer',
    'Freelancer'
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        // Menghapus karakter
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 60;
    } else {
        // Menambah karakter
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typeSpeed = 1500; // Jeda sebelum menghapus
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typeSpeed = 500; // Jeda sebelum mengetik kata baru
    }
    
    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

/* =============================================
   SCROLL ANIMATION (REVEAL)
   ============================================= */
const revealElements = document.querySelectorAll('.section-title, .about-container, .cv-card, .portfolio-grid, .gallery-grid, .social-grid, .contact-container, .testimonial-slider');

// Tambahkan class reveal ke elemen-elemen
revealElements.forEach(function(el) {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(function(el) {
    revealObserver.observe(el);
});

// Animasikan skill bar saat section about terlihat
const skillBars = document.querySelectorAll('.bar-fill');
const aboutSection = document.getElementById('about');

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            skillBars.forEach(function(bar) {
                const width = bar.getAttribute('data-width');
                setTimeout(function() {
                    bar.style.width = width;
                }, 300);
            });
            skillObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

skillObserver.observe(aboutSection);

/* =============================================
   PORTFOLIO FILTER
   ============================================= */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioCards.forEach(function(card) {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'semua' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* =============================================
   PORTFOLIO MODAL
   ============================================= */
const portfolioModal = document.getElementById('portfolioModal');
const portfolioModalClose = document.getElementById('portfolioModalClose');
const portfolioModalImg = document.getElementById('portfolioModalImg');
const portfolioModalTitle = document.getElementById('portfolioModalTitle');
const portfolioModalDesc = document.getElementById('portfolioModalDesc');
const portfolioModalLink = document.getElementById('portfolioModalLink');

function showPortfolioModal(button) {
    const card = button.closest('.portfolio-card');
    const img = card.querySelector('.portfolio-thumb img');
    const title = card.querySelector('.portfolio-info h3');
    const desc = card.querySelector('.portfolio-info p');
    const link = card.querySelector('.portfolio-link');
    
    portfolioModalImg.src = img.src;
    portfolioModalTitle.textContent = title.textContent;
    portfolioModalDesc.textContent = desc.textContent;
    portfolioModalLink.href = link ? link.href : '#';
    
    portfolioModal.classList.add('show');
}

portfolioModalClose.addEventListener('click', function() {
    portfolioModal.classList.remove('show');
});

// Tutup modal saat klik di luar
portfolioModal.addEventListener('click', function(e) {
    if (e.target === portfolioModal) {
        portfolioModal.classList.remove('show');
    }
});

/* =============================================
   LIGHTBOX (GALLERY)
   ============================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img) {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
}

lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('show');
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
    }
});

/* =============================================
   TESTIMONIAL SLIDER
   ============================================= */
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const testimonialDots = document.getElementById('testimonialDots');

let currentSlide = 0;
const totalSlides = testimonialSlides.length;

// Buat dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function() {
        goToSlide(i);
    });
    testimonialDots.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    
    testimonialTrack.style.transform = 'translateX(-' + currentSlide + '00%)';
    
    // Update dots
    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentSlide);
    });
}

prevBtn.addEventListener('click', function() {
    goToSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', function() {
    goToSlide(currentSlide + 1);
});

// Auto slide setiap 5 detik
setInterval(function() {
    goToSlide(currentSlide + 1);
}, 5000);

/* =============================================
   CONTACT FORM - Kirim ke WhatsApp
   ============================================= */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;
    
    // GANTI NOMOR WHATSAPP: Ganti dengan nomor WhatsApp Anda (format: 628xxx)
    const whatsappNumber = '6281234567890';
    
    const whatsappMessage = encodeURIComponent(
        'Halo, saya ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        'Pesan: ' + message
    );
    
    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappMessage;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Tampilkan alert
    alert('Pesan Anda akan dikirim melalui WhatsApp!');
});

/* =============================================
   NAVBAR SHADOW ON SCROLL
   ============================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
