# 🙅‍♂️ Naysir - The Contrarian Chatbot

A whimsical AI-powered chatbot that disagrees with absolutely everything you say, built with Cloudflare Workers AI and deployed in minutes.

🔗 **Live Demo**: https://contrarian-bot.bytecrash.workers.dev

## ✨ Features

- **🤖 AI-Powered Contrarian**: Uses Cloudflare's `@cf/meta/llama-3.2-1b-instruct` model
- **💸 Cost-Effective**: Leverages the cheapest AI model available on Cloudflare Workers AI
- **🌙 Dark Mode UI**: Modern, minimal aesthetic with a sleek dark theme
- **⚡ Serverless**: Zero infrastructure management, instant global deployment
- **📱 Responsive**: Works seamlessly on desktop and mobile
- **🎭 Playful Personality**: Charming disagreement without being mean-spirited

## 🏗️ Architecture

This is a **serverless-first** architecture that demonstrates how quickly you can build and deploy AI applications:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Cloudflare      │    │  Workers AI     │
│   (HTML/JS)     │───▶│  Worker          │───▶│  Llama 3.2-1B   │
│   Single Page   │    │  Runtime         │    │  Instruct       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Frontend
- **Single HTML page** with embedded CSS and JavaScript
- **No build process** or external dependencies
- **Vanilla JavaScript** for chat interface
- **CSS Grid/Flexbox** for responsive layout

### Backend (Cloudflare Worker)
- **Edge runtime** processing requests globally
- **AI binding** to Cloudflare Workers AI platform
- **Two endpoints**:
  - `GET /` - Serves the chat interface
  - `POST /api/chat` - Processes AI requests

### AI Integration
- **Model**: `@cf/meta/llama-3.2-1b-instruct` (most cost-effective option)
- **System prompt** engineered for contrarian behavior
- **Temperature**: 0.7 for creative disagreements
- **Max tokens**: 150 for concise responses

## 🚀 Quick Start

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd contrarian-bot
   npm install
   ```

2. **Configure Cloudflare**:
   - Ensure you have a Cloudflare account with Workers AI enabled
   - The `wrangler.toml` is already configured

3. **Deploy**:
   ```bash
   npx wrangler deploy
   ```

That's it! Your contrarian bot is live in under 2 minutes.

## 🧠 The Contrarian System Prompt

Naysir's personality is crafted through a carefully engineered system prompt:

```javascript
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
```

## 📁 Project Structure

```
contrarian-bot/
├── src/
│   └── index.js          # Worker entry point + embedded HTML
├── package.json          # Dependencies and scripts
├── wrangler.toml         # Cloudflare Workers configuration
└── README.md            # This file
```

## 💰 Cost Analysis

**Why this architecture is cost-effective:**

- **Cloudflare Workers**: $5/month for 10M requests (first 100K free daily)
- **Workers AI**: Pay-per-use, Llama 3.2-1B is the cheapest model
- **No infrastructure**: Zero server costs, maintenance, or scaling concerns
- **Global CDN**: Built-in worldwide distribution

**Rough cost estimate**: A few cents per thousand AI interactions.

## 🛠️ Development

**Local development**:
```bash
npx wrangler dev --local
```

**Note**: Even in local development, Workers AI calls hit the live API and incur usage charges.

## 🌐 Why Serverless Rocks for AI Apps

This project demonstrates the power of serverless for AI applications:

1. **⚡ Speed**: From idea to deployed app in ~30 minutes
2. **🔧 Simplicity**: No Docker, Kubernetes, or server management
3. **💸 Economics**: Pay only for actual usage, not idle time
4. **🌍 Scale**: Automatically handles traffic spikes globally
5. **🔄 Iteration**: Deploy changes in seconds, not minutes

## 🎯 One-Shot Success

This entire application was built and deployed from a single paragraph prompt:

> "let's make a contrarian chatbot using cloudflare workers AI features... use the @cf/meta/llama-3.2-1b-instruct model since it's the cheapest, we want the site to be dark mode, we want a very minimal but modern and aesthetic user experience... We want the bot to have a funny whimsical name and we want to write the system prompt instructing the bot to disagree with anything the user says"

The serverless + AI combination made this possible because:
- **No infrastructure decisions** to slow down development
- **Simple API integration** with Workers AI
- **Self-contained deployment** with everything in one Worker
- **Instant global availability** without configuration

## 🤝 Contributing

Feel free to fork and enhance Naysir! Some ideas:
- Add conversation memory
- Implement different personality modes
- Add voice input/output
- Create themed disagreement styles

## 📜 License

MIT License - Disagree with licensing if you want, Naysir would! 😄