let hintClickHandler = null;
let docClickHandler = null;
const THEME_KEY    = 'gss-theme';
const THEMES = ['system', 'dark', 'light'];
const root   = document.documentElement;

const ICONS = {
  dark: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>',

  light: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707"/></svg>',

  system: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.46 1.46 0 0 0 1 4v6c0 .325.078.502.145.602q.106.156.302.254a1.1 1.1 0 0 0 .352.109h13.201q.195-.049.302-.109a.76.76 0 0 0 .254-.302A1.46 1.46 0 0 0 15 10V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.1 1.1 0 0 0 14 3H2a1.1 1.1 0 0 0-.602.145"/></svg>'
};
  
function show_hints() {
    let hint = document.querySelectorAll(".hint");

    // handler for hint click
    hintClickHandler = function(e) {
        let el = e.currentTarget;
        hint.forEach(h => {    
            if (h !== el) h.classList.remove("active");    
        });    
        el.classList.toggle("active");    
        e.stopPropagation();
    };

    hint.forEach(el => {    
        el.addEventListener("click", hintClickHandler);    
    });    
    
    // handler for outside click
    docClickHandler = function(e) {
        if (!e.target.closest(".hint")) {    
            hint.forEach(h => h.classList.remove("active"));    
        }    
    };

    document.addEventListener("click", docClickHandler);
}

function stop_hints() {
    let hint = document.querySelectorAll(".hint");
    if (hintClickHandler) {
        hint.forEach(el => {
            el.removeEventListener("click", hintClickHandler);
        });
        hintClickHandler = null;
    }
    if (docClickHandler) {
        document.removeEventListener("click", docClickHandler);
        docClickHandler = null;
    }
}

function show_hidden(a, b, c, d, e) {
  const span = event.currentTarget;
  const figure = span.closest("figure");


  figure.innerHTML = `
    <img src="Data/${a}" alt="${b}">
    <figcaption>${b}<br>- 
      <span class="hint">${c}
        <span class="hint-box">
          <a href="${e}" target="_blank">${d}</a>
        </span>
      </span>
    </figcaption>
  `;

  // stop old listeners and restart fresh
  stop_hints();
  show_hints();
}

function play_videos(){
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.addEventListener("play", () => {
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });
        });
    });
}
  
function remove_loading() {
  document.querySelector("h1").style.filter = "none";
  document.querySelector("footer").style.filter = "none";
  document.querySelector("#card-3d").style.filter = "none";
  document.querySelector(".container").style.filter = "none";
  document.querySelector(".splash").classList.add("shrink");

document.querySelector("#themeToggle").style.filter = "none";
}

function init_scroll_reveal() {
  const wrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        wrapperObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const childObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('scroll-visible', entry.isIntersecting);
    });
  }, { 
    rootMargin: "-10% 0px -10% 0px",
    threshold: 0 
  });

  const wrappers = document.querySelectorAll('details.wrapper');
  wrappers.forEach(card => {
    if (card.hasAttribute('open')) {
    card.classList.remove('scroll-reveal');
      card.classList.add('scroll-visible');
    } else {
      card.classList.add('scroll-reveal');
      wrapperObserver.observe(card);
    }
  });

  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll(':scope > .content > details, :scope > details').forEach(child => {
      child.classList.add('scroll-reveal');
      childObserver.observe(child);
    });
  });

  const resourceWrapper = [...wrappers].find(w =>
    w.querySelector(':scope > summary')?.textContent.trim() === 'Resources'
  );
  if (resourceWrapper) {
    resourceWrapper.querySelectorAll('figure').forEach(fig => {
      fig.classList.add('scroll-reveal');
      childObserver.observe(fig);
    });
  }

  const linksWrapper = [...document.querySelectorAll('details')].find(d =>
    d.querySelector(':scope > summary')?.textContent.trim() === 'Links'
  );
  if (linksWrapper) {
    linksWrapper.querySelectorAll('li').forEach((li, i) => {
      li.classList.add('scroll-reveal-left');
      li.style.transitionDelay = `${i * 0.05}s`;
      childObserver.observe(li);
    });
  }
}

function applyTheme(theme) {
  current = theme;
  root.classList.remove('theme-dark', 'theme-light');
  if (theme === 'dark')  root.classList.add('theme-dark');
  if (theme === 'light') root.classList.add('theme-light');
  localStorage.setItem(THEME_KEY, theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = ICONS[theme];
}


window.onload = function () {
  let currentTheme = localStorage.getItem(THEME_KEY);
  if (currentTheme === null) {
    currentTheme = "system";
  }
  applyTheme(currentTheme);
  show_hints();
  play_videos();
    
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', function (){
  applyTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
  })
  setTimeout(() => {
    remove_loading();
    init_scroll_reveal();
  }, 500);
};


