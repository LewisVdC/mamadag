(function () {
  const btn = document.getElementById("presentBtn");
  const reveal = document.getElementById("reveal");
  const btn2 = document.getElementById("presentBtn2");
  const reveal2 = document.getElementById("reveal2");
  // inline reveal (no overlay or close button)

  function openReveal() {
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    // remove hidden so it participates in layout and can animate
    reveal.hidden = false;
    // force reflow for transition
    requestAnimationFrame(() => reveal.classList.add("open"));
  }

  function closeReveal() {
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    reveal.classList.remove("open");
    // after transition, hide it
    const onEnd = (e) => {
      if (e.target !== reveal) return;
      reveal.hidden = true;
      reveal.removeEventListener("transitionend", onEnd);
    };
    reveal.addEventListener("transitionend", onEnd);
  }

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) closeReveal();
    else openReveal();
  });

  function openReveal2() {
    btn2.classList.add("open");
    btn2.setAttribute("aria-expanded2", "true");
    // remove hidden so it participates in layout and can animate
    reveal2.hidden = false;
    // force reflow for transition
    requestAnimationFrame(() => reveal2.classList.add("open"));
  }

  function closeReveal2() {
    btn2.classList.remove("open");
    btn2.setAttribute("aria-expanded2", "false");
    reveal2.classList.remove("open");
    // after transition, hide it
    const onEnd = (e) => {
      if (e.target !== reveal2) return;
      reveal2.hidden = true;
      reveal2.removeEventListener("transitionend", onEnd);
    };
    reveal2.addEventListener("transitionend", onEnd);
  }

  btn2.addEventListener("click", () => {
    const expanded = btn2.getAttribute("aria-expanded2") === "true";
    if (expanded) closeReveal2();
    else openReveal2();
  });

  // allow keyboard space/enter to toggle (button does this by default, but make sure it's smooth)
  btn2.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      btn2.click();
    }
  });

  // close btn & overlay listeners
  // close with ESC (keep simple but only act if reveal is open)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn2.getAttribute("aria-expanded2") === "true") {
      closeReveal2();
    }
  });
})();
