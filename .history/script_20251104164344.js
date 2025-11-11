// ============================================
// GAMEWORLD - ASSIGNMENT 7: jQuery Implementation
// WITH FULL THEME & LANGUAGE SUPPORT
// ============================================

// TASK 0: jQuery Ready Function
$(document).ready(function() {
  console.log("✅ jQuery is ready!");
  console.log("🎮 GameWorld Assignment 7 loaded!");
  
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
  
  // ============================================
  // ASSIGNMENT 8: INIT THEME SYSTEM WITH LOCAL STORAGE
  // ============================================
  initThemeSystem();
  
  // Show welcome toast
  showToast("Welcome to GameWorld!", "info");
});

// ============================================
// ASSIGNMENT 8 - TASK 6: DARK/LIGHT MODE WITH LOCAL STORAGE
// ============================================
function initThemeSystem() {
  // Check if theme preference exists in Local Storage
  const savedTheme = localStorage.getItem('gameworld-theme');
  
  if (savedTheme === 'light') {
    $('body').addClass('light-theme');
    console.log('✅ Light theme loaded from Local Storage');
  } else {
    $('body').removeClass('light-theme');
    console.log('✅ Dark theme (default) loaded from Local Storage');
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
    welcomeText: "Соңғы ойын жаңалықтарын, шолуларды және қоғамдастықтарды ашыңыз. Ойын индустриясының келесі дәуірін зерттеп жатқан миллиондаған ойыншыларға қосылыңыз.",
    copyBtn: "Көшіру",
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
    welcomeText: "Discover the latest gaming news, reviews, and communities. Join millions of gamers exploring the next era of the gaming industry.",
    copyBtn: "Copy",
    showTimeBtn: "Show Current Time",
    pcGames: "PC Games",
    pcShort: "Explore exclusive PC games...",
    pcFull: "Explore exclusive PC games, mods, and updates. Experience the best graphics and performance with customizable settings.",
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
    welcomeText: "Откройте для себя последние игровые новости, обзоры и сообщества. Присоединяйтесь к миллионам геймеров, исследующих новую эру игровой индустрии.",
    copyBtn: "Копировать",
    showTimeBtn: "Показать время",
    pcGames: "PC Игры",
    pcShort: "Исследуйте эксклюзивные PC игры...",
    pcFull: "Исследуйте эксклюзивные PC игры, моды и обновления. Наслаждайтесь лучшей графикой и производительностью с настраиваемыми параметрами.",
    consoleGames: "Консольные Игры",
    consoleShort: "Последние релизы для PlayStation...",
    consoleFull: "Последние релизы для PlayStation, Xbox и Nintendo Switch. Наслаждайтесь эксклюзивными играми и безупречным игровым опытом.",
    mobileGames: "Мобильные Игры",
    mobileShort: "Лучшие мобильные игры...",
    mobileFull: "Лучшие мобильные игры на Android и iOS. Играйте где угодно и когда угодно с потрясающей графикой и увлекательным геймплеем.",
    readMore: "Читать далее",
    readLess: "Скрыть",
    toggleTheme: "Переключить День/Ночь",
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

// ============================================
// TASK 4: Scroll Progress Bar
// ============================================
function initScrollProgress() {
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    $('#scrollProgress').css('width', scrollPercent + '%');
  });
}

// ============================================
// TASK 5: Animated Number Counter
// ============================================
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

// ============================================
// TASK 9: Lazy Loading Images
// ============================================
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
          console.log('✅ Lazy loaded:', dataSrc);
        }
      }
    });
  }
  
  $(window).on('scroll', loadVisibleImages);
  loadVisibleImages();
}

// ============================================
// TASK 1: Real-time Search and Live Filter
// ============================================
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

// ============================================
// TASK 2: Autocomplete Search Suggestions
// ============================================
function initAutocomplete() {
  const suggestions = [
    "Assassin's Creed Returns",
    "Batman: Arkham City",
    "PUBG: New Era",
    "GTA 6 Release Date Announced",
    "Far Cry 7 Teaser Trailer",
    "Call of Duty Modern Warfare 4",
    "Action Games",
    "Adventure Games",
    "Battle Royale Games"
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

// ============================================
// TASK 3: Search Highlighting in FAQ
// ============================================
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

// ============================================
// ASSIGNMENT 8 - TASK 6: FORM VALIDATION WITH LOCAL STORAGE THEME INTEGRATION
// ============================================
function initContactForm() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const $submitBtn = $('#submitFormBtn');
    const $btnText = $('#submitBtnText');
    const $spinner = $('#submitSpinner');
    
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    
    // VALIDATION: Check all required fields
    if (!name) {
      showToast('Please fill in all required fields!', 'error');
      $('#name').focus();
      return;
    }
    
    if (!email) {
      showToast('Please fill in all required fields!', 'error');
      $('#email').focus();
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address!', 'error');
      $('#email').focus();
      return;
    }
    
    if (!message) {
      showToast('Please fill in all required fields!', 'error');
      $('#message').focus();
      return;
    }
    
    $btnText.text('Please wait...');
    $spinner.show();
    $submitBtn.prop('disabled', true);
    
    setTimeout(function() {
      $spinner.hide();
      $btnText.text('Send Message');
      $submitBtn.prop('disabled', false);
      
      $('#successMessage').fadeIn(300);
      showToast('Form submitted successfully!', 'success');
      
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

// ============================================
// TASK 7: Toast Notification System
// ============================================
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
    <div id="${toastId}" class="toast custom-toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header" style="background-color: ${colors[type]};">
        <strong class="me-auto">${icons[type]} GameWorld</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  $('#toastContainer').append(toastHTML);
  
  const $toast = $(`#${toastId}`);
  const toast = new bootstrap.Toast($toast[0], {
    autohide: true,
    delay: 3000
  });
  
  toast.show();
  
  $toast.on('hidden.bs.toast', function() {
    $(this).remove();
  });
}

// ============================================
// TASK 8: Copy to Clipboard
// ============================================
function initCopyToClipboard() {
  $('.copy-btn').on('click', function() {
    const $btn = $(this);
    const targetId = $btn.data('clipboard-target');
    const $target = $(targetId);
    const text = $target.text();
    
    navigator.clipboard.writeText(text).then(function() {
      const originalHTML = $btn.html();
      $btn.html('<i class="fas fa-check"></i> <span data-lang="copyBtn">Copied!</span>');
      $btn.addClass('copied');
      
      showToast('Copied to clipboard!', 'success');
      
      setTimeout(function() {
        $btn.html(originalHTML);
        $btn.removeClass('copied');
        updateLanguage(currentLanguage); // Restore translation
      }, 2000);
    }).catch(function() {
      showToast('Failed to copy!', 'error');
    });
  });
}

// ============================================
// EVENT HANDLERS
// ============================================
function initEventHandlers() {
  // Gallery image click
  $('.thumbnail-img').on('click', function() {
    const src = $(this).attr('data-src') || $(this).attr('src');
    $('#largeImage').attr('src', src);
    $('#largeImage').css('transform', 'scale(1.05)');
    
    setTimeout(function() {
      $('#largeImage').css('transform', 'scale(1)');
    }, 300);
    
    showToast('Image changed', 'info');
  });
  
  // Read More/Less toggle
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
  
  // ============================================
  // ASSIGNMENT 8: Theme toggle with LOCAL STORAGE
  // ============================================
  let isDarkTheme = !$('body').hasClass('light-theme');
  $('.toggle-theme-btn').on('click', function() {
    $('body').toggleClass('light-theme');
    isDarkTheme = !isDarkTheme;
    
    // Save to Local Storage
    const newTheme = isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('gameworld-theme', newTheme);
    
    const themeMsg = isDarkTheme ? 'Dark theme activated' : 'Light theme activated';
    showToast(themeMsg + ' (saved)', 'success');
    
    console.log(`✅ Theme saved to Local Storage: ${newTheme}`);
  });
  
  // Change background
  $('.change-bg-btn').on('click', function() {
    const colors = ['#0a0a0f', '#1a0033', '#003366', '#004d00', '#330000'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $('body').css('background', randomColor);
    showToast('Background changed', 'info');
  });
  
  // Play sound
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
  
  // Star rating
  $('.star').on('click', function() {
    const rating = $(this).data('rating');
    
    $('.star').css('color', '#ccc').removeClass('selected');
    
    for (let i = 0; i < rating; i++) {
      $('.star').eq(i).css('color', '#FFD700').addClass('selected');
    }
    
    $('#ratingMessage').text(`You rated: ${rating} ⭐`).css('font-size', '1.3rem');
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
  
  // Popup
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
  
  // Show time
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
  
  // Load more news
  $('#loadMoreNewsBtn').on('click', function() {
    showToast('Loading more news...', 'info');
    
    setTimeout(function() {
      const newCards = [
        { title: "Cyberpunk 2077 Update", category: "action", img: "images/gtaV.png" },
        { title: "Elden Ring DLC", category: "adventure", img: "images/farcry3.png" }
      ];
      
      newCards.forEach(card => {
        const cardHTML = `
          <div class="col-md-4 news-card" data-category="${card.category}" data-title="${card.title}">
            <div class="card bg-dark text-light h-100 border border-info shadow">
              <img data-src="${card.img}" class="card-img-top lazy-image" alt="${card.title}" src="images/placeholder.jpg">
              <div class="card-body">
                <h5 class="card-title text-info">${card.title}</h5>
                <p class="card-text">Latest updates about ${card.title}.</p>
                <a href="#" class="btn btn-outline-info btn-sm">Read more</a>
              </div>
            </div>
          </div>
        `;
        $('#newsContainer').append(cardHTML);
      });
      
      initLazyLoading();
      showToast('New articles loaded!', 'success');
    }, 1000);
  });
}

// ============================================
// MULTILANGUAGE SYSTEM
// ============================================
function initLanguageSystem() {
  $('#languageSelector').on('change', function() {
    const lang = $(this).val();
    updateLanguage(lang);
    showToast(`Language changed to ${lang.toUpperCase()}`, 'info');
  });
}

function updateLanguage(lang) {
  currentLanguage = lang;
  const texts = translations[lang];
  
  // Update all elements with data-lang attribute
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
  
  // Update placeholder attributes
  $('[data-lang-placeholder]').each(function() {
    const key = $(this).data('lang-placeholder');
    if (texts[key]) {
      $(this).attr('placeholder', texts[key]);
    }
  });
}

// ============================================
// DATE/TIME DISPLAY
// ============================================
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

// ============================================
// KEYBOARD NAVIGATION
// ============================================
$(document).on('keydown', function(e) {
  const $navLinks = $('#mainNav .nav-link');
  const $focused = $(':focus');
  const currentIndex = $navLinks.index($focused);
  
  if (currentIndex >= 0) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % $navLinks.length;
      $navLinks.eq(nextIndex).focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + $navLinks.length) % $navLinks.length;
      $navLinks.eq(prevIndex).focus();
    }
  }
});

console.log("🎮 GameWorld fully loaded with jQuery + Theme System + Assignment 8!");
