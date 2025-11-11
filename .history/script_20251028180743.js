// ============================================
// GAMEWORLD - ASSIGNMENT 7: jQuery Implementation
// Team NOVA | Nurdaulet & Nurbol | SE-2406
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
  
  // Show welcome toast
  showToast("Welcome to GameWorld!", "info");
});

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
  
  // Load images on scroll
  $(window).on('scroll', loadVisibleImages);
  
  // Load visible images immediately
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
    
    // Show/hide autocomplete
    if (searchTerm.length > 0) {
      updateAutocomplete(searchTerm);
    } else {
      $('#autocompleteList').hide();
    }
  });
  
  // Category filter buttons
  $('.filter-btn').on('click', function() {
    const filter = $(this).data('filter');
    
    // Update active button
    $('.filter-btn').removeClass('btn-info').addClass('btn-outline-info');
    $(this).removeClass('btn-outline-info').addClass('btn-info');
    
    // Filter cards
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

// Close autocomplete when clicking outside
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
  
  // Store original content
  $('.faq-item').each(function(index) {
    originalContent[index] = {
      question: $(this).find('.question').html(),
      answer: $(this).find('.answer').html()
    };
  });
  
  $('#faqSearchBar').on('keyup', function() {
    const searchTerm = $(this).val().trim();
    
    if (searchTerm.length === 0) {
      // Restore original content
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
        // Highlight matches
        const highlightedQuestion = questionText.replace(regex, '<span class="highlight">$1</span>');
        const highlightedAnswer = answerText.replace(regex, '<span class="highlight">$1</span>');
        
        $item.find('.question').html(highlightedQuestion);
        $item.find('.answer').html(highlightedAnswer);
        $item.find('.answer').show(); // Show answer if there's a match
        $item.fadeIn(300);
      } else {
        $item.fadeOut(300);
      }
    });
  });
  
  // FAQ toggle
  $('.question').on('click', function() {
    const $answer = $(this).next('.answer');
    $answer.slideToggle(300);
  });
}

// ============================================
// TASK 6: Loading Spinner on Form Submit
// ============================================
function initContactForm() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const $submitBtn = $('#submitFormBtn');
    const $btnText = $('#submitBtnText');
    const $spinner = $('#submitSpinner');
    
    // Validate
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    
    if (!name || !email || !message) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address!', 'error');
      return;
    }
    
    // Show loading spinner
    $btnText.text('Please wait...');
    $spinner.show();
    $submitBtn.prop('disabled', true);
    
    // Simulate server request
    setTimeout(function() {
      // Hide spinner
      $spinner.hide();
      $btnText.text('Send Message');
      $submitBtn.prop('disabled', false);
      
      // Show success message
      $('#successMessage').fadeIn(300);
      showToast('Form submitted successfully!', 'success');
      
      // Reset form
      setTimeout(function() {
        $('#contactForm')[0].reset();
        $('.form-step').hide();
        $('#step1').show();
        $('#successMessage').fadeOut(300);
      }, 3000);
    }, 2000);
  });
  
  // Multi-step navigation
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
  
  // Remove from DOM after hiding
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
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(function() {
      // Change button state
      const originalHTML = $btn.html();
      $btn.html('<i class="fas fa-check"></i> Copied!');
      $btn.addClass('copied');
      
      // Show toast
      showToast('Copied to clipboard!', 'success');
      
      // Reset button after 2 seconds
      setTimeout(function() {
        $btn.html(originalHTML);
        $btn.removeClass('copied');
      }, 2000);
    }).catch(function() {
      showToast('Failed to copy!', 'error');
    });
  });
}

// ============================================
// OTHER EVENT HANDLERS
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
    
    if ($fullText.is(':visible')) {
      $fullText.slideUp(300);
      $shortText.slideDown(300);
      $(this).text('Толығырақ');
    } else {
      $shortText.slideUp(300);
      $fullText.slideDown(300);
      $(this).text('Жасыру');
    }
  });
  
  // Theme toggle
  let isDarkTheme = true;
  $('.toggle-theme-btn').on('click', function() {
    if (isDarkTheme) {
      $('body').css({
        'background': 'linear-gradient(to bottom, #87CEEB, #f0f8ff)',
        'color': '#000'
      });
      $('.bg-dark').css('background-color', '#f8f9fa');
      $('.neon-text, .text-info').css({
        'color': '#0066cc',
        'text-shadow': 'none'
      });
    } else {
      $('body').css({
        'background': 'radial-gradient(circle at top, #0a0a0f, #050509, #000)',
        'color': '#eee'
      });
      $('.bg-dark').css('background-color', '#0a0a0f');
      $('.neon-text, .text-info').css({
        'color': '#00fff7',
        'text-shadow': '0 0 10px rgba(0, 255, 247, 0.6)'
      });
    }
    isDarkTheme = !isDarkTheme;
    showToast('Theme changed', 'info');
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
  
  // Star hover effect
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
    
    if (name) {
      $('#userGreeting').text(`Welcome to GameWorld, ${name}!`);
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
  const translations = {
    kk: {
      home: "Басты бет",
      news: "Жаңалықтар",
      gallery: "Галерея",
      contact: "Байланыс",
      welcomeTitle: "GameWorld-ке қош келдіңіз",
      readMore: "Толығырақ",
      readLess: "Жасыру"
    },
    en: {
      home: "Home",
      news: "News",
      gallery: "Gallery",
      contact: "Contact",
      welcomeTitle: "Welcome to GameWorld",
      readMore: "Read More",
      readLess: "Read Less"
    },
    ru: {
      home: "Главная",
      news: "Новости",
      gallery: "Галерея",
      contact: "Контакты",
      welcomeTitle: "Добро пожаловать в GameWorld",
      readMore: "Читать далее",
      readLess: "Скрыть"
    }
  };
  
  $('#languageSelector').on('change', function() {
    const lang = $(this).val();
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
    
    showToast(`Language changed to ${lang.toUpperCase()}`, 'info');
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
// KEYBOARD NAVIGATION (Accessibility)
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

console.log("🎮 GameWorld fully loaded with jQuery!");
