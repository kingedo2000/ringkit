/* Ringkit sign-up flow: static-site wiring (no deps). */
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  function init() {
    var steps = [$("rk-step-1"), $("rk-step-2"), $("rk-step-3")];
    var done = $("rk-done");
    var markers = [$("rk-stepper-1"), $("rk-stepper-2"), $("rk-stepper-3")];
    if (!steps[0]) return;

    function show(step, isDone) {
      for (var i = 0; i < steps.length; i++) {
        if (steps[i]) steps[i].hidden = isDone || (i + 1) !== step;
      }
      if (done) done.hidden = !isDone;
      for (var j = 0; j < markers.length; j++) {
        var m = markers[j];
        if (!m) continue;
        var n = j + 1;
        m.classList.add("rk-stepi");
        m.classList.toggle("rk-on", !isDone && n === step);
        m.classList.toggle("rk-past", isDone || n < step);
        if (!isDone && n === step) m.setAttribute("aria-current", "step");
        else m.removeAttribute("aria-current");
      }
      var target = isDone ? done : steps[step - 1];
      if (target) {
        var h = target.querySelector("h2");
        if (h) {
          h.setAttribute("tabindex", "-1");
          try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); }
        }
        if (target.getBoundingClientRect().top < 0) target.scrollIntoView({ block: "start" });
      }
    }

    function on(id, fn) {
      var el = $(id);
      if (el) el.addEventListener("click", function (e) { e.preventDefault(); fn(); });
    }

    on("rk-next-1", function () { show(2, false); });
    on("rk-back-2", function () { show(1, false); });
    on("rk-next-2", function () { show(3, false); });
    on("rk-back-3", function () { show(2, false); });
    on("rk-finish", function () { show(3, true); });

    // Number choice: new local number vs keep existing.
    var numNew = $("rk-num-new");
    var numKeep = $("rk-num-keep");
    var newPanel = $("rk-num-new-panel");
    var keepPanel = $("rk-num-keep-panel");
    function syncNum() {
      var keep = !!(numKeep && numKeep.checked);
      if (newPanel) newPanel.hidden = keep;
      if (keepPanel) keepPanel.hidden = !keep;
    }
    if (numNew) numNew.addEventListener("change", syncNum);
    if (numKeep) numKeep.addEventListener("change", syncNum);

    // Area code drives the illustrative number and forwarding code.
    var area = $("rk-area");
    var numDisplay = $("rk-number-display");
    var fwd = $("rk-fwd-code");
    function syncArea() {
      var v = area ? String(area.value).replace(/[^0-9]/g, "").slice(0, 3) : "";
      if (v.length !== 3) v = "310";
      var num = "(" + v + ") 555-0142";
      if (numDisplay) numDisplay.textContent = num;
      if (fwd) fwd.textContent = "*72 " + num;
    }
    if (area) area.addEventListener("input", syncArea);

    syncNum();
    syncArea();
    show(1, false);
    // Do not steal focus on first load.
    if (document.activeElement && document.activeElement.tagName === "H2") document.activeElement.blur();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
