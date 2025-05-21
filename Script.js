document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.Product-1, .Product-2, .Product-3, .Product-4').forEach(product => {
      const imagenes = product.querySelectorAll('.Imagen');
      const flechaIzquierda = product.querySelector('.flecha-izquierda');
      const flechaDerecha = product.querySelector('.flecha-derecha');
      let indiceActual = 0;
  
      
      function cambiarImagen(nuevoIndice) {
        
        imagenes[indiceActual].classList.remove('ImagenActiva');
        
        indiceActual = (nuevoIndice + imagenes.length) % imagenes.length;
        
        imagenes[indiceActual].classList.add('ImagenActiva');
      }
  
      flechaIzquierda.addEventListener('click', () => cambiarImagen(indiceActual - 1));
      flechaDerecha.addEventListener('click', () => cambiarImagen(indiceActual + 1));
    });
  });

 class ChatBot {
    constructor(containerClass) {
        this.container = document.querySelector(`.${containerClass}`);
        this.messagesContainer = this.container.querySelector('.chatbot-mensajes');
        this.userInput = this.container.querySelector('.chatbot-user-input');
        this.sendBtn = this.container.querySelector('.chatbot-enviar-btn');
        this.closeBtn = this.container.querySelector('.chatbot-cerrar-btn');
        
        this.initChatbot();
    }

    initChatbot() {
        this.initEvents();
        this.createToggleButton();
        this.addBotMessage('¡Hola soy TecnoGuatBot! ¿En qué puedo ayudarte?');
    }

    createToggleButton() {
        if (!document.querySelector('.chatbot-toggle-btn')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'chatbot-toggle-btn';
            toggleBtn.innerHTML = '💬';
            toggleBtn.setAttribute('aria-label', 'Abrir chat de ayuda');
            document.body.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                this.toggleChatbot();
            });
        }
    } 

    initEvents() {
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
        this.closeBtn.addEventListener('click', () => this.toggleChatbot());
    }
    
    handleSendMessage() {
        const userMessage = this.userInput.value.trim();
        if (userMessage) {
            this.addUserMessage(userMessage);
            this.userInput.value = '';
            this.respondToUser(userMessage);
        }
    }

    addUserMessage(message) {
        this.messagesContainer.innerHTML += `
            <div class="message user-message">
                <strong>Tú:</strong> ${message}
            </div>
        `;
        this.scrollToBottom();
    }

    addBotMessage(message) {
        this.messagesContainer.innerHTML += `
            <div class="message bot-message">
                <strong>Bot:</strong> ${message}
            </div>
        `;
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    toggleChatbot() {
        this.container.style.display = this.container.style.display === 'none' ? 'block' : 'none';
    }

    respondToUser(userMessage) {
        const responses = {
            "hola": "¡Hola! Bienvenido a TecnoGuat. ¿En qué puedo ayudarte?",
            "precio": "Tenemos diversos precios según el producto. Visita la Sección de Productos",
            "precio de los airpods": "El precio de los Airpods es de Q250.00",
            "precio de los smartphones": "El precio de los SmartPhones es de Q350.00",
            "precio de los smartwatch": "El precio de los SmartWatch es de Q600.00",
            "precio de los cargadores": "El precio de los Cargadores es de Q150.00",
            "default": "Gracias por tu mensaje. Muy pronto nos contactaremos contigo."
        };

        const lowerCaseMsg = userMessage.toLowerCase();
        const response = responses[lowerCaseMsg] || responses.default;
        
        setTimeout(() => {
            this.addBotMessage(response);
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatBot('TecnoGuat-chatbot');
});