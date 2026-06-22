/* JTR GARAGE — storefront interactions (dependency-free) */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  /* ---- Sticky header state ---- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 12); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav ---- */
  var toggle = $('.nav__toggle');
  var menu = $('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  /* ---- Toast ---- */
  var toast;
  function showToast(msg) {
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.appendChild(toast); }
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  /* ================= CART (localStorage) ================= */
  var CART_KEY = 'jtr_cart_v1';
  function readCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function writeCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); renderCart(); }
  function cartCount(c) { return c.reduce(function (n, i) { return n + i.qty; }, 0); }
  function cartTotal(c) { return c.reduce(function (n, i) { return n + i.qty * i.price; }, 0); }

  function addToCart(item) {
    var cart = readCart();
    var key = item.id + '::' + (item.size || '');
    var found = cart.filter(function (i) { return (i.id + '::' + (i.size || '')) === key; })[0];
    if (found) { found.qty += item.qty || 1; } else { item.qty = item.qty || 1; cart.push(item); }
    writeCart(cart);
    showToast('Added to bag — ' + (item.size ? item.size + ' · ' : '') + item.title);
    openDrawer();
  }
  function removeFromCart(key) {
    writeCart(readCart().filter(function (i) { return (i.id + '::' + (i.size || '')) !== key; }));
  }

  function renderCart() {
    var cart = readCart();
    var n = cartCount(cart);
    $$('.cart-count').forEach(function (b) { b.textContent = n; b.classList.toggle('has-items', n > 0); });
    var body = $('#cartBody'); if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="drawer__empty"><p class="mono">Your bag is empty</p><a class="btn btn--ghost" href="apparel.html">Shop the drop</a></div>';
    } else {
      body.innerHTML = cart.map(function (i) {
        var key = i.id + '::' + (i.size || '');
        return '<div class="cart-item">' +
          '<img src="' + i.image + '" alt="" loading="lazy" width="64" height="80">' +
          '<div><div class="cart-item__t">' + i.title + '</div>' +
          '<div class="cart-item__m">' + (i.size ? 'Size ' + i.size + ' · ' : '') + 'Qty ' + i.qty + '</div>' +
          '<button class="cart-item__rm" data-rm="' + key + '">Remove</button></div>' +
          '<div class="cart-item__p">' + money(i.qty * i.price) + '</div></div>';
      }).join('');
      $$('[data-rm]', body).forEach(function (b) { b.addEventListener('click', function () { removeFromCart(b.getAttribute('data-rm')); }); });
    }
    var tot = $('#cartTotal'); if (tot) tot.textContent = money(cartTotal(cart));
  }

  /* Drawer open/close */
  var drawer = $('#cartDrawer'), overlay = $('#overlay');
  function openDrawer() { if (!drawer) return; drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { if (!drawer) return; drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openDrawer(); }); });
  $$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  if (overlay) overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  /* Add-to-cart buttons (data attributes) */
  $$('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var size = null;
      var sizeWrap = btn.closest('form, .pdp__info, body') ? $('.size.active', btn.closest('.pdp__info') || document) : null;
      if (sizeWrap) size = sizeWrap.getAttribute('data-size');
      var needsSize = btn.getAttribute('data-needs-size') === 'true';
      if (needsSize && !size) { showToast('Select a size first'); return; }
      addToCart({
        id: btn.getAttribute('data-add'),
        title: btn.getAttribute('data-title'),
        price: parseFloat(btn.getAttribute('data-price')),
        image: btn.getAttribute('data-image'),
        size: size
      });
    });
  });

  /* ---- PDP: size selection ---- */
  $$('.sizes').forEach(function (group) {
    $$('.size', group).forEach(function (s) {
      s.addEventListener('click', function () {
        $$('.size', group).forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
        s.classList.add('active'); s.setAttribute('aria-pressed', 'true');
      });
    });
  });

  /* ---- PDP: gallery ---- */
  $$('.gallery').forEach(function (g) {
    var main = $('.gallery__main img', g);
    $$('.gallery__thumbs button', g).forEach(function (t) {
      t.addEventListener('click', function () {
        $$('.gallery__thumbs button', g).forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        var src = t.getAttribute('data-full'); if (main && src) main.src = src;
      });
    });
  });

  /* ---- Collection filters ---- */
  $$('[data-filter-group]').forEach(function (group) {
    $$('.filter', group).forEach(function (f) {
      f.addEventListener('click', function () {
        $$('.filter', group).forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        var val = f.getAttribute('data-filter');
        $$('[data-tags]').forEach(function (card) {
          var show = val === 'all' || (card.getAttribute('data-tags') || '').indexOf(val) > -1;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---- Forms (demo handlers) ---- */
  $$('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.getAttribute('data-success') || 'Thanks — we\'ll be in touch shortly.';
      form.reset();
      showToast(msg);
    });
  });

  /* ---- Year stamp ---- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  renderCart();
})();
