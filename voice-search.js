/**
 * Voice Search Functionality
 * Implements speech recognition for search functionality
 */

class VoiceSearch {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.searchInput = null;
        this.voiceButton = null;
        this.isSupported = false;
        
        this.init();
    }
    
    init() {
        // Check if speech recognition is supported
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.isSupported = true;
            this.setupSpeechRecognition();
            this.createVoiceButton();
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }
    
    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateVoiceButtonState();
            this.showVoiceStatus('Listening... Speak now');
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.handleVoiceResult(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.handleVoiceError(event.error);
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateVoiceButtonState();
            this.hideVoiceStatus();
        };
    }
    
    createVoiceButton() {
        // Find search input
        this.searchInput = document.querySelector('.search-bar input') || 
                          document.getElementById('searchInput') ||
                          document.querySelector('input[type="search"]');
        
        if (!this.searchInput) {
            console.warn('Search input not found');
            return;
        }
        
        // Find existing voice button instead of creating a new one
        this.voiceButton = document.getElementById('voiceSearchBtn');
        
        if (this.voiceButton) {
            this.voiceButton.onclick = () => this.toggleVoiceSearch();
        } else {
            console.warn('Voice search button not found');
        }
        
        // Voice button styles are now handled by CSS in style.css
    }
    
    addVoiceButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .voice-search-btn {
                background: #8b4513;
                border: none;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                margin-left: 8px;
                transition: all 0.3s ease;
                font-size: 14px;
            }
            
            .voice-search-btn:hover {
                background: #a0522d;
                transform: scale(1.05);
            }
            
            .voice-search-btn.listening {
                background: #dc3545;
                animation: pulse 1s infinite;
            }
            
            .voice-search-btn:disabled {
                background: #6c757d;
                cursor: not-allowed;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .voice-status {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #8b4513;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-size: 14px;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    toggleVoiceSearch() {
        if (!this.isSupported) {
            this.showVoiceStatus('Voice search not supported in this browser', 'error');
            return;
        }
        
        if (this.isListening) {
            this.stopVoiceSearch();
        } else {
            this.startVoiceSearch();
        }
    }
    
    startVoiceSearch() {
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error starting voice recognition:', error);
            this.showVoiceStatus('Error starting voice search', 'error');
        }
    }
    
    stopVoiceSearch() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    handleVoiceResult(transcript) {
        if (this.searchInput) {
            this.searchInput.value = transcript;
            
            // Trigger search
            this.performSearch(transcript);
            
            this.showVoiceStatus(`Searching for: "${transcript}"`, 'success');
        }
    }
    
    handleVoiceError(error) {
        let message = 'Voice search error';
        
        switch (error) {
            case 'no-speech':
                message = 'No speech detected. Please try again.';
                break;
            case 'audio-capture':
                message = 'Microphone not found. Please check your microphone.';
                break;
            case 'not-allowed':
                message = 'Microphone access denied. Please allow microphone access.';
                break;
            case 'network':
                message = 'Network error. Please check your connection.';
                break;
            default:
                message = `Voice search error: ${error}`;
        }
        
        this.showVoiceStatus(message, 'error');
    }
    
    performSearch(query) {
        // Trigger search functionality
        if (typeof performSearch === 'function') {
            performSearch();
        } else if (typeof window.performSearch === 'function') {
            window.performSearch();
        } else {
            // Fallback: redirect to search page
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }
    
    updateVoiceButtonState() {
        if (this.voiceButton) {
            if (this.isListening) {
                this.voiceButton.classList.add('listening');
                this.voiceButton.innerHTML = '<i class="fas fa-stop"></i>';
                this.voiceButton.title = 'Stop Voice Search';
            } else {
                this.voiceButton.classList.remove('listening');
                this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
                this.voiceButton.title = 'Voice Search';
            }
        }
    }
    
    showVoiceStatus(message, type = 'info') {
        // Remove existing status
        this.hideVoiceStatus();
        
        const statusDiv = document.createElement('div');
        statusDiv.className = `voice-status ${type}`;
        statusDiv.textContent = message;
        
        document.body.appendChild(statusDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            this.hideVoiceStatus();
        }, 3000);
    }
    
    hideVoiceStatus() {
        const existingStatus = document.querySelector('.voice-status');
        if (existingStatus) {
            existingStatus.remove();
        }
    }
    
    // Public methods
    isVoiceSearchSupported() {
        return this.isSupported;
    }
    
    getListeningState() {
        return this.isListening;
    }
}

// Initialize voice search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.voiceSearch = new VoiceSearch();
});

// Export for use in other files
window.VoiceSearch = VoiceSearch;
