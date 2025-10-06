// VRT Demo App - JavaScript
console.log('🎨 VRT Demo App loaded successfully!');

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded');
    
    // Add animation to cards on scroll
    const observeElements = () => {
        const elements = document.querySelectorAll('.card, .metric-card, .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease-out';
            observer.observe(el);
        });
    };
    
    observeElements();
});

