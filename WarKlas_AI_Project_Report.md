# PROJECT REPORT

## WarKlas AI: An Intelligent, Multimodal Career Guidance Platform

**Submitted in partial fulfillment of the requirements for the degree of**
**[Degree Name, e.g., Bachelor of Technology]**
**in**
**[Department Name, e.g., Computer Science and Engineering]**

**Submitted By:**
[Your Name / Team Members' Names]
[Roll Numbers]

**Under the Guidance of:**
[Faculty Guide Name]
[Designation]

---

## ACKNOWLEDGEMENT

We would like to express our profound gratitude to our project guide, [Faculty Guide Name], for their invaluable guidance, continuous encouragement, and constructive feedback throughout the development of WarKlas AI. Their expertise was instrumental in shaping the vision and execution of this project. 

We also extend our sincere thanks to the Department of [Department Name] and the institution for providing us with the necessary resources and an environment conducive to innovation and learning.

---

## ABSTRACT

The rapid evolution of industries, emerging technologies, and changing job markets has made career planning an increasingly complex challenge for students and professionals. Traditional career counseling often lacks personalization, real-time data, and scalability. To address this, we developed **WarKlas AI**, an intelligent, multimodal career guidance platform. 

WarKlas AI leverages state-of-the-art Large Language Models (LLMs) via the Gemini API for natural language processing, intent recognition, and dynamic roadmap generation. Furthermore, it integrates vision capabilities using the Hugging Face Inference API (Qwen-VL) to analyze uploaded documents such as scorecards, certificates, and flowcharts. Built on a modern React and TypeScript frontend, the system features a premium, highly responsive user interface with an energetic, custom branding theme. The platform aims to bridge the gap between human confusion and professional clarity by providing data-driven, context-aware, and actionable career advice.

---

## TABLE OF CONTENTS

1. [Chapter 1: Introduction](#chapter-1-introduction)
2. [Chapter 2: Literature Review](#chapter-2-literature-review)
3. [Chapter 3: System Requirements & Tech Stack](#chapter-3-system-requirements--tech-stack)
4. [Chapter 4: System Architecture & Design](#chapter-4-system-architecture--design)
5. [Chapter 5: Implementation Details](#chapter-5-implementation-details)
6. [Chapter 6: Results and Conclusion](#chapter-6-results-and-conclusion)
7. [References](#references)

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background
In the contemporary era of the Fourth Industrial Revolution, career paths are no longer linear. New domains such as Artificial Intelligence, Web3, and Robotics are emerging rapidly, while traditional sectors are undergoing massive digital transformations. This volatility creates a significant information gap for students and early-career professionals trying to chart their future. 

### 1.2 Problem Statement
Existing career guidance mechanisms rely heavily on human counselors, which are limited by availability, human bias, and outdated knowledge. Static web resources and generic career quizzes fail to account for an individual's unique skills, academic performance, and personal aspirations. There is a pressing need for a dynamic, 24/7 accessible, and highly personalized intelligent system that can act as a strategic career architect.

### 1.3 Objectives of the Project
- To develop an AI-powered conversational agent capable of understanding complex career queries.
- To implement multimodal inputs, allowing the system to analyze user-uploaded images and documents.
- To generate actionable, visual career roadmaps dynamically.
- To provide an intuitive, engaging, and premium user experience through a modern web interface.

### 1.4 Scope of the Project
WarKlas AI is designed to assist high school students, college undergraduates, and working professionals. It covers a wide spectrum of career paths including STEM, humanities, government sectors, and emerging tech. The current scope focuses on generating roadmaps, suggesting certifications, finding scholarships, and providing strategic interview preparation advice.

---

## CHAPTER 2: LITERATURE REVIEW

### 2.1 Traditional vs. AI-Driven Counseling
Historically, career counseling involved psychometric testing and face-to-face consultations. While effective, this approach is not scalable. Recent studies indicate that AI-driven chatbots can significantly augment this process by providing instant, data-backed insights.

### 2.2 Role of Large Language Models (LLMs)
The advent of LLMs has revolutionized conversational agents. Unlike traditional NLP chatbots that rely on rigid decision trees and predefined intents, LLMs can understand context, infer latent user needs, and generate highly articulate and tailored responses. 

### 2.3 Multimodal AI Systems
Integrating computer vision with natural language processing allows systems to "see" and "read" alongside the user. By utilizing Vision-Language Models (VLMs), applications can now extract text and semantic context from images, making the interaction much more seamless and comprehensive.

---

## CHAPTER 3: SYSTEM REQUIREMENTS & TECH STACK

### 3.1 Hardware Requirements
- **Processor:** Dual-core CPU or higher.
- **RAM:** 4 GB minimum (8 GB recommended for development).
- **Storage:** 200 MB free space for the application files.
- **Network:** Stable internet connection for API communications.

### 3.2 Software Requirements & Tech Stack
- **Frontend Framework:** React 18 with TypeScript.
- **Build Tool:** Vite (for fast, optimized bundling).
- **Styling:** Tailwind CSS (utility-first CSS framework).
- **Animations:** Framer Motion (for smooth, physics-based UI transitions).
- **Icons & Graphics:** Lucide React, Custom SVG Vectors.
- **AI Integration:** 
  - Google Gemini API (for conversational logic and roadmap generation).
  - Hugging Face Inference API (Qwen-VL for image analysis).
- **Package Manager:** NPM / Node.js.

---

## CHAPTER 4: SYSTEM ARCHITECTURE & DESIGN

### 4.1 Modular Architecture
The application follows a strict modular architecture to ensure maintainability and scalability. The monolithic interface is broken down into specialized React components:
- `Sidebar.tsx`: Manages chat history, language selection, and temporary chat modes.
- `ChatWindow.tsx`: Handles the display of the conversation, Markdown rendering, and typing indicators.
- `MessageBubble.tsx`: A robust component for rendering text, code blocks, and Mermaid diagrams.
- `ChatInput.tsx`: The command center for text input, voice dictation, and image attachments.

### 4.2 Data Flow
1. **User Input:** The user provides a text query, voice command, or an image upload via `ChatInput`.
2. **State Update:** The input is captured in the central `App.tsx` state and appended to the `messages` array.
3. **API Processing:** 
   - If an image is present, the file is sent to the Hugging Face Vision API to extract context.
   - The combined text and image context is bundled with a strict "Career Architect" system prompt and sent to the Gemini API.
4. **Response Handling:** The AI generates a structured markdown response (often including Mermaid.js chart syntax).
5. **Rendering:** `MessageBubble` uses `react-markdown` and custom Mermaid components to render the response visually in the `ChatWindow`.

### 4.3 Branding and UI/UX Design
WarKlas AI employs a strict, high-contrast visual identity inspired by esports and modern dark-mode applications. 
- **Color Palette:** Pure black background (`#0B0B0B`) with primary (`#FF3B00`), secondary (`#E63600`), and accent (`#FF7A00`) highlights.
- **Interactive Elements:** Buttons and inputs utilize custom CSS box-shadows to create a glowing effect, providing tactile visual feedback.

---

## CHAPTER 5: IMPLEMENTATION DETAILS

### 5.1 AI Chat & Roadmap Generation
The core logic resides in `services/gemini.ts`. The system uses a carefully engineered system prompt that forces the AI to act as a mentor. It is programmed to output structured markdown and generate Mermaid.js syntax when a visual flowchart or roadmap is requested. 

### 5.2 Image Analysis
To process multimodal inputs, the application converts user-uploaded images into base64 format and transmits them to the Hugging Face Inference API. The extracted text and visual context are then fed into the conversational context, allowing the user to ask questions like "What courses should I take next based on this transcript?".

### 5.3 Web Speech API Integration
Accessibility is enhanced through the integration of the browser's native `SpeechRecognition` API. Users can click the microphone icon to dictate their queries, making the application highly interactive and user-friendly.

### 5.4 Dynamic Rendering
The `react-markdown` library is customized to intercept code blocks. If a code block is tagged with the `mermaid` language identifier, it is dynamically passed to a custom `MermaidChart` component, which renders professional SVG flowcharts directly in the chat interface.

---

## CHAPTER 6: RESULTS AND CONCLUSION

### 6.1 Results
The developed WarKlas AI platform successfully meets all defined objectives. The user interface is highly responsive, intuitive, and visually striking. The integration of the Gemini API results in highly accurate, context-aware career advice. The multimodal image analysis significantly reduces user friction by allowing direct document uploads.

### 6.2 Conclusion
WarKlas AI demonstrates the immense potential of combining modern web technologies (React, Tailwind) with advanced AI models (LLMs, VLMs). It serves as a proof-of-concept that personalized, intelligent career guidance can be scaled globally without the continuous need for human intervention. 

### 6.3 Future Scope
While the current prototype is fully functional, future enhancements could include:
- **User Authentication:** Implementing secure login (e.g., OAuth, JWT) to persist chat histories securely across devices.
- **Database Integration:** Utilizing PostgreSQL or MongoDB to store user profiles, psychometric test results, and long-term career tracking.
- **Web Scraping APIs:** Integrating real-time web search capabilities to fetch the latest job market statistics and active scholarship deadlines dynamically.

---

## REFERENCES
1. React Documentation. "React – A JavaScript library for building user interfaces." https://reactjs.org/
2. Tailwind CSS Documentation. "Rapidly build modern websites without ever leaving your HTML." https://tailwindcss.com/
3. Google AI Studio. "Gemini API Documentation." https://ai.google.dev/
4. Hugging Face. "Inference API Documentation." https://huggingface.co/docs/api-inference/
5. Framer Motion. "A production-ready motion library for React." https://www.framer.com/motion/
