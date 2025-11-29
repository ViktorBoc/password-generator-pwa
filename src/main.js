// Character sets
const CHAR_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: '!@#$%^&*()-_=+[]{};:,.?/'
};

// DOM Elements
const lengthSlider = document.getElementById('lengthSlider');
const lengthNumber = document.getElementById('lengthNumber');
const lengthValue = document.getElementById('lengthValue');
const lowercaseCheck = document.getElementById('lowercaseCheck');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const numbersCheck = document.getElementById('numbersCheck');
const specialCheck = document.getElementById('specialCheck');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordOutput = document.getElementById('passwordOutput');
const errorMessage = document.getElementById('errorMessage');
const strengthMeter = document.getElementById('strengthMeter');

let currentPassword = '';

// Initialize
function init() {

    // Sync length controls
    lengthSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        lengthNumber.value = value;
        lengthValue.textContent = value;
    });

    lengthNumber.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 16;
        if (value < 8) value = 8;
        if (value > 30) value = 30;
        e.target.value = value;
        lengthSlider.value = value;
        lengthValue.textContent = value;
    });

    // Generate button
    generateBtn.addEventListener('click', generatePassword);

    // Copy button
    copyBtn.addEventListener('click', copyPassword);

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/public/service-worker.js')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.error('Service Worker registration failed:', err));
    }
}

// Generate secure password
function generatePassword() {
    hideError();

    const length = parseInt(lengthSlider.value);
    const options = {
        lowercase: lowercaseCheck.checked,
        uppercase: uppercaseCheck.checked,
        numbers: numbersCheck.checked,
        special: specialCheck.checked
    };

    // Validation
    if (!options.lowercase && !options.uppercase && !options.numbers && !options.special) {
        showError('Vyber aspoň jednu sadu znakov!');
        return;
    }

    // Build character pool
    let pool = '';
    const requiredChars = [];

    if (options.lowercase) {
        pool += CHAR_SETS.lowercase;
        requiredChars.push(getRandomChar(CHAR_SETS.lowercase));
    }
    if (options.uppercase) {
        pool += CHAR_SETS.uppercase;
        requiredChars.push(getRandomChar(CHAR_SETS.uppercase));
    }
    if (options.numbers) {
        pool += CHAR_SETS.numbers;
        requiredChars.push(getRandomChar(CHAR_SETS.numbers));
    }
    if (options.special) {
        pool += CHAR_SETS.special;
        requiredChars.push(getRandomChar(CHAR_SETS.special));
    }

    // Generate password with guaranteed character types
    const password = generateSecurePassword(pool, length, requiredChars);

    // Display password
    currentPassword = password;
    passwordOutput.textContent = password;
    passwordOutput.classList.add('has-password');
    copyBtn.disabled = false;

    // Update strength meter
    updateStrengthMeter(password, pool.length);
}

// Secure random character selection (rejection sampling)
function getRandomChar(charset) {
    const maxValid = Math.floor(256 / charset.length) * charset.length;
    let randomValue;

    do {
        const randomArray = new Uint8Array(1);
        crypto.getRandomValues(randomArray);
        randomValue = randomArray[0];
    } while (randomValue >= maxValid);

    return charset[randomValue % charset.length];
}

// Generate secure password with Fisher-Yates shuffle
function generateSecurePassword(pool, length, requiredChars) {
    const result = [...requiredChars];

    // Fill remaining length
    for (let i = requiredChars.length; i < length; i++) {
        result.push(getRandomChar(pool));
    }

    // Fisher-Yates shuffle
    for (let i = result.length - 1; i > 0; i--) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const j = array[0] % (i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}

// Update strength meter
function updateStrengthMeter(password, poolSize) {
    const entropy = password.length * Math.log2(poolSize);
    let strength, color, width;

    if (entropy < 50) {
        strength = 'weak';
        color = '#ef4444';
        width = '33%';
    } else if (entropy < 75) {
        strength = 'medium';
        color = '#f59e0b';
        width = '66%';
    } else {
        strength = 'strong';
        color = '#10b981';
        width = '100%';
    }

    strengthMeter.style.setProperty('--strength-color', color);
    strengthMeter.style.setProperty('--strength-width', width);
    strengthMeter.classList.add('visible');
}

// Copy to clipboard
async function copyPassword() {
    if (!currentPassword) return;

    try {
        // Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(currentPassword);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = currentPassword;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    } catch (err) {
        showError('Nepodarilo sa skopírovať heslo');
        console.error('Copy failed:', err);
    }
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

function hideError() {
    errorMessage.classList.add('d-none');
}

// Start the app
init();