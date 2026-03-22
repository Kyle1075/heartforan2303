const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

yesBtn.addEventListener('click', () => {
    // Navigate to heart animation page
    window.location.href = 'heart.html';
});

noBtn.addEventListener('mouseover', () => {
    // Random position
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// Optional: Also make it evade on click for mobile devices
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Random position
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});
