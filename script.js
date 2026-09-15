/* ============================================================
   ProfMaster - скрипт страницы.
   Плиты и развёртка сектором · люк-барабан с тахо-шкалой в герое ·
   перевод RU/KZ · меню · бегущие строки · ленты с кнопками ·
   WhatsApp с названием карточки · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77787771115";                  /* телефон и WhatsApp ProfMaster - один номер */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Ярлыки задаёт index.html (window.PM_CONV): phone - клик по номеру, contact - WhatsApp,
   lead - отправка формы. Переход не блокируем, доставку держит beacon. Пустой ярлык - не шлём. */
function conv(key){
  var id = (window.PM_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {send_to: id, value: 1.0, currency: "USD", transport_type: "beacon"});
}
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  if (h.indexOf("tel:") === 0) conv("phone");
  else if (h.indexOf("wa.me") > -1) conv("contact");
}, true);

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Лежит в assets/lang/kk.js и грузится только когда человек сам выбрал KZ
   (или открыл ?lang=kk / выбрал раньше). В разметке и в этом файле казахского текста нет:
   проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
   Версия файла - из ?v= этого скрипта, бампается вместе с остальными ассетами.
   Ключа нет - строка остаётся русской. */
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
var KK = null;   /* window.SITE_KK после загрузки */
var KZ = {};
function loadKK(done){
  if (KK) return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){ if (window.SITE_KK){ KK = window.SITE_KK; KZ = KK.dict || {}; } done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}

/* готовые тексты WhatsApp: название симптома или работы - отдельной строкой */
var WA_RU = {
  hero:"Здравствуйте! Нужен ремонт стиральной машины.\nЧто случилось: ",
  sym:"Здравствуйте! Нужен ремонт стиральной машины.\nПроблема: {t}\nБренд машины и адрес: ",
  work:"Здравствуйте! Интересует:\n{t}\nБренд машины и адрес: ",
  plata:"Здравствуйте! Интересует:\nРемонт платы управления стиральной машины\nБренд машины и адрес: ",
  kontakty:"Здравствуйте! Пишу с сайта ProfMaster. Нужна консультация: "
};
function waTxt(){ return (curLang() === "kk" && KK && KK.wa) ? KK.wa : WA_RU; }

var TICK = ["Не сливает воду","Не отжимает","Не греет","Не включается","Не крутит барабан","Шумит","Течёт","Не открывается дверца","Код ошибки","Не набирает воду"];
var BR = [["Samsung","LG","Bosch","Siemens","Indesit","Ariston"],["Hotpoint","Beko","Electrolux","Zanussi","Whirlpool","Candy"],["Haier","Midea","AEG","Atlant","Gorenje","Vestel"]];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
  var t = document.querySelector("title[data-i-t]"); if (t) RU[t.dataset.iT] = t.textContent;
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

/* текст заявки собирается из заголовка карточки на текущем языке */
function setWaLinks(){
  var W = waTxt();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var key = a.dataset.wa, t = W[key] || W.hero;
    if (t.indexOf("{t}") > -1) {
      var card = a.closest(".sym, .wk"), h = card ? card.querySelector("h3") : null;
      t = t.replace("{t}", h ? h.textContent.trim() : "");
    }
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk" && !!KK;       /* словарь не загрузился - остаёмся на русском */
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var t = document.querySelector("title[data-i-t]");
  if (t) { var tv = pick(t.dataset.iT, kk); if (tv !== undefined) t.textContent = tv; }
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("pm-lang", kk ? "kk" : "ru"); } catch(e){}
  setWaLinks();
  fillTicker();
  requestAnimationFrame(fitText);
}
/* ?lang= в URL сильнее localStorage: русское объявление не должно открыть казахскую версию.
   Язык по navigator.language не угадываем - казахский только явным выбором человека. */
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("pm-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  setLang(lang);
}
function setLang(lang){
  if (lang === "kk") loadKK(function(){ applyLang("kk"); });
  else applyLang("ru");
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  document.querySelectorAll(".h1 span, .kphone").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.55) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩИЕ ЛЕНТЫ ----------------
   Копий столько, чтобы дорожка была шире двух экранов; шаг цикла - одна копия. */
function fillOne(el, list, speed){
  if (!el) return;
  var one = list.map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty("--tkw", w + "px");
  el.style.setProperty("--tkd", Math.max(12, w / speed) + "s");
}
function fillTicker(){
  fillOne(document.getElementById("ticker"), (curLang() === "kk" && KK && KK.tick) ? KK.tick : TICK, 55);
  fillOne(document.getElementById("br1"), BR[0], 36);
  fillOne(document.getElementById("br2"), BR[1], 30);
  fillOne(document.getElementById("br3"), BR[2], 42);
}
var tkTimer;
addEventListener("resize", function(){ clearTimeout(tkTimer); tkTimer = setTimeout(function(){ fillTicker(); fitText(); lanes.forEach(function(l){ l.state(); }); }, 200); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  var t = document.getElementById(id); if (!t) return;
  e.preventDefault();
  closeMenu();
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH());
  scrollTo({ top: Math.max(0, top), behavior: RED ? "auto" : "smooth" });
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ШАПКА ---------------- */
var hdr = document.getElementById("hdr");
function hdrState(){ if (hdr) hdr.classList.toggle("solid", scrollY > 40); }

/* ---------------- ГЕРОЙ ---------------- */
var heroPw = document.getElementById("top");
var hero = document.getElementById("hero");
/* ---------------- ПЛИТЫ ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay и --open (сектор развёртки), герою ещё --f
   (интро: сектор проявляет фото). */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true;
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.style.setProperty("--open",  easeOut(clamp((enter - 0.3) / 0.7)).toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) {
      pw.style.setProperty("--f", introK.toFixed(3));
    }
  });
  hdrState();
  /* липкая панель: после 55 % первого экрана, прячется на контактах */
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  root.classList.add("no-intro");
  if (hero) hero.classList.add("on");
  addEventListener("scroll", function(){ hdrState(); if (bar) bar.classList.toggle("show", scrollY > innerHeight * 0.55); }, {passive:true});
  hdrState();
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  /* интро 1250 мс: сектор проявляет фото по часовой стрелке, люк доворачивается, шкала прочерчивается.
     Пропускаем при хэше / прокрутке - человек из рекламы сразу видит собранный экран. */
  var skip = location.hash || scrollY > 80;
  if (skip) {
    root.classList.add("no-intro");
    if (hero) hero.classList.add("on");
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1250);
      introK = easeOut(p);
      update();
      if (p < 1) requestAnimationFrame(step);
      else introDone = true;
    };
    requestAnimationFrame(function(){ if (hero) hero.classList.add("on"); requestAnimationFrame(step); });
    /* страховка: если rAF не тикает (фоновая вкладка), собрать экран по таймеру */
    setTimeout(function(){ if (hero) hero.classList.add("on"); }, 400);
    setTimeout(function(){ if (!introDone) { introDone = true; introK = 1; update(); } }, 1800);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; if (hero) hero.classList.add("on"); update(); };
addEventListener("hashchange", function(){ root.classList.add("no-intro"); });

/* ---------------- ПОЯВЛЕНИЕ В КАТАЛОЖНЫХ СЕКЦИЯХ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- ЛЕНТЫ С КНОПКАМИ ----------------
   Шаг - ровно одна карточка (ширина + gap из стилей), крайняя кнопка гаснет,
   обе прячутся, если всё влезло. Ленте tabindex=0 - листается стрелками. */
var lanes = [];
document.querySelectorAll(".lane-w").forEach(function(w){
  var lane = w.querySelector(".lane"), prev = w.querySelector(".lbtn.prev"), next = w.querySelector(".lbtn.next");
  if (!lane || !prev || !next) return;
  function stepW(){
    var c = lane.firstElementChild; if (!c) return 300;
    var cs = getComputedStyle(lane);
    var gap = parseFloat(cs.columnGap || cs.gap) || 14;
    return c.getBoundingClientRect().width + gap;
  }
  function state(){
    var max = lane.scrollWidth - lane.clientWidth;
    var none = max <= 1;
    prev.hidden = none; next.hidden = none;
    prev.disabled = lane.scrollLeft <= 1;
    next.disabled = lane.scrollLeft >= max - 1;
  }
  prev.addEventListener("click", function(){ lane.scrollBy({left: -stepW(), behavior: RED ? "auto" : "smooth"}); });
  next.addEventListener("click", function(){ lane.scrollBy({left: stepW(), behavior: RED ? "auto" : "smooth"}); });
  lane.addEventListener("scroll", state, {passive:true});
  lane.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev.click(); }
  });
  state();
  addEventListener("load", state);
  lanes.push({state: state});
});

/* ---------------- ФОРМА → WhatsApp ---------------- */
var FORM_RU = {hello:"Здравствуйте! Заявка с сайта ProfMaster.", name:"Имя", phone:"Телефон", msg:"Что случилось"};
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  if (!name || phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  var F = (curLang() === "kk" && KK && KK.form) ? KK.form : FORM_RU;
  var t = F.hello + "\n" + F.name + ": " + name + "\n" + F.phone + ": " + phone + (msg ? "\n" + F.msg + ": " + msg : "");
  ok.hidden = false;
  conv("lead");
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
fillTicker();
fitText();
hdrState();
})();
