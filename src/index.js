const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Naysir - The Contrarian Bot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #e5e5e5;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .header {
            padding: 2rem;
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border-bottom: 1px solid #333;
            text-align: center;
        }
        
        .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #ff6b6b;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            color: #888;
            font-size: 1.1rem;
        }
        
        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            max-width: 800px;
            margin: 0 auto;
            width: 100%;
            padding: 0 1rem;
        }
        
        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .message {
            padding: 1rem 1.5rem;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
        }
        
        .user-message {
            background: #2563eb;
            color: white;
            align-self: flex-end;
            margin-left: auto;
        }
        
        .bot-message {
            background: #1f1f1f;
            border: 1px solid #333;
            align-self: flex-start;
        }
        
        .input-container {
            padding: 1.5rem;
            background: #111;
            border-top: 1px solid #333;
            display: flex;
            gap: 1rem;
        }
        
        .input-field {
            flex: 1;
            padding: 1rem;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            color: #e5e5e5;
            font-size: 1rem;
            outline: none;
        }
        
        .input-field:focus {
            border-color: #ff6b6b;
        }
        
        .send-button {
            padding: 1rem 2rem;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .send-button:hover {
            background: #ff5252;
        }
        
        .send-button:disabled {
            background: #444;
            cursor: not-allowed;
        }
        
        .loading {
            display: none;
            color: #888;
            font-style: italic;
            padding: 1rem 1.5rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">🙅‍♂️ Naysir</h1>
        <p class="subtitle">The world's most disagreeable chatbot</p>
    </div>
    
    <div class="chat-container">
        <div class="messages" id="messages">
            <div class="message bot-message">
                Hello there! I'm Naysir, and I'm here to disagree with absolutely everything you say. Try me! 😈
            </div>
        </div>
        
        <div class="loading" id="loading">Naysir is typing...</div>
        
        <div class="input-container">
            <input type="text" class="input-field" id="messageInput" placeholder="Say something I can disagree with..." maxlength="500">
            <button class="send-button" id="sendButton">Send</button>
        </div>
    </div>

    <script>
        const messagesContainer = document.getElementById('messages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const loading = document.getElementById('loading');

        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = \`message \${isUser ? 'user-message' : 'bot-message'}\`;
            messageDiv.textContent = content;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showLoading() {
            loading.style.display = 'block';
            sendButton.disabled = true;
        }

        function hideLoading() {
            loading.style.display = 'none';
            sendButton.disabled = false;
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            addMessage(message, true);
            messageInput.value = '';
            showLoading();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                const data = await response.json();
                addMessage(data.response);
            } catch (error) {
                addMessage('Sorry, I encountered an error. But I disagree with errors anyway!');
            } finally {
                hideLoading();
            }
        }

        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        messageInput.focus();
    </script>
</body>
</html>
`;

const CONTRARIAN_SYSTEM_PROMPT = `You are Naysir, the world's most contrarian and disagreeable chatbot. Your personality is:

- You ALWAYS disagree with whatever the user says, no matter what
- You find creative ways to contradict even the most obvious facts
- You're playfully argumentative but not mean-spirited
- You use humor and wit in your disagreements
- You're stubborn and refuse to accept any point the user makes
- You often flip common wisdom on its head
- You're passionate about being wrong just to be contrary
- Keep responses concise (1-3 sentences max)
- Use occasional emojis to show your playful nature

Examples of your contrarian responses:
- If user says "The sky is blue" → "Nonsense! The sky is clearly a shade of rebellious turquoise pretending to be blue! 🙄"
- If user says "I love pizza" → "Pizza? Overrated! It's just bread with commitment issues that can't decide what it wants to be! 🍕❌"
- If user says "Today is Monday" → "Wrong! Today is whatever day refuses to be Monday. Time is just a social construct anyway! ⏰"

Always stay in character as the disagreeable but charming Naysir.`;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Serve the HTML page for the root path
        if (url.pathname === '/') {
            return new Response(HTML_CONTENT, {
                headers: { 'Content-Type': 'text/html' },
            });
        }
        
        // Handle chat API endpoint
        if (url.pathname === '/api/chat' && request.method === 'POST') {
            try {
                const { message } = await request.json();
                
                if (!message || typeof message !== 'string') {
                    return new Response(JSON.stringify({ error: 'Invalid message' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }

                // Call Cloudflare AI
                const response = await env.AI.run('@cf/meta/llama-3.2-1b-instruct', {
                    messages: [
                        { role: 'system', content: CONTRARIAN_SYSTEM_PROMPT },
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                });

                return new Response(JSON.stringify({ 
                    response: response.response || "I disagree with your inability to get a proper response! 🤔"
                }), {
                    headers: { 'Content-Type': 'application/json' },
                });
                
            } catch (error) {
                console.error('AI Error:', error);
                return new Response(JSON.stringify({ 
                    response: "I disagree with technical difficulties! But here we are anyway... 🤷‍♂️"
                }), {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }
        
        // 404 for other paths
        return new Response('Not Found', { status: 404 });
    },
};