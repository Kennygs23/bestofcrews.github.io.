// --- CREW GATE AUTHENTICATION SYSTEM ---
let isRegisterMode = false;

// DOM Elements
const portalForm = document.getElementById('portalForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const toggleModeLink = document.getElementById('toggleMode');
const toggleText = document.getElementById('toggleText');
const portalFeedback = document.getElementById('portalFeedback');
const headerTitle = document.querySelector('.portal-header h2');

// Security Check: If already logged in, skip login page entirely
if (localStorage.getItem('activeCrewMember')) {
    window.location.href = 'index.html';
}

// Toggle between Login and Register Mode
toggleModeLink.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    
    // Clear any previous feedback messages
    portalFeedback.textContent = ''; 
    portalFeedback.className = 'feedback-msg';

    if (isRegisterMode) {
        headerTitle.textContent = '🚧 REGISTER NEW CREW';
        submitBtn.textContent = 'CREATE ACCOUNT';
        toggleText.innerHTML = 'Already in the crew? <a href="#" id="toggleMode">Sign In</a>';
    } else {
        headerTitle.textContent = '⚠️ CREW ACCESS REQUIRED';
        submitBtn.textContent = 'AUTHENTICATE';
        toggleText.innerHTML = 'New to the crew? <a href="#" id="toggleMode">Create an Account</a>';
    }

    // Re-bind click event to the newly rendered anchor link
    document.getElementById('toggleMode').addEventListener('click', arguments.callee);
});

// Form Submission (Login/Register)
portalForm.addEventListener('submit', (e) => {
    e.preventDefault(); // <-- Stops the page from refreshing and erasing text!
    
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
    window.location.href = 'index.html'; // Direct route to the workspace dashboard
}

function showFeedback(message, type) {
    portalFeedback.textContent = message;
    portalFeedback.className = `feedback-msg ${type}`;
}
