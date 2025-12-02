// jukebox-modal.js - Jukebox Modal System for Playerbar
// This integrates the jukebox as a modal popup in the playerbar

import { songs } from './songs.js';
import { supabase } from './assets/js/supabaseClient.js';

class JukeboxModal {
    constructor() {
        this.selectedSongs = [];
        this.COST_PER_SONG = 1;
        this.isOpen = false;
        
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
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #001a33 0%, #003366 100%);
                border: 3px solid #0ff;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(180deg, #0ff, #00aaff);
                    color: #000;
                    padding: 15px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border-radius: 9px 9px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <span>♫ JUKEBOX ♫</span>
                    <button id="jukebox-close" style="
                        background: #ff4444;
                        color: #fff;
                        border: none;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 18px;
                        font-weight: bold;
                    ">×</button>
                </div>

                <!-- Song List -->
                <div id="jukebox-song-list" style="
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                    min-height: 300px;
                    max-height: 400px;
                "></div>

                <!-- Controls -->
                <div style="
                    padding: 15px;
                    border-top: 2px solid #0ff;
                    background: rgba(0, 0, 0, 0.3);
                ">
                    <div id="jukebox-error" style="
                        display: none;
                        color: #ff4444;
                        background: rgba(255, 0, 0, 0.1);
                        border: 1px solid #ff4444;
                        padding: 10px;
                        margin-bottom: 10px;
                        border-radius: 4px;
                        text-align: center;
                    "></div>
                    
                    <div id="jukebox-selection-info" style="
                        color: #0ff;
                        margin-bottom: 8px;
                        font-size: 14px;
                        text-align: center;
                    ">Select songs to play</div>
                    
                    <div id="jukebox-cost-info" style="
                        color: #ffaa00;
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 12px;
                        text-shadow: 0 0 10px rgba(255, 170, 0, 0.8);
                        text-align: center;
                    ">Cost: 0 GC</div>
                    
                    <button id="jukebox-play-btn" disabled style="
                        width: 100%;
                        background: linear-gradient(180deg, #00ff00, #00aa00);
                        color: #000;
                        border: none;
                        padding: 12px;
                        font-size: 16px;
                        font-weight: bold;
                        text-transform: uppercase;
                        cursor: pointer;
                        border-radius: 8px;
                        transition: all 0.3s;
                        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                    ">PLAY SELECTION</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;
        
        // Render songs
        this.renderSongs();
    }

    renderSongs() {
        const songList = document.getElementById('jukebox-song-list');
        songList.innerHTML = '';

        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'jukebox-song-item';
            songItem.dataset.index = index;
            songItem.style.cssText = `
                background: rgba(0, 50, 100, 0.5);
                border: 2px solid #0088cc;
                margin-bottom: 8px;
                padding: 10px;
                cursor: pointer;
                transition: all 0.2s;
                border-radius: 6px;
            `;
            
            songItem.innerHTML = `
                <div style="color: #0ff; font-weight: bold; font-size: 14px; margin-bottom: 3px;">${song.title}</div>
                <div style="color: #88ddff; font-size: 12px;">${song.artist}</div>
            `;
            
            songItem.addEventListener('click', () => this.toggleSong(index, songItem));
            songItem.addEventListener('mouseenter', () => {
                if (!songItem.classList.contains('selected')) {
                    songItem.style.background = 'rgba(0, 100, 150, 0.7)';
                    songItem.style.borderColor = '#0ff';
                    songItem.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
                }
            });
            songItem.addEventListener('mouseleave', () => {
                if (!songItem.classList.contains('selected')) {
                    songItem.style.background = 'rgba(0, 50, 100, 0.5)';
                    songItem.style.borderColor = '#0088cc';
                    songItem.style.boxShadow = 'none';
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
            element.style.background = 'rgba(0, 50, 100, 0.5)';
            element.style.borderColor = '#0088cc';
            element.style.boxShadow = 'none';
        } else {
            // Select
            this.selectedSongs.push(index);
            element.classList.add('selected');
            element.style.background = 'rgba(0, 255, 255, 0.3)';
            element.style.borderColor = '#0ff';
            element.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8)';
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
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError || !session) {
                this.showError('Please log in to use the jukebox');
                return;
            }

            const userId = session.user.id;

            // Get current coins
            const { data: profile, error: profileError } = await supabase
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
            const { error: updateError } = await supabase
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
            const playlist = this.selectedSongs.map(index => songs[index]);
            
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
