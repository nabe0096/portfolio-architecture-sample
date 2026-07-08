// ============================================
// 株式会社みやこ建設 — 建築・リフォーム サンプル
// ============================================

// ローディング
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 600);
});

// ヘッダー：スクロールで背景切り替え／ページトップボタン
const header = document.getElementById('header');
const totop = document.getElementById('totop');

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  totop.classList.toggle('show', y > 600);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// モバイルメニュー
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  header.classList.toggle('menu-open');
});
document.querySelectorAll('#gnav a').forEach((link) => {
  link.addEventListener('click', () => header.classList.remove('menu-open'));
});

// スクロールアニメーション
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 実績カウントアップ
const countUp = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach((el) => statObserver.observe(el));

// お問い合わせフォーム（サンプルのため送信はしない）
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.innerHTML =
    '<p class="form-thanks">お問い合わせありがとうございます。<br>担当者より折り返しご連絡いたします。<br><small style="font-size:13px;opacity:.7;">※ こちらはデザインサンプルのため、実際には送信されていません。</small></p>';
});
