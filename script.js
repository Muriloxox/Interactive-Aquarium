const pixelArt = document.getElementById('pixel-art');

let jellyX = window.innerWidth / 2;
let jellyY = window.innerHeight / 2;
let mouseX = null;
let mouseY = null;
let isMouseMoving = false;
let time = 0;
let randomAngle = Math.random() * 2 * Math.PI;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => (isMouseMoving = false), 1000);
});

let inactivityTimer = setTimeout(() => (isMouseMoving = false), 1000);

function animate() {
    let dx = 0;
    let dy = 0;

    if (isMouseMoving && mouseX !== null && mouseY !== null) {
        dx = mouseX - jellyX;
        dy = mouseY - jellyY;

        jellyX += dx * 0.05;
        jellyY += dy * 0.05;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        pixelArt.style.transform = `translate(${jellyX}px, ${jellyY}px) rotate(${angle + 90}deg)`;
    } else {
        const speed = 1.5;
        dx = Math.cos(randomAngle) * speed;
        dy = Math.sin(randomAngle) * speed;

        jellyX += dx;
        jellyY += dy;

        if (jellyX <= 0 || jellyX >= window.innerWidth - 100 || jellyY <= 0 || jellyY >= window.innerHeight - 100) {
            randomAngle = Math.random() * 2 * Math.PI;
        }

        jellyX = Math.max(0, Math.min(window.innerWidth - 100, jellyX));
        jellyY = Math.max(0, Math.min(window.innerHeight - 100, jellyY));

        const angle = randomAngle * (180 / Math.PI);
        pixelArt.style.transform = `translate(${jellyX}px, ${jellyY}px) rotate(${angle + 90}deg)`;
    }

    time += 0.01;

    requestAnimationFrame(animate);
}

animate();

const newSize = 150;
pixelArt.style.width = `${newSize}px`;
pixelArt.style.height = `${newSize}px`;

//parte das bolhas fodas

const bubbleContainer = document.createElement('div');
bubbleContainer.style.position = 'absolute';
bubbleContainer.style.top = '0';
bubbleContainer.style.left = '0';
bubbleContainer.style.width = '100%';
bubbleContainer.style.height = '100%';
bubbleContainer.style.pointerEvents = 'none';
document.body.appendChild(bubbleContainer);

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble'); 
    
    const size = Math.random() * 20 + 10; 
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    const xPosition = Math.random() * window.innerWidth;
    bubble.style.left = `${xPosition}px`;

    bubbleContainer.appendChild(bubble);

    const duration = Math.random() * 5 + 3;
    bubble.style.animation = `bubble-rise ${duration}s linear forwards`;

    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

setInterval(createBubble, 300);
