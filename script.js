// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that have the 'arcade-card' class
    const arcadeCards = document.querySelectorAll('.arcade-card');

    arcadeCards.forEach(card => {
        // Event listener for when the mouse enters the card area
        card.addEventListener('mouseenter', () => {
            // Add the 'arcade-glow' class, which triggers the CSS animation
            card.classList.add('arcade-glow');
        });

        // Event listener for when the mouse leaves the card area
        card.addEventListener('mouseleave', () => {
            // Remove the 'arcade-glow' class, stopping the animation
            card.classList.remove('arcade-glow');
        });
    });
});