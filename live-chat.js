/**
 * Draggable Live Chat System
 * Provides customer support chat functionality
 */

class LiveChat {
    constructor() {
        this.isOpen = false;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.position = JSON.parse(localStorage.getItem('liveChatPosition') || '{"x": 20, "y": 200}');
        this.messages = JSON.parse(localStorage.getItem('liveChatMessages') || '[]');
        this.isOnline = true; // Simulate online status
        
        this.init();
    }
    
    init() {
        this.createChatButton();
        this.createChatWindow();
        this.setupEventListeners();
        this.loadMessages();
    }
    
    createChatButton() {
        // Create the draggable chat button
        this.chatButton = document.createElement('div');
        this.chatButton.className = 'live-chat-button';
        this.chatButton.id = 'liveChatButton';
        this.chatButton.innerHTML = `
            <div class="chat-icon">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-tooltip">Live Chat Support</div>
            <div class="chat-badge" id="chatBadge">1</div>
        `;
        
        // Set initial position
        this.chatButton.style.left = this.position.x + 'px';
        this.chatButton.style.top = this.position.y + 'px';
        
        // Add to body
        document.body.appendChild(this.chatButton);
        
        // Add CSS styles
        this.addStyles();
    }
    
    createChatWindow() {
        // Create chat window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'live-chat-window';
        this.chatWindow.id = 'liveChatWindow';
        this.chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-title">
                    <i class="fas fa-comments"></i>
                    <span>Live Chat Support</span>
                    <div class="online-status ${this.isOnline ? 'online' : 'offline'}"></div>
                </div>
                <button class="chat-close" onclick="window.liveChat.closeChat()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="welcome-message">
                    <div class="message agent">
                        <div class="message-content">
                            <p>Hello! 👋 Welcome to ShopMax support. How can I help you today?</p>
                            <span class="message-time">${this.getCurrentTime()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <div class="quick-actions">
                    <button class="quick-btn" onclick="window.liveChat.sendQuickMessage('Order Status')">Order Status</button>
                    <button class="quick-btn" onclick="window.liveChat.sendQuickMessage('Shipping Info')">Shipping</button>
                    <button class="quick-btn" onclick="window.liveChat.sendQuickMessage('Returns')">Returns</button>
                    <button class="quick-btn" onclick="window.liveChat.sendQuickMessage('Technical Support')">Tech Support</button>
                </div>
                <div class="input-wrapper">
                    <input type="text" id="chatInput" placeholder="Type your message..." maxlength="500">
                    <button class="send-btn" onclick="window.liveChat.sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.chatWindow);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .live-chat-button {
                position: fixed;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #8b4513, #a0522d);
                border-radius: 50%;
                cursor: move;
                z-index: 9998;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
            }
            
            .live-chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            }
            
            .live-chat-button.dragging {
                transform: scale(1.1);
                z-index: 10000;
            }
            
            .chat-icon {
                color: white;
                font-size: 20px;
                pointer-events: none;
            }
            
            .chat-tooltip {
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .chat-tooltip::after {
                content: '';
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                border: 5px solid transparent;
                border-left-color: rgba(0,0,0,0.8);
            }
            
            .live-chat-button:hover .chat-tooltip {
                opacity: 1;
                visibility: visible;
            }
            
            .chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #dc3545;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .live-chat-window {
                position: fixed;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                z-index: 9999;
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #e0e0e0;
            }
            
            .live-chat-window.open {
                display: flex;
            }
            
            .chat-header {
                background: linear-gradient(135deg, #8b4513, #a0522d);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
            }
            
            .online-status {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #28a745;
            }
            
            .online-status.offline {
                background: #dc3545;
            }
            
            .chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
                padding: 5px;
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            
            .chat-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .message {
                margin-bottom: 15px;
                display: flex;
            }
            
            .message.user {
                justify-content: flex-end;
            }
            
            .message.agent {
                justify-content: flex-start;
            }
            
            .message-content {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                position: relative;
            }
            
            .message.user .message-content {
                background: #8b4513;
                color: white;
                border-bottom-right-radius: 4px;
            }
            
            .message.agent .message-content {
                background: white;
                color: #333;
                border: 1px solid #e0e0e0;
                border-bottom-left-radius: 4px;
            }
            
            .message-time {
                font-size: 10px;
                opacity: 0.7;
                display: block;
                margin-top: 5px;
            }
            
            .welcome-message {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .quick-actions {
                display: flex;
                gap: 5px;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #e0e0e0;
                flex-wrap: wrap;
            }
            
            .quick-btn {
                background: #8b4513;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 11px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .quick-btn:hover {
                background: #a0522d;
                transform: translateY(-1px);
            }
            
            .input-wrapper {
                display: flex;
                padding: 15px;
                background: white;
                border-top: 1px solid #e0e0e0;
            }
            
            #chatInput {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 10px 15px;
                outline: none;
                font-size: 14px;
            }
            
            #chatInput:focus {
                border-color: #8b4513;
            }
            
            .send-btn {
                background: #8b4513;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-left: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .send-btn:hover {
                background: #a0522d;
                transform: scale(1.05);
            }
            
            .send-btn:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            
            /* Dark theme support */
            [data-theme="dark"] .live-chat-window {
                background: #2d2d2d;
                border-color: #404040;
            }
            
            [data-theme="dark"] .chat-messages {
                background: #1a1a1a;
            }
            
            [data-theme="dark"] .message.agent .message-content {
                background: #404040;
                color: #ffffff;
                border-color: #555;
            }
            
            [data-theme="dark"] .quick-actions {
                background: #1a1a1a;
                border-color: #404040;
            }
            
            [data-theme="dark"] .input-wrapper {
                background: #2d2d2d;
                border-color: #404040;
            }
            
            [data-theme="dark"] #chatInput {
                background: #1a1a1a;
                border-color: #404040;
                color: #ffffff;
            }
            
            [data-theme="dark"] #chatInput:focus {
                border-color: #8b4513;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        // Mouse events for dragging
        this.chatButton.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Click event for opening chat
        this.chatButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDragging) {
                console.log('Live chat clicked - opening chat window');
                this.toggleChat();
            }
        });
        
        // Touch events for mobile
        this.chatButton.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        document.addEventListener('touchend', () => this.endDrag());
        
        // Chat input events
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // Keyboard accessibility
        this.chatButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleChat();
            }
        });
        
        this.chatButton.setAttribute('tabindex', '0');
        this.chatButton.setAttribute('role', 'button');
        this.chatButton.setAttribute('aria-label', 'Open live chat');
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.chatButton.classList.add('dragging');
        
        const rect = this.chatButton.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        
        e.preventDefault();
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        
        // Keep button within viewport
        const maxX = window.innerWidth - this.chatButton.offsetWidth;
        const maxY = window.innerHeight - this.chatButton.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        this.chatButton.style.left = constrainedX + 'px';
        this.chatButton.style.top = constrainedY + 'px';
        
        this.position = { x: constrainedX, y: constrainedY };
    }
    
    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.chatButton.classList.remove('dragging');
            
            // Save position
            localStorage.setItem('liveChatPosition', JSON.stringify(this.position));
        }
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.chatWindow.classList.add('open');
        this.hideBadge();
        
        // Focus on input
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.focus();
            }
        }, 100);
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.remove('open');
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate agent response
        setTimeout(() => {
            this.simulateAgentResponse(message);
        }, 1000 + Math.random() * 2000);
    }
    
    sendQuickMessage(message) {
        this.addMessage(message, 'user');
        
        // Simulate agent response
        setTimeout(() => {
            this.simulateAgentResponse(message);
        }, 1000 + Math.random() * 2000);
    }
    
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(content)}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save message
        this.messages.push({
            content,
            sender,
            timestamp: new Date().toISOString()
        });
        this.saveMessages();
    }
    
    simulateAgentResponse(userMessage) {
        const responses = {
            'Order Status': 'I can help you check your order status. Please provide your order number or email address.',
            'Shipping Info': 'Our standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.',
            'Returns': 'We offer a 30-day return policy. You can initiate a return through your account or contact us directly.',
            'Technical Support': 'I\'ll connect you with our technical support team. They\'ll be able to help you with any technical issues.',
            'default': 'Thank you for your message. Our support team will get back to you shortly. Is there anything else I can help you with?'
        };
        
        const response = responses[userMessage] || responses.default;
        this.addMessage(response, 'agent');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    showBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'flex';
        }
    }
    
    hideBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    }
    
    loadMessages() {
        // Load saved messages
        this.messages.forEach(msg => {
            this.addMessage(msg.content, msg.sender);
        });
    }
    
    saveMessages() {
        localStorage.setItem('liveChatMessages', JSON.stringify(this.messages));
    }
    
    // Public methods
    isChatOpen() {
        return this.isOpen;
    }
    
    resetPosition() {
        this.position = { x: 20, y: 200 };
        this.chatButton.style.left = this.position.x + 'px';
        this.chatButton.style.top = this.position.y + 'px';
        localStorage.setItem('liveChatPosition', JSON.stringify(this.position));
    }
    
    clearMessages() {
        this.messages = [];
        this.saveMessages();
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="welcome-message">
                    <div class="message agent">
                        <div class="message-content">
                            <p>Hello! 👋 Welcome to ShopMax support. How can I help you today?</p>
                            <span class="message-time">${this.getCurrentTime()}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize live chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing live chat...');
    window.liveChat = new LiveChat();
    console.log('Live chat initialized:', window.liveChat);
});

// Export for use in other files
window.LiveChat = LiveChat;

// Global test function
window.testLiveChat = function() {
    console.log('Testing live chat...');
    if (window.liveChat) {
        console.log('Live chat instance found:', window.liveChat);
        window.liveChat.toggleChat();
    } else {
        console.error('Live chat not initialized');
    }
};
