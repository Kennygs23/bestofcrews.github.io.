// --- CREW NOTES ---
const crewNotes = [
    "Check the level twice. The concrete slab on this venue is totally sloped.",
    "Do NOT touch the miter saw in Bay 2, blade is dull as a butter knife.",
    "Client changed their mind again. Double-check the framing layout before cutting.",
    "Whoever borrowed the 5.0Ah DeWalt battery, bring it back to the main box.",
    "Lunch run at 12:00. Text Ken your order."
];

// --- BUILD LOGS ---
const buildLogs = [
    "Structural frame completed. Moving on to skinning and paint.",
    "LED channel routing is finished. Ready for electrical integration.",
    "First-round sanding complete. Coating with satin clear-coat today.",
    "Load-in successful. Ground-anchors set and inspected."
];

// --- CURRENT USER ---
const currentUser = localStorage.getItem("activeCrewMember");

// --- LOGOUT ---
function logout() {
    localStorage.removeItem("activeCrewMember");
    window.location.href = "login.html"; // Kicks you completely out to the login page
}

// --- ADD CANVAS MODULES ---
function addModule(type) {
    const canvas = document.getElementById("canvas");

    const card = document.createElement("div");
    card.className = "canvas-card";

    card.style.gridColumn = `span ${Math.floor(Math.random()*2)+1}`;
    card.style.gridRow = `span ${Math.floor(Math.random()*2)+1}`;

    let title = "";
    let content = "";

    if(type === "photo") {
        title = "📸 Crew Photo";
        content = `
        <div class="photo-placeholder">
        [ Click to Upload Photo ]
        </div>
        `;
    }

    if(type === "notes") {
        title = "📝 Crew Note";
        content = `
        <p>
        ${crewNotes[Math.floor(Math.random()*crewNotes.length)]}
        </p>
        `;
    }

    if(type === "build") {
        title = "⚙️ Build Log";
        content = `
        <p>
        <strong>Status:</strong>
        ${buildLogs[Math.floor(Math.random()*buildLogs.length)]}
        </p>
        `;
    }

    card.innerHTML = `
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <span>${title}</span>
        <span 
        class="delete-btn"
        style="cursor: pointer; color: #ff4d4d; font-weight: bold; font-size: 1.1rem;"
        onclick="this.closest('.canvas-card').remove()">
        ×
        </span>
    </div>
    <div class="card-body">
        ${content}
    </div>
    `;

    canvas.appendChild(card);
}

// --- BREAKROOM CHAT ---
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatStream = document.getElementById("chatStream");

if(chatForm){
    chatForm.addEventListener("submit", function(event){
        event.preventDefault();

        const message = chatInput.value.trim();
        if(message === "") return;

        const sender = currentUser || "Guest";

        // Structured HTML insertion ensures safe rendering and keeps input focus from breaking
        const dynamicChatHTML = `
        <span class="chat-tag">[${sender}]:</span> ${message}
        <span class="divider">|</span>
        `;
        
        chatStream.insertAdjacentHTML('beforeend', dynamicChatHTML);

        chatInput.value = "";
        
        // Dynamic horizontal scroll panel track control
        const container = chatStream.parentElement;
        container.scrollLeft = container.scrollWidth;
    });
}
