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
   Ярлыки задаёт index.html (window.PM_CONV). Клики по телефону и WhatsApp
   ловим делегированием, переход не блокируем. Пустой ярлык - событие не шлём. */
function conv(key){
  var id = (window.PM_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {send_to: id, value: 1.0, currency: "USD"});
}
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  if (h.indexOf("tel:") === 0) conv("phone");
  else if (h.indexOf("wa.me") > -1) conv("contact");
}, true);

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет - строка остаётся русской. */
var KZ = {
"m.title":"Астанада кір жуғыш машинаны үйде жөндеу - ProfMaster",
"m.desc":"Астанада және 150 км-ге дейінгі қала маңында кір жуғыш машинаны үйде жөндеу. 12 жыл тәжірибе, түпнұсқа қосалқы бөлшектер, 1 жылға дейін кепілдік, 2GIS-те 138 пікір бойынша 4.9. Тәулік бойы шығамыз.",
"m.ogt":"Астанада кір жуғыш машинаны үйде жөндеу - ProfMaster",
"m.ogd":"Астана және 150 км-ге дейінгі қала маңына шығу. Түпнұсқа қосалқы бөлшектер, 1 жылға дейін кепілдік, 2GIS-те 138 пікір бойынша 4.9. Тәулік бойы.",
"a.home":"ProfMaster, басты бетке","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"a.prev":"Артқа","a.next":"Алға",
"nav.sy":"Белгілері","nav.wk":"Жұмыстар","nav.br":"Брендтер","nav.rv":"Пікірлер","nav.kt":"Байланыс",
"b.call":"Қоңырау шалу","b.write":"WhatsApp-қа жазу","b.price":"Құнын білу","b.callm":"Шебер шақыру",

"h.kick":"Астана · үйде жөндеу · 12 жыл",
"h.h1a":"Кір жуғыш","h.h1b":"машина жөндеу",
"h.lead":"Астана және 150 км-ге дейінгі қала маңына шығамыз. Түпнұсқа қосалқы бөлшектер, 1 жылға дейін кепілдік. 2GIS-те 138 пікір бойынша 4.9.",
"h.a":"Кір жуғыш машинаның ашық барабаны жақыннан","h.rpm":"айн/мин",

"sy.k":"Машинаға не болды","sy.h":"Ақауыңызды табыңыз",
"sy.l":"Диагностика орнында, бағасын жұмысқа кіріспес бұрын айтамыз. Белгіні басыңыз - өтінім дайын.",
"sy.a":"Кір жуғыш машина барабанының перфорациясы",
"sy.1":"Суды төкпейді","sy.1p":"Сорғы, сүзгі, деңгей датчигі",
"sy.2":"Сықпайды","sy.2p":"Қозғалтқыш щёткалары, таходатчик, белдік",
"sy.3":"Суды қыздырмайды","sy.3p":"ТЭН, температура датчигі, плата",
"sy.4":"Қосылмайды","sy.4p":"Түйме, кедергі сүзгісі, модуль",
"sy.5":"Барабан айналмайды","sy.5p":"Белдік, қозғалтқыш, подшипниктер",
"sy.6":"Шуылдайды, дірілдейді","sy.6p":"Подшипниктер, амортизаторлар, қарсы салмақ",
"sy.7":"Су ағады","sy.7p":"Манжета, келте құбырлар, бак",
"sy.8":"Есігі ашылмайды","sy.8p":"УБЛ құлпы, люк тұтқасы",
"sy.9":"Дисплейде қате коды","sy.9p":"Кодты оқып, ақаулы торапты табамыз",
"sy.10":"Су құймайды","sy.10p":"Су құю клапаны, прессостат, сүзгі",

"pl.k":"Сирек кездесетін құзырет","pl.h":"Платаны ауыстырмай, жөндейміз",
"pl.l":"Бәсекелестер басқару модулін тұтас ауыстырады - біз күйген элементті тауып, тек соны ауыстырамыз. Плата төлтума күйінде қалады.",
"pl.a":"Шебер кір жуғыш машинаның басқару платасын мультиметрмен тексеріп жатыр",
"md.k":"Үйде жөндеу","md.h":"Бір шығу - машина қайта жуады",
"md.l":"12 жылдық тәжірибесі бар шебер қосалқы бөлшектерімен келіп, көзіңізше жөндейді. Астана, қала маңы және 150 км-ге дейінгі ауылдар - өз көлігімен.",
"md.a":"Шебер жөндеу үшін кір жуғыш машинаның панелін шешіп жатыр",

"wk.k":"Жұмыстар мен қосалқы бөлшектер","wk.h":"Нені ауыстырамыз және жөндейміз",
"wk.l":"Тек түпнұсқа қосалқы бөлшектер. Бағасын диагностикадан кейін, жұмысқа кіріспес бұрын айтамыз.",
"w.stub":"Жұмыс фотосы",
"w.1":"Диагностика","w.1p":"Орнында, көзіңізше. Бағасын жұмысқа дейін айтамыз.","w.1a":"Шебердің бұрағыш жинағы",
"w.2":"Басқару платасын жөндеу","w.2p":"Модульді тұтас ауыстырмай, жөндейміз.","w.2a":"Басқару платасын дәнекерлеу",
"w.3":"ТЭН ауыстыру","w.3p":"Суды қыздырмайды, автоматты ағытады.","w.3a":"Кір жуғыш машина багында ТЭН ауыстыру",
"w.4":"Сорғыны ауыстыру","w.4p":"Суды төкпейді, төгу кезінде гуілдейді.","w.4a":"Кір жуғыш машинаның төгу сорғысы мен қозғалтқышы",
"w.5":"Подшипниктер мен сальник","w.5p":"Сығу кезінде гуіл мен тарсыл.","w.5a":"Подшипник күпшегі бар кір жуғыш машина багының жартысы",
"w.6":"Белдікті ауыстыру","w.6p":"Мотор айналады, барабан тұр.",
"w.7":"УБЛ құлпын ауыстыру","w.7p":"Есік ашылмайды немесе бұғатталмайды.",
"w.8":"Люк манжетасы","w.8p":"Есік астынан су ағады, резеңкеде зең.","w.8a":"Кір жуғыш машина люгінің манжетасы",
"w.9":"Қозғалтқышты жөндеу","w.9p":"Щёткалар, орама, таходатчик.","w.9a":"Шебер кір жуғыш машинаның қозғалтқышын ұстап тұр",

"br.k":"Брендтер","br.h":"Кез келген маркаларды жөндейміз",
"br.l":"Samsung, LG, Bosch, Indesit және тағы он бестей бренд. Әр үлгіге түпнұсқа қосалқы бөлшектер, арзан аналогтарсыз.",

"st.k":"Қалай жұмыс істейміз","st.h":"Қоңыраудан кепілдікке дейін",
"st.1":"Өтінім","st.1p":"Қоңырау немесе WhatsApp - уақытты сол күні белгілейміз.",
"st.2":"Шығу және диагностика","st.2p":"Шебер мекенжайда, себебін көзіңізше табады.",
"st.3":"Жөндеу","st.3p":"Түпнұсқа бөлшек өзімен, орнында жөндейміз.",
"st.4":"Кепілдік","st.4p":"Жұмысқа 1 жылға дейін. Шықпаса - ақшаны қайтарамыз.",

"tr.k":"Неге ProfMaster","tr.h":"Атымен шақыратын шебер",
"tr.l":"2GIS пікірлерінде клиенттер «сервис» емес, «Бауыржан» деп жазады. 12 жыл бойы өзі жөндейді, мердігерлерсіз.",
"tr.1":"жыл кір жуғыш машиналарды жөндеу","tr.2":"138 пікір бойынша 2GIS рейтингі",
"tr.3n":"1 жыл","tr.3":"жұмысқа ең жоғары кепілдік","tr.4":"жөндеу шықпаса, ақшаны қайтару",
"tr.5":"Астанадағы шеберхана","tr.6n":"150 км","tr.6":"өз көлігімен шығу",

"rv.k":"2GIS пікірлері","rv.h":"138 пікір бойынша 5-тен 4.9",
"rv.l":"Сөзбе-сөз, аты-жөнімен. Барлық пікірлер - екі шеберхананың 2GIS карточкаларында.",
"rv.g1":"Пікірлер: Петрова көшесіндегі шеберхана","rv.g2":"Пікірлер: Мәңгілік Ел даңғылындағы шеберхана",

"geo.k":"География","geo.h":"Астана және 150 км-ге дейінгі қала маңы",
"geo.l":"Қаланың барлық аудандары мен айналасындағы ауылдар - өз көлігімізбен келеміз.",
"geo.1":"Астананың барлық аудандары","geo.4":"Қабанбай батыр","geo.5":"Софиевка","geo.6":"Қараөткел","geo.7":"Қоянды","geo.8":"Ақмол","geo.9":"Аршалы",
"geo.10":"және 150 км-ге дейінгі басқа ауылдар",

"kt.k":"Байланыс","kt.h":"Қоңырау шалыңыз - бүгін шығамыз",
"kt.l":"Тәулік бойы. Телефон мен WhatsApp - бір нөмір.",
"kt.call":"Қоңырау","kt.gis":"2GIS-те ашу",
"kt.s1k":"Петрова көшесіндегі шеберхана","kt.s1":"Алексей Петров көшесі, 7, цокольдық қабат",
"kt.s2k":"Мәңгілік Ел даңғылындағы шеберхана","kt.s2":"Мәңгілік Ел даңғылы, 17",
"fm.k":"Өтінім","fm.h":"Ақауды сипаттаңыз - қайта қоңырау шаламыз",
"fm.name":"Атыңыз","fm.phone":"Телефон","fm.msg":"Не болды және қандай машина","fm.send":"WhatsApp-қа жіберу",
"fm.note":"Түймені басқан соң WhatsApp ашылады - хабарлама сіздің нөміріңізден кетеді.",
"fm.ok":"Рақмет! WhatsApp ашылады, хабарлама дайын.","fm.err":"Атыңыз бен телефоныңызды көрсетіңіз.",
"f.sub":"Кір жуғыш машинаны үйде жөндеу · Астана және қала маңы · тәулік бойы",
"f.copy":"© 2026 ProfMaster. Астанада кір жуғыш машиналар мен тұрмыстық техниканы жөндеу.",
"bar.call":"Қоңырау","bar.wa":"WhatsApp"
};

/* готовые тексты WhatsApp: название симптома или работы - отдельной строкой */
var WA_TXT = {
ru:{
  hero:"Здравствуйте! Нужен ремонт стиральной машины.\nЧто случилось: ",
  sym:"Здравствуйте! Нужен ремонт стиральной машины.\nПроблема: {t}\nБренд машины и адрес: ",
  work:"Здравствуйте! Интересует:\n{t}\nБренд машины и адрес: ",
  plata:"Здравствуйте! Интересует:\nРемонт платы управления стиральной машины\nБренд машины и адрес: ",
  kontakty:"Здравствуйте! Пишу с сайта ProfMaster. Нужна консультация: "
},
kk:{
  hero:"Сәлеметсіз бе! Кір жуғыш машинаны жөндеу керек.\nНе болды: ",
  sym:"Сәлеметсіз бе! Кір жуғыш машинаны жөндеу керек.\nАқауы: {t}\nМашина бренді мен мекенжайы: ",
  work:"Сәлеметсіз бе! Мені қызықтырады:\n{t}\nМашина бренді мен мекенжайы: ",
  plata:"Сәлеметсіз бе! Мені қызықтырады:\nКір жуғыш машинаның басқару платасын жөндеу\nМашина бренді мен мекенжайы: ",
  kontakty:"Сәлеметсіз бе! ProfMaster сайтынан жазып отырмын. Кеңес керек: "
}};

var TICK = ["Не сливает воду","Не отжимает","Не греет","Не включается","Не крутит барабан","Шумит","Течёт","Не открывается дверца","Код ошибки","Не набирает воду"];
var TICK_KZ = ["Суды төкпейді","Сықпайды","Қыздырмайды","Қосылмайды","Барабан айналмайды","Шуылдайды","Су ағады","Есігі ашылмайды","Қате коды","Су құймайды"];
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
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var key = a.dataset.wa, t = WA_TXT[L][key] || WA_TXT[L].hero;
    if (t.indexOf("{t}") > -1) {
      var card = a.closest(".sym, .wk"), h = card ? card.querySelector("h3") : null;
      t = t.replace("{t}", h ? h.textContent.trim() : "");
    }
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
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
/* ?lang=kk в URL сильнее localStorage: русское объявление не должно открыть казахскую версию */
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("pm-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
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
  fillOne(document.getElementById("ticker"), curLang() === "kk" ? TICK_KZ : TICK, 55);
  fillOne(document.getElementById("br1"), BR[0], 36);
  fillOne(document.getElementById("br2"), BR[1], 30);
  fillOne(document.getElementById("br3"), BR[2], 42);
}
var tkTimer;
addEventListener("resize", function(){ clearTimeout(tkTimer); tkTimer = setTimeout(function(){ fillTicker(); fitText(); lukGeom(); lanes.forEach(function(l){ l.state(); }); }, 200); });
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

/* ---------------- ЛЮК-БАРАБАН В ГЕРОЕ ----------------
   Объект садится точно на барабан фотографии. Центр и радиус барабана
   известны в долях кадра (два кроя: десктоп и мобайл), положение на экране
   считается по правилам object-fit:cover + object-position. */
var heroPw = document.getElementById("top");
var hero = document.getElementById("hero");
var luk = document.getElementById("luk");
var rpmEl = document.getElementById("rpm");
var GEO_D = {iw:1600, ih:1000, cx:.72, cy:.52, r:.30, rh:true,  px:.72, py:.52};   /* r - доля высоты */
var GEO_M = {iw:900,  ih:1600, cx:.50, cy:.36, r:.38, rh:false, px:.50, py:.36};  /* r - доля ширины */
var STEEL = 164;                                                                  /* радиус барабана в единицах viewBox 440 */
function lukGeom(){
  if (!hero || !luk) return;
  var W = hero.clientWidth, H = hero.clientHeight;
  var g = matchMedia("(max-width:760px)").matches ? GEO_M : GEO_D;
  var py = (g === GEO_D && H <= 700) ? 0.30 : g.py;               /* низкий десктоп: барабан ниже, чтобы шкала не ушла под шапку */
  var s = Math.max(W / g.iw, H / g.ih), rw = g.iw * s, rh = g.ih * s;
  var x0 = (W - rw) * g.px, y0 = (H - rh) * py;
  var cx = x0 + g.cx * rw, cy = y0 + g.cy * rh;
  var r = g.rh ? g.r * rh : g.r * rw;
  var box = r * 440 / STEEL;
  luk.style.left = cx + "px"; luk.style.top = cy + "px";
  luk.style.width = box + "px"; luk.style.height = box + "px";
  luk.style.setProperty("--rpmfs", Math.round(r * .21) + "px");
  luk.style.setProperty("--rpmls", Math.max(8, Math.round(r * .065)) + "px");
  hero.style.setProperty("--dcx", cx + "px");
  hero.style.setProperty("--dcy", cy + "px");
}
/* шкала: 33 риски от -135 до +135 градусов, крупная каждая четвёртая (400 ... 1200) */
(function(){
  var g = document.getElementById("ticks"); if (!g) return;
  var html = "";
  for (var i = 0; i <= 32; i++) {
    var a = (-135 + 270 * i / 32) * Math.PI / 180, mj = i % 4 === 0;
    var r1 = mj ? 186 : 190, r2 = 198;
    html += '<line class="' + (mj ? "mj" : "") + '" x1="' + (220 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (220 - r1 * Math.cos(a)).toFixed(1) +
            '" x2="' + (220 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (220 - r2 * Math.cos(a)).toFixed(1) + '"/>';
  }
  g.innerHTML = html;
})();

/* ---------------- ПЛИТЫ ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay и --open (сектор развёртки), герою ещё --f
   (интро: сектор проявляет фото) и --rpm (обороты по прокрутке). */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true, lastRpm = -1;
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
      var k = easeOut(clamp(stay * 1.25));
      pw.style.setProperty("--rpm", k.toFixed(3));
      var rpm = Math.round((400 + 800 * k) / 10) * 10;
      if (rpmEl && rpm !== lastRpm) { rpmEl.textContent = rpm; lastRpm = rpm; }
    }
  });
  hdrState();
  /* липкая панель: после 55 % первого экрана, прячется на контактах */
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
lukGeom();
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
  addEventListener("load", function(){ lukGeom(); update(); });
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
window.plateSync = function(){ introDone = true; introK = 1; if (hero) hero.classList.add("on"); lukGeom(); update(); };
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
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  if (!name || phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  var L = curLang();
  var t = (L === "kk"
    ? "Сәлеметсіз бе! ProfMaster сайтынан өтінім.\nАты: " + name + "\nТелефон: " + phone + (msg ? "\nНе болды: " + msg : "")
    : "Здравствуйте! Заявка с сайта ProfMaster.\nИмя: " + name + "\nТелефон: " + phone + (msg ? "\nЧто случилось: " + msg : ""));
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
