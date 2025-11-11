// ============================================
// GAMEWORLD - COMPLETE VERSION WITH AUTH + API
// Assignment 7 + Assignment 8 + Final Project
// ============================================

$(document).ready(function() {
  console.log("✅ jQuery is ready!");
  console.log("🎮 GameWorld Complete Version loaded!");
  
  // Initialize all features
  initScrollProgress();
  initAnimatedCounters();
  initLazyLoading();
  initNewsSearch();
  initAutocomplete();
  initFAQSearch();
  initContactForm();
  initCopyToClipboard();
  initEventHandlers();
  initLanguageSystem();
  initDateTime();
  initThemeSystem();
  initStarRatingWithLocalStorage();
  
  // NEW: Authentication & API
  initAuthSystem();
  loadGamesFromAPI();
  
  showToast("Welcome to GameWorld!", "info");
});

// ============================================
// AUTHENTICATION SYSTEM WITH LOCAL STORAGE
// ============================================
function initAuthSystem() {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('gameworld-current-user'));
  
  if (currentUser) {
    showUserMenu(currentUser);
  } else {
    showLoginButton();
  }
  
  // Login Form Submit
  $('#loginFormSubmit').on('submit', function(e) {
    e.preventDefault();
    
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();
    
    if (!email || !password) {
      showToast('Please fill in all fields!', 'error');
      return;
    }
    
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('gameworld-users') || '[]');
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Save current user (without password)
      const currentUser = {
        name: user.name,
        email: user.email,
        joinDate: user.joinDate
      };
      
      localStorage.setItem('gameworld-current-user', JSON.stringify(currentUser));
      
      showToast(`Welcome back, ${user.name}!`, 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      showToast('Invalid email or password!', 'error');
    }
  });
  
  // Sign Up Form Submit
  $('#signUpFormSubmit').on('submit', function(e) {
    e.preventDefault();
    
    const name = $('#signUpName').val().trim();
    const email = $('#signUpEmail').val().trim();
    const password = $('#signUpPassword').val().trim();
    const confirmPassword = $('#signUpConfirmPassword').val().trim();
    
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields!', 'error');
      return;
    }
    
    if (password.length < 6) {
      showToast('Password must be at least 6 characters!', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('gameworld-users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      showToast('Email already registered!', 'error');
      return;
    }
    
    // Create new user
    const newUser = {
      name: name,
      email: email,
      password: password,
      joinDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('gameworld-users', JSON.stringify(users));
    
    showToast('Account created successfully!', 'success');
    
    // Auto login
    const currentUser = {
      name: newUser.name,
      email: newUser.email,
      joinDate: newUser.joinDate
    };
    
    localStorage.setItem('gameworld-current-user', JSON.stringify(currentUser));
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
  
  // Toggle between Login and Sign Up
  $('#showSignUp').on('click', function(e) {
    e.preventDefault();
    $('#loginForm').fadeOut(300, function() {
      $('#signUpForm').fadeIn(300);
    });
  });
  
  $('#showLogin').on('click', function(e) {
    e.preventDefault();
    $('#signUpForm').fadeOut(300, function() {
      $('#loginForm').fadeIn(300);
    });
  });
  
  // Logout
  $('#logoutBtn').on('click', function(e) {
    e.preventDefault();
    
    localStorage.removeItem('gameworld-current-user');
    showToast('Logged out successfully!', 'success');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
  
  // Profile Page
  if (window.location.pathname.includes('profile.html')) {
    loadProfileData();
  }
  
  // Edit Profile Form
  $('#editProfileForm').on('submit', function(e) {
    e.preventDefault();
    
    const newName = $('#editName').val().trim();
    const newEmail = $('#editEmail').val().trim();
    
    const currentUser = JSON.parse(localStorage.getItem('gameworld-current-user'));
    const users = JSON.parse(localStorage.getItem('gameworld-users') || '[]');
    
    // Update user in users array
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].name = newName;
      users[userIndex].email = newEmail;
      
      localStorage.setItem('gameworld-users', JSON.stringify(users));
      
      // Update current user
      currentUser.name = newName;
      currentUser.email = newEmail;
      localStorage.setItem('gameworld-current-user', JSON.stringify(currentUser));
      
      showToast('Profile updated successfully!', 'success');
      
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
  
  // Delete Account
  $('#deleteAccountBtn').on('click', function() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const currentUser = JSON.parse(localStorage.getItem('gameworld-current-user'));
      const users = JSON.parse(localStorage.getItem('gameworld-users') || '[]');
      
      // Remove user from array
      const filteredUsers = users.filter(u => u.email !== currentUser.email);
      localStorage.setItem('gameworld-users', JSON.stringify(filteredUsers));
      
      // Remove current user
      localStorage.removeItem('gameworld-current-user');
      
      showToast('Account deleted successfully!', 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  });
}

function showUserMenu(user) {
  $('#userMenuDropdown').show();
  $('#navUserName').text(user.name);
  $('#loginNavBtn').hide();
}

function showLoginButton() {
  $('#userMenuDropdown').hide();
  $('#loginNavBtn').show();
}

function loadProfileData() {
  const currentUser = JSON.parse(localStorage.getItem('gameworld-current-user'));
  
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  $('#profileName').text(currentUser.name);
  $('#profileEmail').text(currentUser.email);
  
  const savedRating = localStorage.getItem('gameworld-star-rating') || '0';
  $('#profileRating').text(savedRating + ' ⭐');
  
  const joinYear = new Date(currentUser.joinDate).getFullYear();
  $('#memberSince').text(joinYear);
  
  $('#editName').val(currentUser.name);
  $('#editEmail').val(currentUser.email);
}

// ============================================
// API INTEGRATION: RAWG VIDEO GAMES API
// ============================================
function loadGamesFromAPI() {
  const apiKey = 'YOUR_API_KEY_HERE'; // REPLACE WITH YOUR RAWG API KEY
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=6&ordering=-rating`;
  
  // Show loader
  $('#apiGamesLoader').show();
  
  // Fallback data if API fails
  const fallbackGames = [
    {
      name: "The Witcher 3: Wild Hunt",
      background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      rating: 4.66,
      released: "2015-05-18"
    },
    {
      name: "Grand Theft Auto V",
      background_image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
      rating: 4.47,
      released: "2013-09-17"
    },
    {
      name: "Portal 2",
      background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
      rating: 4.61,
      released: "2011-04-18"
    },
    {
      name: "Red Dead Redemption 2",
      background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
      rating: 4.59,
      released: "2018-10-26"
    },
    {
      name: "Cyberpunk 2077",
      background_image: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      rating: 4.21,
      released: "2020-12-10"
    },
    {
      name: "The Last of Us",
      background_image: "https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpg",
      rating: 4.40,
      released: "2013-06-14"
    }
  ];
  
  // Try to fetch from API, use fallback if fails
  $.ajax({
    url: apiUrl,
    method: 'GET',
    timeout: 5000,
    success: function(data) {
      displayGames(data.results);
      $('#apiGamesLoader').hide();
      console.log('✅ Games loaded from RAWG API');
    },
    error: function() {
      console.log('⚠️ API failed, using fallback data');
      displayGames(fallbackGames);
      $('#apiGamesLoader').hide();
    }
  });
}

function displayGames(games) {
  const container = $('#apiGamesContainer');
  container.empty();
  
  games.forEach(game => {
    const gameCard = `
      <div class="col-md-4">
        <div class="card bg-dark text-light h-100 border border-info shadow api-game-card">
          <img src="${game.background_image}" class="card-img-top" alt="${game.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title text-info">${game.name}</h5>
            <p class="card-text">
              <i class="fas fa-star text-warning"></i> ${game.rating}/5<br>
              <small class="text-muted">Released: ${game.released || 'N/A'}</small>
            </p>
          </div>
        </div>
      </div>
    `;
    
    container.append(gameCard);
  });
}

// ============================================
// THEME SYSTEM WITH LOCAL STORAGE + NAVBAR TOGGLE
// ============================================
function initThemeSystem() {
  const savedTheme = localStorage.getItem('gameworld-theme');
  
  if (savedTheme === 'light') {
    $('body').addClass('light-theme');
    updateThemeIcon('light');
  } else {
    $('body').removeClass('light-theme');
    updateThemeIcon('dark');
  }
  
  $('#navbarThemeToggle').on('click', function() {
    $('body').toggleClass('light-theme');
    
    const isDarkTheme = !$('body').hasClass('light-theme');
    const newTheme = isDarkTheme ? 'dark' : 'light';
    
    localStorage.setItem('gameworld-theme', newTheme);
    updateThemeIcon(newTheme);
    
    const themeMsg = isDarkTheme ? 'Dark theme activated' : 'Light theme activated';
    showToast(themeMsg, 'success');
  });
}

function updateThemeIcon(theme) {
  const $icon = $('#themeIcon');
  if (theme === 'light') {
    $icon.removeClass('fa-moon').addClass('fa-sun');
  } else {
    $icon.removeClass('fa-sun').addClass('fa-moon');
  }
}

// ============================================
// STAR RATING WITH LOCAL STORAGE
// ============================================
function initStarRatingWithLocalStorage() {
  const savedRating = localStorage.getItem('gameworld-star-rating');
  
  if (savedRating) {
    const rating = parseInt(savedRating);
    setStarRating(rating);
    $('#ratingMessage').text(`You rated: ${rating} ⭐ (Saved)`).css('font-size', '1.3rem');
  }
  
  $('.star').on('click', function() {
    const rating = $(this).data('rating');
    
    localStorage.setItem('gameworld-star-rating', rating);
    setStarRating(rating);
    
    $('#ratingMessage').text(`You rated: ${rating} ⭐ (Saved)`).css('font-size', '1.3rem');
    showToast(`Rated ${rating} stars!`, 'success');
  });
  
  $('.star').on('mouseenter', function() {
    const hoverRating = $(this).data('rating');
    $('.star').each(function(index) {
      if (index < hoverRating && !$(this).hasClass('selected')) {
        $(this).css('color', '#FFD700');
      }
    });
  });
  
  $('.star').on('mouseleave', function() {
    $('.star').each(function() {
      if (!$(this).hasClass('selected')) {
        $(this).css('color', '#ccc');
      }
    });
  });
}

function setStarRating(rating) {
  $('.star').css('color', '#ccc').removeClass('selected');
  
  for (let i = 0; i < rating; i++) {
    $('.star').eq(i).css('color', '#FFD700').addClass('selected');
  }
}

// ============================================
// MULTILANGUAGE TRANSLATIONS
// ============================================
const translations = {
  kk: {
    home: "Басты бет",
    news: "Жаңалықтар",
    gallery: "Галерея",
    contact: "Байланыс",
    selectLang: "Тілді таңдаңыз:",
    greetingDefault: "GameWorld-ке қош келдіңіз!",
    greetingWithName: "GameWorld-ке қош келдіңіз,",
    enterName: "Атыңызды енгізіңіз",
    submitBtn: "Жіберу",
    welcomeTitle: "GameWorld-ке қош келдіңіз",
    welcomeText: "Соңғы ойын жаңалықтарын, шолуларды және қоғамдастықтарды ашыңыз.",
    copyBtn: "Көшіру",
    showTimeBtn: "Уақытты көрсету",
    pcGames: "PC Ойындары",
    pcShort: "Эксклюзивті PC ойындарын зерттеңіз...",
    pcFull: "Эксклюзивті PC ойындарын, модтарды және жаңартуларды зерттеңіз.",
    consoleGames: "Консоль Ойындары",
    consoleShort: "PlayStation үшін соңғы шығарылымдар...",
    consoleFull: "PlayStation, Xbox және Nintendo Switch үшін соңғы шығарылымдар.",
    mobileGames: "Мобильді Ойындар",
    mobileShort: "Үздік рейтингілі мобильді тәжірибелер...",
    mobileFull: "Android және iOS-тегі үздік рейтингілі мобильді тәжірибелер.",
    readMore: "Толығырақ",
    readLess: "Жасыру",
    changeBg: "Фон түсін өзгерту",
    playSound: "🔊 Дыбыс ойнату",
    rateTitle: "GameWorld-ті бағалаңыз",
    footerTeam: "Команда:",
    footerGroup: "Топ:",
    activeUsers: "Белсенді пайдаланушылар",
    gamesReviewed: "Шолған ойындар",
    newsArticles: "Жаңалық мақалалар"
  },
  en: {
    home: "Home",
    news: "News",
    gallery: "Gallery",
    contact: "Contact",
    selectLang: "Select Language:",
    greetingDefault: "Welcome to GameWorld!",
    greetingWithName: "Welcome to GameWorld,",
    enterName: "Enter your name",
    submitBtn: "Submit",
    welcomeTitle: "Welcome to GameWorld",
    welcomeText: "Discover the latest gaming news, reviews, and communities.",
    copyBtn: "Copy",
    showTimeBtn: "Show Current Time",
    pcGames: "PC Games",
    pcShort: "Explore exclusive PC games...",
    pcFull: "Explore exclusive PC games, mods, and updates.",
    consoleGames: "Console Games",
    consoleShort: "Latest releases for PlayStation...",
    consoleFull: "Latest releases for PlayStation, Xbox, and Nintendo Switch.",
    mobileGames: "Mobile Games",
    mobileShort: "Top-rated mobile experiences...",
    mobileFull: "Top-rated mobile experiences on Android and iOS.",
    readMore: "Read More",
    readLess: "Read Less",
    changeBg: "Change Background Color",
    playSound: "🔊 Play Sound",
    rateTitle: "Rate GameWorld",
    footerTeam: "Team:",
    footerGroup: "Group:",
    activeUsers: "Active Users",
    gamesReviewed: "Games Reviewed",
    newsArticles: "News Articles"
  },
  ru: {
    home: "Главная",
    news: "Новости",
    gallery: "Галерея",
    contact: "Контакты",
    selectLang: "Выберите язык:",
    greetingDefault: "Добро пожаловать в GameWorld!",
    greetingWithName: "Добро пожаловать в GameWorld,",
    enterName: "Введите ваше имя",
    submitBtn: "Отправить",
    welcomeTitle: "Добро пожаловать в GameWorld",
    welcomeText: "Откройте для себя последние игровые новости.",
    copyBtn: "Копировать",
    showTimeBtn: "Показать время",
    pcGames: "PC Игры",
    pcShort: "Исследуйте эксклюзивные PC игры...",
    pcFull: "Исследуйте эксклюзивные PC игры, моды и обновления.",
    consoleGames: "Консольные Игры",
    consoleShort: "Последние релизы для PlayStation...",
    consoleFull: "Последние релизы для PlayStation, Xbox и Nintendo Switch.",
    mobileGames: "Мобильные Игры",
    mobileShort: "Лучшие мобильные игры...",
    mobileFull: "Лучшие мобильные игры на Android и iOS.",
    readMore: "Читать далее",
    readLess: "Скрыть",
    changeBg: "Изменить цвет фона",
    playSound: "🔊 Воспроизвести звук",
    rateTitle: "Оцените GameWorld",
    footerTeam: "Команда:",
    footerGroup: "Группа:",
    activeUsers: "Активных пользователей",
    gamesReviewed: "Обзоров игр",
    newsArticles: "Новостных статей"
  }
};

let currentLanguage = "kk";

function initScrollProgress() {
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $('#scrollProgress').css('width', scrollPercent + '%');
  });
}

function initAnimatedCounters() {
  let countersAnimated = false;
  
  $(window).on('scroll', function() {
    if (countersAnimated) return;
    
    $('.counter').each(function() {
      const $counter = $(this);
      const offset = $counter.offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      
      if (windowBottom > offset && !$counter.hasClass('counted')) {
        $counter.addClass('counted');
        countersAnimated = true;
        
        const target = parseInt($counter.data('target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            $counter.text(target + '+');
            clearInterval(timer);
          } else {
            $counter.text(Math.floor(current) + '+');
          }
        }, 16);
      }
    });
  });
}

function initLazyLoading() {
  function loadVisibleImages() {
    $('.lazy-image').each(function() {
      const $img = $(this);
      const imgTop = $img.offset().top;
      const imgBottom = imgTop + $img.height();
      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + $(window).height();
      
      if (imgBottom > windowTop && imgTop < windowBottom && !$img.hasClass('loaded')) {
        const dataSrc = $img.attr('data-src');
        
        if (dataSrc) {
          $img.attr('src', dataSrc);
          $img.addClass('loaded');
        }
      }
    });
  }
  
  $(window).on('scroll', loadVisibleImages);
  loadVisibleImages();
}

function initNewsSearch() {
  $('#newsSearchBar').on('keyup', function() {
    const searchTerm = $(this).val().toLowerCase().trim();
    
    $('.news-card').each(function() {
      const $card = $(this);
      const title = $card.data('title').toLowerCase();
      const category = $card.data('category').toLowerCase();
      const text = $card.find('.card-text').text().toLowerCase();
      
      if (title.includes(searchTerm) || category.includes(searchTerm) || text.includes(searchTerm)) {
        $card.fadeIn(300);
      } else {
        $card.fadeOut(300);
      }
    });
    
    if (searchTerm.length > 0) {
      updateAutocomplete(searchTerm);
    } else {
      $('#autocompleteList').hide();
    }
  });
  
  $('.filter-btn').on('click', function() {
    const filter = $(this).data('filter');
    
    $('.filter-btn').removeClass('btn-info').addClass('btn-outline-info');
    $(this).removeClass('btn-outline-info').addClass('btn-info');
    
    if (filter === 'all') {
      $('.news-card').fadeIn(300);
    } else {
      $('.news-card').each(function() {
        const $card = $(this);
        if ($card.data('category') === filter) {
          $card.fadeIn(300);
        } else {
          $card.fadeOut(300);
        }
      });
    }
    
    showToast(`Filter applied: ${filter}`, 'success');
  });
}

function initAutocomplete() {
  const suggestions = [
    "Assassin's Creed Returns",
    "Batman: Arkham City",
    "PUBG: New Era",
    "GTA 6 Release Date Announced",
    "Far Cry 7 Teaser Trailer",
    "Call of Duty Modern Warfare 4"
  ];
  
  window.gameWorldSuggestions = suggestions;
}

function updateAutocomplete(searchTerm) {
  const $list = $('#autocompleteList');
  $list.empty();
  
  const matches = window.gameWorldSuggestions.filter(item => 
    item.toLowerCase().includes(searchTerm)
  );
  
  if (matches.length > 0) {
    matches.slice(0, 5).forEach(match => {
      const $item = $('<li>')
        .addClass('list-group-item')
        .html(highlightMatch(match, searchTerm))
        .on('click', function() {
          $('#newsSearchBar').val(match);
          $list.hide();
          $('#newsSearchBar').trigger('keyup');
        });
      
      $list.append($item);
    });
    
    $list.show();
  } else {
    $list.hide();
  }
}

function highlightMatch(text, search) {
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

$(document).on('click', function(e) {
  if (!$(e.target).closest('#newsSearchBar, #autocompleteList').length) {
    $('#autocompleteList').hide();
  }
});

function initFAQSearch() {
  let originalContent = [];
  
  $('.faq-item').each(function(index) {
    originalContent[index] = {
      question: $(this).find('.question').html(),
      answer: $(this).find('.answer').html()
    };
  });
  
  $('#faqSearchBar').on('keyup', function() {
    const searchTerm = $(this).val().trim();
    
    if (searchTerm.length === 0) {
      $('.faq-item').each(function(index) {
        $(this).find('.question').html(originalContent[index].question);
        $(this).find('.answer').html(originalContent[index].answer);
        $(this).show();
      });
      return;
    }
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    $('.faq-item').each(function(index) {
      const $item = $(this);
      const questionText = originalContent[index].question;
      const answerText = originalContent[index].answer;
      
      const questionMatch = questionText.match(regex);
      const answerMatch = answerText.match(regex);
      
      if (questionMatch || answerMatch) {
        const highlightedQuestion = questionText.replace(regex, '<span class="highlight">$1</span>');
        const highlightedAnswer = answerText.replace(regex, '<span class="highlight">$1</span>');
        
        $item.find('.question').html(highlightedQuestion);
        $item.find('.answer').html(highlightedAnswer);
        $item.find('.answer').show();
        $item.fadeIn(300);
      } else {
        $item.fadeOut(300);
      }
    });
  });
  
  $('.question').on('click', function() {
    const $answer = $(this).next('.answer');
    $answer.slideToggle(300);
  });
}

function initContactForm() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const $submitBtn = $('#submitFormBtn');
    const $btnText = $('#submitBtnText');
    const $spinner = $('#submitSpinner');
    
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    
    if (!name || !email || !message) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email!', 'error');
      return;
    }
    
    $btnText.text('Sending...');
    $spinner.show();
    $submitBtn.prop('disabled', true);
    
    setTimeout(function() {
      $spinner.hide();
      $btnText.text('Send Message');
      $submitBtn.prop('disabled', false);
      
      $('#successMessage').fadeIn(300);
      showToast('Message sent successfully!', 'success');
      
      setTimeout(function() {
        $('#contactForm')[0].reset();
        $('.form-step').hide();
        $('#step1').show();
        $('#successMessage').fadeOut(300);
      }, 3000);
    }, 2000);
  });
  
  $('.next-step-btn').on('click', function() {
    const nextStep = $(this).data('next');
    $('.form-step').hide();
    $(`#step${nextStep}`).fadeIn(300);
  });
  
  $('.prev-step-btn').on('click', function() {
    const prevStep = $(this).data('prev');
    $('.form-step').hide();
    $(`#step${prevStep}`).fadeIn(300);
  });
  
  $('.reset-form-btn').on('click', function() {
    $('#contactForm')[0].reset();
    $('.form-step').hide();
    $('#step1').fadeIn(300);
    $('#successMessage').hide();
    showToast('Form reset', 'info');
  });
}

function showToast(message, type = 'info') {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };
  
  const colors = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8',
    warning: '#ffc107'
  };
  
  const toastId = 'toast-' + Date.now();
  
  const toastHTML = `
    <div id="${toastId}" class="toast custom-toast" role="alert">
      <div class="toast-header" style="background-color: ${colors[type]};">
        <strong class="me-auto">${icons[type]} GameWorld</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">${message}</div>
    </div>
  `;
  
  $('#toastContainer').append(toastHTML);
  
  const $toast = $(`#${toastId}`);
  const toast = new bootstrap.Toast($toast[0], { autohide: true, delay: 3000 });
  
  toast.show();
  
  $toast.on('hidden.bs.toast', function() {
    $(this).remove();
  });
}

function initCopyToClipboard() {
  $('.copy-btn').on('click', function() {
    const $btn = $(this);
    const targetId = $btn.data('clipboard-target');
    const $target = $(targetId);
    const text = $target.text();
    
    navigator.clipboard.writeText(text).then(function() {
      const originalHTML = $btn.html();
      $btn.html('<i class="fas fa-check"></i> Copied!');
      showToast('Copied to clipboard!', 'success');
      
      setTimeout(function() {
        $btn.html(originalHTML);
      }, 2000);
    });
  });
}

function initEventHandlers() {
  $('.thumbnail-img').on('click', function() {
    const src = $(this).attr('data-src') || $(this).attr('src');
    $('#largeImage').attr('src', src);
    showToast('Image changed', 'info');
  });
  
  $('.read-more-btn').on('click', function() {
    const $card = $(this).closest('.platform-card');
    const $shortText = $card.find('.short-text');
    const $fullText = $card.find('.full-text');
    const texts = translations[currentLanguage];
    
    if ($fullText.is(':visible')) {
      $fullText.slideUp(300);
      $shortText.slideDown(300);
      $(this).text(texts.readMore);
    } else {
      $shortText.slideUp(300);
      $fullText.slideDown(300);
      $(this).text(texts.readLess);
    }
  });
  
  $('.change-bg-btn').on('click', function() {
    const colors = ['#0a0a0f', '#1a0033', '#003366', '#004d00', '#330000'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $('body').css('background', randomColor);
    showToast('Background changed', 'info');
  });
  
  $('.play-sound-btn').on('click', function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
    
    showToast('Sound played!', 'info');
  });
  
  $('.subscribe-popup-btn').on('click', function() {
    $('#popup').css('display', 'flex').hide().fadeIn(300);
  });
  
  $('.close-popup').on('click', function() {
    $('#popup').fadeOut(300);
  });
  
  $('#subscribeBtn').on('click', function() {
    const email = $('#subscribeEmail').val().trim();
    if (email && email.includes('@')) {
      showToast('Subscribed successfully!', 'success');
      $('#popup').fadeOut(300);
      $('#subscribeEmail').val('');
    } else {
      showToast('Please enter a valid email!', 'error');
    }
  });
  
  $('#submitNameBtn, #showTimeBtn').on('click', function() {
    const name = $('#nameInput').val().trim();
    const now = new Date();
    const texts = translations[currentLanguage];
    
    if (name) {
      $('#userGreeting').text(`${texts.greetingWithName} ${name}!`);
      showToast(`Hello, ${name}!`, 'success');
    }
    
    $('#timeDisplay').text(`Current Time: ${now.toLocaleTimeString()}`);
  });
  
  $('#loadMoreNewsBtn').on('click', function() {
    showToast('Loading more news...', 'info');
  });
}

function initLanguageSystem() {
  $('#languageSelector').on('change', function() {
    const lang = $(this).val();
    updateLanguage(lang);
    showToast(`Language: ${lang.toUpperCase()}`, 'info');
  });
}

function updateLanguage(lang) {
  currentLanguage = lang;
  const texts = translations[lang];
  
  $('[data-lang]').each(function() {
    const $el = $(this);
    const key = $el.data('lang');
    
    if (texts[key]) {
      if ($el.is('input, textarea')) {
        $el.attr('placeholder', texts[key]);
      } else {
        $el.text(texts[key]);
      }
    }
  });
}

function initDateTime() {
  function updateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'medium'
    });
    $('#datetime').text(formatted);
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

console.log("🎮 GameWorld Complete: Auth + API + Theme + Rating!");
