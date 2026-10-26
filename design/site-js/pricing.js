(function () {
  function fmt(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function init() {
    var callsEl = document.getElementById('rk-calls');
    var minsEl = document.getElementById('rk-mins');
    var humanEl = document.getElementById('rk-human');
    if (!callsEl || !minsEl || !humanEl) return;

    // Holes may have been stripped from value attributes; fall back to defaults.
    function read(el, def) {
      var v = Number(el.value);
      var attr = el.getAttribute('value');
      if (attr === null || attr.trim() === '' || isNaN(v) || /\{\{/.test(el.getAttribute('value') || '')) {
        el.value = def;
        v = def;
      }
      return v;
    }
    read(callsEl, 300);
    read(minsEl, 4);
    read(humanEl, 20);

    function update() {
      var calls = Number(callsEl.value) || 0;
      var mins = Number(minsEl.value) || 0;
      var human = Number(humanEl.value) || 0;
      var h = human / 100;
      var aiCost = calls * mins * (1 - h) * 0.05;
      var repCost = calls * mins * h * 0.5;
      var total = 1 + aiCost + repCost;
      setText('rk-val-calls', calls.toLocaleString('en-US'));
      setText('rk-val-mins', mins + ' min');
      setText('rk-val-human', human + '%');
      setText('rk-out-ai', fmt(aiCost));
      setText('rk-out-rep', fmt(repCost));
      setText('rk-out-num', '$1.00');
      setText('rk-out-total', fmt(total));
    }

    callsEl.addEventListener('input', update);
    minsEl.addEventListener('input', update);
    humanEl.addEventListener('input', update);
    update();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
