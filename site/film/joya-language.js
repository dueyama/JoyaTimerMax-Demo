// Shared by the static viewing pages and the real-time player. Switching the
// interface only touches labelled DOM nodes, so audio, video and WebGPU stay live.
(() => {
  const storageKey = 'joya.displayLanguage';
  const supported = value => value === 'ja' || value === 'en';
  const address = new URL(location.href);
  let preference = address.searchParams.get('lang');
  try {
    if (!supported(preference)) preference = localStorage.getItem(storageKey);
    else if (window === window.top) localStorage.setItem(storageKey, preference);
  } catch { /* Private and embedded views may have no storage. */ }
  const browserLanguage = () => /^ja(?:-|$)/i.test(navigator.languages?.[0] || navigator.language || '');
  let language = supported(preference) ? preference : browserLanguage() ? 'ja' : 'en';
  if (window !== window.parent) {
    try { language = window.parent.JoyaLanguage?.current ?? language; } catch {}
  }
  document.documentElement.lang = language;

  // Each translatable field retains its Japanese source across repeated switches.
  const fields = ['text', 'title', 'aria-label', 'alt', 'content', 'aria-valuetext'];
  const marker = field => field === 'text' ? 'data-en' : 'data-en-' + field;
  const selector = fields.map(field => '[' + marker(field) + ']').join(',');
  function render(element, field) {
    const en = marker(field), ja = en.replace('data-en', 'data-ja');
    const current = field === 'text' ? element.textContent : element.getAttribute(field);
    if (!element.hasAttribute(ja)) element.setAttribute(ja, current ?? '');
    const next = element.getAttribute(language === 'ja' ? ja : en);
    if (current !== next) {
      if (field === 'text') element.textContent = next;
      else element.setAttribute(field, next);
    }
  }
  function bind(element, japanese, english, field = 'text') {
    const en = marker(field), ja = en.replace('data-en', 'data-ja');
    if (element.getAttribute(en) !== english) element.setAttribute(en, english);
    if (element.getAttribute(ja) !== japanese) element.setAttribute(ja, japanese);
    render(element, field);
  }
  function refresh() {
    document.documentElement.lang = language;
    for (const element of document.querySelectorAll(selector)) {
      for (const field of fields) if (element.hasAttribute(marker(field))) render(element, field);
    }
    for (const button of document.querySelectorAll('[data-language-switch]')) {
      button.textContent = language === 'ja' ? 'English' : '日本語';
      button.lang = language === 'ja' ? 'en' : 'ja';
      button.setAttribute('aria-label', language === 'ja' ? 'Switch to English' : '日本語に切り替える');
    }
    for (const link of document.querySelectorAll('a[data-language-link]')) {
      const target = new URL(link.href);
      if (supported(preference)) target.searchParams.set('lang', language);
      else target.searchParams.delete('lang');
      if (target.href !== link.href) link.href = target.href;
    }
  }
  function update(value, explicit) {
    language = value;
    if (explicit) preference = value;
    refresh();
    for (const frame of document.querySelectorAll('iframe')) {
      try { frame.contentWindow?.JoyaLanguage?.inherit(value); } catch {}
    }
  }
  document.addEventListener('click', event => {
    if (!event.target.closest?.('[data-language-switch]')) return;
    const next = language === 'ja' ? 'en' : 'ja';
    try { localStorage.setItem(storageKey, next); } catch {}
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next);
      history.replaceState(history.state, '', url);
    }
    update(next, true);
  });
  addEventListener('storage', event => {
    if (event.key === storageKey && supported(event.newValue)) update(event.newValue, true);
  });
  addEventListener('languagechange', () => {
    if (!supported(preference)) update(browserLanguage() ? 'ja' : 'en', false);
  });
  addEventListener('pageshow', () => {
    if (!address.searchParams.has('lang')) {
      try { const stored = localStorage.getItem(storageKey); if (supported(stored)) update(stored, true); } catch {}
    }
  });
  window.JoyaLanguage = { get current() { return language; }, bind, refresh, inherit: value => update(value, false) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refresh, {once:true});
  else refresh();
})();
