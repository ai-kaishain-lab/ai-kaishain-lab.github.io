/* 会社員のAI実験室 — 画面に入った要素をふわっと表示する（視差効果を減らす設定の端末では何もしない） */
(function(){
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('lab-anim');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  function watch(root){
    (root || document).querySelectorAll('.lab-mosaic, .lab-sec__head, .lab-grid > .lab-card, .lab-panel').forEach(function(el){
      if (el.dataset.animWatched) return; el.dataset.animWatched = '1';
      if (!el.classList.contains('lab-mosaic')) el.classList.add('lab-reveal');
      io.observe(el);
    });
    document.querySelectorAll('.lab-grid').forEach(function(g){
      var cols = getComputedStyle(g).gridTemplateColumns.split(' ').length || 1;
      [].forEach.call(g.children, function(c, i){ c.style.setProperty('--d', ((i % cols) * 0.08) + 's'); });
    });
    document.querySelectorAll('.lab-mosaic a').forEach(function(a, i){ a.style.setProperty('--d', (0.1 + i * 0.09) + 's'); });
  }
  window.labAnimWatch = watch;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ watch(); }); else watch();
})();
