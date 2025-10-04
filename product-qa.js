// Product Q&A System

class ProductQAManager {
    constructor() {
        this.questions = JSON.parse(localStorage.getItem('product_questions') || '[]');
        this.answers = JSON.parse(localStorage.getItem('product_answers') || '[]');
        this.qaAnalytics = JSON.parse(localStorage.getItem('qa_analytics') || '[]');
        this.initializeQAData();
    }
    
    // Initialize with mock Q&A data
    initializeQAData() {
        if (this.questions.length === 0) {
            this.questions = [
                {
                    id: 'q-001',
                    productId: 'CJ-001',
                    question: 'What is the battery life of this wireless earbuds?',
                    askedBy: 'John D.',
                    askedDate: '2024-01-15',
                    helpful: 12,
                    notHelpful: 2,
                    isVerifiedPurchase: true,
                    status: 'answered',
                    category: 'specifications'
                },
                {
                    id: 'q-002',
                    productId: 'CJ-001',
                    question: 'Does this come with a charging case?',
                    askedBy: 'Sarah M.',
                    askedDate: '2024-01-14',
                    helpful: 8,
                    notHelpful: 1,
                    isVerifiedPurchase: true,
                    status: 'answered',
                    category: 'accessories'
                },
                {
                    id: 'q-003',
                    productId: 'CJ-001',
                    question: 'Can I use these for phone calls?',
                    askedBy: 'Mike R.',
                    askedDate: '2024-01-13',
                    helpful: 15,
                    notHelpful: 0,
                    isVerifiedPurchase: false,
                    status: 'answered',
                    category: 'functionality'
                },
                {
                    id: 'q-004',
                    productId: 'CJ-001',
                    question: 'What colors are available?',
                    askedBy: 'Lisa K.',
                    askedDate: '2024-01-12',
                    helpful: 6,
                    notHelpful: 1,
                    isVerifiedPurchase: false,
                    status: 'answered',
                    category: 'variants'
                },
                {
                    id: 'q-005',
                    productId: 'CJ-001',
                    question: 'How long does shipping take?',
                    askedBy: 'David L.',
                    askedDate: '2024-01-11',
                    helpful: 4,
                    notHelpful: 0,
                    isVerifiedPurchase: false,
                    status: 'answered',
                    category: 'shipping'
                },
                {
                    id: 'q-006',
                    productId: 'CJ-002',
                    question: 'Is this fitness tracker waterproof?',
                    askedBy: 'Emma W.',
                    askedDate: '2024-01-10',
                    helpful: 10,
                    notHelpful: 1,
                    isVerifiedPurchase: true,
                    status: 'answered',
                    category: 'specifications'
                },
                {
                    id: 'q-007',
                    productId: 'CJ-002',
                    question: 'What apps are compatible with this tracker?',
                    askedBy: 'Tom H.',
                    askedDate: '2024-01-09',
                    helpful: 7,
                    notHelpful: 0,
                    isVerifiedPurchase: true,
                    status: 'answered',
                    category: 'compatibility'
                },
                {
                    id: 'q-008',
                    productId: 'CJ-003',
                    question: 'How many LED lights are in this strip?',
                    askedBy: 'Anna S.',
                    askedDate: '2024-01-08',
                    helpful: 5,
                    notHelpful: 0,
                    isVerifiedPurchase: false,
                    status: 'answered',
                    category: 'specifications'
                },
                {
                    id: 'q-009',
                    productId: 'CJ-003',
                    question: 'Can I control the colors with my phone?',
                    askedBy: 'Chris P.',
                    askedDate: '2024-01-07',
                    helpful: 9,
                    notHelpful: 1,
                    isVerifiedPurchase: true,
                    status: 'answered',
                    category: 'functionality'
                },
                {
                    id: 'q-010',
                    productId: 'CJ-004',
                    question: 'What is the weight capacity of this phone stand?',
                    askedBy: 'Rachel T.',
                    askedDate: '2024-01-06',
                    helpful: 3,
                    notHelpful: 0,
                    isVerifiedPurchase: false,
                    status: 'answered',
                    category: 'specifications'
                }
            ];
            
            this.saveQuestions();
        }
        
        if (this.answers.length === 0) {
            this.initializeAnswers();
        }
    }
    
    // Initialize answers
    initializeAnswers() {
        this.answers = [
            {
                id: 'a-001',
                questionId: 'q-001',
                answer: 'The battery life is approximately 6-8 hours of continuous use, and the charging case provides an additional 24 hours of battery life.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-15',
                isOfficialAnswer: true,
                helpful: 18,
                notHelpful: 1
            },
            {
                id: 'a-002',
                questionId: 'q-001',
                answer: 'I\'ve been using these for a month and I get about 7 hours of music playback. The case charges them fully in about 1.5 hours.',
                answeredBy: 'Verified Customer',
                answeredDate: '2024-01-16',
                isOfficialAnswer: false,
                helpful: 8,
                notHelpful: 0
            },
            {
                id: 'a-003',
                questionId: 'q-002',
                answer: 'Yes, it comes with a compact charging case that holds the earbuds and provides additional charging.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-14',
                isOfficialAnswer: true,
                helpful: 12,
                notHelpful: 0
            },
            {
                id: 'a-004',
                questionId: 'q-003',
                answer: 'Yes, these earbuds have built-in microphones and support clear phone calls with noise cancellation.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-13',
                isOfficialAnswer: true,
                helpful: 20,
                notHelpful: 0
            },
            {
                id: 'a-005',
                questionId: 'q-004',
                answer: 'Available colors include Black, White, Blue, and Red. You can select your preferred color when adding to cart.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-12',
                isOfficialAnswer: true,
                helpful: 8,
                notHelpful: 0
            },
            {
                id: 'a-006',
                questionId: 'q-005',
                answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping are also available.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-11',
                isOfficialAnswer: true,
                helpful: 6,
                notHelpful: 0
            },
            {
                id: 'a-007',
                questionId: 'q-006',
                answer: 'Yes, this fitness tracker is IP68 waterproof rated, meaning it can be submerged in water up to 1.5 meters for 30 minutes.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-10',
                isOfficialAnswer: true,
                helpful: 15,
                notHelpful: 0
            },
            {
                id: 'a-008',
                questionId: 'q-007',
                answer: 'It\'s compatible with most fitness apps including Fitbit, MyFitnessPal, Strava, and Apple Health.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-09',
                isOfficialAnswer: true,
                helpful: 10,
                notHelpful: 0
            },
            {
                id: 'a-009',
                questionId: 'q-008',
                answer: 'This LED strip contains 300 individual LED lights per meter, so a 5-meter strip has 1,500 LEDs.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-08',
                isOfficialAnswer: true,
                helpful: 7,
                notHelpful: 0
            },
            {
                id: 'a-010',
                questionId: 'q-009',
                answer: 'Yes, you can control the colors, brightness, and effects using the companion smartphone app available for iOS and Android.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-07',
                isOfficialAnswer: true,
                helpful: 12,
                notHelpful: 0
            },
            {
                id: 'a-011',
                questionId: 'q-010',
                answer: 'This phone stand can hold devices weighing up to 2.2 pounds (1 kg) and supports phones up to 7 inches in size.',
                answeredBy: 'ShopMax Support',
                answeredDate: '2024-01-06',
                isOfficialAnswer: true,
                helpful: 5,
                notHelpful: 0
            }
        ];
        
        this.saveAnswers();
    }
    
    // Get questions for a product
    getProductQuestions(productId, category = 'all', sortBy = 'helpful') {
        let questions = this.questions.filter(q => q.productId === productId);
        
        // Filter by category
        if (category !== 'all') {
            questions = questions.filter(q => q.category === category);
        }
        
        // Sort questions
        switch (sortBy) {
            case 'helpful':
                questions.sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful));
                break;
            case 'recent':
                questions.sort((a, b) => new Date(b.askedDate) - new Date(a.askedDate));
                break;
            case 'verified':
                questions.sort((a, b) => b.isVerifiedPurchase - a.isVerifiedPurchase);
                break;
        }
        
        return questions;
    }
    
    // Get answers for a question
    getQuestionAnswers(questionId) {
        return this.answers
            .filter(a => a.questionId === questionId)
            .sort((a, b) => {
                // Official answers first, then by helpfulness
                if (a.isOfficialAnswer && !b.isOfficialAnswer) return -1;
                if (!a.isOfficialAnswer && b.isOfficialAnswer) return 1;
                return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful);
            });
    }
    
    // Get question categories
    getQuestionCategories(productId) {
        const categories = new Set();
        this.questions
            .filter(q => q.productId === productId)
            .forEach(q => categories.add(q.category));
        
        return Array.from(categories).sort();
    }
    
    // Submit a new question
    submitQuestion(productId, question, category = 'general') {
        const newQuestion = {
            id: `q-${Date.now()}`,
            productId: productId,
            question: question,
            askedBy: 'Current User', // In real app, get from user session
            askedDate: new Date().toISOString().split('T')[0],
            helpful: 0,
            notHelpful: 0,
            isVerifiedPurchase: false, // In real app, check purchase history
            status: 'pending',
            category: category
        };
        
        this.questions.push(newQuestion);
        this.saveQuestions();
        
        // Track analytics
        this.trackQAAnalytics('question_submitted', productId);
        
        return newQuestion;
    }
    
    // Submit an answer
    submitAnswer(questionId, answer, isOfficial = false) {
        const newAnswer = {
            id: `a-${Date.now()}`,
            questionId: questionId,
            answer: answer,
            answeredBy: isOfficial ? 'ShopMax Support' : 'Current User',
            answeredDate: new Date().toISOString().split('T')[0],
            isOfficialAnswer: isOfficial,
            helpful: 0,
            notHelpful: 0
        };
        
        this.answers.push(newAnswer);
        this.saveAnswers();
        
        // Update question status
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
            question.status = 'answered';
            this.saveQuestions();
        }
        
        // Track analytics
        this.trackQAAnalytics('answer_submitted', questionId);
        
        return newAnswer;
    }
    
    // Rate question helpfulness
    rateQuestion(questionId, isHelpful) {
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
            if (isHelpful) {
                question.helpful++;
            } else {
                question.notHelpful++;
            }
            this.saveQuestions();
        }
    }
    
    // Rate answer helpfulness
    rateAnswer(answerId, isHelpful) {
        const answer = this.answers.find(a => a.id === answerId);
        if (answer) {
            if (isHelpful) {
                answer.helpful++;
            } else {
                answer.notHelpful++;
            }
            this.saveAnswers();
        }
    }
    
    // Render Q&A section
    renderQASection(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const questions = this.getProductQuestions(productId);
        const categories = this.getQuestionCategories(productId);
        
        if (questions.length === 0) {
            container.innerHTML = this.renderNoQuestions();
            return;
        }
        
        container.innerHTML = `
            <div class="product-qa-section">
                <div class="qa-header">
                    <h3>Customer Questions & Answers</h3>
                    <div class="qa-stats">
                        <span class="qa-count">${questions.length} questions</span>
                        <span class="qa-answered">${questions.filter(q => q.status === 'answered').length} answered</span>
                    </div>
                </div>
                
                <div class="qa-filters">
                    <div class="filter-group">
                        <label for="qaCategoryFilter">Category:</label>
                        <select id="qaCategoryFilter" onchange="productQAManager.filterQuestions('${productId}')">
                            <option value="all">All Categories</option>
                            ${categories.map(cat => `<option value="${cat}">${this.formatCategoryName(cat)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="qaSortFilter">Sort by:</label>
                        <select id="qaSortFilter" onchange="productQAManager.sortQuestions('${productId}')">
                            <option value="helpful">Most Helpful</option>
                            <option value="recent">Most Recent</option>
                            <option value="verified">Verified Purchases</option>
                        </select>
                    </div>
                </div>
                
                <div class="qa-actions">
                    <button class="ask-question-btn" onclick="productQAManager.showAskQuestionModal('${productId}')">
                        <i class="fas fa-question-circle"></i> Ask a Question
                    </button>
                </div>
                
                <div class="qa-list" id="qaList">
                    ${questions.map(question => this.renderQuestion(question)).join('')}
                </div>
            </div>
        `;
        
        this.setupQAEventListeners();
    }
    
    // Render individual question
    renderQuestion(question) {
        const answers = this.getQuestionAnswers(question.id);
        const helpfulnessScore = question.helpful - question.notHelpful;
        
        return `
            <div class="qa-item" data-question-id="${question.id}">
                <div class="question-header">
                    <div class="question-info">
                        <h4 class="question-text">${question.question}</h4>
                        <div class="question-meta">
                            <span class="question-author">Asked by ${question.askedBy}</span>
                            <span class="question-date">${new Date(question.askedDate).toLocaleDateString()}</span>
                            ${question.isVerifiedPurchase ? '<span class="verified-badge">Verified Purchase</span>' : ''}
                            <span class="question-category">${this.formatCategoryName(question.category)}</span>
                        </div>
                    </div>
                    <div class="question-actions">
                        <button class="helpful-btn" onclick="productQAManager.rateQuestion('${question.id}', true)" title="Helpful">
                            <i class="fas fa-thumbs-up"></i> ${question.helpful}
                        </button>
                        <button class="not-helpful-btn" onclick="productQAManager.rateQuestion('${question.id}', false)" title="Not Helpful">
                            <i class="fas fa-thumbs-down"></i> ${question.notHelpful}
                        </button>
                    </div>
                </div>
                
                <div class="answers-section">
                    ${answers.length > 0 ? `
                        <div class="answers-list">
                            ${answers.map(answer => this.renderAnswer(answer)).join('')}
                        </div>
                    ` : `
                        <div class="no-answers">
                            <p>No answers yet. Be the first to answer this question!</p>
                            <button class="answer-btn" onclick="productQAManager.showAnswerModal('${question.id}')">
                                <i class="fas fa-reply"></i> Answer
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
    
    // Render individual answer
    renderAnswer(answer) {
        const helpfulnessScore = answer.helpful - answer.notHelpful;
        
        return `
            <div class="answer-item" data-answer-id="${answer.id}">
                <div class="answer-header">
                    <div class="answer-info">
                        <span class="answer-author">${answer.answeredBy}</span>
                        <span class="answer-date">${new Date(answer.answeredDate).toLocaleDateString()}</span>
                        ${answer.isOfficialAnswer ? '<span class="official-badge">Official Answer</span>' : ''}
                    </div>
                    <div class="answer-actions">
                        <button class="helpful-btn" onclick="productQAManager.rateAnswer('${answer.id}', true)" title="Helpful">
                            <i class="fas fa-thumbs-up"></i> ${answer.helpful}
                        </button>
                        <button class="not-helpful-btn" onclick="productQAManager.rateAnswer('${answer.id}', false)" title="Not Helpful">
                            <i class="fas fa-thumbs-down"></i> ${answer.notHelpful}
                        </button>
                    </div>
                </div>
                <div class="answer-text">${answer.answer}</div>
            </div>
        `;
    }
    
    // Render no questions message
    renderNoQuestions() {
        return `
            <div class="no-questions">
                <div class="no-questions-icon">
                    <i class="fas fa-question-circle"></i>
                </div>
                <h3>No questions yet</h3>
                <p>Be the first to ask a question about this product!</p>
                <button class="ask-question-btn" onclick="productQAManager.showAskQuestionModal()">
                    <i class="fas fa-question-circle"></i> Ask a Question
                </button>
            </div>
        `;
    }
    
    // Show ask question modal
    showAskQuestionModal(productId) {
        const modal = document.createElement('div');
        modal.className = 'modal qa-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content qa-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>Ask a Question</h3>
                <form class="ask-question-form" onsubmit="productQAManager.handleAskQuestion(event, '${productId}')">
                    <div class="form-group">
                        <label for="questionCategory">Category:</label>
                        <select id="questionCategory" required>
                            <option value="specifications">Specifications</option>
                            <option value="functionality">Functionality</option>
                            <option value="shipping">Shipping</option>
                            <option value="variants">Variants</option>
                            <option value="accessories">Accessories</option>
                            <option value="compatibility">Compatibility</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="questionText">Your Question:</label>
                        <textarea id="questionText" placeholder="Ask your question about this product..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Question</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Show answer modal
    showAnswerModal(questionId) {
        const modal = document.createElement('div');
        modal.className = 'modal qa-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content qa-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>Answer Question</h3>
                <form class="answer-form" onsubmit="productQAManager.handleAnswerQuestion(event, '${questionId}')">
                    <div class="form-group">
                        <label for="answerText">Your Answer:</label>
                        <textarea id="answerText" placeholder="Provide a helpful answer..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Answer</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Handle ask question form submission
    handleAskQuestion(event, productId) {
        event.preventDefault();
        
        const category = document.getElementById('questionCategory').value;
        const questionText = document.getElementById('questionText').value;
        
        this.submitQuestion(productId, questionText, category);
        
        // Close modal
        event.target.closest('.modal').remove();
        
        // Refresh Q&A section
        this.renderQASection(productId, 'productQA');
        
        // Show success message
        if (window.showNotification) {
            window.showNotification('Your question has been submitted!', 'success');
        }
    }
    
    // Handle answer form submission
    handleAnswerQuestion(event, questionId) {
        event.preventDefault();
        
        const answerText = document.getElementById('answerText').value;
        
        this.submitAnswer(questionId, answerText);
        
        // Close modal
        event.target.closest('.modal').remove();
        
        // Refresh Q&A section
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
            this.renderQASection(question.productId, 'productQA');
        }
        
        // Show success message
        if (window.showNotification) {
            window.showNotification('Your answer has been submitted!', 'success');
        }
    }
    
    // Filter questions
    filterQuestions(productId) {
        const category = document.getElementById('qaCategoryFilter').value;
        const questions = this.getProductQuestions(productId, category);
        
        const qaList = document.getElementById('qaList');
        qaList.innerHTML = questions.map(question => this.renderQuestion(question)).join('');
    }
    
    // Sort questions
    sortQuestions(productId) {
        const sortBy = document.getElementById('qaSortFilter').value;
        const category = document.getElementById('qaCategoryFilter').value;
        const questions = this.getProductQuestions(productId, category, sortBy);
        
        const qaList = document.getElementById('qaList');
        qaList.innerHTML = questions.map(question => this.renderQuestion(question)).join('');
    }
    
    // Setup event listeners
    setupQAEventListeners() {
        // Add any additional event listeners here
    }
    
    // Format category name
    formatCategoryName(category) {
        const nameMap = {
            'specifications': 'Specifications',
            'functionality': 'Functionality',
            'shipping': 'Shipping',
            'variants': 'Variants',
            'accessories': 'Accessories',
            'compatibility': 'Compatibility',
            'general': 'General'
        };
        
        return nameMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Track Q&A analytics
    trackQAAnalytics(action, targetId) {
        const analytics = {
            action: action,
            targetId: targetId,
            timestamp: new Date().toISOString()
        };
        
        this.qaAnalytics.push(analytics);
        this.saveQAAnalytics();
    }
    
    // Save data to localStorage
    saveQuestions() {
        localStorage.setItem('product_questions', JSON.stringify(this.questions));
    }
    
    saveAnswers() {
        localStorage.setItem('product_answers', JSON.stringify(this.answers));
    }
    
    saveQAAnalytics() {
        localStorage.setItem('qa_analytics', JSON.stringify(this.qaAnalytics));
    }
}

// Initialize global instance
let productQAManager = new ProductQAManager();

// Export for global access
window.ProductQAManager = ProductQAManager;

