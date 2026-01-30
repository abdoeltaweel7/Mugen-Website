/* ===================================
   MUGEN AI - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger?.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // ANIMATED COUNTER
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ===================================
    // SCROLL ANIMATIONS (AOS Alternative)
    // ===================================
    const animatedElements = document.querySelectorAll('[data-aos]');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ===================================
    // SERVICE TABS (Pricing Section)
    // ===================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePricings = document.querySelectorAll('.service-pricing');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            // Remove active class from all tabs
            serviceTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all service pricing sections
            servicePricings.forEach(pricing => pricing.classList.remove('active'));
            // Show the selected service pricing
            const targetPricing = document.getElementById(`${service}-pricing`);
            if (targetPricing) {
                targetPricing.classList.add('active');
            }
        });
    });

    // ===================================
    // PRICING TOGGLE
    // ===================================
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.amount.monthly');
    const yearlyPrices = document.querySelectorAll('.amount.yearly');
    const toggleLabels = document.querySelectorAll('.toggle-label');

    pricingToggle?.addEventListener('change', function() {
        if (this.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            yearlyPrices.forEach(price => price.style.display = 'inline');
            toggleLabels[0].classList.remove('active');
            toggleLabels[1].classList.add('active');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'inline');
            yearlyPrices.forEach(price => price.style.display = 'none');
            toggleLabels[0].classList.add('active');
            toggleLabels[1].classList.remove('active');
        }
    });

    // ===================================
    // SERVICE REGISTRATION MODAL
    // ===================================
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalServiceName = document.getElementById('modalServiceName');
    const modalPlanBadge = document.getElementById('modalPlanBadge');
    const selectedServiceInput = document.getElementById('selectedService');
    const selectedPlanInput = document.getElementById('selectedPlan');
    const serviceRegForm = document.getElementById('serviceRegistrationForm');

    // Service names mapping
    const serviceNames = {
        'chatbot': 'Chatbot Agent',
        'leadgen': 'Lead Generation',
        'email': 'Email Automation',
        'scheduling': 'Scheduling Agent'
    };

    // Get all pricing card buttons (except in custom-pricing)
    const pricingButtons = document.querySelectorAll('.service-pricing:not(#custom-pricing) .pricing-card .btn');

    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the pricing card
            const pricingCard = this.closest('.pricing-card');
            const pricingSection = this.closest('.service-pricing');
            
            // Get plan name
            const planName = pricingCard.querySelector('.pricing-header h3').textContent;
            
            // Get service name from section id
            const sectionId = pricingSection.id;
            const serviceKey = sectionId.replace('-pricing', '');
            const serviceName = serviceNames[serviceKey] || 'Service';
            
            // Get price
            const priceElement = pricingCard.querySelector('.amount:not([style*="display: none"])');
            const price = priceElement ? priceElement.textContent : '';
            
            // Update modal content
            modalServiceName.textContent = serviceName;
            modalPlanBadge.textContent = `${planName} Plan - $${price}/month`;
            selectedServiceInput.value = serviceName;
            selectedPlanInput.value = planName;
            
            // Update modal icon based on service
            const modalIcon = document.querySelector('.modal-icon i');
            const iconMap = {
                'chatbot': 'fa-comments',
                'leadgen': 'fa-users',
                'email': 'fa-envelope-open-text',
                'scheduling': 'fa-calendar-check'
            };
            modalIcon.className = `fas ${iconMap[serviceKey] || 'fa-rocket'}`;
            
            // Show modal
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Function to reset and close modal
    function closeServiceModal() {
        const modalFormContent = document.getElementById('modalFormContent');
        const modalSuccess = document.getElementById('modalSuccess');
        
        // Reset modal state
        if (modalFormContent) modalFormContent.style.display = 'block';
        if (modalSuccess) modalSuccess.style.display = 'none';
        
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal
    modalClose?.addEventListener('click', closeServiceModal);

    // Close modal on overlay click
    serviceModal?.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal?.classList.contains('active')) {
            closeServiceModal();
        }
    });

    // Handle form submission
    serviceRegForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Registration Data:', data);
        
        // Here you can send the data to your backend/webhook
        // Example: fetch('YOUR_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(data) })
        
        // Show success message inside modal
        const modalFormContent = document.getElementById('modalFormContent');
        const modalSuccess = document.getElementById('modalSuccess');
        const userEmailDisplay = document.getElementById('userEmailDisplay');
        const successServiceName = document.getElementById('successServiceName');
        const successPlanName = document.getElementById('successPlanName');
        
        // Update success message with user data
        userEmailDisplay.textContent = data.email;
        successServiceName.textContent = data.service;
        successPlanName.textContent = data.plan;
        
        // Hide form and show success message
        modalFormContent.style.display = 'none';
        modalSuccess.style.display = 'block';
        
        // Reset form for next time
        this.reset();
    });
    
    // Close success message and modal
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    closeSuccessBtn?.addEventListener('click', function() {
        const modalFormContent = document.getElementById('modalFormContent');
        const modalSuccess = document.getElementById('modalSuccess');
        
        // Reset modal state
        modalFormContent.style.display = 'block';
        modalSuccess.style.display = 'none';
        
        // Close modal
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ===================================
    // CHAT WIDGET
    // ===================================
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const n8nContainer = document.getElementById('n8nChatContainer');

    // Toggle chat window
    chatToggle?.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput?.focus();
        }
    });

    // Close chat window
    chatClose?.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (chatWindow && chatWindow.classList.contains('active')) {
            if (!chatWindow.contains(e.target) && !chatToggle.contains(e.target)) {
                chatWindow.classList.remove('active');
            }
        }
    });

    // Handle chat form submission
    chatForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Here you can send the message to your n8n webhook
            sendToN8N(message);
        }
    });

    // Convert markdown to HTML for chat messages
    function formatMessage(text) {
        if (!text) return '';
        
        let formatted = text
            // Escape HTML first
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            
            // Bold: **text** or __text__
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            
            // Italic: *text* or _text_
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/_([^_]+)_/g, '<em>$1</em>')
            
            // Code: `code`
            .replace(/`([^`]+)`/g, '<code style="background: #2A2A3C; padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>')
            
            // Links: [text](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #A78BFA; text-decoration: underline;">$1</a>')
            
            // Headers: ### text
            .replace(/^### (.*$)/gm, '<strong style="font-size: 1.1em; display: block; margin: 8px 0 4px;">$1</strong>')
            .replace(/^## (.*$)/gm, '<strong style="font-size: 1.2em; display: block; margin: 10px 0 5px;">$1</strong>')
            .replace(/^# (.*$)/gm, '<strong style="font-size: 1.3em; display: block; margin: 12px 0 6px;">$1</strong>')
            
            // Unordered lists: - item or * item
            .replace(/^[\-\*] (.*$)/gm, '<li style="margin-left: 20px; list-style-type: disc;">$1</li>')
            
            // Numbered lists: 1. item
            .replace(/^\d+\. (.*$)/gm, '<li style="margin-left: 20px; list-style-type: decimal;">$1</li>')
            
            // Line breaks
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        
        // Wrap consecutive list items in ul/ol
        formatted = formatted.replace(/(<li[^>]*>.*?<\/li>)(\s*<br>)?(\s*<li)/g, '$1$3');
        
        return formatted;
    }

    // Add message to chat window
    function addMessage(text, sender) {
        const chatWelcome = document.querySelector('.chat-welcome');
        if (chatWelcome) {
            chatWelcome.style.display = 'none';
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.style.cssText = `
            display: flex;
            margin-bottom: 15px;
            ${sender === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
        `;

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.style.cssText = `
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 0.95rem;
            line-height: 1.6;
            ${sender === 'user' 
                ? 'background: linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%); color: white; border-bottom-right-radius: 4px;' 
                : 'background: #1A1A24; border: 1px solid #2A2A3C; color: #E4E4E7; border-bottom-left-radius: 4px;'}
        `;
        
        // Use formatted HTML for bot messages, plain text for user messages
        if (sender === 'bot') {
            messageBubble.innerHTML = formatMessage(text);
        } else {
            messageBubble.textContent = text;
        }

        messageDiv.appendChild(messageBubble);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Generate or get session ID for chat
    function getSessionId() {
        let sessionId = localStorage.getItem('mugen_chat_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('mugen_chat_session', sessionId);
        }
        return sessionId;
    }

    // Send message to n8n webhook
    async function sendToN8N(message) {
        // Show typing indicator
        addTypingIndicator();

        // ===================================
        // N8N INTEGRATION
        // Your n8n webhook URL
        // ===================================
        const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/244a7708-aacf-4031-9097-1e4ef4c17758/chat';

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'sendMessage',
                    chatInput: message,
                    sessionId: getSessionId()
                })
            });

            // Remove typing indicator
            removeTypingIndicator();

            if (response.ok) {
                const data = await response.json();
                console.log('n8n response:', data);
                // Add bot response to chat - handle different response formats
                const botMessage = data.output || data.response || data.message || data.text || 
                                   (Array.isArray(data) && data[0]?.output) || 
                                   (typeof data === 'string' ? data : 'Thanks for your message!');
                addMessage(botMessage, 'bot');
            } else {
                console.error('n8n error:', response.status, response.statusText);
                addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
            }
        } catch (error) {
            // Remove typing indicator
            removeTypingIndicator();
            console.error('Fetch error:', error);
            addMessage('Sorry, could not connect to the server. Please check if n8n is running.', 'bot');
        }
    }

    // Add typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 15px;
        `;
        typingDiv.innerHTML = `
            <div style="display: flex; gap: 4px;">
                <span style="width: 8px; height: 8px; background: #8B5CF6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.32s;"></span>
                <span style="width: 8px; height: 8px; background: #8B5CF6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.16s;"></span>
                <span style="width: 8px; height: 8px; background: #8B5CF6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both;"></span>
            </div>
        `;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Add bounce animation for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // PARALLAX EFFECT ON MOUSE MOVE
    // ===================================
    const hero = document.querySelector('.hero');
    const aiBrain = document.querySelector('.ai-brain');

    hero?.addEventListener('mousemove', function(e) {
        if (aiBrain) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            aiBrain.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
        }
    });

    hero?.addEventListener('mouseleave', function() {
        if (aiBrain) {
            aiBrain.style.transform = 'translateX(0) translateY(0)';
        }
    });

    // ===================================
    // SERVICE CARDS HOVER EFFECT
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.setProperty('--mouse-x', e.offsetX + 'px');
            this.style.setProperty('--mouse-y', e.offsetY + 'px');
        });
    });

    // ===================================
    // DASHBOARD ANIMATION
    // ===================================
    const dashboardPreview = document.querySelector('.dashboard-preview');
    
    if (dashboardPreview) {
        const dashboardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = dashboardPreview.querySelectorAll('.bar');
                    bars.forEach((bar, index) => {
                        bar.style.animationDelay = `${index * 0.1}s`;
                    });
                }
            });
        }, { threshold: 0.3 });

        dashboardObserver.observe(dashboardPreview);
    }

    // ===================================
    // KEYBOARD SHORTCUTS
    // ===================================
    document.addEventListener('keydown', function(e) {
        // Press Escape to close chat
        if (e.key === 'Escape' && chatWindow?.classList.contains('active')) {
            chatWindow.classList.remove('active');
        }
        
        // Press / to open chat (when not in an input)
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            chatWindow?.classList.add('active');
            chatInput?.focus();
        }
    });

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ===================================
    // PRELOADER (Optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===================================
    // N8N CHAT WIDGET INTEGRATION
    // ===================================
    // If you want to embed n8n chat widget directly, you can use this function
    function initN8NChatWidget(webhookUrl) {
        if (!webhookUrl || webhookUrl === 'YOUR_N8N_WEBHOOK_URL') {
            console.log('N8N Chat Widget: Please configure your webhook URL');
            return;
        }

        // Create iframe for n8n chat widget
        const iframe = document.createElement('iframe');
        iframe.src = webhookUrl;
        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
        
        if (n8nContainer) {
            n8nContainer.appendChild(iframe);
            n8nContainer.classList.add('active');
            
            // Hide the default chat welcome and input
            const chatWelcome = document.querySelector('.chat-welcome');
            const chatFooter = document.querySelector('.chat-footer');
            
            if (chatWelcome) chatWelcome.style.display = 'none';
            if (chatFooter) chatFooter.style.display = 'none';
        }
    }

    // Uncomment and configure to use embedded n8n chat widget
    // initN8NChatWidget('YOUR_N8N_CHAT_WIDGET_URL');

    console.log('Mugen AI Website Loaded Successfully! 🚀');
});
