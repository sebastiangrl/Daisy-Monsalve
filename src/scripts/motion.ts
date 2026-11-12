import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { catalog, styles, whatsAppBookingUrl } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function split(el: HTMLElement) {
  if (el.dataset.split === '1') return;
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  el.dataset.split = '1';
  el.setAttribute('aria-label', text);
  const frag = document.createDocumentFragment();
  text.split(' ').forEach((word, index) => {
    if (index) frag.appendChild(document.createTextNode(' '));
    const wrap = document.createElement('span');
    wrap.className = 'word';
    wrap.setAttribute('aria-hidden', 'true');
    for (const char of word) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      wrap.appendChild(span);
    }
    frag.appendChild(wrap);
  });
  el.textContent = '';
  el.appendChild(frag);
}

function writeOnEnter(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>('.char');
  if (!chars.length) return;
  gsap.to(chars, {
    opacity: 1,
    duration: 0.012,
    stagger: 0.014,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 96%', toggleActions: 'play none none none' },
  });
}

function writeOnScroll(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>('.char');
  if (!chars.length) return;
  gsap.to(chars, {
    opacity: 1,
    ease: 'none',
    stagger: 0.018,
    scrollTrigger: {
      trigger: el,
      start: 'top 86%',
      end: 'top 46%',
      scrub: 0.45,
    },
  });
}

function writeOnLoad(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>('.char');
  gsap.to(chars, { opacity: 1, duration: 0.01, stagger: 0.011, ease: 'none', delay: 0.08 });
}

function writeOnHero(el: HTMLElement) {
  const chars = el.querySelectorAll<HTMLElement>('.char');
  if (!chars.length || reduce) return;
  let delay = 0.08;
  if (el.classList.contains('line')) {
    const lines = el.parentElement?.querySelectorAll<HTMLElement>('.line');
    const index = lines ? [...lines].indexOf(el) : 0;
    delay = 0.08 + index * 0.3;
  } else if (el.matches('.hero p')) {
    delay = 0.62;
  }
  gsap.fromTo(
    chars,
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.48,
      stagger: 0.028,
      ease: 'power3.out',
      delay,
    },
  );
}

function boxCenter(inner: HTMLElement, outer: HTMLElement) {
  const a = inner.getBoundingClientRect();
  const b = outer.getBoundingClientRect();
  return {
    x: a.left + a.width / 2 - b.left,
    y: a.top + a.height / 2 - b.top,
  };
}

function initWrites() {
  document.querySelectorAll<HTMLElement>('[data-write]').forEach(split);
  const logoText = document.querySelector<HTMLElement>('[data-logo-text]');
  if (logoText) split(logoText);
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-write="load"]').forEach(writeOnLoad);
  document.querySelectorAll<HTMLElement>('[data-write="enter"]').forEach(writeOnEnter);
  document
    .querySelectorAll<HTMLElement>(
      '[data-write]:not([data-write="load"]):not([data-write="hold"]):not([data-write="enter"]):not([data-write="hero"])',
    )
    .forEach(writeOnScroll);
}

function revealHeroCopy() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-write="hero"]').forEach(writeOnHero);
}

function initIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero-intro]');
  const photo = hero?.querySelector<HTMLImageElement>('.hero__photo');
  const ink = hero?.querySelector<HTMLElement>('[data-hero-ink]');
  const header = document.querySelector<HTMLElement>('[data-header]');

  if (reduce || !hero || !photo || !ink) {
    document.documentElement.classList.add('is-ready');
    if (header) gsap.set(header, { clearProps: 'opacity,transform' });
    ink?.remove();
    revealHeroCopy();
    return;
  }

  gsap.set(photo, { scale: 1.03, filter: 'brightness(0.4)' });
  gsap.set(ink, { scaleY: 1, transformOrigin: '50% 100%' });

  const timeline = gsap.timeline({
    onComplete: () => {
      ink.style.display = 'none';
      document.documentElement.classList.add('is-ready');
      ScrollTrigger.refresh();
    },
  });

  timeline
    .to(ink, { scaleY: 0, duration: 1.15, ease: 'power2.inOut' }, 0.12)
    .to(photo, { scale: 1, filter: 'brightness(1)', duration: 1.2, ease: 'power2.out' }, 0.12)
    .to(header, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 0.38)
    .add(() => revealHeroCopy(), 0.5);
}

function initLogo() {
  const logo = document.querySelector<HTMLElement>('[data-logo]');
  const text = logo?.querySelector<HTMLElement>('[data-logo-text]');
  if (!logo || !text || reduce) return;
  const chars = () => [...text.querySelectorAll<HTMLElement>('.char')];
  if (!chars().length) return;

  let playing = false;

  const write = () => {
    if (playing) return;
    playing = true;
    gsap.fromTo(
      chars(),
      { opacity: 0, y: 10, rotate: (index) => (index % 2 === 0 ? -4 : 4) },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.42,
        stagger: 0.055,
        ease: 'power2.out',
        onComplete: () => {
          playing = false;
        },
      },
    );
  };

  logo.addEventListener('mouseenter', write);
  logo.addEventListener('focus', write);
}

function initArrivals() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-from]').forEach((el) => {
    const from = el.dataset.from;
    const vars =
      from === 'left' ? { x: -140 } : from === 'right' ? { x: 140 } : from === 'up' ? { y: -120 } : { y: 120 };
    gsap.from(el, {
      ...vars,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 96%',
        end: 'top 58%',
        scrub: 0.6,
      },
    });
  });

  const ribbon = document.querySelector('.ribbon');
  if (ribbon) {
    gsap.to(ribbon, {
      y: -140,
      x: -90,
      rotation: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.work', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
  }

  const hero = document.querySelector('.hero__photo');
  if (hero) {
    gsap.fromTo(
      hero,
      { scale: 1 },
      {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      },
    );
  }
}

function indexFromProgress(value: number) {
  if (value < 0.34) return 0;
  if (value < 0.67) return 1;
  return 2;
}

function initStyles() {
  const section = document.querySelector<HTMLElement>('[data-styles]');
  const images = section ? [...section.querySelectorAll<HTMLElement>('[data-orb-img]')] : [];
  const chips = section ? [...section.querySelectorAll<HTMLElement>('[data-chip]')] : [];
  const title = section?.querySelector<HTMLElement>('[data-orb-title]');
  const text = section?.querySelector<HTMLElement>('[data-orb-text]');
  const veil = section?.querySelector<HTMLElement>('[data-orb-veil]');
  const orb = section?.querySelector<HTMLElement>('[data-orb]');
  if (!section || images.length < 3 || reduce || section.dataset.bound === '1') return;
  section.dataset.bound = '1';

  let progress = 0;
  let scrollIndex = 0;
  let previewIndex: number | null = null;
  let tweening = false;

  const paint = (index: number, animate: boolean) => {
    images.forEach((img, i) => {
      gsap.to(img, {
        opacity: i === index ? 1 : 0,
        scale: i === index ? 1.04 : 1,
        duration: animate ? 0.55 : 0,
        ease: 'power2.out',
      });
    });
    chips.forEach((chip, i) => {
      chip.classList.toggle('is-on', i === index);
      gsap.to(chip, {
        y: i === index ? -36 : 0,
        scale: i === index ? 1.08 : 1,
        duration: animate ? 0.55 : 0,
        ease: 'power3.out',
      });
    });
    if (orb) {
      gsap.to(orb, {
        scale: 1 + index * 0.035,
        rotate: index === 0 ? 0 : index === 1 ? 2.5 : -2.5,
        y: index === 1 ? -8 : 0,
        duration: animate ? 0.65 : 0,
        ease: 'power2.out',
      });
    }
    if (title) title.textContent = styles[index]?.title ?? '';
    if (text) text.textContent = styles[index]?.text ?? '';
  };

  const syncFromScroll = (animate: boolean) => {
    const next = indexFromProgress(progress);
    if (next !== scrollIndex) {
      scrollIndex = next;
      if (previewIndex === null) paint(scrollIndex, animate);
    }
  };

  ScrollTrigger.create({
    id: 'styles',
    trigger: section,
    start: 'top top',
    end: window.matchMedia('(min-width: 960px)').matches ? '+=200%' : '+=150%',
    pin: true,
    scrub: 0.55,
    onUpdate: (self) => {
      progress = self.progress;
      syncFromScroll(!tweening);
    },
  });

  paint(0, false);

  const preview = (index: number) => {
    previewIndex = index;
    section.classList.add('is-preview');
    if (veil) veil.hidden = false;
    paint(index, true);
  };

  const clearPreview = () => {
    previewIndex = null;
    section.classList.remove('is-preview');
    if (veil) veil.hidden = true;
    paint(scrollIndex, true);
  };

  chips.forEach((chip) => {
    const index = Number(chip.dataset.chip);
    chip.addEventListener('mouseenter', () => preview(index));
    chip.addEventListener('focus', () => preview(index));
    chip.addEventListener('mouseleave', clearPreview);
    chip.addEventListener('blur', clearPreview);
    chip.addEventListener('click', () => {
      tweening = true;
      const target = index === 0 ? 0.12 : index === 1 ? 0.5 : 0.84;
      const trigger = ScrollTrigger.getById('styles');
      if (!trigger) return;
      const top = trigger.start + (trigger.end - trigger.start) * target;
      window.scrollTo({ top, behavior: 'smooth' });
      window.setTimeout(() => {
        tweening = false;
      }, 700);
    });
  });
}

function initBooking() {
  const modal = document.querySelector<HTMLElement>('[data-book-modal]');
  const form = modal?.querySelector<HTMLFormElement>('[data-book-form]');
  const flood = modal?.querySelector<HTMLElement>('[data-book-flood]');
  const pool = modal?.querySelector<HTMLElement>('[data-book-pool]');
  const grid = modal?.querySelector<HTMLElement>('.sheet__grid');
  const mark = modal?.querySelector<HTMLElement>('.sheet__mark');
  const items = modal?.querySelectorAll<HTMLElement>('[data-book-in]');
  if (!modal || !form) return;

  let lastFocus: HTMLElement | null = null;
  let isOpen = false;

  const reveal = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      modal.hidden = true;
      lastFocus?.focus({ preventScroll: true });
    },
  });

  if (!reduce && flood && pool && grid && mark && items?.length) {
    reveal
      .set(modal, { clearProps: 'clipPath' })
      .fromTo(
        flood,
        { y: '108%', scaleX: 1.03, borderRadius: '54% 46% 42% 58% / 42% 40% 0 0' },
        { y: '0%', scaleX: 1, borderRadius: '0% 0% 0% 0%', duration: 0.82, ease: 'power3.out' },
        0,
      )
      .fromTo(pool, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.15)
      .to(pool, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0.55)
      .to(flood, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.48)
      .fromTo(grid, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, ease: 'expo.out' }, 0.38)
      .from(mark, { opacity: 0, scale: 1.08, duration: 1, ease: 'power2.out' }, 0.42)
      .from(items, { y: 22, autoAlpha: 0, duration: 0.52, stagger: 0.045, ease: 'expo.out' }, 0.48);
  }

  const setOpen = (value: boolean) => {
    if (value === isOpen) return;
    isOpen = value;
    if (value) {
      lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      modal.hidden = false;
      document.body.classList.add('is-locked');
      if (reduce) {
        if (flood) gsap.set(flood, { opacity: 0, clearProps: 'transform' });
        if (pool) gsap.set(pool, { opacity: 0 });
        if (grid) gsap.set(grid, { clearProps: 'all' });
      } else if (flood && pool) {
        gsap.set(flood, { opacity: 1, y: '108%', scaleX: 1.03 });
        gsap.set(pool, { opacity: 0 });
        reveal.timeScale(1).restart();
      }
      requestAnimationFrame(() => {
        form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
      });
    } else {
      document.body.classList.remove('is-locked');
      if (reduce) {
        modal.hidden = true;
        lastFocus?.focus({ preventScroll: true });
      } else {
        reveal.timeScale(1.6).reverse();
      }
    }
  };

  document.querySelectorAll<HTMLElement>('[data-open-book]').forEach((node) => {
    node.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(true);
    });
  });

  modal.querySelectorAll<HTMLElement>('[data-book-close]').forEach((node) => {
    node.addEventListener('click', () => setOpen(false));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const style = String(data.get('style') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !style || !message) return;
    window.open(whatsAppBookingUrl(name, style, message), '_blank', 'noopener,noreferrer');
    setOpen(false);
    form.reset();
    const first = form.querySelector<HTMLButtonElement>('[data-style-option]');
    const pickLabel = form.querySelector<HTMLElement>('[data-style-label]');
    const pickValue = form.querySelector<HTMLInputElement>('[data-style-value]');
    if (first && pickLabel && pickValue) {
      pickValue.value = first.dataset.value ?? pickValue.value;
      pickLabel.textContent = pickValue.value;
      form.querySelectorAll<HTMLButtonElement>('[data-style-option]').forEach((node, index) => {
        node.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') setOpen(false);
  });

  initStylePick(form);
}

function initStylePick(root: ParentNode) {
  const pick = root.querySelector<HTMLElement>('[data-style-pick]');
  const trigger = pick?.querySelector<HTMLButtonElement>('[data-style-trigger]');
  const menu = pick?.querySelector<HTMLElement>('[data-style-menu]');
  const hidden = pick?.querySelector<HTMLInputElement>('[data-style-value]');
  const label = pick?.querySelector<HTMLElement>('[data-style-label]');
  const options = pick?.querySelectorAll<HTMLButtonElement>('[data-style-option]');
  if (!pick || !trigger || !menu || !hidden || !label || !options?.length) return;

  const close = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    pick.classList.remove('is-open');
  };

  const setValue = (value: string, active: HTMLButtonElement) => {
    hidden.value = value;
    label.textContent = value;
    options.forEach((node) => node.setAttribute('aria-selected', node === active ? 'true' : 'false'));
  };

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', String(willOpen));
    pick.classList.toggle('is-open', willOpen);
  });

  options.forEach((option) => {
    option.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      setValue(option.dataset.value ?? '', option);
      close();
    });
  });

  document.addEventListener(
    'pointerdown',
    (event) => {
      if (menu.hidden) return;
      const target = event.target;
      if (target instanceof Node && pick.contains(target)) return;
      close();
    },
    true,
  );

  pick.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menu.hidden) return;
    event.stopPropagation();
    close();
    trigger.focus();
  });
}

function initPortal() {
  const root = document.querySelector<HTMLElement>('.portal');
  const pin = document.querySelector<HTMLElement>('[data-portal-pin]');
  const process = document.querySelector<HTMLElement>('[data-zoom]');
  const digit = document.querySelector<HTMLElement>('#digit-2');
  const reviews = document.querySelector<HTMLElement>('.reviews');
  if (!root || !pin || !process || !digit || !reviews || reduce || root.dataset.bound === '1') return;
  root.dataset.bound = '1';

  const chars = process.querySelectorAll<HTMLElement>('.char');
  const reviewChars = reviews.querySelectorAll<HTMLElement>('.char');
  const cards = reviews.querySelectorAll<HTMLElement>('.review');

  let cachedScale = 0;

  const measureZoom = () => {
    const previous = Number(gsap.getProperty(process, 'scale')) || 1;
    gsap.set(process, { scale: 1 });
    const center = boxCenter(digit, process);
    gsap.set(process, { scale: previous, transformOrigin: `${center.x}px ${center.y}px` });
    const dw = Math.max(40, digit.offsetWidth);
    const dh = Math.max(40, digit.offsetHeight);
    const w = window.innerWidth;
    const h = window.innerHeight;
    let scale = 1;
    for (const [x, y] of [
      [0, 0],
      [w, 0],
      [0, h],
      [w, h],
    ]) {
      scale = Math.max(scale, Math.abs(x - center.x) / (dw / 2), Math.abs(y - center.y) / (dh / 2));
    }
    cachedScale = scale * 1.12;
  };

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: 'portal',
      trigger: root,
      start: 'top top',
      end: '+=340%',
      pin: pin,
      scrub: 0.7,
      invalidateOnRefresh: true,
      onRefresh: () => {
        cachedScale = 0;
        measureZoom();
      },
    },
  });

  measureZoom();
  timeline
    .to(chars, { opacity: 1, duration: 0.2, stagger: { amount: 0.28 }, ease: 'none' }, 0)
    .to(process, { scale: () => cachedScale || 12, duration: 0.85, ease: 'power2.in' }, 0.42)
    .to(reviews, { autoAlpha: 1, duration: 0.22 }, 1.15)
    .to(reviewChars, { opacity: 1, duration: 0.16, stagger: { amount: 0.2 }, ease: 'none' }, 1.2)
    .from(cards, { y: 36, autoAlpha: 0, duration: 0.28, stagger: { amount: 0.24 } }, 1.22);

  document.querySelectorAll<HTMLAnchorElement>('a[href="#resenas"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const trigger = ScrollTrigger.getById('portal');
      if (!trigger) return;
      event.preventDefault();
      const top = trigger.start + (trigger.end - trigger.start) * 0.78;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initVideos() {
  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!videos.length || reduce) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      });
    },
    { threshold: 0.35 },
  );
  videos.forEach((video) => observer.observe(video));
}

function initLightbox() {
  const root = document.querySelector<HTMLElement>('[data-lb]');
  const image = root?.querySelector<HTMLImageElement>('[data-lb-img]');
  const video = root?.querySelector<HTMLVideoElement>('[data-lb-video]');
  const caption = root?.querySelector<HTMLElement>('[data-lb-cap]');
  const stage = root?.querySelector<HTMLElement>('[data-lb-stage]');
  if (!root || !image || !video || !caption || !stage) return;

  let index = 0;
  let lastFocus: HTMLElement | null = null;
  let stepping = false;

  const applyPiece = () => {
    const piece = catalog[index];
    caption.textContent = piece.caption;
    if (piece.kind === 'video') {
      image.hidden = true;
      video.hidden = false;
      video.src = piece.src;
      video.poster = piece.poster ?? '';
      video.play().catch(() => undefined);
    } else {
      video.pause();
      video.removeAttribute('src');
      video.hidden = true;
      image.hidden = false;
      image.src = piece.src;
      image.alt = piece.alt;
    }
  };

  const paint = (animate = false) => {
    if (stepping && animate) return;
    if (reduce || !animate) {
      applyPiece();
      gsap.set([image, video], { opacity: 1, y: 0, clearProps: 'opacity,transform' });
      return;
    }

    stepping = true;
    gsap.to([image, video], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        applyPiece();
        const next = image.hidden ? video : image;
        gsap.set(next, { opacity: 0, y: 14 });
        gsap.to(next, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set([image, video], { clearProps: 'opacity,transform' });
            stepping = false;
          },
        });
      },
    });
  };

  const open = (id: string) => {
    const found = catalog.findIndex((piece) => piece.id === id);
    if (found < 0) return;
    index = found;
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    root.hidden = false;
    document.body.classList.add('is-locked');
    paint();
    root.querySelector<HTMLElement>('[data-lb-close]')?.focus();
  };

  const close = () => {
    root.hidden = true;
    video.pause();
    document.body.classList.remove('is-locked');
    lastFocus?.focus();
  };

  const step = (direction: number) => {
    index = (index + direction + catalog.length) % catalog.length;
    paint(true);
  };

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const piece = target?.closest<HTMLElement>('[data-piece]');
    if (piece?.dataset.piece) {
      event.preventDefault();
      open(piece.dataset.piece);
    }
  });

  root.querySelectorAll<HTMLElement>('[data-lb-close]').forEach((node) => node.addEventListener('click', close));
  root.querySelector('[data-lb-prev]')?.addEventListener('click', () => step(-1));
  root.querySelector('[data-lb-next]')?.addEventListener('click', () => step(1));
  document.querySelector('.work__more')?.addEventListener('click', () => open(catalog[0].id));

  document.addEventListener('keydown', (event) => {
    if (root.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  });
}

function initMenu() {
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!burger || !menu || !header) return;

  const close = () => {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  };

  burger.addEventListener('click', () => {
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    burger.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('is-locked', willOpen);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  window.addEventListener(
    'scroll',
    () => header.classList.toggle('is-stuck', window.scrollY > 20),
    { passive: true },
  );
}

function boot() {
  if (reduce) document.documentElement.classList.add('is-static');
  initWrites();
  initIntro();
  initLogo();
  initMenu();
  initBooking();
  initLightbox();
  initVideos();
  if (reduce) return;

  initStyles();
  const mm = gsap.matchMedia();
  mm.add('(min-width: 960px)', () => {
    initArrivals();
    initPortal();
    return () => {
      const root = document.querySelector<HTMLElement>('.portal');
      if (root) delete root.dataset.bound;
    };
  });
  mm.add('(max-width: 959px)', () => {
    initArrivals();
    document.querySelectorAll<HTMLElement>('[data-write="hold"]').forEach(writeOnScroll);
  });
}

boot();
