function alertBtn() {
    alert('Portfólio em construção! Em breve estará disponível.');
}

let clicks = {
    whatsapp: 0,
    instagram: 0,
    portfolio: 0,
    linkedin: 0,
    github: 0
};

function countClick(platform) {
    // Carrega os dados mais recentes do localStorage
    if (typeof(Storage) !== "undefined" && localStorage.getItem('linkClicks')) {
        clicks = JSON.parse(localStorage.getItem('linkClicks'));
    }
    
    // Incrementa o contador
    clicks[platform]++;
    
    // Atualiza o display
    document.getElementById(platform + '-count').textContent = clicks[platform];

    // Salva no localStorage
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('linkClicks', JSON.stringify(clicks));
    }

    // Efeito visual
    const counter = document.getElementById(platform + '-count');
    counter.style.transform = 'scale(1.2)';
    counter.style.background = 'rgba(255, 255, 255, 0.4)';
    
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
        counter.style.background = 'rgba(255, 255, 255, 0.2)';
    }, 200);
}

window.onload = function() {
    // Carrega os contadores salvos
    loadClickCounts();
    
    createParticles();
    initializeEffects();
    loadSavedTheme();
};

function loadClickCounts() {
    if (typeof(Storage) !== "undefined" && localStorage.getItem('linkClicks')) {
        clicks = JSON.parse(localStorage.getItem('linkClicks'));
        
        // Atualiza todos os contadores na tela
        Object.keys(clicks).forEach(key => {
            const element = document.getElementById(key + '-count');
            if (element) {
                element.textContent = clicks[key];
            }
        });
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeToggle.textContent = '🌙';
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('theme', 'dark');
        }
    } else {
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('theme', 'light');
        }
    }
}

function loadSavedTheme() {
    if (typeof(Storage) !== "undefined") {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            themeToggle.textContent = '☀️';
        } else {
            body.classList.remove('light-theme');
            themeToggle.textContent = '🌙';
        }
    }
}

function initializeEffects() {
    const cards = document.querySelectorAll('.link-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
    });

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', parallaxEffect);
    }

    typeWriter();
}

function parallaxEffect(e) {
    const particles = document.querySelectorAll('.particle');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5; 
        const xPos = (x - 0.5) * speed;
        const yPos = (y - 0.5) * speed;
        
        particle.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

function typeWriter() {
    const bioElement = document.querySelector('.bio');
    if (!bioElement) return;
    
    const originalText = bioElement.textContent;
    bioElement.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < originalText.length) {
            bioElement.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

function resetCounters() {
    if (confirm('Tem certeza que deseja resetar todos os contadores?')) {
        clicks = {
            whatsapp: 0,
            instagram: 0,
            portfolio: 0,
            linkedin: 0,
            github: 0
        };
        
        Object.keys(clicks).forEach(key => {
            const element = document.getElementById(key + '-count');
            if (element) {
                element.textContent = '0';
            }
        });
        
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem('linkClicks');
        }
        alert('Contadores resetados!');
    }
}

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.removeEventListener('mousemove', parallaxEffect);
    } else {
        document.addEventListener('mousemove', parallaxEffect);
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here
    });
}

function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: '@nkm_silva_',
            text: 'Confira meu perfil!',
            url: window.location.href
        });
    } else {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copiado para a área de transferência!');
            }).catch(() => {
                alert('Não foi possível copiar o link.');
            });
        }
    }
}