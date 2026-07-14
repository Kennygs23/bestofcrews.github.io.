// Array of funny placeholder thoughts for the Crew Notes
const crewNotes = [
    "Check the level twice. The concrete slab on this venue is totally sloped.",
    "Do NOT touch the miter saw in Bay 2, blade is dull as a butter knife.",
    "Client changed their mind again. Double-check the framing layout before cutting.",
    "Whoever borrowed the 5.0Ah DeWalt battery, bring it back to the main box.",
    "Lunch run at 12:00. Text Ken your order."
];

// Array of placeholder project logs
const buildLogs = [
    "Structural frame completed. Moving on to skinning and paint.",
    "LED channel routing is finished. Ready for electrical integration.",
    "First-round sanding complete. Coating with satin clear-coat today.",
    "Load-in successful. Ground-anchors set and inspected."
];

// --- CREW GATE AUTHENTICATION SYSTEM ---
let isRegisterMode = false;
let currentUser = null;

// DOM Elements for Auth
const loginPortal = document.getElementById('login-portal');
const appContainer = document.getElementById('app');
const portalForm = document.getElementById('portalForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const toggleModeLink = document.getElementById('toggleMode');
const toggleText = document.getElementById('toggleText');
const portalFeedback = document.getElementById('portalFeedback');

// Check if a user is already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('activeCrewMember');
    if (savedUser) {
        currentUser = savedUser;
        showApp();
    }
});

// Toggle between Login and Register Mode
toggleModeLink.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    portalFeedback.textContent = ''; // Clear errors
    portalFeedback.className = 'feedback-msg';

    if (isRegisterMode) {
        document.querySelector('.portal-header h2').textContent = '🚧 REGISTER NEW CREW';
        submitBtn.textContent = 'CREATE ACCOUNT';
        toggleText.innerHTML = 'Already in the crew? <a href="#" id="toggleMode">Sign In</a>';
    } else {
        document.querySelector('.portal-header h2').textContent = '⚠️ CREW ACCESS REQUIRED';
        submitBtn.textContent = 'AUTHENTICATE';
        toggleText.innerHTML = 'New to the crew? <a href="#" id="toggleMode">Create an Account</a>';
    }

    // Re-bind the event listener to the newly rendered link
    document.getElementById('toggleMode').addEventListener('click', arguments.callee);
});

// Form Submission (Login/Register)
portalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) return;

    // Fetch existing crews database from LocalStorage
    const crewDB = JSON.parse(localStorage.getItem('crewDatabase')) || {};

    if (isRegisterMode) {
        // Registration Logic
        if (crewDB[username.toLowerCase()]) {
            showFeedback("Crew Handle already taken!", "error");
        } else {
            // Save new user
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
    currentUser = username;
    localStorage.setItem('activeCrewMember', username);
    showApp();
}

function showApp() {
    loginPortal.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Welcome message in the console
    console.log(`%c Welcome back, ${currentUser}! Access Authorized. `, 'background: #f39c12; color: #000; font-weight: bold;');
}

function logout() {
    localStorage.removeItem('activeCrewMember');
    currentUser = null;
    
    // Reset forms
    portalForm.reset();
    portalFeedback.textContent = '';
    
    // Hide App & Show Gate
    appContainer.classList.add('hidden');
    loginPortal.classList.remove('hidden');
}

function showFeedback(message, type) {
    portalFeedback.textContent = message;
    portalFeedback.className = `feedback-msg ${type}`;
}


// --- SPATIAL CANVAS MODULE GENERATOR ---

// Function to add a new card/module to the spatial canvas
function addModule(type) {
    const canvas = document.getElementById('canvas');
    
    // Create the card container
    const card = document.createElement('div');
    card.classList.add('canvas-card');
    
    // Generate randomized sizes so the grid looks organic and dynamic
    const columnSpan = Math.floor(Math.random() * 2) + 1; // Spans 1 or 2 columns
    const rowSpan = Math.floor(Math.random() * 2) + 1;    // Spans 1 or 2 rows
    card.style.gridColumn = `span ${columnSpan}`;
    card.style.gridRow = `span ${rowSpan}`;
    
    let headerText = '';
    let bodyHTML = '';
    
    // Determine card content based on type
    if (type === 'photo') {
        headerText = '📸 Crew Photo';
        bodyHTML = `
            <div class="photo-placeholder" style="height: 80%; display: flex; align-items: center; justify-content: center; border: 2px dashed #333; margin: 10px;">
                [ Click to Upload Photo ]
            </div>
        `;
    } else if (type === 'notes') {
        headerText = '📝 Crew Note';
        const randomNote = crewNotes[Math.floor(Math.random() * crewNotes.length)];
        bodyHTML = `<p>${randomNote}</p>`;
    } else if (type === 'build') {
        headerText = '⚙️ Build Log';
        const randomLog = buildLogs[Math.floor(Math.random() * buildLogs.length)];
        bodyHTML = `<p><strong>Status:</strong> ${randomLog}</p>`;
    }
    
    // Set the internal HTML with a delete button
    card.innerHTML = `
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <span>${headerText}</span>
            <span class="delete-btn" style="cursor: pointer; color: #ff4d4d; font-weight: bold; font-size: 1.1rem;" onclick="this.closest('.canvas-card').remove()">×</span>
        </div>
        <div class="card-body">
            ${bodyHTML}
        </div>
    `;
    
    // Append the new card to the spatial canvas
    canvas.appendChild(card);
}

// --- INTERACTIVE BREAKROOM CHAT ---

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatStream = document.getElementById('chatStream');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from reloading on form submit
    
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    // Use logged in user's name, fallback to Guest if null
    const sender = currentUser || "Guest";
    
    // Create new chat elements
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('chat-tag');
    tagSpan.textContent = `[${sender}]:`;

    const msgSpan = document.createTextNode(` ${messageText} `);

    const dividerSpan = document.createElement('span');
    dividerSpan.classList.add('divider');
    dividerSpan.textContent = '|';

    // Append to the stream
    chatStream.appendChild(tagSpan);
    chatStream.appendChild(msgSpan);
    chatStream.appendChild(dividerSpan);

    // Clear input field
    chatInput.value = '';

    // Automatically scroll the stream container to the end to show the newest message
    const container = chatStream.parentElement;
    container.scrollLeft = container.scrollWidth;
});
