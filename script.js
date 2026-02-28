// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple intersection observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add initial styles and observe rate cards
document.addEventListener('DOMContentLoaded', () => {
    const rateCards = document.querySelectorAll('.rate-card');

    rateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;

        observer.observe(card);
    });

    // Directions button
    const directionsBtn = document.getElementById('btn-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', () => {
            window.open('https://www.google.com/maps/search/?api=1&query=16.845944,74.592361', '_blank');
        });
    }

    // Save button
    const saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
        const isSaved = localStorage.getItem('asifFruitSaved') === 'true';
        const icon = saveBtn.querySelector('i');
        const textSpan = saveBtn.querySelector('span');

        if (isSaved) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            textSpan.innerText = 'Saved';
        }

        saveBtn.addEventListener('click', () => {
            const currentlySaved = localStorage.getItem('asifFruitSaved') === 'true';
            if (currentlySaved) {
                localStorage.setItem('asifFruitSaved', 'false');
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                textSpan.innerText = 'Save';
            } else {
                localStorage.setItem('asifFruitSaved', 'true');
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                textSpan.innerText = 'Saved';
            }
        });
    }

    // Nearby button
    const nearbyBtn = document.getElementById('btn-nearby');
    if (nearbyBtn) {
        nearbyBtn.addEventListener('click', () => {
            window.open('https://www.google.com/maps/search/restaurants+near+16.845944,74.592361', '_blank');
        });
    }

    // Contact WhatsApp button
    const whatsappBtn = document.getElementById('btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            window.open('https://wa.me/9109764495050', '_blank');
        });
    }

    // Share button
    const shareBtn = document.getElementById('btn-share');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Asif Fruit Store',
                    text: 'Check out today\'s fresh fruit rates!',
                    url: window.location.href,
                })
                    .catch(console.error);
            } else {
                alert('Share feature is not supported on this browser.');
            }
        });
    }
});
