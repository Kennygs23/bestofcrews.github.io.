// Array of funny placeholder thoughts for the Crew Notes
const crewNotes = [
    "Check the level twice. The concrete slab on this venue is totally sloped.",
    "Do NOT touch the miter saw in Bay 2, blade is dull as a butter knife.",
    "Client changed their mind again. Double-check the framing layout before cutting.",
    "Whoever borrowed the 5.0Ah DeWalt battery, bring it back to the main box.",// Array of funny placeholder thoughts for the Crew Notes
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

// Session Check
const currentUser = localStorage.getItem('activeCrewMember');

// Logout function redirects back to our login portal page (index.html)
function logout() {
    localStorage.removeItem('activeCrewMember');
    window.location.href = 'index.html'; // <-- FIXED: Points back to the login gate on index.html
}

// --- SPATIAL CANVAS MODULE GENERATOR ---
function addModule(type) {
    const canvas = document.getElementById('canvas');
    const card = document.createElement('div');
    card.classList.add('canvas-card');
    
    const columnSpan = Math.floor(Math.random() * 2) + 1; 
    const rowSpan = Math.floor(Math.random() * 2) + 1;    
    card.style.gridColumn = `span ${columnSpan}`;
    card.style.gridRow = `span ${rowSpan}`;
    
    let headerText = '';
    let bodyHTML = '';
    
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
    
    card.innerHTML = `
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <span>${headerText}</span>
            <span class="delete-btn" style="cursor: pointer; color: #ff4d4d; font-weight: bold; font-size: 1.1rem;" onclick="this.closest('.canvas-card').remove()">×</span>
        </div>
        <div class="card-body">
            ${bodyHTML}
        </div>
    `;
    
    canvas.appendChild(card);
}

// --- INTERACTIVE BREAKROOM CHAT ---
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatStream = document.getElementById('chatStream');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    const sender = currentUser || "Guest";
    
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('chat-tag');
    tagSpan.textContent = `[${sender}]:`;

    const msgSpan = document.createTextNode(` ${messageText} `);

    const dividerSpan = document.createElement('span');
    dividerSpan.classList.add('divider');
    dividerSpan.textContent = '|';

    chatStream.appendChild(tagSpan);
    chatStream.appendChild(msgSpan);
    chatStream.appendChild(dividerSpan);

    chatInput.value = '';

    const container = chatStream.parentElement;
    container.scrollLeft = container.scrollWidth;
});
// Array of placeholder project logs
const buildLogs = [
    "Structural frame completed. Moving on to skinning and paint.",
    "LED channel routing is finished. Ready for electrical integration.",
    "First-round sanding complete. Coating with satin clear-coat today.",
    "Load-in successful. Ground-anchors set and inspected."
];

// Session Check
const currentUser = localStorage.getItem('activeCrewMember');

// Logout function redirects back to our login page
function logout() {
    localStorage.removeItem('activeCrewMember');
    window.location.href = 'login.html';
}

// --- SPATIAL CANVAS MODULE GENERATOR ---
function addModule(type) {
    const canvas = document.getElementById('canvas');
    const card = document.createElement('div');
    card.classList.add('canvas-card');
    
    const columnSpan = Math.floor(Math.random() * 2) + 1; 
    const rowSpan = Math.floor(Math.random() * 2) + 1;    
    card.style.gridColumn = `span ${columnSpan}`;
    card.style.gridRow = `span ${rowSpan}`;
    
    let headerText = '';
    let bodyHTML = '';
    
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
    
    card.innerHTML = `
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <span>${headerText}</span>
            <span class="delete-btn" style="cursor: pointer; color: #ff4d4d; font-weight: bold; font-size: 1.1rem;" onclick="this.closest('.canvas-card').remove()">×</span>
        </div>
        <div class="card-body">
            ${bodyHTML}
        </div>
    `;
    
    canvas.appendChild(card);
}

// --- INTERACTIVE BREAKROOM CHAT ---
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatStream = document.getElementById('chatStream');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    const sender = currentUser || "Guest";
    
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('chat-tag');
    tagSpan.textContent = `[${sender}]:`;

    const msgSpan = document.createTextNode(` ${messageText} `);

    const dividerSpan = document.createElement('span');
    dividerSpan.classList.add('divider');
    dividerSpan.textContent = '|';

    chatStream.appendChild(tagSpan);
    chatStream.appendChild(msgSpan);
    chatStream.appendChild(dividerSpan);

    chatInput.value = '';

    const container = chatStream.parentElement;
    container.scrollLeft = container.scrollWidth;
});
