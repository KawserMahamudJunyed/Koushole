# Koushole - কৌশলে 🚀
> **Study Smarter - পড়া হবে কৌশলে**  
> *Your Personal AI-Powered Study Companion.*

![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

**Koushole** is a next-generation EdTech platform built for the **MillionX Bangladesh AI Build-a-thon 2026**. It merges the power of advanced Large Language Models (LLMs) with the official NCTB curriculum to create a hyper-personalized, gamified, and accessible learning experience for every student in Bangladesh.

---

## 🏗️ AI Architecture & Innovation

Koushole employs a sophisticated **Agentic AI Architecture** to deliver real-time, adaptive tutoring.

### 1. The "Socratic" Chat Tutor 🗣️
*   **Goal**: Teach, don't just solve.
*   **Flow**: `User Input` $\rightarrow$ `Orchestrator` $\rightarrow$ **Llama 4 Scout (Groq)** $\rightarrow$ `Adaptive Output`
*   **Innovation**: Uses "Peak-to-Bottom" reasoning to break down complex topics into first principles, switching seamlessly between English and Bangla analogies.

### 2. "Pure AI" Quiz Generator 🧠
*   **Goal**: Infinite practice material.
*   **Flow**: `Subject Selection` $\rightarrow$ `JSON Schema Prompt` $\rightarrow$ **Llama 4 Scout** $\rightarrow$ `Frontend Rendering`
*   **Innovation**: Generates unique, curriculum-aligned questions on the fly without relying on static question banks.

### 3. "Diagram" Visualization Engine 🎨
*   **Goal**: Visual learning on demand.
*   **Flow**: `Intent: "Draw..."` $\rightarrow$ `Prompt Refinement` $\rightarrow$ **FLUX.1-schnell (HF)** $\rightarrow$ `Visual Output`
*   **Innovation**: Instantly generates scientific diagrams (e.g., "Plant Cell", "Circuit Diagram") within the chat interface.

---

## ✨ Key Features

### 📚 Syllabus & Content
- **Official NCTB Integration**: Direct access to digital textbooks for Class 6-12.
- **Custom Library**: Upload your own PDF/EPUB notes; the AI indexes them for quizzes.
- **University Support**: Specialized tracks for CSE, EEE, Medical, and Business students.

### 📝 Smart Assessment
- **Adaptive Quizzes**: MCQ, Fill-in-the-Blank, Matching, and Reordering.
- **Voice Answers**: Practice oral definitions and language skills.
- **Remedial Loops**: One-click integrated **Khan Academy** video lessons for weak topics.

### 🎮 Gamification
- **XP & Leaderboards**: Earn experience for every correct answer.
- **Daily Streaks**: Build consistent study habits.
- **Badges**: Unlock achievements like "Week Warrior" and "Topic Master".
- **Insight Charts**: Track your "Learning Velocity" over time.

### 🌏 Accessibility
- **Bilingual UI**: Complete English/Bangla toggle.
- **Voice-First**: Full speech-to-text support for questions.
- **Dark Mode**: OLED-friendly dark theme for late-night study.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase Account
- Groq API Key
- Hugging Face API Key

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/KawserMahamudJunyed/Koushole.git
    cd Koushole
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    GROQ_API_KEY=your_groq_key
    HF_API_KEY=your_huggingface_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  **Run Locally**
    ```bash
    npm start
    ```
    Visit `http://localhost:3000` (or the port shown in terminal).

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JS, Tailwind CSS, HTML5 |
| **Backend** | Supabase (Auth, DB, Storage, RLS) |
| **Orchestration** | Vercel Serverless Functions |
| **AI (Logic)** | Llama 4 Scout (via Groq) |
| **AI (Vision)** | FLUX.1-schnell (via Hugging Face) |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Review

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### *Powered by Team Tensorithm* used for MillionX Bangladesh AI Build-a-thon 2026
*Building the future of education, one student at a time.*
