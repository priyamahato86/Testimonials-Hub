
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    if (messageTextarea && charCount) {
        function updateCharCount() {
            const count = messageTextarea.value.length;
            charCount.textContent = count;

            // Change color based on character count
            if (count > 900) {
                charCount.classList.add('text-red-500');
                charCount.classList.remove('text-yellow-500', 'text-gray-500');
            } else if (count > 800) {
                charCount.classList.add('text-yellow-500');
                charCount.classList.remove('text-red-500', 'text-gray-500');
            } else {
                charCount.classList.add('text-gray-500');
                charCount.classList.remove('text-red-500', 'text-yellow-500');
            }
        }

        messageTextarea.addEventListener('input', updateCharCount);
        updateCharCount(); 
    }

    // Star rating interaction
    const ratingInputs = document.querySelectorAll('.rating-input');
    const ratingStars = document.querySelectorAll('.rating-star');

    if (ratingInputs.length && ratingStars.length) {
        // Handle change events on hidden radio inputs
        ratingInputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                updateStarDisplay(index + 1);
            });
        });

        // Highlight on hover and click on stars
        ratingStars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                highlightStars(index + 1);
            });
            star.addEventListener('click', () => {
                ratingInputs[index].checked = true;
                updateStarDisplay(index + 1);
            });
        });

        // Reset or reapply rating when leaving the star container
        const ratingContainer = document.querySelector('.flex.items-center');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                const checkedInput = document.querySelector('.rating-input:checked');
                if (checkedInput) {
                    updateStarDisplay(parseInt(checkedInput.value, 10));
                } else {
                    resetStars();
                }
            });
        }

        const preChecked = document.querySelector('.rating-input:checked');
        if (preChecked) {
            updateStarDisplay(parseInt(preChecked.value, 10));
        }
    }

    function highlightStars(rating) {
        ratingStars.forEach((star, idx) => {
            if (idx < rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-yellow-400');
            } else {
                star.classList.remove('text-yellow-400');
                star.classList.add('text-gray-300');
            }
        });
    }

    function updateStarDisplay(rating) {
        highlightStars(rating);
    }

    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        });
    }

    
    const testimonialForm = document.querySelector('form[action="/submit"]');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function() {
            const submitButton = testimonialForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<div class="loading mr-2"></div>Submitting...';
            }
        });
    }

   
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

   
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

 
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

