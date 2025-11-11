$(document).ready(function() {
  console.log("✅ GameWorld Assignment 8 Loaded!");
  
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
  
  showToast("Welcome to GameWorld!", "info");
});

// ==================== THEME SYSTEM ====================
function initThemeSystem() {
  const savedTheme = localStorage.getItem('gameworld-theme');
  if (savedTheme === 'light') {
    $('body').addClass('light-theme');
  }
  console.log(`✅ Theme: ${savedTheme || 'dark'}`);
}

const translations = {
  kk: {
    home: "Басты бет", news: "Жаңалықтар", gallery: "Галерея", contact: "Байланыс",
    selectLang: "Тілді таңдаңыз:", greetingDefault: "GameWorld-ке қош келдіңіз!",
    enterName: "Атыңызды енгізіңіз", submitBtn: "Жіберу",
    activeUsers: "Белсенді пайдаланушылар", gamesReviewed: "Шолған ойындар",
    newsArticles: "Жаңалық мақалалар", toggleTheme: "Күндізгі/Түнгі тақырыпты өзгерту",
    changeBg: "Фон түсін өзгерту", playSound: "🔊 Дыбыс ойнату",
    rateTitle: "GameWorld-ті бағалаңыз", footerTeam: "Команда:", footerGroup: "Топ:"
  },
  en: {
    home: "Home", news: "News", gallery: "Gallery", contact: "Contact",
    selectLang: "Select Language:", greetingDefault: "Welcome to GameWorld!",
    enterName: "Enter your name", submitBtn: "Submit",
    activeUsers: "Active Users", gamesReviewed: "Games Reviewed",
    newsArticles: "News Articles", toggleTheme: "Toggle Theme",
    changeBg: "Change Background", playSound: "🔊 Play Sound",
    rateTitle: "Rate GameWorld", footerTeam: "Team:", footerGroup: "Group:"
  },
  ru: {
    home: "Главная", news: "Новости", gallery: "Галерея", contact: "Контакты",
    selectLang: "Выберите язык:", greetingDefault: "Добро пожаловать!",
    enterName: "Введите имя", submitBtn: "Отправить",
    activeUsers: "Активных пользователей", gamesReviewed: "Обзоров игр",
    newsArticles: "Новостных статей", toggleTheme: "Переключить тему",
    changeBg: "Изменить фон", playSound: "🔊 Звук",
    rateTitle: "Оцените GameWorld", footerTeam: "Команда:", footerGroup: "Группа:"
  }
};

let currentLanguage = "kk";

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $('#scrollProgress').css('width', scrollPercent + '%');
  });
}

// ==================== ANIMATED COUNTERS ====================
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

// ==================== LAZY LOADING ====================
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

// ==================== NEWS SEARCH ====================
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
        if ($(this).data('category') === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(300);
        }
      });
    }
    showToast(`Filter: ${filter}`, 'success');
  });
}

// ==================== AUTOCOMPLETE ====================
function initAutocomplete() {
  window.gameWorldSuggestions = [
    "Assassin's Creed", "Batman: Arkham City", "PUBG: New Era",
    "GTA 6", "Far Cry 7", "Call of Duty",
    "Action Games", "Adventure Games", "Battle Royale"
  ];
}

function updateAutocomplete(searchTerm) {
  const $list = $('#autocompleteList');
  $list.empty();
  const matches = window.gameWorldSuggestions.filter(item => item.toLowerCase().includes(searchTerm));
  if (matches.length > 0) {
    matches.slice(0, 5).forEach(match => {
      const $item = $('<li>').addClass('list-group-item').html(highlightMatch(match, searchTerm))
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

// ==================== FAQ SEARCH ====================
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
    $(this).next('.answer').slideToggle(300);
  });
}

// ==================== FORM VALIDATION ====================
function initContactForm() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    
    if (!name) {
      showToast('Please enter your name!', 'error');
      $('#name').focus();
      return;
    }
    if (!email) {
      showToast('Please enter your email!', 'error');
      $('#email').focus();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Invalid email!', 'error');
      return;
    }
    if (!message) {
      showToast('Please enter a message!', 'error');
      $('#message').focus();
      return;
    }
    
    const $submitBtn = $('#submitFormBtn');
    const $btnText = $('#submitBtnText');
    const $spinner = $('#submitSpinner');
    
    $btnText.text('Sending...');
    $spinner.show();
    $submitBtn.prop('disabled', true);
    
    setTimeout(function() {
      $spinner.hide();
      $btnText.text('Send Message');
      $submitBtn.prop('disabled', false);
      $('#successMessage').fadeIn(300);
      showToast('Form submitted!', 'success');
      
      setTimeout(function() {
        $('#contactForm')[0].reset();
        $('.form-step').hide();
        $('#step1').show();
        $('#successMessage').fadeOut(300);
      }, 2000);
    }, 1500);
  });
  
  $('.next-step-btn').on('click', function() {
    const nextStep = $(this).data('next');
    const currentStep = $(this).closest('.form-step').attr('id');
    
    if (currentStep === 'step1') {
      const name = $('#name').val().trim();
      const email = $('#email').val().trim();
      if (!name || !email) {
        showToast('Fill required fields!', 'error');
        return;
      }
    }
    
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

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const colors = { success: '#28a745', error: '#dc3545', info: '#17a2b8', warning: '#ffc107' };
  const toastId = 'toast-' + Date.now();
  
  const toastHTML = `
    <div id="${toastId}" class="toast custom-toast" role="alert">
      <div class="toast-header" style="background-color: ${colors[type]};">
        <strong>${icons[type]} GameWorld</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">${message}</div>
    </div>
  `;
  
  $('#toastContainer').append(toastHTML);
  const $toast = $(`#${toastId}`);
  const toast = new bootstrap.Toast($toast[0], { autohide: true, delay: 3000 });
  toast.show();
  $toast.on('hidden.bs.toast', function() { $(this).remove(); });
}

// ==================== COPY TO CLIPBOARD ====================
function initCopyToClipboard() {
  $('.copy-btn').on('click', function() {
    const $btn = $(this);
    const targetId = $btn.data('clipboard-target');
    const text = $(targetId).text();
    
    navigator.clipboard.writeText(text).then(function() {
      const originalHTML = $btn.html();
      $btn.html('<i class="fas fa-check"></i> Copied!');
      $btn.addClass('copied');
      showToast('Copied!', 'success');
      
      setTimeout(function() {
        $btn.html(originalHTML);
        $btn.removeClass('copied');
      }, 2000);
    }).catch(() => showToast('Failed to copy!', 'error'));
  });
}

// ==================== EVENT HANDLERS ====================
function initEventHandlers() {
  $('.thumbnail-img').on('click', function() {
    const src = $(this).attr('data-src') || $(this).attr('src');
    $('#largeImage').attr('src', src);
    showToast('Image changed', 'info');
  });
  
  $('.toggle-theme-btn').on('click', function() {
    $('body').toggleClass('light-theme');
    const newTheme = $('body').hasClass('light-theme') ? 'light' : 'dark';
    localStorage.setItem('gameworld-theme', newTheme);
    showToast(`${newTheme} theme activated`, 'success');
  });
  
  $('.change-bg-btn').on('click', function() {
    const colors = ['#0a0a0f', '#1a0033', '#003366', '#004d00', '#330000'];
    $('body').css('background-color', colors[Math.floor(Math.random() * colors.length)]);
    showToast('Background changed', 'info');
  });
  
  $('.play-sound-btn').on('click', function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
    showToast('Sound played!', 'info');
  });
  
  $('.star').on('click', function() {
    const rating = $(this).data('rating');
    $('.star').css('color', '#ccc');
    for (let i = 0; i < rating; i++) {
      $('.star').eq(i).css('color', '#FFD700');
    }
    $('#ratingMessage').text(`Rated: ${rating} ⭐`);
    showToast(`${rating} stars!`, 'success');
  });
  
  $('.subscribe-popup-btn').on('click', function() {
    $('#popup').css('display', 'flex');
  });
  
  $('.close-popup').on('click', function() {
    $('#popup').fadeOut(300);
  });
  
  $('#subscribeBtn').on('click', function() {
    const email = $('#subscribeEmail').val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      showToast('Subscribed!', 'success');
      $('#popup').fadeOut(300);
      $('#subscribeEmail').val('');
    } else {
      showToast('Invalid email!', 'error');
    }
  });
  
  $('#submitNameBtn, #showTimeBtn').on('click', function() {
    const name = $('#nameInput').val().trim();
    if (name) {
      $('#userGreeting').text(`Welcome, ${name}!`);
      showToast(`Hello, ${name}!`, 'success');
    }
    const now = new Date();
    $('#timeDisplay').text(`Time: ${now.toLocaleTimeString()}`);
  });
  
  $('#loadMoreNewsBtn').on('click', function() {
    showToast('Loading...', 'info');
    setTimeout(() => {
      showToast('News loaded!', 'success');
    }, 1000);
  });
}

// ==================== LANGUAGE SYSTEM ====================
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
    const key = $(this).data('lang');
    if (texts[key]) {
      if ($(this).is('input')) {
        $(this).attr('placeholder', texts[key]);
      } else {
        $(this).text(texts[key]);
      }
    }
  });
}

// ==================== DATE/TIME ====================
function initDateTime() {
  function updateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'medium' });
    $('#datetime').text(formatted);
  }
  updateTime();
  setInterval(updateTime, 1000);
}

console.log("🎮 GameWorld Assignment 8 - Fully Operational!");
