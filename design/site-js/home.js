/* Ringkit Home: Owners / Developers hero switch (static site). No deps. */
(function () {
  function init() {
    var btnOwners = document.getElementById('rk-seg-owners');
    var btnDevs = document.getElementById('rk-seg-devs');
    var viewOwners = document.querySelector('[data-rk-view="owners"]');
    var viewDevs = document.querySelector('[data-rk-view="devs"]');
    if (!btnOwners || !btnDevs || !viewOwners || !viewDevs) return;

    function show(view) {
      var devs = view === 'devs';
      viewOwners.hidden = devs;
      viewDevs.hidden = !devs;
      btnOwners.setAttribute('aria-pressed', devs ? 'false' : 'true');
      btnDevs.setAttribute('aria-pressed', devs ? 'true' : 'false');
    }

    btnOwners.addEventListener('click', function () { show('owners'); });
    btnDevs.addEventListener('click', function () { show('devs'); });

    // Owners is the default; enforces it even if the export left the devs div visible.
    show('owners');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
