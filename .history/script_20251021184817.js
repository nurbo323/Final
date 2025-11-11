// ========== PART 1: DOM MANIPULATION AND STYLING ==========

// 1.1 Update Greeting with User Name (Manipulating Attributes)
function updateGreeting() {
  const nameInput = document.getElementById("nameInput");
  const greeting = document.getElementById("userGreeting");
  const userName = nameInput.value.trim();
  
  if (userName) {
    greeting.textContent = `Welcome to GameWorld, ${userName}!`;
    greeting.style.color = "#00fff7";
    playSound(); // Play sound on successful update
  } else {
    alert("⚠️ Please enter your name!");
  }
}

// 1.2 Change Large Image in Gallery (Manipulating src attribute)
function changeLargeImage(src) {
  const largeImage = document.getElementById("largeImage");
  largeImage.src = src;
  largeImage.style.transform = "scale(1.05)";
  setTimeout(() => {
    largeImage.style.transform = "scale(1)";
  }, 300);
  playSound();
}

// 1.3 Read More Button Toggle (Dynamic Style Changes)
document.addEventListener("DOMContentLoaded", () => {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  
  readMoreButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const card = this.closest(".platform-card");
      const shortText = card.querySelector(".short-text");
      const fullText = card.querySelector(".full-text");
      
      if (fullText.style.display === "none") {
        shortText.style.display = "none";
        fullText.style.display = "block";
        this.textContent = "Read Less";
      } else {
        shortText.style.display = "block";
        fullText.style.display = "none";
        this.textContent = "Read More";
      }
    });
  });
});

// 1.4 Toggle Day/Night Theme
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
  timeDisplay.textContent = `Current Time: ${now.toLocaleTimeString()}`;
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
  document.getElementById(`step${stepNumber}`).style.display = "block";
  playSound();
}

function prevStep(stepNumber) {
  document.querySelectorAll(".form-step").forEach(step => {
    step.style.display = "none";
  });
  document.getElementById(`step${stepNumber}`).style.display = "block";
}

function resetForm() {
  document.getElementById("contactForm").reset();
  nextStep(1);
  document.getElementById("successMessage").style.display = "none";
  playSound();
}

// 2.4 Contact Form Submission with Callback
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      
      if (!name || !email || !message) {
        alert("⚠️ Please fill in all required fields!");
        return;
      }
      
      if (!email.includes("@") || !email.includes(".")) {
        alert("❌ Please enter a valid email address!");
        return;
      }
      
      // Show success message
      document.getElementById("successMessage").style.display = "block";
      playSound();
      
      // Reset after 3 seconds
      setTimeout(() => {
        form.reset();
        nextStep(1);
        document.getElementById("successMessage").style.display = "none";
      }, 3000);
    });
  }
});

// 2.5 Language Selector with Switch Statement
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    languageSelector.addEventListener("change", function() {
      const selectedLang = this.value;
      const display = document.getElementById("languageDisplay");
      
      switch(selectedLang) {
        case "en":
          display.textContent = "Language: English";
          break;
        case "ru":
          display.textContent = "Язык: Русский";
          break;
        case "kk":
          display.textContent = "Тіл: Қазақша";
          break;
        default:
          display.textContent = "Language: Unknown";
      }
      playSound();
    });
  }
});

// 2.6 News Filter with Switch Statement
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
      
      // Reset all stars
      stars.forEach(s => s.style.color = "#ccc");
      
      // Highlight selected stars
      for (let i = 0; i < rating; i++) {
        stars[i].style.color = "#FFD700";
      }
      
      ratingMessage.textContent = `You rated: ${rating} ⭐`;
      playSound();
    });
  });
});

// 3.5 Play Sound Effect
function playSound() {
  const sound = document.getElementById("clickSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
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

// Popup Functions
function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
  playSound();
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

// Live Date and Time Display
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

// Add hover animation to cards
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

console.log("🎮 GameWorld JavaScript loaded successfully!");
