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
        headerText = '📸 Crew Photo Upload';
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

// Random crew names to rotate through for simulation
const crewNames = ["Ken", "Erick", "Crew", "Fabricator_Dave", "Lead_Hand"];

chatForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from reloading on form submit
    
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    // Pick a random sender for now (Later on we can make a settings card to set your username)
    const sender = crewNames[Math.floor(Math.random() * crewNames.length)];
    
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
