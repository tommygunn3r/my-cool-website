// playerbar-music.js - Persistent Music Player
// This file handles music playback across all pages using localStorage sync

class MusicPlayer {
    constructor() {
        this.audio = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        
        this.initAudio();
        this.loadState();
        this.setupUI();
        this.startSync();
    }

    initAudio() {
        this.audio = new Audio();
        this.audio.addEventListener('ended', () => this.playNext());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.playNext();
        });
    }

    loadState() {
        const state = localStorage.getItem('jukeboxState');
        if (state) {
            const data = JSON.parse(state);
            this.playlist = data.playlist || [];
            this.currentIndex = data.currentIndex || 0;
            this.isPlaying = data.isPlaying || false;
            
            if (this.playlist.length > 0) {
                this.loadSong(this.currentIndex);
                if (this.isPlaying && data.currentTime) {
                    this.audio.currentTime = data.currentTime;
                    this.audio.play().catch(() => {
                        // Auto-play blocked, wait for user interaction
                        this.isPlaying = false;
                        this.saveState();
                    });
                }
            }
        }
    }

    saveState() {
        const state = {
            playlist: this.playlist,
            currentIndex: this.currentIndex,
            isPlaying: this.isPlaying,
            currentTime: this.audio ? this.audio.currentTime : 0
        };
        localStorage.setItem('jukeboxState', JSON.stringify(state));
    }

    loadSong(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentIndex = index;
            this.audio.src = this.playlist[index].file;
            this.updateNowPlaying();
        }
    }

    play() {
        if (this.playlist.length > 0) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.saveState();
                this.updatePlayButton();
            }).catch(err => {
                console.error('Play failed:', err);
            });
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.saveState();
        this.updatePlayButton();
    }

    playNext() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.loadSong(this.currentIndex + 1);
            this.play();
        } else {
            // Playlist ended
            this.isPlaying = false;
            this.currentIndex = 0;
            this.playlist = [];
            this.saveState();
            this.updateUI();
        }
    }

    playPrevious() {
        if (this.currentIndex > 0) {
            this.loadSong(this.currentIndex - 1);
            this.play();
        }
    }

    setPlaylist(songs) {
        this.playlist = songs;
        this.currentIndex = 0;
        this.loadSong(0);
        this.play();
        this.saveState();
    }

    setupUI() {
        const playPauseBtn = document.getElementById('music-play-pause');
        const prevBtn = document.getElementById('music-prev');
        const nextBtn = document.getElementById('music-next');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.playPrevious());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.playNext());
        }

        this.updateUI();
    }

    updateNowPlaying() {
        const titleEl = document.getElementById('music-title');
        const artistEl = document.getElementById('music-artist');
        
        if (this.playlist.length > 0 && this.currentIndex < this.playlist.length) {
            const song = this.playlist[this.currentIndex];
            if (titleEl) titleEl.textContent = song.title;
            if (artistEl) artistEl.textContent = song.artist;
        } else {
            if (titleEl) titleEl.textContent = 'No song playing';
            if (artistEl) artistEl.textContent = '';
        }
    }

    updatePlayButton() {
        const playPauseBtn = document.getElementById('music-play-pause');
        if (playPauseBtn) {
            playPauseBtn.textContent = this.isPlaying ? '⏸' : '▶';
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('music-progress');
        if (progressBar && this.audio.duration) {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    }

    updateUI() {
        this.updateNowPlaying();
        this.updatePlayButton();
        
        // Show/hide music controls based on playlist
        const musicControls = document.getElementById('music-controls');
        if (musicControls) {
            musicControls.style.display = this.playlist.length > 0 ? 'flex' : 'none';
        }
    }

    startSync() {
        // Listen for storage changes from other tabs/pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'jukeboxState') {
                this.loadState();
                this.updateUI();
            }
        });

        // Periodic save while playing
        setInterval(() => {
            if (this.isPlaying) {
                this.saveState();
            }
        }, 1000);
    }

    // Called from jukebox when user selects songs
    static receivePlaylist(songs) {
        if (window.musicPlayer) {
            window.musicPlayer.setPlaylist(songs);
        }
    }
}

// Initialize music player when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.musicPlayer = new MusicPlayer();
        // Force UI update after a short delay to ensure DOM is ready
        setTimeout(() => {
            if (window.musicPlayer) {
                window.musicPlayer.updateUI();
            }
        }, 100);
    });
} else {
    window.musicPlayer = new MusicPlayer();
    // Force UI update after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.musicPlayer) {
            window.musicPlayer.updateUI();
        }
    }, 100);
}

// Listen for messages from jukebox iframe
window.addEventListener('message', (event) => {
    if (event.data.type === 'JUKEBOX_PLAYLIST') {
        MusicPlayer.receivePlaylist(event.data.songs);
    }
});