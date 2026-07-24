# Sudoku Master AI 🧩⚡

> The most beautiful, intelligent, and feature-rich Sudoku platform with modern UI, step-by-step AI tutoring, progressive hints, interactive statistics, and gamified leveling system. Built for beginners to Sudoku Grandmasters.

**Developed by**: [Gandham Bhanu Prakash](https://github.com/klu2300033213)

---

## ✨ Features

- 🤖 **Teacher AI Mode**: Floating AI Tutor drawer with real-time technique explanations (*Naked Single*, *Hidden Single*, *Naked Pair*, *Pointing Pairs*, *X-Wing*) and mistake warning toasts.
- 💡 **4-Stage Progressive Hint System**: Guided hints (*Focus Area → Intersection Analysis → Candidate Deduction → Placement*).
- ✏️ **Smart Pencil Candidate Notes**: Toggle **Note Mode** / **Digit Mode** and **Show Notes** / **Hide Notes** for distraction-free speedsolving.
- 🎨 **Glassmorphism & Dual Themes**: Seamless **Dark Mode** and **Light Mode** with high-contrast UI components.
- 📱 **Mobile & Laptop Responsive**: Fully optimized for smartphone touch controls and desktop keyboard navigation.
- 📊 **Interactive Performance Statistics**: Track win rates, best times, XP level progression, streak counters, and difficulty breakdown.
- 📬 **Live SMTP Support & Feedback Form**: Direct contact form allowing users to send feedback directly to developer inbox via Spring Boot SMTP.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism Design System
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **Framework**: Spring Boot 3
- **Security**: Spring Security + JWT Authentication
- **Database**: H2 Embedded / PostgreSQL Ready (JPA / Hibernate)
- **Email Service**: Spring Boot Starter Mail (`JavaMailSender` SMTP)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/klu2300033213/sudokuMaster.git
cd sudokuMaster
```

### 2. Environment Setup
Copy `.env.example` to `.env` in the root, backend, and frontend directories:

```bash
cp .env.example .env
cp .env.example backend/.env
cp .env.example frontend/.env
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The REST API server will run on [http://localhost:8085](http://localhost:8085).

---

## 📝 License & Attribution

© 2026 **Sudoku Master AI**. All rights reserved.  
**Developed with precision by Gandham Bhanu Prakash**.
