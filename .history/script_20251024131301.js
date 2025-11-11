// ========== MULTILANGUAGE SYSTEM (Switch Statement) ==========

const translations = {
  kk: {
    home: "Басты бет",
    news: "Жаңалықтар",
    gallery: "Галерея",
    contact: "Байланыс",
    welcomeTitle: "GameWorld-ке қош келдіңіз",
    welcomeText: "Соңғы ойын жаңалықтарын, шолуларды және қоғамдастықтарды ашыңыз.",
    enterName: "Атыңызды енгізіңіз",
    submitBtn: "Жіберу",
    showTimeBtn: "Уақытты көрсету",
    readMore: "Толығырақ",
    readLess: "Жасыру",
    toggleTheme: "Күндізгі/Түнгі тақырыпты өзгерту",
    changeBg: "Фон түсін өзгерту",
    playSound: "🔊 Дыбыс ойнату",
    rateTitle: "GameWorld-ті бағалаңыз",
    ratingMsg: "Сіз бағаладыңыз:",
    greetingDefault: "GameWorld-ке қош келдіңіз!",
    greetingWithName: "GameWorld-ке қош келдіңіз,"
  },
  en: {
    home: "Home",
    news: "News",
    gallery: "Gallery",
    contact: "Contact",
    welcomeTitle: "Welcome to GameWorld",
    welcomeText: "Discover the latest gaming news, reviews, and communities.",
    enterName: "Enter your name",
    submitBtn: "Submit",
    showTimeBtn: "Show Current Time",
    readMore: "Read More",
    readLess: "Read Less",
    toggleTheme: "Toggle Day/Night Theme",
    changeBg: "Change Background Color",
    playSound: "🔊 Play Sound",
    rateTitle: "Rate GameWorld",
    ratingMsg: "You rated:",
    greetingDefault: "Welcome to GameWorld!",
    greetingWithName: "Welcome to GameWorld,"
  },
  ru: {
    home: "Главная",
    news: "Новости",
    gallery: "Галерея",
    contact: "Контакты",
    welcomeTitle: "Добро пожаловать в GameWorld",
    welcomeText: "Откройте для себя последние игровые новости, обзоры и сообщества.",
    enterName: "Введите ваше имя",
    submitBtn: "Отправить",
    showTimeBtn: "Показать время",
    readMore: "Читать далее",
    readLess: "Скрыть",
    toggleTheme: "Переключить День/Ночь",
    changeBg: "Изменить цвет фона",
    playSound: "🔊 Воспроизвести звук",
    rateTitle: "Оцените GameWorld",
    ratingMsg: "Вы поставили:",
    greetingDefault: "Добро пожаловать в GameWorld!",
    greetingWithName: "Добро пожаловать в GameWorld,"
  }
};

let currentLanguage = "kk";

// ========== IMPROVED SOUND SYSTEM (Web Audio API) ==========

let audioContext;
let isAudioInitialized = false;

// Initialize audio on first user interaction
function initAudio() {
  if (!isAudioInitialized) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      isAudioInitialized = true;
      console.log("✅ Audio initialized successfully");
    } catch (e) {
      console.error("❌ Audio initialization failed:", e);
    }
  }
}

// Play sound using Web Audio API (GUARANTEED TO WORK)
function playSound() {
  try {
    initAudio();
    
    if (!audioContext) {
      console.warn("Audio context not available");
      return;
    }

    // Create oscillator (generates sound wave)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set sound properties
    oscillator.frequency.value = 800; // Frequency (pitch)
    oscillator.type = 'sine'; // Wave type
    
    // Volume envelope (fade out)
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    // Play sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
    
    console.log("🔊 Sound played!");
    
  } catch (error) {
    console.error("Sound play error:", error);
  }
}

// Alternative: Try to use HTML5 audio with error handling
function playHTMLSound() {
  const sound = document.getElementById("clickSound");
  if (sound) {
    sound.volume = 0.5;
    sound.currentTime = 0;
    
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("✅ HTML5 sound playing"))
        .catch(() => {
          console.log("⚠️ HTML5 blocked, using Web Audio");
          playSound(); // Fallback to Web Audio API
        });
    }
  } else {
    playSound(); // Fallback to Web Audio API
  }
}

// ========== LANGUAGE SELECTOR WITH SWITCH STATEMENT ==========

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    languageSelector.addEventListener("change", function() {
      const selectedLang = this.value;
      
      // Using switch statement as required
      switch(selectedLang) {
        case "kk":
          updateLanguage("kk");
          break;
        case "en":
          updateLanguage("en");
          break;
        case "ru":
          updateLanguage("ru");
          break;
        default:
          updateLanguage("kk");
      }
      
      playSound();
    });
  }
});

// Update page language
function updateLanguage(lang) {
  currentLanguage = lang;
  const texts = translations[lang];
  
  // Update all elements with data-lang attribute
  document.querySelectorAll("[data-lang]").forEach(element => {
    const key = element.getAttribute("data-lang");
    if (texts[key]) {
      if (element.tagName === "INPUT") {
        element.placeholder = texts[key];
      } else {
        element.textContent = texts[key];
      }
    }
  });
  
  // Update placeholder
  const nameInput = document.getElementById("nameInput");
  if (nameInput) nameInput.placeholder = texts.enterName;
  
  // Update greeting
  const greeting = document.getElementById("userGreeting");
  if (greeting && greeting.dataset.userName) {
    greeting.textContent = `${texts.greetingWithName} ${greeting.dataset.userName}!`;
  } else if (greeting) {
    greeting.textContent = texts.greetingDefault;
  }
}

// ========== DOM MANIPULATION ==========

// 1. Update Greeting (Manipulating textContent and attributes)
function updateGreeting() {
  const nameInput = document.getElementById("nameInput");
  const greeting = document.getElementById("userGreeting");
  
  if (!nameInput || !greeting) return;
  
  const userName = nameInput.value.trim();
  const texts = translations[currentLanguage];
  
  if (userName) {
    greeting.textContent = `${texts.greetingWithName} ${userName}!`;
    greeting.dataset.userName = userName;
    greeting.style.color = "#00fff7";
    greeting.style.textShadow = "0 0 15px rgba(0, 255, 247, 0.8)";
    playSound();
  } else {
    const alertMsg = currentLanguage === "kk" ? "⚠️ Атыңызды енгізіңіз!" : 
                     currentLanguage === "ru" ? "⚠️ Введите ваше имя!" : 
                     "⚠️ Please enter your name!";
    alert(alertMsg);
  }
}

// 2. Change Large Image (Gallery page - Manipulating src attribute)
function changeLargeImage(src) {
  const largeImage = document.getElementById("largeImage");
  if (largeImage) {
    largeImage.src = src;
    largeImage.style.transform = "scale(1.05)";
    largeImage.style.transition = "all 0.3s ease";
    
    setTimeout(() => {
      largeImage.style.transform = "scale(1)";
    }, 300);
    
    playSound();
  }
}

// 3. Read More Toggle (Dynamic style changes)
document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  
  readMoreButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const card = this.closest(".platform-card");
      if (!card) return;
      
      const shortText = card.querySelector(".short-text");
      const fullText = card.querySelector(".full-text");
      const texts = translations[currentLanguage];
      
      if (fullText.style.display === "none" || !fullText.style.display) {
        shortText.style.display = "none";
        fullText.style.display = "block";
        this.textContent = texts.readLess;
      } else {
        shortText.style.display = "block";
        fullText.style.display = "none";
        this.textContent = texts.readMore;
      }
      
      playSound();
    });
  });
});

// 4. Toggle Day/Night Theme
let isDarkTheme = true;

function toggleTheme() {
  const body = document.body;
  
  if (isDarkTheme) {
    // Day Theme
    body.style.background = "linear-gradient(to bottom, #87CEEB, #f0f8ff)";
    body.style.color = "#000";
    
    document.querySelectorAll(".bg-dark").forEach(el => {
      el.style.backgroundColor = "#f8f9fa";
      el.style.color = "#000";
    });
    
    document.querySelectorAll(".neon-text, .text-info").forEach(el => {
      el.style.color = "#0066cc";
      el.style.textShadow = "none";
    });
  } else {
    // Night Theme
    body.style.background = "radial-gradient(circle at top, #0a0a0f, #050509, #000)";
    body.style.color = "#eee";
    
    document.querySelectorAll(".bg-dark").forEach(el => {
      el.style.backgroundColor = "#0a0a0f";
      el.style.color = "#eee";
    });
    
    document.querySelectorAll(".neon-text, .text-info").forEach(el => {
      el.style.color = "#00fff7";
      el.style.textShadow = "0 0 10px rgba(0, 255, 247, 0.6)";
    });
  }
  
  isDarkTheme = !isDarkTheme;
  playSound();
}

// 5. Change Background Color
function changeBackground() {
  const colors = ["#0a0a0f", "#1a0033", "#003366", "#004d00", "#330000", "#4a0000"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
  playSound();
}

// ========== EVENT HANDLING ==========

// 1. Show Current Time (Event Listener)
function showCurrentTime() {
  const timeDisplay = document.getElementById("timeDisplay");
  if (!timeDisplay) return;
  
  const now = new Date();
  const timeText = currentLanguage === "kk" ? "Қазіргі уақыт:" :
                   currentLanguage === "ru" ? "Текущее время:" : "Current Time:";
  
  timeDisplay.textContent = `${timeText} ${now.toLocaleTimeString()}`;
  timeDisplay.style.fontSize = "1.2rem";
  timeDisplay.style.fontWeight = "bold";
  
  playSound();
}

// 2. Keyboard Navigation (Arrow Keys)
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("#mainNav .nav-link");
  let currentIndex = 0;
  
  document.addEventListener("keydown", (e) => {
    if (navItems.length === 0) return;
    
    if (e.key === "ArrowRight") {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % navItems.length;
      navItems[currentIndex].focus();
      playSound();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[currentIndex].focus();
      playSound();
    }
  });
});

// 3. Multi-Step Form (Callbacks)
function nextStep(stepNumber) {
  try {
    document.querySelectorAll(".form-step").forEach(step => {
      step.style.display = "none";
    });
    
    const nextStepEl = document.getElementById(`step${stepNumber}`);
    if (nextStepEl) {
      nextStepEl.style.display = "block";
      playSound();
    }
  } catch (error) {
    console.error("Error in nextStep:", error);
  }
}

function prevStep(stepNumber) {
  try {
    document.querySelectorAll(".form-step").forEach(step => {
      step.style.display = "none";
    });
    
    const prevStepEl = document.getElementById(`step${stepNumber}`);
    if (prevStepEl) {
      prevStepEl.style.display = "block";
    }
  } catch (error) {
    console.error("Error in prevStep:", error);
  }
}

function resetForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.reset();
    nextStep(1);
    
    const successMsg = document.getElementById("successMessage");
    if (successMsg) successMsg.style.display = "none";
    
    playSound();
  }
}

// 4. Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();
      
      // Validation
      if (!name || !email || !message) {
        const alertMsg = currentLanguage === "kk" ? "⚠️ Барлық қажетті өрістерді толтырыңыз!" :
                        currentLanguage === "ru" ? "⚠️ Заполните все обязательные поля!" :
                        "⚠️ Please fill in all required fields!";
        alert(alertMsg);
        return;
      }
      
      if (!email.includes("@") || !email.includes(".")) {
        const alertMsg = currentLanguage === "kk" ? "❌ Жарамды email енгізіңіз!" :
                        currentLanguage === "ru" ? "❌ Введите действительный email!" :
                        "❌ Please enter a valid email address!";
        alert(alertMsg);
        return;
      }
      
      // Show success message
      const successMsg = document.getElementById("successMessage");
      if (successMsg) {
        successMsg.textContent = currentLanguage === "kk" ? "✅ Хабарламаңыз жіберілді!" :
                                currentLanguage === "ru" ? "✅ Сообщение отправлено!" :
                                "✅ Message sent successfully!";
        successMsg.style.display = "block";
      }
      
      playSound();
      
      // Reset after 3 seconds
      setTimeout(() => {
        form.reset();
        nextStep(1);
        if (successMsg) successMsg.style.display = "none";
      }, 3000);
    });
  }
});

// 5. News Filter (Switch Statement)
function filterNews(category) {
  const newsCards = document.querySelectorAll(".news-card");
  
  switch(category) {
    case "all":
      newsCards.forEach(card => {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease";
      });
      break;
      
    case "action":
      newsCards.forEach(card => {
        card.style.display = card.dataset.category === "action" ? "block" : "none";
      });
      break;
      
    case "adventure":
      newsCards.forEach(card => {
        card.style.display = card.dataset.category === "adventure" ? "block" : "none";
      });
      break;
      
    case "battle-royale":
      newsCards.forEach(card => {
        card.style.display = card.dataset.category === "battle-royale" ? "block" : "none";
      });
      break;
      
    default:
      newsCards.forEach(card => card.style.display = "block");
  }
  
  playSound();
}

// ========== ADVANCED JAVASCRIPT ==========

// 1. Objects and Methods
const gameData = {
  name: "GameWorld",
  users: 5000,
  categories: ["Action", "Adventure", "Battle Royale"],
  
  displayInfo: function() {
    return `${this.name} has ${this.users} active users`;
  },
  
  addUser: function() {
    this.users++;
    console.log(`New user! Total: ${this.users}`);
  }
};

// 2. Arrays and Loops
const newsData = [
  { title: "GTA 6 Release", category: "action", img: "images/gtaV.png" },
  { title: "New RPG Adventure", category: "adventure", img: "images/farcry3.png" },
  { title: "Fortnite Season", category: "battle-royale", img: "images/battlefield.png" }
];

function loadMoreNews() {
  const container = document.getElementById("newsContainer");
  if (!container) return;
  
  newsData.forEach(news => {
    const col = document.createElement("div");
    col.className = "col-md-4 news-card";
    col.dataset.category = news.category;
    
    col.innerHTML = `
      <div class="card bg-dark text-light h-100 border border-info shadow">
        <img src="${news.img}" class="card-img-top" alt="${news.title}">
        <div class="card-body">
          <h5 class="card-title text-info">${news.title}</h5>
          <p class="card-text">Latest updates about ${news.title}.</p>
          <a href="#" class="btn btn-outline-info btn-sm">Read more</a>
        </div>
      </div>
    `;
    
    container.appendChild(col);
  });
  
  playSound();
}

// 3. Higher-Order Functions
const gameCategories = ["PC Games", "Console Games", "Mobile Games"];

// forEach
gameCategories.forEach(category => {
  console.log(`Category: ${category}`);
});

// filter
const actionGames = newsData.filter(game => game.category === "action");
console.log("Action games:", actionGames);

// map
const gameTitles = newsData.map(game => game.title);
console.log("All titles:", gameTitles);

// 4. Star Rating System (querySelectorAll)
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingMessage = document.getElementById("ratingMessage");
  
  if (stars.length === 0) return;
  
  stars.forEach(star => {
    star.addEventListener("click", function() {
      const rating = parseInt(this.dataset.rating);
      const texts = translations[currentLanguage];
      
      // Reset all stars
      stars.forEach(s => {
        s.style.color = "#ccc";
        s.classList.remove("selected");
      });
      
      // Highlight selected stars
      for (let i = 0; i < rating; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].classList.add("selected");
      }
      
      // Show message
      if (ratingMessage) {
        ratingMessage.textContent = `${texts.ratingMsg} ${rating} ⭐`;
        ratingMessage.style.fontSize = "1.3rem";
      }
      
      playSound();
    });
    
    // Hover effect
    star.addEventListener("mouseenter", function() {
      const hoverRating = parseInt(this.dataset.rating);
      for (let i = 0; i < hoverRating; i++) {
        if (!stars[i].classList.contains("selected")) {
          stars[i].style.color = "#FFD700";
        }
      }
    });
    
    star.addEventListener("mouseleave", function() {
      stars.forEach(s => {
        if (!s.classList.contains("selected")) {
          s.style.color = "#ccc";
        }
      });
    });+
       
  });
});

// ========== POPUP ==========

function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "flex";
    playSound();
  }
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

// ========== DATE/TIME ==========

function showDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "medium"
  });
  
  const dateBox = document.getElementById("datetime");
  if (dateBox) dateBox.textContent = formatted;
}

setInterval(showDateTime, 1000);

// ========== ANIMATIONS ==========

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.transition = "all 0.3s ease";
    });
    
    card.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// FAQ Toggle
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");
  
  questions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      if (answer) {
        answer.classList.toggle("active");
        answer.style.display = answer.style.display === "block" ? "none" : "block";
        playSound();
      }
    });
  });
});

console.log("🎮 GameWorld loaded! Audio system ready.");
