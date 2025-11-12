# 🎮 GameWorld - Gaming News & Community Platform

![GameWorld](https://img.shields.io/badge/GameWorld-v2.0-00fff7?style=for-the-badge&logo=gamepad)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> A modern, responsive gaming portal built with HTML5, CSS3, jQuery & Bootstrap 5

[🌐 Live Demo](https://your-username.github.io/gameworld/) • [📖 Features](#features) • [🚀 Getting Started](#getting-started)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [API Configuration](#api-configuration)
- [Team](#team)
- [License](#license)

---

## 🌟 Overview

**GameWorld** is a feature-rich gaming news platform providing users with the latest game releases, reviews, and community features. Built as a final web development project showcasing modern web technologies and best practices.

### 🎯 Key Highlights

- 🔐 **User Authentication** - Secure sign-up/login with Local Storage
- 🎮 **Live Gaming API** - Real-time game data from Free-to-Game API
- 🌓 **Dark/Light Theme** - Seamless theme switching with persistence
- ⭐ **Rating System** - Rate and save your favorite games
- 🌍 **Multi-language** - Supports Kazakh, English, and Russian
- 📱 **Fully Responsive** - Optimized for all devices

---

## ✨ Features

### 🔐 Authentication System
- Sign up with email and password validation
- Secure login with error handling
- User profile management
- Account deletion option
- Local Storage persistence
- Auto-login after registration

### 🎮 Gaming API Integration
- Real-time game data from Free-to-Game API
- Display top 6 trending games
- Game ratings (⭐ 4.0-4.8/5.0)
- Player count statistics (15M-100M+ players)
- Release dates and genres
- Fallback data for offline mode

### 🌓 Theme System
- 🌙 Dark theme (default)
- ☀️ Light theme toggle
- Persistent theme selection via Local Storage
- Smooth CSS transitions
- All pages support both themes

### ⭐ Rating & Reviews
- Interactive 5-star rating system
- Saved to Local Storage
- Displayed on user profile
- Real-time visual feedback

### 🌍 Multi-language Support
- 🇰🇿 Kazakh (Қазақша)
- 🇬🇧 English
- 🇷🇺 Russian (Русский)
- Dynamic language switching
- All UI elements translated

### 📰 News & Articles
- Gaming news with categories (RPG, Action, Strategy, Shooter)
- Live search functionality
- Autocomplete suggestions
- Filter by category
- Responsive card layout

### 🖼️ Gallery
- Image gallery with lightbox
- Lazy loading for performance
- Thumbnail navigation
- Smooth fade-in transitions

### 📧 Contact Form
- Multi-step form (3 steps)
- Real-time email validation
- Form reset functionality
- Success/error notifications
- Loading spinner

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables, flexbox, grid
- **JavaScript (ES6+)** - Async/await, fetch API
- **jQuery 3.7.1** - DOM manipulation
- **Bootstrap 5.3** - Responsive framework

### APIs & Libraries
- **Free-to-Game API** - Gaming data (no API key required)
- **Font Awesome 6.4** - Icons library
- **Google Fonts** - Typography
- **Local Storage API** - Data persistence

### Development Tools
- VS Code with Live Server
- Git & GitHub for version control
- GitHub Pages for hosting

---

## 📂 Project Structure

gameworld/
├── index.html # Home page with API games section
├── news.html # News page with search & filters
├── gallery.html # Image gallery with lightbox
├── contact.html # Multi-step contact form
├── login.html # Login & Sign up page
├── profile.html # User profile management
├── style.css # Main stylesheet (2000+ lines)
├── script.js # JavaScript logic (800+ lines)
├── README.md # Project documentation
└── images/ # Image assets
├── gtaV.png
├── cs2.png
├── cod.png
├── Fust Cause.jpg
└── placeholder.jpg

text

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Text editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Installation

1. **Clone the repository**
git clone https://github.com/your-username/gameworld.git
cd gameworld

text

2. **Open with Live Server (Recommended)**

**VS Code Method:**
- Install "Live Server" extension in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"
- Browser opens at `http://127.0.0.1:5500`

**Python Method:**
python -m http.server 8000

Visit: http://localhost:8000
text

**Node.js Method:**
npx http-server -p 8000

Visit: http://localhost:8000
text

3. **Start exploring!** 🎉

> ⚠️ **Note:** Opening `index.html` directly (file://) may cause CORS issues with API. Always use a local server.

---

## 🌐 Deployment to GitHub Pages

### Quick Deployment Guide

1. **Initialize Git & Push**
git init
git add .
git commit -m "Initial commit: GameWorld v2.0"
git branch -M main
git remote add origin https://github.com/your-username/gameworld.git
git push -u origin main

text

2. **Enable GitHub Pages**
- Go to your repository on GitHub
- Click **Settings** tab
- Scroll to **Pages** section (left sidebar)
- Under **Source**, select:
  - Branch: `main`
  - Folder: `/ (root)`
- Click **Save**

3. **Access Your Site**
- Wait 1-2 minutes for deployment
- Visit: `https://your-username.github.io/gameworld/`
- ✅ Your site is live!

---

## 📸 Screenshots

### 🌙 Dark Theme (Default)
╔═══════════════════════════════════════╗
║ 🎮 GameWorld 🌙 ║
║ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║ [Trending Games Section] ║
║ ┌──────┐ ┌──────┐ ┌──────┐ ║
║ │Game 1│ │Game 2│ │Game 3│ ║
║ │⭐4.5 │ │⭐4.2 │ │⭐4.8 │ ║
║ └──────┘ └──────┘ └──────┘ ║
╚═══════════════════════════════════════╝

text

### ☀️ Light Theme
╔═══════════════════════════════════════╗
║ 🎮 GameWorld ☀️ ║
║ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║ Clean white background ║
║ with blue accents ║
╚═══════════════════════════════════════╝

text

---

## 🎨 Color Scheme

### Dark Theme (Default)
--bg-primary: #0a0a0f;
--bg-card: #0d0d12;
--bg-box: rgba(13, 13, 18, 0.95);
--text-primary: #eeeeee;
--text-secondary: #cccccc;
--text-accent: #00fff7;
--neon-glow: 0 0 10px #00fff7, 0 0 20px #00fff7;
--border-color: rgba(0, 255, 247, 0.3);

text

### Light Theme
--bg-primary: #ffffff;
--bg-card: #f8f9fa;
--bg-box: #ffffff;
--text-primary: #333333;
--text-secondary: #555555;
--text-accent: #0066cc;
--border-color: #cccccc;

text

---

## 🔧 API Configuration

### Using Free-to-Game API (Current)

**No API key required!**

// In script.js (line ~150)
const apiUrl = 'https://www.freetogame.com/api/games';

text

**Games Displayed:**
1. Overwatch 2 - ⭐ 4.0/5.0 - 50M+ players
2. Crossout - ⭐ 4.2/5.0 - 100M+ players
3. Genshin Impact - ⭐ 4.3/5.0 - 25M+ players
4. PUBG: BATTLEGROUNDS - ⭐ 4.5/5.0 - 80M+ players
5. Enlisted - ⭐ 4.6/5.0 - 15M+ players
6. Forge of Empires - ⭐ 4.8/5.0 - 40M+ players

### Alternative: RAWG API (Optional)

If you want more games:

1. Get free API key from [RAWG.io](https://rawg.io/apidocs)
2. Replace in `script.js`:
const apiUrl = https://api.rawg.io/api/games?key=YOUR_API_KEY&page_size=6;

text

---

## 📱 Responsive Design

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| 📱 Mobile | < 576px | 1 column, stacked |
| 📱 Tablet | 576px - 768px | 2 columns |
| 💻 Laptop | 768px - 992px | 2-3 columns |
| 🖥️ Desktop | > 992px | 3 columns, grid |

### Features
- Fluid typography (clamp)
- Flexible images (max-width: 100%)
- Touch-friendly buttons (min 44x44px)
- Mobile-optimized navigation

---

## 🎓 Assignment Requirements

### ✅ Assignment 7 (DOM Manipulation)
- [x] Dynamic content updates
- [x] Event listeners
- [x] Form validation
- [x] Animations & transitions
- [x] Search & filter functionality

### ✅ Assignment 8 (Advanced Features)
- [x] Authentication (Local Storage)
- [x] External API Integration
- [x] Theme Toggle (Dark/Light)
- [x] Star Rating System
- [x] Multi-language support

### ✅ Final Project Requirements
- [x] Responsive design (mobile-first)
- [x] Cross-browser compatibility
- [x] Clean, organized code
- [x] README documentation
- [x] GitHub Pages deployment

---

## 🐛 Known Issues & Solutions

### Issue 1: API Not Loading
**Problem:** Games section shows "Loading..." forever

**Solutions:**
- ✅ Open via Live Server (not file://)
- ✅ Check internet connection
- ✅ Fallback data loads automatically if API fails

### Issue 2: Theme Not Persisting
**Problem:** Theme resets on page reload

**Solution:**
- ✅ Ensure Local Storage is enabled in browser
- ✅ Clear browser cache and try again

### Issue 3: Images Not Loading
**Problem:** Carousel or gallery images missing

**Solution:**
- ✅ Check `images/` folder exists
- ✅ Verify image file names match HTML
- ✅ Use placeholder.jpg as fallback

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use 2 spaces for indentation
- Comment complex logic
- Follow existing naming conventions
- Test on multiple browsers

---

## 👥 Team

**Team NOVA** - Software Engineering, Group SE-2406

### 👨‍💻 Developers

**Nurdaulet Usenbai**
- Frontend Development
- API Integration
- JavaScript Logic
- GitHub: [@nurdaulet-usenbai](https://github.com/nurdaulet-usenbai)

**Nurbol Amangeldinov**
- UI/UX Design
- CSS Styling
- Responsive Design
- GitHub: [@nurbol-amangeldinov](https://github.com/nurbol-amangeldinov)

---

## 📄 License

MIT License

Copyright (c) 2025 Team NOVA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

text

---

## 🙏 Acknowledgments

- **[Free-to-Game API](https://www.freetogame.com/api-doc)** - Gaming data
- **[Bootstrap](https://getbootstrap.com/)** - UI framework
- **[Font Awesome](https://fontawesome.com/)** - Icon library
- **[jQuery](https://jquery.com/)** - JavaScript library
- **[GitHub Pages](https://pages.github.com/)** - Free hosting
- **[VS Code](https://code.visualstudio.com/)** - Code editor

---

## 📧 Contact

**GameWorld Team**

- 📧 Email: gameworld.nova@example.com
- 🐙 GitHub: [Team NOVA](https://github.com/your-username)
- 🌐 Website: [gameworld.com](https://your-username.github.io/gameworld/)
- 💬 Discord: GameWorld Community

---

## 📊 Project Stats

![Lines of Code](https://img.shields.io/badge/Lines_of_Code-3000+-blue?style=flat-square)
![Files](https://img.shields.io/badge/Files-8-green?style=flat-square)
![Features](https://img.shields.io/badge/Features-25+-orange?style=flat-square)
![Commits](https://img.shields.io/badge/Commits-50+-red?style=flat-square)

### Development Timeline
- **Week 1-2:** HTML structure & Bootstrap integration
- **Week 3-4:** CSS styling & responsive design
- **Week 5-6:** JavaScript functionality & jQuery
- **Week 7:** API integration & authentication
- **Week 8:** Final testing & deployment

---

## 🔮 Future Enhancements

- [ ] Add user comments system
- [ ] Implement game bookmarks
- [ ] Add video game trailers
- [ ] Create admin dashboard
- [ ] Add social media integration
- [ ] Implement PWA features
- [ ] Add game recommendations AI

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

**Made with ❤️ and ☕ by Team NOVA**

![Footer](https://img.shields.io/badge/Thank_You_for_Visiting!-00fff7?style=for-the-badge&logo=github)

**© 2025 GameWorld | All Rights Reserved**

[⬆ Back to Top](#-gameworld---gaming-news--community-platform)

</div>
