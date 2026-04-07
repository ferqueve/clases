/* ===== SLIDE ENGINE ===== */

let currentSlide = 0;
let mode = "slides"; // "slides" | "exercises"

function totalSlides() { return SLIDES.length; }

function renderSlide(data) {
  if (data.type === "cover") {
    return `
      <div class="slide-cover">
        <div class="cover-badge animate__animated animate__fadeInDown">${data.badge}</div>
        <div class="cover-icon animate__animated animate__bounceIn animate__delay-1s">
          <i class="${data.icon}"></i>
        </div>
        <div class="cover-title animate__animated animate__fadeInUp">${data.title}</div>
        <div class="cover-subtitle animate__animated animate__fadeIn animate__delay-1s">${data.subtitle}</div>
        <div class="cover-note animate__animated animate__fadeIn animate__delay-2s">
          <i class="fa-solid fa-circle-info me-2"></i>${data.note}
        </div>
      </div>`;
  }

  return `
    <div class="container-xl py-2">
      <div class="slide-label animate__animated animate__fadeInLeft">${data.label}</div>
      <div class="slide-title animate__animated animate__fadeInLeft">${data.title}</div>
      <div class="slide-content animate__animated animate__fadeIn animate__delay-1s">
        ${data.content}
      </div>
    </div>`;
}

function buildSlides() {
  const container = document.getElementById("slides-container");
  container.innerHTML = "";
  SLIDES.forEach((slide, i) => {
    const div = document.createElement("div");
    div.className = `slide${i === 0 ? " active" : ""}`;
    div.id = `slide-${i}`;
    div.innerHTML = renderSlide(slide);
    container.appendChild(div);
  });
}

function buildDots() {
  const wrap = document.querySelector(".bottom-dots");
  wrap.innerHTML = "";
  SLIDES.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot${i === 0 ? " active" : ""}`;
    dot.title = `Diapositiva ${i + 1}`;
    dot.onclick = () => goToSlide(i);
    wrap.appendChild(dot);
  });
  // Exercises dot
  const exDot = document.createElement("div");
  exDot.className = "dot exercises-dot";
  exDot.title = "Ejercicios";
  exDot.onclick = () => showExercises();
  wrap.appendChild(exDot);
}

function updateUI() {
  if (mode === "slides") {
    document.querySelectorAll(".slide").forEach((s, i) => {
      s.classList.toggle("active", i === currentSlide);
    });
    document.querySelectorAll(".dot:not(.exercises-dot)").forEach((d, i) => {
      d.classList.toggle("active", i === currentSlide);
    });
    document.querySelector(".dot.exercises-dot")?.classList.remove("active");
    document.getElementById("btn-prev").disabled = currentSlide === 0;
    document.getElementById("btn-next").disabled = currentSlide === totalSlides() - 1;
    document.getElementById("slide-counter").textContent = `${currentSlide + 1} / ${totalSlides()}`;

    const pct = ((currentSlide + 1) / totalSlides()) * 100;
    document.querySelector(".progress-bar-fill").style.width = `${pct}%`;
  }
}

function goToSlide(n) {
  if (mode === "exercises") showSlides();
  currentSlide = Math.max(0, Math.min(n, totalSlides() - 1));
  updateUI();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function prevSlide() { if (currentSlide > 0) goToSlide(currentSlide - 1); }
function nextSlide() { if (currentSlide < totalSlides() - 1) goToSlide(currentSlide + 1); }

/* ===== EXERCISES ENGINE ===== */

function showExercises() {
  mode = "exercises";
  document.getElementById("slides-container").style.display = "none";
  document.getElementById("exercises-section").classList.add("active");
  document.querySelector(".btn-exercises").textContent = "";
  document.querySelector(".btn-exercises").innerHTML = '<i class="fa-solid fa-chalkboard-user"></i> Ver Presentación';
  document.querySelector(".btn-exercises").classList.add("active-mode");
  document.getElementById("btn-prev").disabled = true;
  document.getElementById("btn-next").disabled = true;
  document.querySelector(".dot.exercises-dot")?.classList.add("active");
  document.querySelectorAll(".dot:not(.exercises-dot)").forEach(d => d.classList.remove("active"));
  document.querySelector(".progress-bar-fill").style.width = "100%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSlides() {
  mode = "slides";
  document.getElementById("slides-container").style.display = "";
  document.getElementById("exercises-section").classList.remove("active");
  document.querySelector(".btn-exercises").innerHTML = '<i class="fa-solid fa-dumbbell"></i> Ejercicios';
  document.querySelector(".btn-exercises").classList.remove("active-mode");
  updateUI();
}

function toggleMode() {
  if (mode === "slides") showExercises();
  else showSlides();
}

/* ===== EXERCISE LOGIC ===== */

function buildExercises() {
  const container = document.getElementById("exercises-container");
  container.innerHTML = "";

  EXERCISES.forEach((ex, idx) => {
    const div = document.createElement("div");
    div.className = "exercise-card";
    div.id = `ex-${ex.id}`;
    div.innerHTML = `
      <div class="exercise-card-header">
        <div class="ex-number">${ex.id}</div>
        <i class="${ex.icon}"></i>
        <h4>${ex.title}</h4>
        <span class="difficulty-badge ${ex.difficultyClass}">${ex.difficulty}</span>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-context">${ex.context}</div>
        <div class="exercise-question">${ex.question}</div>
        <ul class="option-list" id="opts-${ex.id}">
          ${ex.options.map(opt => `
            <li class="option-item" data-ex="${ex.id}" data-opt="${opt.id}" onclick="selectOption(${ex.id}, '${opt.id}')">
              <div class="option-letter">${opt.id.toUpperCase()}</div>
              <div class="option-text">${opt.text}</div>
            </li>
          `).join("")}
        </ul>
        <div class="exercise-actions">
          <button class="btn-check-ex" onclick="checkAnswer(${ex.id})">
            <i class="fa-solid fa-check"></i> Verificar
          </button>
          <button class="btn-show-sol" onclick="toggleSolution(${ex.id})">
            <i class="fa-solid fa-eye"></i> Ver Solución
          </button>
        </div>
        <div class="solution-panel" id="sol-${ex.id}">
          <div class="solution-explanation">${ex.explanation}</div>
          <div class="solution-code-title"><i class="fa-solid fa-code me-2"></i>Implementación en C#</div>
          <pre><code class="language-csharp">${highlightCsharp(ex.codeSnippet)}</code></pre>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Track selected options
const selectedOptions = {};

function selectOption(exId, optId) {
  // Only allow selection if not already answered
  if (document.querySelector(`#opts-${exId} .correct, #opts-${exId} .incorrect`)) return;
  selectedOptions[exId] = optId;
  document.querySelectorAll(`#opts-${exId} .option-item`).forEach(el => {
    el.classList.remove("selected");
    if (el.dataset.opt === optId) el.classList.add("selected");
  });
}

function checkAnswer(exId) {
  const ex = EXERCISES.find(e => e.id === exId);
  const selected = selectedOptions[exId];

  if (!selected) {
    Swal.fire({
      title: "Seleccioná una opción",
      text: "Hacé click en una de las respuestas antes de verificar.",
      icon: "warning",
      confirmButtonColor: "#1a3a5c",
      confirmButtonText: "Entendido"
    });
    return;
  }

  const items = document.querySelectorAll(`#opts-${exId} .option-item`);
  items.forEach(item => {
    if (item.dataset.opt === ex.correct) {
      item.classList.add("correct");
    } else if (item.dataset.opt === selected && selected !== ex.correct) {
      item.classList.add("incorrect");
    }
  });

  if (selected === ex.correct) {
    Swal.fire({
      title: "¡Correcto! 🎉",
      html: "Aplicaste Expert correctamente. <br>Revisá la solución completa abajo.",
      icon: "success",
      confirmButtonColor: "#10b981",
      confirmButtonText: "Ver explicación"
    }).then(() => {
      document.getElementById(`sol-${exId}`).classList.add("visible");
    });
  } else {
    Swal.fire({
      title: "No exactamente…",
      html: "Repasá el enunciado y pensá: <strong>¿qué clase tiene la información necesaria?</strong>",
      icon: "error",
      confirmButtonColor: "#1a3a5c",
      confirmButtonText: "Intentar de nuevo",
      showDenyButton: true,
      denyButtonText: "Ver solución",
      denyButtonColor: "#64748b"
    }).then(result => {
      if (result.isDenied) {
        document.getElementById(`sol-${exId}`).classList.add("visible");
      } else {
        // Reset for retry
        items.forEach(item => {
          item.classList.remove("selected", "correct", "incorrect");
        });
        delete selectedOptions[exId];
      }
    });
  }
}

function toggleSolution(exId) {
  const panel = document.getElementById(`sol-${exId}`);
  panel.classList.toggle("visible");
}

/* ===== SYNTAX HIGHLIGHT (minimal) ===== */
function highlightCsharp(code) {
  // Escape HTML first
  code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Keywords
  const kws = ["public","private","protected","class","new","void","return","get","set","foreach","in","var","double","int","string","bool","if","else","this","base","readonly","override","virtual"];
  kws.forEach(kw => {
    code = code.replace(new RegExp(`\\b(${kw})\\b`, "g"), `<span class="kw">$1</span>`);
  });
  // Strings
  code = code.replace(/(".*?")/g, `<span class="st">$1</span>`);
  // Comments
  code = code.replace(/(\/\/.*)/g, `<span class="comment">$1</span>`);
  // Class names (words starting with uppercase)
  code = code.replace(/\b([A-Z][a-zA-Z0-9]+)\b/g, (m, p1) => {
    const clsNames = ["Invoice","InvoiceLine","Item","Loan","Book","Member","Order","OrderItem","Product","SaleTicket","TicketLineItem","ProductSpecification","DateTime","ArrayList","Console","List","Customer"];
    return clsNames.includes(p1) ? `<span class="cl">${p1}</span>` : p1;
  });
  // ✅ comment lines
  code = code.replace(/(\/\/ ✅.*)/g, `<span class="comment">$1</span>`);
  return code;
}

/* ===== KEYBOARD NAVIGATION ===== */
document.addEventListener("keydown", e => {
  if (mode !== "slides") return;
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault(); nextSlide();
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault(); prevSlide();
  }
});

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  buildSlides();
  buildDots();
  buildExercises();
  updateUI();
});
