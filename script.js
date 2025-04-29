// DOM Elements
const longUrlInput = document.getElementById('longUrl');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');

// Event Listeners
shortenBtn.addEventListener('click', shortenUrl);
copyBtn.addEventListener('click', copyToClipboard);

// Function to validate URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// Function to generate random string for short URL
function generateShortUrl() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
        shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortUrl;
}

// Function to shorten URL
async function shortenUrl() {
    const longUrl = longUrlInput.value.trim();
    
    if (!longUrl) {
        showError('Please enter a URL');
        return;
    }

    if (!isValidUrl(longUrl)) {
        showError('Please enter a valid URL');
        return;
    }

    try {
        // In a real application, you would make an API call to your backend
        // For this demo, we'll simulate the API call with a timeout
        shortenBtn.disabled = true;
        shortenBtn.textContent = 'Shortening...';

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate short URL (in a real app, this would come from the backend)
        const shortUrl = generateShortUrl();
        const baseUrl = window.location.origin;
        const finalShortUrl = `${baseUrl}/${shortUrl}`;

        // Display the result
        shortUrlInput.value = finalShortUrl;
        resultDiv.classList.add('active');
        
        // Reset button
        shortenBtn.disabled = false;
        shortenBtn.textContent = 'Shorten URL';
    } catch (error) {
        showError('An error occurred while shortening the URL');
        shortenBtn.disabled = false;
        shortenBtn.textContent = 'Shorten URL';
    }
}

// Function to copy URL to clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(shortUrlInput.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    } catch (error) {
        showError('Failed to copy URL to clipboard');
    }
}

// Function to show error messages
function showError(message) {
    // Create error element if it doesn't exist
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        longUrlInput.parentNode.insertBefore(errorDiv, longUrlInput.nextSibling);
    }

    // Show error message
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.style.fontSize = '0.9rem';

    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.textContent = '';
    }, 3000);
}

// Add smooth scrolling for navigation links
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

// Add animation on scroll for feature cards
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
}); 