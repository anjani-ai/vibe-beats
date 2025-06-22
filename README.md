# 🎶 VibeBeats – AI Mood-Based Music Recommender

VibeBeats is an AI-powered web app that recommends music vibes based on your current mood. Just type how you're feeling, and the app suggests the perfect music genre along with a YouTube search and embedded playlist — all using a lightweight open-source LLM.

---

## 💡 Inspiration

We all turn to music to match or shift our mood — whether it's to hype up, relax, focus, or cope. VibeBeats uses an AI language model to understand your emotions and connect them to a music vibe instantly.

---

## 🚀 What It Does

- Accepts mood input in natural language (e.g., *"I'm feeling a bit anxious but hopeful."*)
- Analyzes the emotional tone using a language model
- Suggests:
  - Mood summary
  - Music vibe (genre/style)
  - YouTube search link
  - Embedded playlist based on your emotion

---

## 🛠️ Tech Stack

- 🐍 Python – Core backend language  
- 🎈 Streamlit – Lightweight web UI framework  
- 🤖 Zephyr LLM via Hugging Face Inference API – Understands and maps emotions to music  
- 📺 YouTube – For music recommendations via search and embed  
- 🌐 REST APIs – To interact with YouTube and the LLM  
- 🧠 Prompt Engineering – Guides consistent and useful AI output

---

## 🧱 How It Works

1. The user types in how they feel.
2. A carefully designed prompt is sent to a public Zephyr LLM (no key required).
3. The model responds with a mood description, genre, and YouTube search phrase.
4. The app embeds a YouTube playlist based on that search.

---

## ⚙️ How to Run It Locally

```bash
pip install streamlit requests
streamlit run app.py
