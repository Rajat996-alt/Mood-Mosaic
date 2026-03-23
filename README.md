🌈 Mood Mosaic
A full-stack AI-powered journaling web application that helps users track emotions, reflect on thoughts, and gain insights into their mental well-being.

🚀 Overview
Mood Mosaic is a modern journaling platform where users can:

✍️ Write daily journals
😊 Track moods and emotions
🤖 Get AI-powered insights
📊 Visualize emotional patterns over time

Built with a scalable architecture combining React, Spring Boot, and Python AI services.

🧠 Key Features
📝 Smart Journaling System
🎯 Mood Tracking & Analysis
🤖 AI Sentiment Detection (Python Service)
🔐 User Authentication & Protected Routes
📊 Dashboard with Insights
⚡ Responsive & Clean UI

🏗️ Tech Stack
Frontend-
 React.js
 Tailwind CSS
 Axios

Backend-
 Spring Boot (Java)
 REST APIs
 JWT Authentication

AI Microservice-
 Python
 NLP / Sentiment Analysis

Database-
 MongoDB

📁 Project Structure
Mood-Mosaic/
 ├── mood-mosaic-main/   # React frontend
 ├── journalApp/         # Spring Boot backend
 ├── mood-ai-service/    # Python AI microservice
 ├── .gitignore
 └── README.md
 
⚙️ Setup Instructions
1️. Clone the Repository
 git clone https://github.com/Rajat996-alt/Mood-Mosaic.git
 cd Mood-Mosaic

2️. Frontend Setup (React)
 cd mood-mosaic-main
 npm install
 npm run dev

3️. Backend Setup (Spring Boot)
 Open journalApp in IntelliJ
 Run the application
 Default: http://localhost:8080

4️. AI Service Setup (Python)
 cd mood-ai-service
 python -m venv venv
 venv\Scripts\activate   # Windows
 pip install -r requirements.txt
 python app.py

🔗 API Flow
React Frontend → Spring Boot Backend → Python AI Service
 Frontend sends journal data
 Backend processes & stores it
 AI service analyzes sentiment
 Results returned to frontend
