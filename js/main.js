 // Language Toggle
 let currentLang = 'en';

 function toggleLanguage() {
     currentLang = currentLang === 'en' ? 'es' : 'en';

     // Toggle content sections
     document.querySelectorAll('.lang-content').forEach(content => {
         content.classList.remove('active');
     });
     document.querySelectorAll(`.lang-content.${currentLang}`).forEach(content => {
         content.classList.add('active');
     });

     // Update text elements with data attributes
     document.querySelectorAll('[data-en][data-es]').forEach(element => {
         if (element.tagName === 'INPUT' && element.type === 'submit') {
             element.value = element.getAttribute(`data-${currentLang}`);
         } else {
             element.textContent = element.getAttribute(`data-${currentLang}`);
         }
     });

     // Update document language
     document.documentElement.lang = currentLang;
 }

 // Navbar scroll effect
 window.addEventListener('scroll', () => {
     const navbar = document.getElementById('navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Smooth scrolling for navigation links
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

 // Fade in animation on scroll
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
         }
     });
 }, observerOptions);

 document.querySelectorAll('.fade-in').forEach(el => {
     observer.observe(el);
 });

 // Initialize language detection
 const userLang = navigator.language || navigator.userLanguage;
 if (userLang.startsWith('es')) {
     toggleLanguage();
 }

 // Mobile menu toggle (if needed)
 function toggleMobileMenu() {
     const navLinks = document.querySelector('.nav-links');
     navLinks.classList.toggle('active');
 }

 // Add click event to mobile menu button if it exists
 const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
 if (mobileMenuBtn) {
     mobileMenuBtn.addEventListener('click', toggleMobileMenu);
 }

 // Slideshow functionality
 function initSlideshow() {
     const slideshows = document.querySelectorAll('.slideshow-container');

     slideshows.forEach(slideshow => {
         const slides = slideshow.querySelectorAll('.slideshow-slide');
         const dots = slideshow.querySelectorAll('.slideshow-dot');
         const prevBtn = slideshow.querySelector('.prev');
         const nextBtn = slideshow.querySelector('.next');
         let currentSlide = 0;

         function showSlide(n) {
             slides.forEach(slide => slide.classList.remove('active'));
             dots.forEach(dot => dot.classList.remove('active'));

             currentSlide = (n + slides.length) % slides.length;
             slides[currentSlide].classList.add('active');
             dots[currentSlide].classList.add('active');
         }

         function nextSlide() {
             showSlide(currentSlide + 1);
         }

         function prevSlide() {
             showSlide(currentSlide - 1);
         }

         // Event listeners
         prevBtn.addEventListener('click', prevSlide);
         nextBtn.addEventListener('click', nextSlide);

         dots.forEach((dot, index) => {
             dot.addEventListener('click', () => showSlide(index));
         });

         // Auto advance slides every 5 seconds
         setInterval(nextSlide, 5000);
     });
 }

 // Initialize slideshow after page load
 window.addEventListener('load', initSlideshow);