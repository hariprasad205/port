/**
 * Hari Prasad's Portfolio Website - Interactivity & Dynamics
 * Pure Vanilla JavaScript implementation of core interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initThemeManager();
  initMobileNav();
  initDynamicTyping();
  initTerminalSimulator();
  initGpaCalculator();
  initProjectFilter();
  initScrollReveal();
  initContactForm();
});

// ==========================================
// 1. Scroll Progress Bar
// ==========================================
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ==========================================
// 2. Theme Manager (Dark/Light Toggler)
// ==========================================
function initThemeManager() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  // Retrieve previous settings
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    body.classList.add('light-theme');
  }

  // Toggle Theme Action
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
}

// ==========================================
// 3. Mobile Navigation Menu
// ==========================================
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle active state for burger line icons
    const isExpanded = navLinks.classList.contains('active');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    if (isExpanded) {
      line1.setAttribute('y1', '6');
      line1.setAttribute('x2', '18');
      line1.setAttribute('y2', '18');
      line2.style.opacity = '0';
      line3.setAttribute('y1', '18');
      line3.setAttribute('x2', '18');
      line3.setAttribute('y2', '6');
    } else {
      line1.setAttribute('y1', '12');
      line1.setAttribute('x2', '21');
      line1.setAttribute('y2', '12');
      line2.style.opacity = '1';
      line3.setAttribute('y1', '18');
      line3.setAttribute('x2', '21');
      line3.setAttribute('y2', '18');
    }
  });

  // Close mobile navigation when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      // Reset hamburger icon
      document.getElementById('line1').setAttribute('y1', '12');
      document.getElementById('line1').setAttribute('x2', '21');
      document.getElementById('line1').setAttribute('y2', '12');
      document.getElementById('line2').style.opacity = '1';
      document.getElementById('line3').setAttribute('y1', '18');
      document.getElementById('line3').setAttribute('x2', '21');
      document.getElementById('line3').setAttribute('y2', '18');
    });
  });

  // Track active navigation links based on scroll positions
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let currentActive = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActive = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentActive}`) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================
// 4. Dynamic Text Typist Effect
// ==========================================
function initDynamicTyping() {
  const dynamicText = document.getElementById('dynamicText');
  const phrases = [
    'Modern Web Applications',
    'Responsive User Interfaces',
    'Robust Relational Databases',
    'Innovative Software Concepts'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

// ==========================================
// 5. Interactive Terminal Simulator
// ==========================================
function initTerminalSimulator() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  const commands = {
    help: 'List of available commands:<br>' +
          '  <span style="color:var(--primary);">about</span>    - Learn more about Hari Prasad<br>' +
          '  <span style="color:var(--primary);">skills</span>   - List current core technologies<br>' +
          '  <span style="color:var(--primary);">projects</span> - Review major software projects<br>' +
          '  <span style="color:var(--primary);">gpa</span>      - Learn about my academic credentials<br>' +
          '  <span style="color:var(--primary);">social</span>   - Access GitHub and LinkedIn profiles<br>' +
          '  <span style="color:var(--primary);">contact</span>  - Learn how to contact me<br>' +
          '  <span style="color:var(--primary);">clear</span>    - Wipe the console logs clean',
          
    about: 'Hari Prasad | BCA student in 4th Semester under Bengaluru City University.<br>' +
           'Studying at Akash Global College, Bengaluru.<br>' +
           'Interests lie in modern software architecture, database management, and building beautiful, scalable front-end experiences.',
           
    skills: 'Technical Skills Directory:<br>' +
            '  - <strong style="color:var(--accent);">Frontend:</strong> HTML5, CSS3 (Grid/Flexbox), Javascript (ES6+)<br>' +
            '  - <strong style="color:var(--accent);">Backend:</strong> Java Core, Node.js, Express<br>' +
            '  - <strong style="color:var(--accent);">Databases:</strong> Relational Database Design, MySQL, SQL Queries<br>' +
            '  - <strong style="color:var(--accent);">Utilities:</strong> Git/GitHub, Visual Studio Code',
            
    projects: 'Featured Projects Directory:<br>' +
              '  1. <strong style="color:var(--secondary);">Campus Library Manager:</strong> Java, MySQL, JDBC. Catalog inventory and book loan logs.<br>' +
              '  2. <strong style="color:var(--secondary);">BCU Syllabus Hub:</strong> Vanilla HTML/CSS/JS. Visual path grids for college studies.<br>' +
              '  3. <strong style="color:var(--secondary);">Smart Expense Tracker:</strong> HTML, CSS, JS. Track budgets via browser local storage.',
              
    gpa: 'Academic Records at BCU:<br>' +
         '  - Course: Bachelor of Computer Applications (BCA)<br>' +
         '  - College: Akash Global College<br>' +
         '  - Current Standing: High First Class with Distinction<br>' +
         '  - Interactive Estimator active under the <a href="#about" style="color:var(--primary);">About & Academics</a> section.',
         
    social: 'My Profiles Connect Directory:<br>' +
            '  - <strong style="color:#0077b5;">LinkedIn:</strong> <a href="https://www.linkedin.com/in/hari-prasad-dev/" target="_blank" style="color:var(--accent);">https://www.linkedin.com/in/hari-prasad-dev/</a><br>' +
            '  - <strong style="color:#f0f6fc;">GitHub:</strong> <a href="https://github.com/hari-prasad-dev" target="_blank" style="color:var(--accent);">https://github.com/hari-prasad-dev</a>',
            
    contact: 'Contact Info:<br>' +
             '  - Email: <a href="mailto:hari.prasad.dev.bca@gmail.com" style="color:var(--accent);">hari.prasad.dev.bca@gmail.com</a><br>' +
             '  - Location: Bengaluru, Karnataka, India<br>' +
             '  Feel free to use the form under the <a href="#contact" style="color:var(--primary);">Contact</a> section.'
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      
      // Save original command for printing
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.innerHTML = `<span class="terminal-prompt-text">guest@hari-prasad ~ %</span> <span style="color:#fff;">${terminalInput.value}</span>`;
      
      // Insert command output
      const outputLine = document.createElement('div');
      outputLine.className = 'terminal-output';

      if (inputVal === 'clear') {
        // Clear all previous lines
        const lines = terminalBody.querySelectorAll('.terminal-line, .terminal-output');
        lines.forEach(line => line.remove());
        terminalInput.value = '';
        return;
      }

      if (inputVal === '') {
        outputLine.innerHTML = '';
      } else if (commands[inputVal]) {
        outputLine.innerHTML = commands[inputVal];
      } else {
        outputLine.innerHTML = `command not found: <span style="color:#ef4444;">${inputVal}</span>. Type <span style="color:var(--accent);">help</span> to see valid prompts.`;
      }

      // Append logs to body
      const inputLineWrapper = terminalInput.parentElement;
      terminalBody.insertBefore(commandLine, inputLineWrapper);
      if (outputLine.innerHTML !== '') {
        terminalBody.insertBefore(outputLine, inputLineWrapper);
      }

      terminalInput.value = '';
      
      // Auto Scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Clicking anywhere inside terminal focuses inputs
  terminalBody.parentElement.addEventListener('click', () => {
    terminalInput.focus();
  });
}

// ==========================================
// 6. Bengaluru City University BCA GPA Calculator
// ==========================================
function initGpaCalculator() {
  const gradeSelectors = document.querySelectorAll('.grade-selector');
  const gpaText = document.getElementById('gpaText');
  const gpaCircle = document.getElementById('gpaCircle');
  const gpaClassText = document.getElementById('gpaClassText');

  function calculateSGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;

    gradeSelectors.forEach(select => {
      const gradeVal = parseFloat(select.value);
      const credits = parseFloat(select.dataset.credits);
      totalGradePoints += (gradeVal * credits);
      totalCredits += credits;
    });

    const sgpa = (totalGradePoints / totalCredits).toFixed(2);
    
    // Update Text display
    gpaText.textContent = sgpa;

    // Update Circular Dial progress
    // The SVGs circle circumference = 377px (2 * PI * 60px)
    const circumference = 377;
    const offset = circumference - (circumference * sgpa / 10);
    gpaCircle.style.strokeDashoffset = offset;

    // Update Classification class
    if (sgpa >= 9.0) {
      gpaClassText.textContent = 'Outstanding (O)';
      gpaClassText.style.color = '#10b981'; // Green
    } else if (sgpa >= 8.0) {
      gpaClassText.textContent = 'Excellent (A++)';
      gpaClassText.style.color = '#38bdf8'; // Sky Blue
    } else if (sgpa >= 7.0) {
      gpaClassText.textContent = 'Very Good (A+)';
      gpaClassText.style.color = '#a855f7'; // Purple
    } else if (sgpa >= 6.0) {
      gpaClassText.textContent = 'Good (A)';
      gpaClassText.style.color = '#eab308'; // Amber
    } else if (sgpa >= 5.0) {
      gpaClassText.textContent = 'Above Average (B+)';
      gpaClassText.style.color = '#f97316'; // Orange
    } else {
      gpaClassText.textContent = 'Fail (F)';
      gpaClassText.style.color = '#ef4444'; // Red
    }
  }

  // Setup change event listeners
  gradeSelectors.forEach(select => {
    select.addEventListener('change', calculateSGPA);
  });

  // Run initial load
  calculateSGPA();
}

// ==========================================
// 7. Projects Interactive Grid Filter
// ==========================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      projectCards.forEach(card => {
        const cardCat = card.dataset.category;

        // Visual scale fade in transitions
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==========================================
// 8. Scroll Reveal Observer
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once shown
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

// ==========================================
// 9. Interactive Contact Form Handler
// ==========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', () => {
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;

    if (!name || !email || !message) return;

    // Transition to loading sending state
    formStatus.className = 'form-status-msg sending';
    formStatus.textContent = 'Encrypting message and routing transmission...';

    // Disable form inputs
    const inputs = form.querySelectorAll('input, textarea, button');
    inputs.forEach(i => i.disabled = true);

    // Timeout simulation
    setTimeout(() => {
      formStatus.className = 'form-status-msg success';
      formStatus.textContent = `Thanks ${name}! Your transmission has been successfully routed to Hari.`;
      
      // Reset values
      form.reset();

      // Enable form inputs
      inputs.forEach(i => i.disabled = false);
      
      // Clear notification after 4 seconds
      setTimeout(() => {
        formStatus.className = 'form-status-msg';
        formStatus.style.display = 'none';
      }, 4000);

    }, 2000);
  });
}
