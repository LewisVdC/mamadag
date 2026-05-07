(function () {
  const btn = document.getElementById("presentBtn");
  const reveal = document.getElementById("reveal");
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

  // allow keyboard space/enter to toggle (button does this by default, but make sure it's smooth)
  btn.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      btn.click();
    }
  });

  // close btn & overlay listeners
  // close with ESC (keep simple but only act if reveal is open)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      closeReveal();
    }
  });
})();
