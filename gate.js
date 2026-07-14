// --- CREW GATE AUTHENTICATION SYSTEM ---
let isRegisterMode = false;

// DOM Elements
const portalForm = document.getElementById('portalForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const toggleModeLink = document.getElementById('toggleMode');
const toggleStatusLabel = document.getElementById('toggleStatusLabel');
const portalFeedback = document.getElementById('portalFeedback');
const headerTitle = document.querySelector('.portal-header h2');

// Security Check: If already logged in, skip the gate and go directly to the canvas!
if (localStorage.getItem('activeCrewMember')) {
    window.location.href = 'login.html'; // <-- Points to your canvas page
}

// Named function to handle switching modes (No arguments.callee needed!)
function handleToggle(e) {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    
    // Clear any previous feedback messages
    portalFeedback.textContent = ''; 
    portalFeedback.className = 'feedback-msg';

    if (isRegisterMode) {
        headerTitle.textContent = '🚧 REGISTER NEW CREW';
        submitBtn.textContent = 'CREATE ACCOUNT';
        toggleStatusLabel.textContent = 'Already in the crew?';
        toggleModeLink.textContent = 'Sign In';
    } else {
        headerTitle.textContent = '⚠️ CREW ACCESS REQUIRED';
        submitBtn.textContent = 'AUTHENTICATE';
        toggleStatusLabel.textContent = 'New to the crew?';
        toggleModeLink.textContent = 'Create an Account';
    }
}

// Bind toggle action
toggleModeLink.addEventListener('click', handleToggle);

// Form Submission (Login/Register)
portalForm.addEventListener('submit', (e) => {
    e.preventDefault(); // <-- Stops the browser from refreshing!
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) return;

    // Fetch existing database from LocalStorage
    const crewDB = JSON.parse(localStorage.getItem('crewDatabase')) || {};

    if (isRegisterMode) {
        // Registration Logic
        if (crewDB[username.toLowerCase()]) {
            showFeedback("Crew Handle already taken!", "error");
        } else {
            // Save new user to LocalStorage database
            crewDB[username.toLowerCase()] = { username: username, password: password };
            localStorage.setItem('crewDatabase', JSON.stringify(crewDB));
            showFeedback("Registration successful! Authenticating...", "success");
            
            setTimeout(() => {
                loginUser(username);
            }, 1000);
        }
    } else {
        // Login Logic
        const account = crewDB[username.toLowerCase()];
        if (account && account.password === password) {
            showFeedback("Access Granted. Loading workspace...", "success");
            setTimeout(() => {
                loginUser(account.username);
            }, 1000);
        } else {
            showFeedback("Access Denied. Check handle or passcode.", "error");
        }
    }
});

function loginUser(username) {
    localStorage.setItem('activeCrewMember', username);
    window.location.href = 'login.html'; // <-- Redirects to your canvas page!
}

function showFeedback(message, type) {
    portalFeedback.textContent = message;
    portalFeedback.className = `feedback-msg ${type}`;
}
