# 🚀 WarKlas AI

### 🧠 Intelligent Strategic Career Architect & Mentor

<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/LLM-Gemini%20%7C%20Groq-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

---

## 📘 Overview

**WarKlas AI** is a next-generation AI-powered career mentoring platform designed to guide students and professionals toward the most suitable and impactful career paths.

It combines **AI reasoning, vision analysis, and structured planning** to deliver personalized guidance. Unlike traditional platforms, WarKlas AI provides **real-time, adaptive, and deeply personalized recommendations** based on user skills, interests, and goals.

---

## ✨ Key Features

* 🎯 **Personalized Career Mentorship**
  Tailored guidance based on user goals (Tech, Government, Defense, etc.)

* 👁️ **AI Vision Capabilities**
  Upload certificates, resumes, or scorecards → AI analyzes and guides

* 🗺 **Visual Roadmaps (Mermaid.js)**
  Generates interactive career flowcharts dynamically

* 🌐 **Multilingual Support**
  Supports English, Hinglish, and regional languages

* ⚡ **Multiple AI Providers**
  Uses **Google Gemini (1.5 Flash)** + **Groq LLaMA models**

* 🎨 **Modern UI/UX**
  Built using Tailwind CSS and Framer Motion

---

## 🛠️ Technology Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, Tailwind Typography, Lucide Icons
* **Animations:** Framer Motion

### 🔹 AI & Integrations

* `@google/generative-ai` (Gemini API)
* `groq-sdk` (LLaMA Models)
* `@huggingface/inference` (Vision AI)

### 🔹 Rendering

* `react-markdown`, `remark-gfm`

---

## 🚀 Getting Started

### 📦 Prerequisites

* Node.js (v18 or higher)
* npm or yarn

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/WarKlas-AI.git
cd WarKlas-AI
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env.local` file:

```env
# Primary LLM API Key
VITE_GEMINI_API_KEY=your_api_key_here

# HuggingFace Vision Token (Optional)
VITE_HF_TOKEN=your_token_here
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

---

### 5️⃣ Open in Browser

👉 http://localhost:5173

---

## 🧠 How WarKlas AI Works

* 🔀 **Context-Aware Routing**
  Selects best AI model based on input type

* 👁️ **Vision Parsing**
  Images processed using HuggingFace models

* 🧠 **LLM Processing**
  Gemini / Groq generate responses

* 🗺 **Roadmap Generation**
  Outputs structured plans using Mermaid

---

## 📊 System Architecture

```bash
User
 ↓
Frontend (React + Tailwind)
 ↓
AI Router Layer
 ↓
LLM (Gemini / Groq)
 ↓
Vision Model (HuggingFace)
 ↓
Response + Career Roadmap
```

---

## 📸 Screenshots

> Add your UI screenshots here

* Landing Page
* Chat Interface
* Dashboard
* Career Roadmap Output

---

## 🧪 Testing

| Test Case    | Input                  | Output             | Status |
| ------------ | ---------------------- | ------------------ | ------ |
| Career Query | "I like cybersecurity" | Career suggestions | ✅      |
| Image Upload | Resume                 | Analysis           | ✅      |
| Roadmap      | Career goal            | Structured plan    | ✅      |

---

## 🔮 Future Scope

* 📄 Resume Analyzer
* 📊 Job Market Insights
* 📱 Mobile Application
* 🤖 Advanced AI Personalization

---

## 👨‍💻 Author

**Sampath Varshith**
🎓 CSE (Cybersecurity) – LPU

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share it

---

## 💡 Inspiration

> “Transforming career confusion into clarity using AI.”
