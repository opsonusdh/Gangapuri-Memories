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
  document.querySelector(".container").style.filter = "none";
  document.querySelector(".splash").classList.add("shrink");
}
window.onload = function () { 
    show_hints();
    play_videos();
    remove_loading();
};
