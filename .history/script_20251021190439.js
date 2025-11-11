// ========== MULTILANGUAGE SYSTEM ==========

const translations = {
  kk: {
    home: "Басты бет",
    news: "Жаңалықтар",
    gallery: "Галерея",
    contact: "Байланыс",
    selectLang: "Тілді таңдаңыз:",
    welcomeTitle: "GameWorld-ке қош келдіңіз",
    welcomeText: "Соңғы ойын жаңалықтарын, шолуларды және қоғамдастықтарды ашыңыз. Ойын индустриясының келесі дәуірін зерттеп жатқан миллиондаған ойыншыларға қосылыңыз.",
    enterName: "Атыңызды енгізіңіз",
    submitBtn: "Жіберу",
    showTimeBtn: "Уақытты көрсету",
    pcGames: "PC Ойындары",
    pcShort: "Эксклюзивті PC ойындарын зерттеңіз...",
    pcFull: "Эксклюзивті PC ойындарын, модтарды және жаңартуларды зерттеңіз. Теңшелетін баптаулармен үздік графика және өнімділікті сезініңіз.",
    consoleGames: "Консоль Ойындары",
    consoleShort: "PlayStation үшін соңғы шығарылымдар...",
    consoleFull: "PlayStation, Xbox және Nintendo Switch үшін соңғы шығарылымдар. Эксклюзивті ойындардан және үздіксіз ойын тәжірибесінен ләззат алыңыз.",
    mobileGames: "Мобильді Ойындар",
    mobileShort: "Үздік рейтингілі мобильді тәжірибелер...",
    mobileFull: "Android және iOS-тегі үздік рейтингілі мобильді тәжірибелер. Кез келген жерде, кез келген уақытта керемет графикамен және қызықты геймплеймен ойнаңыз.",
    readMore: "Толығырақ",
    readLess: "Жасыру",
    toggleTheme: "Күндізгі/Түнгі тақырыпты өзгерту",
    changeBg: "Фон түсін өзгерту",
    playSound: "🔊 Дыбыс ойнату",
    rateTitle: "GameWorld-ті бағалаңыз",
    ratingMsg: "Сіз бағаладыңыз:",
    footerTeam: "Команда:",
    footerGroup: "Топ:",
    greetingDefault: "GameWorld-ке қош келдіңіз!",
    greetingWithName: "GameWorld-ке қош келдіңіз,"
  },
  en: {
    home: "Home",
    news: "News",
    gallery: "Gallery",
    contact: "Contact",
    selectLang: "Select Language:",
    welcomeTitle: "Welcome to GameWorld",
    welcomeText: "Discover the latest gaming news, reviews, and communities. Join millions of players exploring the next era of gaming.",
    enterName: "Enter your name",
    submitBtn: "Submit",
    showTimeBtn: "Show Current Time",
    pcGames: "PC Games",
    pcShort: "Explore exclusive PC titles...",
    pcFull: "Explore exclusive PC titles, mods, and updates. Experience the best graphics and performance with customizable settings.",
    consoleGames: "Console Games",
    consoleShort: "Latest releases for PlayStation...",
    consoleFull: "Latest releases for PlayStation, Xbox, and Nintendo Switch. Enjoy exclusive titles and seamless gaming experience.",
    mobileGames: "Mobile Games",
    mobileShort: "Top-rated mobile experiences...",
    mobileFull: "Top-rated mobile experiences on Android and iOS. Play anywhere, anytime with stunning graphics and engaging gameplay.",
    readMore: "Read More",
    readLess: "Read Less",
    toggleTheme: "Toggle Day/Night Theme",
    changeBg: "Change Background Color",
    playSound: "🔊 Play Sound",
    rateTitle: "Rate GameWorld",
    ratingMsg: "You rated:",
    footerTeam: "Team:",
    footerGroup: "Group:",
    greetingDefault: "Welcome to GameWorld!",
    greetingWithName: "Welcome to GameWorld,"
  },
  ru: {
    home: "Главная",
    news: "Новости",
    gallery: "Галерея",
    contact: "Контакты",
    selectLang: "Выберите язык:",
    welcomeTitle: "Добро пожаловать в GameWorld",
    welcomeText: "Откройте для себя последние игровые новости, обзоры и сообщества. Присоединяйтесь к миллионам игроков, исследующих новую эру игр.",
    enterName: "Введите ваше имя",
    submitBtn: "Отправить",
    showTimeBtn: "Показать время",
    pcGames: "PC Игры",
    pcShort: "Исследуйте эксклюзивные PC игры...",
    pcFull: "Исследуйте эксклюзивные PC игры, моды и обновления. Наслаждайтесь лучшей графикой и производительностью с настраиваемыми параметрами.",
    consoleGames: "Консольные Игры",
    consoleShort: "Последние релизы для PlayStation...",
    consoleFull: "Последние релизы для PlayStation, Xbox и Nintendo Switch. Наслаждайтесь эксклюзивными играми и бесшовным игровым опытом.",
    mobileGames: "Мобильные Игры",
    mobileShort: "Лучшие мобильные игры...",
    mobileFull: "Лучшие мобильные игры для Android и iOS. Играйте где угодно и когда угодно с потрясающей графикой и увлекательным геймплеем.",
    readMore: "Читать далее",
    readLess: "Скрыть",
    toggleTheme: "Переключить День/Ночь",
    changeBg: "Изменить цвет фона",
    playSound: "🔊 Воспроизвести звук",
    rateTitle: "Оцените GameWorld",
    ratingMsg: "Вы поставили:",
    footerTeam: "Команда:",
    footerGroup: "Группа:",
    greetingDefault: "Добро пожаловать в GameWorld!",
    greetingWithName: "Добро пожаловать в GameWorld,"
  }
};

let currentLanguage = "kk"; // Kazakh by default

// Language Selector Handler with Switch Statement
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    languageSelector.addEventListener("change", function() {
      const selectedLang = this.value;
      
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

// Update all text elements based on language
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
  
  // Update placeholder separately
  const nameInput = document.getElementById("nameInput");
  if (nameInput) {
    nameInput.placeholder = texts.enterName;
  }
  
  // Update greeting if name was entered
  const greeting = document.getElementById("userGreeting");
  if (greeting && greeting.dataset.userName) {
    greeting.textContent = `${texts.greetingWithName} ${greeting.dataset.userName}!`;
  } else if (greeting) {
    greeting.textContent = texts.greetingDefault;
  }
  
  // Update read more buttons text
  document.querySelectorAll(".read-more-btn").forEach(btn => {
    if (btn.textContent.includes("Less") || btn.textContent.includes("Жасыру") || btn.textContent.includes("Скрыть")) {
      btn.textContent = texts.readLess;
    } else {
      btn.textContent = texts.readMore;
    }
  });
}

// ========== PART 1: DOM MANIPULATION AND STYLING ==========

// 1.1 Update Greeting with User Name (Manipulating Attributes)
function updateGreeting() {
  const nameInput = document.getElementById("nameInput");
  const greeting = document.getElementById("userGreeting");
  const userName = nameInput.value.trim();
  const texts = translations[currentLanguage];
  
  if (userName) {
    greeting.textContent = `${texts.greetingWithName} ${userName}!`;
    greeting.dataset.userName = userName;
    greeting.style.color = "#00fff7";
    playSound();
  } else {
    alert(currentLanguage === "kk" ? "⚠️ Атыңызды енгізіңіз!" : 
          currentLanguage === "ru" ? "⚠️ Пожалуйста, введите ваше имя!" : 
          "⚠️ Please enter your name!");
  }
}

// 1.2 Change Large Image in Gallery (Manipulating src attribute)
function changeLargeImage(src) {
  const largeImage = document.getElementById("largeImage");
  if (largeImage) {
    largeImage.src = src;
    largeImage.style.transform = "scale(1.05)";
    setTimeout(() => {
      largeImage.style.transform = "scale(1)";
    }, 300);
    playSound();
  }
}

// 1.3 Read More Button Toggle (Dynamic Style Changes)
document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  
  readMoreButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const card = this.closest(".platform-card");
      const shortText = card.querySelector(".short-text");
      const fullText = card.querySelector(".full-text");
      const texts = translations[currentLanguage];
      
      if (fullText.style.display === "none") {
        shortText.style.display = "none";
        fullText.style.display = "block";
        this.textContent = texts.readLess;
      } else {
        shortText.style.display = "block";
        fullText.style.display = "none";
        this.textContent = texts.readMore;
      }
    });
  });
});

// 1.4 Toggle Day/Night Theme
let isDarkTheme = true;
function toggleTheme() {
  const body = document.body;
  
  if (isDarkTheme) {
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

// 1.5 Change Background Color Randomly
function changeBackground() {
  const colors = ["#0a0a0f", "#1a0033", "#003366", "#004d00", "#330000"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
  playSound();
}

// ========== PART 2: EVENT HANDLING ==========

// 2.1 Show Current Time (Button Event Listener)
function showCurrentTime() {
  const timeDisplay = document.getElementById("timeDisplay");
  const now = new Date();
  const timeText = currentLanguage === "kk" ? "Қазіргі уақыт:" :
                   currentLanguage === "ru" ? "Текущее время:" : "Current Time:";
  timeDisplay.textContent = `${timeText} ${now.toLocaleTimeString()}`;
  timeDisplay.style.fontSize = "1.2rem";
  playSound();
}

// 2.2 Keyboard Navigation for Menu (Arrow Keys)
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("#mainNav .nav-link");
  let currentIndex = 0;
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % navItems.length;
      navItems[currentIndex].focus();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[currentIndex].focus();
    }
  });
});

// 2.3 Multi-Step Form Navigation (Callbacks)
function nextStep(stepNumber) {
  document.querySelectorAll(".form-step").forEach(step => {
    step.style.display = "none";
  });
  const nextStepEl = document.getElementById(`step${stepNumber}`);
  if (nextStepEl) {
    nextStepEl.style.display = "block";
  }
  playSound();
}

function prevStep(stepNumber) {
  document.querySelectorAll(".form-step").forEach(step => {
    step.style.display = "none";
  });
  const prevStepEl = document.getElementById(`step${stepNumber}`);
  if (prevStepEl) {
    prevStepEl.style.display = "block";
  }
}

function resetForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.reset();
    nextStep(1);
    const successMsg = document.getElementById("successMessage");
    if (successMsg) {
      successMsg.style.display = "none";
    }
    playSound();
  }
}

// 2.4 Contact Form Submission with Callback
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();
      
      if (!name || !email || !message) {
        alert(currentLanguage === "kk" ? "⚠️ Барлық қажетті өрістерді толтырыңыз!" :
              currentLanguage === "ru" ? "⚠️ Пожалуйста, заполните все обязательные поля!" :
              "⚠️ Please fill in all required fields!");
        return;
      }
      
      if (!email.includes("@") || !email.includes(".")) {
        alert(currentLanguage === "kk" ? "❌ Жарамды email мекенжайын енгізіңіз!" :
              currentLanguage === "ru" ? "❌ Пожалуйста, введите действительный email!" :
              "❌ Please enter a valid email address!");
        return;
      }
      
      const successMsg = document.getElementById("successMessage");
      if (successMsg) {
        successMsg.textContent = currentLanguage === "kk" ? "✅ Хабарламаңыз сәтті жіберілді!" :
                                 currentLanguage === "ru" ? "✅ Ваше сообщение успешно отправлено!" :
                                 "✅ Your message has been sent successfully!";
        successMsg.style.display = "block";
      }
      playSound();
      
      setTimeout(() => {
        form.reset();
        nextStep(1);
        if (successMsg) {
          successMsg.style.display = "none";
        }
      }, 3000);
    });
  }
});

// 2.5 News Filter with Switch Statement
function filterNews(category) {
  const newsCards = document.querySelectorAll(".news-card");
  
  switch(category) {
    case "all":
      newsCards.forEach(card => card.style.display = "block");
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

// ========== PART 3: ADVANCED JAVASCRIPT CONCEPTS ==========

// 3.1 Objects and Methods
const gameData = {
  name: "GameWorld",
  users: 5000,
  categories: ["Action", "Adventure", "Battle Royale"],
  displayInfo: function() {
    return `${this.name} has ${this.users} active users`;
  }
};

// 3.2 Arrays and Loops - Display news dynamically
const newsData = [
  { title: "GTA 6 Release Date", category: "action", img: "images/gtaV.png" },
  { title: "New RPG Coming", category: "adventure", img: "images/farcry3.png" },
  { title: "Fortnite Update", category: "battle-royale", img: "images/battlefield.png" }
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
          <p class="card-text">Latest updates and news about ${news.title}.</p>
          <a href="#" class="btn btn-outline-info btn-sm">Read more</a>
        </div>
      </div>
    `;
    
    container.appendChild(col);
  });
  
  playSound();
}

// 3.3 Higher-Order Functions (map, filter, forEach)
const gameCategories = ["PC Games", "Console Games", "Mobile Games"];

gameCategories.forEach(category => {
  console.log(`Category: ${category}`);
});

const filteredGames = newsData.filter(game => game.category === "action");
console.log("Action Games:", filteredGames);

// 3.4 Star Rating System (querySelectorAll)
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingMessage = document.getElementById("ratingMessage");
  
  stars.forEach(star => {
    star.addEventListener("click", function() {
      const rating = this.dataset.rating;
      const texts = translations[currentLanguage];
      
      stars.forEach(s => s.style.color = "#ccc");
      
      for (let i = 0; i < rating; i++) {
        stars[i].style.color = "#FFD700";
      }
      
      ratingMessage.textContent = `${texts.ratingMsg} ${rating} ⭐`;
      playSound();
    });
  });
});

// 3.5 Play Sound Effect
function playSound() {
  const sound = document.getElementById("clickSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound play failed:", e));
  }
}

// 3.6 FAQ Accordion Toggle
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");
  questions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      answer.classList.toggle("active");
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });
});

// ========== PART 4: POPUP AND DATE/TIME ==========

function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
  playSound();
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

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

// ========== PART 5: ANIMATIONS ==========

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

console.log("🎮 GameWorld JavaScript loaded successfully! Default language: Kazakh");
