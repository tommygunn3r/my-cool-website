// jukebox-modal.js - Jukebox Modal System for Playerbar
// This integrates the jukebox as a modal popup in the playerbar

class JukeboxModal {
    constructor() {
        this.selectedSongs = [];
        this.COST_PER_SONG = 1;
        this.isOpen = false;
        this.songs = [];
        this.supabase = window.supabase;
        
        // Load songs from window.songs (set by songs.js)
        this.loadSongsAndInit();
    }

    async loadSongsAndInit() {
        // Wait for songs.js to load
        if (window.songs) {
            this.songs = window.songs;
        } else {
            // Wait a bit for songs.js to load
            await new Promise(resolve => setTimeout(resolve, 100));
            this.songs = window.songs || [];
        }
        
        this.createModal();
        this.attachListeners();
    }

    createModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.id = 'jukebox-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #2a1810 0%, #1a0f08 50%, #0a0504 100%);
                border: 8px solid;
                border-image: linear-gradient(45deg, #c9a961, #ffd700, #c9a961, #8b6914) 1;
                border-radius: 40px 40px 20px 20px;
                width: 90%;
                max-width: 600px;
                max-height: 85vh;
                display: flex;
                flex-direction: column;
                box-shadow: 
                    0 0 80px rgba(255, 215, 0, 0.4),
                    inset 0 0 40px rgba(0, 0, 0, 0.8),
                    0 20px 60px rgba(0, 0, 0, 0.9);
                position: relative;
                padding: 20px;
            ">
                <!-- Chrome Top Arc -->
                <div style="
                    position: absolute;
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 30px;
                    background: linear-gradient(180deg, #ffd700, #c9a961);
                    border-radius: 50%;
                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
                "></div>

                <!-- Header with Neon Sign -->
                <div style="
                    background: linear-gradient(180deg, #1a0f08, #0a0504);
                    padding: 20px;
                    text-align: center;
                    border-radius: 20px 20px 0 0;
                    border: 3px solid #c9a961;
                    margin-bottom: 15px;
                    position: relative;
                    box-shadow: 
                        0 0 20px rgba(255, 0, 255, 0.5),
                        inset 0 0 20px rgba(0, 0, 0, 0.8);
                ">
                    <div style="
                        font-family: 'Courier New', monospace;
                        font-size: 32px;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 8px;
                        background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 
                            0 0 20px rgba(255, 0, 255, 0.8),
                            0 0 40px rgba(0, 255, 255, 0.6);
                        animation: neonPulse 2s infinite alternate;
                    ">♫ JUKEBOX ♫</div>
                    
                    <button id="jukebox-close" style="
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: radial-gradient(circle, #ff4444, #aa0000);
                        color: #fff;
                        border: 2px solid #ff8888;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 22px;
                        font-weight: bold;
                        box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
                    ">×</button>
                </div>

                <!-- Chrome Speaker Grills (decorative) -->
                <div style="
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-bottom: 15px;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: radial-gradient(circle, #1a1a1a, #000);
                        border: 3px solid #c9a961;
                        border-radius: 50%;
                        position: relative;
                        box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.9);
                    ">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border-radius: 50%; border: 2px dotted #555;"></div>
                    </div>
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: radial-gradient(circle, #1a1a1a, #000);
                        border: 3px solid #c9a961;
                        border-radius: 50%;
                        box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.9);
                    ">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border-radius: 50%; border: 2px dotted #555;"></div>
                    </div>
                </div>

                <!-- Song List Display -->
                <div style="
                    background: linear-gradient(135deg, #001a33, #002244);
                    border: 5px solid #c9a961;
                    border-radius: 15px;
                    padding: 5px;
                    margin-bottom: 15px;
                    box-shadow: 
                        inset 0 0 30px rgba(0, 0, 0, 0.8),
                        0 0 20px rgba(201, 169, 97, 0.3);
                ">
                    <div id="jukebox-song-list" style="
                        overflow-y: auto;
                        padding: 10px;
                        min-height: 250px;
                        max-height: 350px;
                        background: rgba(0, 0, 0, 0.4);
                        border-radius: 10px;
                    "></div>
                </div>

                <!-- Control Panel -->
                <div style="
                    background: linear-gradient(180deg, #2a1810, #1a0f08);
                    border: 4px solid #c9a961;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 
                        inset 0 0 20px rgba(0, 0, 0, 0.6),
                        0 0 15px rgba(201, 169, 97, 0.4);
                ">
                    <div id="jukebox-error" style="
                        display: none;
                        color: #ff4444;
                        background: rgba(255, 0, 0, 0.2);
                        border: 2px solid #ff4444;
                        padding: 10px;
                        margin-bottom: 10px;
                        border-radius: 8px;
                        text-align: center;
                        font-weight: bold;
                        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
                    "></div>
                    
                    <div id="jukebox-selection-info" style="
                        color: #00ffff;
                        margin-bottom: 8px;
                        font-size: 16px;
                        text-align: center;
                        font-family: 'Courier New', monospace;
                        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
                    ">Select songs to play</div>
                    
                    <div id="jukebox-cost-info" style="
                        color: #ffd700;
                        font-weight: bold;
                        font-size: 20px;
                        margin-bottom: 15px;
                        text-shadow: 0 0 15px rgba(255, 215, 0, 0.9);
                        text-align: center;
                        font-family: 'Courier New', monospace;
                    ">Cost: 0 GC</div>
                    
                    <button id="jukebox-play-btn" disabled style="
                        width: 100%;
                        background: linear-gradient(180deg, #ff00ff, #aa00aa, #ff00ff);
                        color: #fff;
                        border: 3px solid #ff00ff;
                        padding: 15px;
                        font-size: 20px;
                        font-weight: bold;
                        text-transform: uppercase;
                        cursor: pointer;
                        border-radius: 25px;
                        transition: all 0.3s;
                        box-shadow: 
                            0 0 30px rgba(255, 0, 255, 0.6),
                            inset 0 0 15px rgba(255, 255, 255, 0.2);
                        font-family: 'Impact', sans-serif;
                        letter-spacing: 3px;
                    ">▶ PLAY SELECTION ▶</button>
                </div>

                <!-- Decorative Lights -->
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 15px;
                ">
                    <div style="width: 12px; height: 12px; background: #ff0000; border-radius: 50%; box-shadow: 0 0 15px #ff0000; animation: blink 1s infinite;"></div>
                    <div style="width: 12px; height: 12px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 15px #00ff00; animation: blink 1.5s infinite;"></div>
                    <div style="width: 12px; height: 12px; background: #0000ff; border-radius: 50%; box-shadow: 0 0 15px #0000ff; animation: blink 2s infinite;"></div>
                    <div style="width: 12px; height: 12px; background: #ffff00; border-radius: 50%; box-shadow: 0 0 15px #ffff00; animation: blink 1.2s infinite;"></div>
                </div>
            </div>

            <style>
                @keyframes neonPulse {
                    0% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                #jukebox-song-list::-webkit-scrollbar {
                    width: 10px;
                }
                #jukebox-song-list::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 5px;
                }
                #jukebox-song-list::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #c9a961, #ffd700);
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
            </style>
        `;

        document.body.appendChild(modal);
        this.modal = modal;
        
        // Render songs
        this.renderSongs();
    }

    renderSongs() {
        const songList = document.getElementById('jukebox-song-list');
        songList.innerHTML = '';

        this.songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'jukebox-song-item';
            songItem.dataset.index = index;
            songItem.style.cssText = `
                background: linear-gradient(90deg, rgba(42, 24, 16, 0.8), rgba(26, 15, 8, 0.9));
                border: 2px solid #c9a961;
                margin-bottom: 8px;
                padding: 12px 15px;
                cursor: pointer;
                transition: all 0.3s;
                border-radius: 8px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            `;
            
            songItem.innerHTML = `
                <div style="position: relative; z-index: 2;">
                    <div style="
                        color: #ffd700;
                        font-weight: bold;
                        font-size: 15px;
                        margin-bottom: 4px;
                        text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
                        font-family: 'Courier New', monospace;
                    ">${song.title}</div>
                    <div style="
                        color: #c9a961;
                        font-size: 12px;
                        font-family: 'Courier New', monospace;
                    ">${song.artist}</div>
                </div>
                <div style="
                    position: absolute;
                    left: -100%;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
                    transition: left 0.5s;
                    pointer-events: none;
                " class="shine-effect"></div>
            `;
            
            songItem.addEventListener('click', () => this.toggleSong(index, songItem));
            songItem.addEventListener('mouseenter', () => {
                if (!songItem.classList.contains('selected')) {
                    songItem.style.background = 'linear-gradient(90deg, rgba(201, 169, 97, 0.3), rgba(255, 215, 0, 0.2))';
                    songItem.style.borderColor = '#ffd700';
                    songItem.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                    songItem.style.transform = 'translateX(5px)';
                    const shine = songItem.querySelector('.shine-effect');
                    if (shine) shine.style.left = '100%';
                }
            });
            songItem.addEventListener('mouseleave', () => {
                if (!songItem.classList.contains('selected')) {
                    songItem.style.background = 'linear-gradient(90deg, rgba(42, 24, 16, 0.8), rgba(26, 15, 8, 0.9))';
                    songItem.style.borderColor = '#c9a961';
                    songItem.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
                    songItem.style.transform = 'translateX(0)';
                    const shine = songItem.querySelector('.shine-effect');
                    if (shine) shine.style.left = '-100%';
                }
            });
            
            songList.appendChild(songItem);
        });
    }

    toggleSong(index, element) {
        const songIndex = this.selectedSongs.indexOf(index);
        
        if (songIndex > -1) {
            // Deselect
            this.selectedSongs.splice(songIndex, 1);
            element.classList.remove('selected');
            element.style.background = 'linear-gradient(90deg, rgba(42, 24, 16, 0.8), rgba(26, 15, 8, 0.9))';
            element.style.borderColor = '#c9a961';
            element.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
            element.style.transform = 'translateX(0)';
        } else {
            // Select
            this.selectedSongs.push(index);
            element.classList.add('selected');
            element.style.background = 'linear-gradient(90deg, rgba(255, 0, 255, 0.4), rgba(255, 0, 255, 0.2))';
            element.style.borderColor = '#ff00ff';
            element.style.boxShadow = '0 0 25px rgba(255, 0, 255, 0.8), inset 0 0 15px rgba(255, 0, 255, 0.3)';
            element.style.transform = 'translateX(8px) scale(1.02)';
        }

        this.updateControls();
    }

    updateControls() {
        const selectionInfo = document.getElementById('jukebox-selection-info');
        const costInfo = document.getElementById('jukebox-cost-info');
        const playButton = document.getElementById('jukebox-play-btn');

        const count = this.selectedSongs.length;
        const cost = count * this.COST_PER_SONG;

        selectionInfo.textContent = count === 0 
            ? 'Select songs to play' 
            : `Selected: ${count} song${count !== 1 ? 's' : ''}`;
        
        costInfo.textContent = `Cost: ${cost} GC`;
        playButton.disabled = count === 0;
        
        if (count === 0) {
            playButton.style.background = '#666';
            playButton.style.color = '#333';
            playButton.style.cursor = 'not-allowed';
            playButton.style.boxShadow = 'none';
        } else {
            playButton.style.background = 'linear-gradient(180deg, #00ff00, #00aa00)';
            playButton.style.color = '#000';
            playButton.style.cursor = 'pointer';
            playButton.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
        }
    }

    showError(message) {
        const errorEl = document.getElementById('jukebox-error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }

    async playSelectedSongs() {
        if (this.selectedSongs.length === 0) return;

        const cost = this.selectedSongs.length * this.COST_PER_SONG;

        try {
            // Get current user
            const { data: { session }, error: sessionError } = await this.supabase.auth.getSession();
            
            if (sessionError || !session) {
                this.showError('Please log in to use the jukebox');
                return;
            }

            const userId = session.user.id;

            // Get current coins
            const { data: profile, error: profileError } = await this.supabase
                .from('profiles')
                .select('gunnercoins')
                .eq('id', userId)
                .single();

            if (profileError) {
                this.showError('Error loading profile');
                return;
            }

            if (profile.gunnercoins < cost) {
                this.showError(`Not enough GunnerCoins! You need ${cost} GC but only have ${profile.gunnercoins} GC`);
                return;
            }

            // Deduct coins
            const { error: updateError } = await this.supabase
                .from('profiles')
                .update({ gunnercoins: profile.gunnercoins - cost })
                .eq('id', userId);

            if (updateError) {
                this.showError('Error processing payment');
                return;
            }

            // Update playerbar coin display
            const coinEl = document.getElementById('pb-player-coins');
            if (coinEl) {
                coinEl.textContent = profile.gunnercoins - cost;
            }

            // Send playlist to music player
            const playlist = this.selectedSongs.map(index => this.songs[index]);
            
            if (window.musicPlayer) {
                window.musicPlayer.setPlaylist(playlist);
            }

            // Clear selection
            this.selectedSongs = [];
            document.querySelectorAll('.jukebox-song-item').forEach(item => {
                item.classList.remove('selected');
                item.style.background = 'rgba(0, 50, 100, 0.5)';
                item.style.borderColor = '#0088cc';
                item.style.boxShadow = 'none';
            });
            this.updateControls();

            // Show success and close modal
            const selectionInfo = document.getElementById('jukebox-selection-info');
            selectionInfo.textContent = '♫ Now Playing! ♫';
            selectionInfo.style.color = '#00ff00';
            
            setTimeout(() => {
                this.close();
                selectionInfo.style.color = '#0ff';
                this.updateControls();
            }, 1500);

        } catch (error) {
            console.error('Jukebox error:', error);
            this.showError('An error occurred. Please try again.');
        }
    }

    attachListeners() {
        // Close button
        document.getElementById('jukebox-close').addEventListener('click', () => this.close());
        
        // Play button
        document.getElementById('jukebox-play-btn').addEventListener('click', () => this.playSelectedSongs());
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
    }

    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
    }
}

// Initialize jukebox modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.jukeboxModal = new JukeboxModal();
    });
} else {
    window.jukeboxModal = new JukeboxModal();
}

// Expose function to open jukebox
window.openJukebox = function() {
    if (window.jukeboxModal) {
        window.jukeboxModal.open();
    }
};