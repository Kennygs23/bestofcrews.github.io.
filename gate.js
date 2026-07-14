<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Of Crews | Canvas</title>
    
    <!-- Security Check: If not logged in, immediately redirect to login.html -->
    <script>
        if (!localStorage.getItem('activeCrewMember')) {
            window.location.href = 'login.html';
        }
    </script>

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- MAIN APP CONTAINER (No more .hidden class required on load!) -->
    <div class="app-container" id="app">
        
        <!-- TOOL BOX (Sidebar Utility) -->
        <aside class="toolbox">
            <div class="toolbox-header">
                <h3>🛠️ TOOL BOX</h3>
            </div>
            <div class="toolbox-section">
                <h4>Add to Canvas</h4>
                <button class="tool-btn" onclick="addModule('photo')">+ Photo Card</button>
                <button class="tool-btn" onclick="addModule('notes')">+ Crew Note</button>
                <button class="tool-btn" onclick="addModule('build')">+ Build Log</button>
            </div>
            <div class="toolbox-section">
                <h4>Quick Utilities</h4>
                <button class="tool-btn utility">Calc / Scale</button>
                <button class="tool-btn utility">Material Checklist</button>
            </div>
            <!-- Dynamic Sign Out Button -->
            <div class="toolbox-section" style="margin-top: auto; padding-top: 20px;">
                <button class="tool-btn" onclick="logout()" style="border-color: #ff4d4d; color: #ff4d4d; background: rgba(255,77,77,0.05);">🔓 Sign Out</button>
            </div>
        </aside>

        <!-- MAIN SPATIAL CANVAS -->
        <main class="spatial-canvas" id="canvas">
            <div class="canvas-card" style="grid-column: span 2; grid-row: span 2;">
                <div class="card-header">🚀 Active Project: What do you have in mind?</div>
                <div class="card-body">
                    <p>Canvas section, Business and shop objectives</p>
                </div>
            </div>
            
            <div class="canvas-card">
                <div class="card-header">📸 Load-In Shot</div>
                <div class="card-body photo-placeholder">
                    [ Crew Photo Upload ]
                </div>
            </div>
        </main>

       <!-- THE BREAKROOM (Footer / Interactive Banter Zone) -->
        <footer class="breakroom">
            <div class="breakroom-label">☕ THE BREAKROOM:</div>
            
            <div class="breakroom-stream-container">
                <div class="breakroom-stream" id="chatStream">
                    <span class="chat-tag">[Social]:</span> Banter? Whats the vibes? <span class="divider">|</span>
                    <span class="chat-tag">[Ken]:</span> Website Loading... <span class="divider">|</span>
                    <span class="chat-tag">[Crew]:</span> Comment Section      <span class="divider">|</span>
                </div>
            </div>

            <form class="breakroom-form" id="chatForm">
                <input type="text" id="chatInput" placeholder="Type banter here..." autocomplete="off" required>
                <button type="submit">SEND</button>
            </form>
        </footer>

    </div>

    <script src="app.js"></script>
</body>
</html>
