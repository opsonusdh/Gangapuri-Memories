let hintClickHandler = null;
let docClickHandler = null;

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
}
function init_scroll_reveal() {
  // 1. One-shot observer for parent wrapper cards (except the already-open Introduction)
  const wrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        wrapperObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // 2. Bidirectional observer for child details, figures, and links
  const childObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('scroll-visible', entry.isIntersecting);
    });
  }, { 
    rootMargin: "-10% 0px -10% 0px",
    threshold: 0 
  });

  // 3. Process wrapper cards
  const wrappers = document.querySelectorAll('details.wrapper');
  wrappers.forEach(card => {
    if (card.hasAttribute('open')) {
      // Keep Introduction card fully visible from the start, no scroll-reveal class
      card.classList.remove('scroll-reveal');
      card.classList.add('scroll-visible');
    } else {
      card.classList.add('scroll-reveal');
      wrapperObserver.observe(card);
    }
  });

  // 4. Process child details inside the parent wrappers
  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll(':scope > .content > details, :scope > details').forEach(child => {
      child.classList.add('scroll-reveal');
      childObserver.observe(child);
    });
  });

  // 5. Process figures inside the Resources wrapper
  const resourceWrapper = [...wrappers].find(w =>
    w.querySelector(':scope > summary')?.textContent.trim() === 'Resources'
  );
  if (resourceWrapper) {
    resourceWrapper.querySelectorAll('figure').forEach(fig => {
      fig.classList.add('scroll-reveal');
      childObserver.observe(fig);
    });
  }

  // 6. Process links inside the Links card
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

window.onload = function () { 
    show_hints();
    play_videos();
    setTimeout(() => {
      remove_loading();
      init_scroll_reveal();
    }, 1000);
};


