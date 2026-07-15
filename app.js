// --- FIREBASE SETUP ---
import { 
    getFirestore, 
    collection, 
    addDoc, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    serverTimestamp, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"; 

// Initialize Firestore (Assumes your main Firebase app is initialized elsewhere)
const db = getFirestore(); 
const notesColRef = collection(db, "crewNotes");

// --- BUILD LOGS (Static for now) ---
const buildLogs = [
    "Structural frame completed. Moving on to skinning and paint.",
    "LED channel routing is finished. Ready for electrical integration.",
    "First-round sanding complete. Coating with satin clear-coat today.",
    "Load-in successful. Ground-anchors set and inspected."
];

// --- CURRENT USER ---
const currentUser = localStorage.getItem("activeCrewMember");

// --- LOGOUT ---
window.logout = function() {
    localStorage.removeItem("activeCrewMember");
    window.location.href = "login.html"; // Kicks you completely out to the login page
};

// --- ADD CANVAS MODULES (Photos & Build Logs) ---
// Note: "notes" was removed from here because Firebase handles them automatically!
window.addModule = function(type) {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

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
    } else if(type === "build") {
        title = "⚙️ Build Log";
        content = `
        <p>
        <strong>Status:</strong>
        ${buildLogs[Math.floor(Math.random()*buildLogs.length)]}
        </p>
        `;
    } else {
        return; // Exit if the type isn't matched
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
};

// --- FIREBASE: SAVE NEW CREW NOTE ---
document.addEventListener("DOMContentLoaded", () => {
    const saveNoteBtn = document.getElementById("saveNoteBtn");
    const crewNoteInput = document.getElementById("crewNoteInput");

    if (saveNoteBtn && crewNoteInput) {
        saveNoteBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const noteText = crewNoteInput.value.trim();

            if (noteText === "") return;

            try {
                await addDoc(notesColRef, {
                    text: noteText,
                    author: currentUser || "Guest",
                    timestamp: serverTimestamp()
                });

                crewNoteInput.value = "";
                const countDisplay = document.getElementById("noteCount");
                if (countDisplay) countDisplay.textContent = "0";

                console.log("Transmission saved to Firestore successfully!");
            } catch (error) {
                console.error("Error saving transmission to Firestore: ", error);
            }
        });
    }
});

// --- FIREBASE: REAL-TIME LISTENER FOR CREW NOTES ---
const q = query(notesColRef, orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    // Clear existing dynamic notes to prevent duplicate rendering
    const existingDynamicNotes = canvas.querySelectorAll(".canvas-firebase-note");
    existingDynamicNotes.forEach(note => note.remove());

    snapshot.forEach((docSnap) => {
        const noteData = docSnap.data();
        const noteId = docSnap.id;

        const card = document.createElement("div");
        card.className = "canvas-card canvas-firebase-note";
        
        card.style.gridColumn = `span ${Math.floor(Math.random() * 2) + 1}`;
        card.style.gridRow = `span ${Math.floor(Math.random() * 2) + 1}`;

        card.innerHTML = `
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <span>📝 Crew Note (${noteData.author || "Guest"})</span>
            <span 
                class="delete-note-btn" 
                data-id="${noteId}"
                style="cursor: pointer; color: #ff4d4d; font-weight: bold; font-size: 1.1rem;"
            >
            ×
            </span>
        </div>
        <div class="card-body">
            <p>${noteData.text}</p>
        </div>
        `;

        canvas.appendChild(card);
    });
});

// --- FIREBASE: DELETE A CREW NOTE ---
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-note-btn")) {
        const noteId = e.target.getAttribute("data-id");
        if (!noteId) return;

        try {
            await deleteDoc(doc(db, "crewNotes", noteId));
            console.log(`Document ${noteId} successfully purged from system.`);
        } catch (error) {
            console.error("Error purging document from Firestore: ", error);
        }
    }
});

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

        const dynamicChatHTML = `
        <span class="chat-tag">[${sender}]:</span> ${message}
        <span class="divider">|</span>
        `;
        
        chatStream.insertAdjacentHTML('beforeend', dynamicChatHTML);

        chatInput.value = "";
        
        const container = chatStream.parentElement;
        container.scrollLeft = container.scrollWidth;
    });
}
