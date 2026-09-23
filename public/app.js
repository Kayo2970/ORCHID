(function(){
  "use strict";

  const $ = (sel, ctx) => (ctx||document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));

  const NOW = new Date();

  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function parseISO(d){
    if(!d) return null;
    const [y,m,day] = d.split("-").map(Number);
    return new Date(y, m-1, day, 23, 59, 0);
  }

  function fmtDate(d){
    if(!d) return "";
    const dt = parseISO(d);
    return `${dt.getDate()} ${MONTH_NAMES[dt.getMonth()]} ${dt.getFullYear()}`;
  }

  function daysLeft(iso){
    if(!iso) return null;
    const target = parseISO(iso);
    const diffMs = target - NOW;
    return Math.ceil(diffMs / (1000*60*60*24));
  }

  function urgencyClass(iso, noFixed){
    if(noFixed || !iso) return "open";
    const dl = daysLeft(iso);
    if(dl === null) return "open";
    if(dl < 0) return "open";
    if(dl <= 3) return "urgent";
    if(dl <= 10) return "soon";
    return "open";
  }

  function initials(agency){
    return agency
      .replace(/\(.*?\)/g,"")
      .split(/[\s,/|–-]+/)
      .filter(Boolean)
      .slice(0,2)
      .map(w=>w[0])
      .join("")
      .toUpperCase() || "•";
  }

  const CATEGORY_LABEL = { national:"National", international:"International", fellowship:"Fellowship" };

  /* ---------------- HERO STATS ---------------- */
  function renderHeroStats(){
    const national = GRANTS.filter(g=>g.category==="national").length;
    const intl = GRANTS.filter(g=>g.category==="international").length;
    const fellow = GRANTS.filter(g=>g.category==="fellowship").length;
    const rolling = ROLLING_CALLS.national.length + ROLLING_CALLS.international.length;
    const stats = [
      { num: national, label: "National Grants" },
      { num: intl, label: "International Grants" },
      { num: fellow, label: "Fellowships" },
      { num: rolling, label: "Rolling Calls" }
    ];
    $("#heroStats").innerHTML = stats.map(s=>`
      <div class="stat-tile">
        <div class="stat-num" data-count="${s.num}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join("");
  }

  function animateCounters(){
    $$(".stat-num").forEach(el=>{
      const target = parseInt(el.getAttribute("data-count"),10) || 0;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/40));
      const tick = ()=>{
        cur += step;
        if(cur >= target){ el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      };
      tick();
    });
  }

  /* ---------------- ORI DESK LETTER ---------------- */
  function renderLetter(){
    $("#letterGreeting").textContent = NEWSLETTER.letter.greeting;
    $("#letterBody").innerHTML = NEWSLETTER.letter.paragraphs.map(p=>`<p>${p}</p>`).join("");
    const email = NEWSLETTER.contactEmail;
    $("#letterEmail").textContent = email;
    $("#letterEmail").href = `mailto:${email}`;
    $("#closingEmail").href = `mailto:${email}`;
    $("#footerEmail").textContent = email;
    $("#footerEmail").href = `mailto:${email}`;

    $("#thesisGrid").innerHTML = NEWSLETTER.thesisStats.map(t=>`
      <div class="thesis-tile">
        <div class="thesis-count">${t.count}</div>
        <div class="thesis-label">${t.label}</div>
      </div>
    `).join("");
  }

  /* ---------------- CALENDAR ---------------- */
  function renderCalendar(){
    const grid = $("#calendarGrid");
    const cal = CALENDAR_2026_09;
    let html = DOW.map(d=>`<div class="cal-dow">${d}</div>`).join("");

    for(let i=0;i<cal.startWeekday;i++){
      html += `<div class="cal-cell empty"></div>`;
    }

    const isTodayMonth = NOW.getFullYear()===2026 && NOW.getMonth()===8;

    for(let day=1; day<=cal.daysInMonth; day++){
      const ids = cal.deadlineDays[day];
      const isToday = isTodayMonth && NOW.getDate()===day;
      if(ids && ids.length){
        const grants = ids.map(id=>GRANTS.find(g=>g.id===id)).filter(Boolean);
        const iso = `2026-09-${String(day).padStart(2,"0")}`;
        const cls = urgencyClass(iso,false);
        const names = grants.map(g=>g.title).join(" · ");
        html += `
          <div class="cal-cell has-deadline ${cls} ${isToday?"today":""}" data-day="${day}">
            ${day}
            <span class="cal-count">${grants.length>1?grants.length:""}</span>
            <div class="cal-tooltip">${grants.length} deadline${grants.length>1?"s":""}: ${names}</div>
          </div>`;
      } else {
        html += `<div class="cal-cell ${isToday?"today":""}">${day}</div>`;
      }
    }
    grid.innerHTML = html;

    $$(".cal-cell.has-deadline", grid).forEach(cell=>{
      cell.addEventListener("click", ()=>{
        const day = cell.getAttribute("data-day");
        const ids = cal.deadlineDays[day];
        if(ids && ids.length) openModal(GRANTS.find(g=>g.id===ids[0]));
      });
    });
  }

  function renderDeadlineList(){
    const upcoming = GRANTS
      .filter(g=>g.deadline)
      .slice()
      .sort((a,b)=> new Date(a.deadline) - new Date(b.deadline));

    $("#deadlineList").innerHTML = upcoming.map(g=>{
      const dl = daysLeft(g.deadline);
      const cls = urgencyClass(g.deadline,false);
      const passed = dl < 0;
      return `
        <li class="deadline-item" data-id="${g.id}">
          <div class="dl-countdown ${cls}">
            <div class="num">${passed ? "—" : dl}</div>
            <div class="unit">${passed ? "closed" : (dl===1 ? "day" : "days")}</div>
          </div>
          <div class="dl-main">
            <div class="dl-title">${g.title}</div>
            <div class="dl-meta">${fmtDate(g.deadline)} &middot; ${g.agency}</div>
          </div>
          <span class="dl-badge badge-${g.category}">${CATEGORY_LABEL[g.category]}</span>
        </li>`;
    }).join("");

    $$(".deadline-item", $("#deadlineList")).forEach(item=>{
      item.addEventListener("click", ()=>{
        const g = GRANTS.find(x=>x.id===item.getAttribute("data-id"));
        if(g) openModal(g);
      });
    });
  }

  /* ---------------- GRANT CARDS ---------------- */
  function grantCardHTML(g){
    const cls = urgencyClass(g.deadline, g.noFixedDeadline);
    let deadlineLabel;
    if(g.noFixedDeadline){
      deadlineLabel = "No fixed deadline";
    } else {
      const dl = daysLeft(g.deadline);
      deadlineLabel = dl < 0 ? `Closed &middot; ${fmtDate(g.deadline)}` : `${dl} day${dl===1?"":"s"} left &middot; ${fmtDate(g.deadline)}`;
    }
    return `
      <article class="grant-card" data-id="${g.id}" tabindex="0">
        <div class="grant-card-top">
          <span class="grant-agency-chip">
            <span class="agency-avatar">${initials(g.agency)}</span>
            ${g.agency}
          </span>
        </div>
        <h3 class="grant-title">${g.title}</h3>
        <p class="grant-summary">${g.summary}</p>
        <p class="grant-fund"><strong>Funding:</strong> ${g.funding}</p>
        <div class="grant-card-foot">
          <span class="deadline-chip ${cls}">${deadlineLabel}</span>
          <span class="card-link">Details →</span>
        </div>
      </article>`;
  }

  function attachCardEvents(container){
    $$(".grant-card", container).forEach(card=>{
      const move = e=>{
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX-r.left)+"px");
        card.style.setProperty("--my", (e.clientY-r.top)+"px");
      };
      card.addEventListener("mousemove", move);
      const open = ()=>{
        const g = GRANTS.find(x=>x.id===card.getAttribute("data-id"));
        if(g) openModal(g);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", e=>{ if(e.key==="Enter") open(); });
    });
  }

  function renderGrantSections(){
    ["national","international","fellowship"].forEach(cat=>{
      const el = $(`#${cat==="fellowship"?"fellowship":cat}Grid`);
      const items = GRANTS.filter(g=>g.category===cat);
      el.innerHTML = items.map(grantCardHTML).join("");
      attachCardEvents(el);
    });
  }

  /* ---------------- MODAL ---------------- */
  function openModal(g){
    const cls = urgencyClass(g.deadline, g.noFixedDeadline);
    let deadlineLabel;
    if(g.noFixedDeadline){
      deadlineLabel = "No fixed deadline";
    } else {
      const dl = daysLeft(g.deadline);
      deadlineLabel = dl < 0 ? `Closed on ${fmtDate(g.deadline)}` : `${dl} day${dl===1?"":"s"} left &middot; closes ${fmtDate(g.deadline)}`;
    }
    $("#modalContent").innerHTML = `
      <div class="modal-cat">${CATEGORY_LABEL[g.category]}</div>
      <h3 class="modal-title">${g.title}</h3>
      <p class="modal-agency">${g.agency}</p>
      <div class="modal-block">
        <h4>Overview</h4>
        <p>${g.summary}</p>
      </div>
      <div class="modal-block">
        <h4>Thrust Areas</h4>
        <p>${g.thrust}</p>
      </div>
      <div class="modal-block">
        <h4>Funding Support</h4>
        <p>${g.funding}</p>
      </div>
      <div class="modal-footer">
        <span class="deadline-chip ${cls}">${deadlineLabel}</span>
        <a href="${g.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Official Call →</a>
      </div>
    `;
    $("#modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    $("#modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------------- ROLLING CALLS ---------------- */
  function renderRolling(view){
    const list = ROLLING_CALLS[view] || [];
    $("#rollingList").innerHTML = list.map(r=>`
      <div class="rolling-item">
        <div class="ri-agency">${r.agency}</div>
        <div class="ri-title">${r.title}</div>
        <p class="ri-summary">${r.summary}</p>
      </div>
    `).join("");
  }

  /* ---------------- SEARCH + FILTER ---------------- */
  let activeFilter = "all";
  let activeQuery = "";

  function applyFilters(){
    const q = activeQuery.trim().toLowerCase();
    let visible = 0;

    ["national","international","fellowship"].forEach(cat=>{
      const el = $(`#${cat}Grid`);
      const cards = $$(".grant-card", el);
      cards.forEach(card=>{
        const g = GRANTS.find(x=>x.id===card.getAttribute("data-id"));
        const matchesFilter = activeFilter==="all" || activeFilter===cat;
        const haystack = `${g.title} ${g.agency} ${g.thrust} ${g.summary}`.toLowerCase();
        const matchesQuery = !q || haystack.includes(q);
        const show = matchesFilter && matchesQuery;
        card.style.display = show ? "" : "none";
        if(show) visible++;
      });
      const section = el.closest(".grants-section");
      const anyVisible = $$(".grant-card", el).some(c=>c.style.display!=="none");
      section.style.display = (activeFilter==="all" || activeFilter===cat) ? "" : "none";
      if(activeFilter==="all" && q && !anyVisible){ section.style.display="none"; }
    });

    $("#resultsCount").textContent = q || activeFilter!=="all"
      ? `${visible} grant${visible===1?"":"s"} found`
      : `${GRANTS.length} grants total`;
  }

  function initToolbar(){
    const input = $("#searchInput");
    const clearBtn = $("#clearSearch");
    input.addEventListener("input", ()=>{
      activeQuery = input.value;
      clearBtn.hidden = !activeQuery;
      applyFilters();
    });
    clearBtn.addEventListener("click", ()=>{
      input.value = ""; activeQuery=""; clearBtn.hidden = true; applyFilters(); input.focus();
    });
    $$(".pill", $("#filterPills")).forEach(pill=>{
      pill.addEventListener("click", ()=>{
        $$(".pill", $("#filterPills")).forEach(p=>p.classList.remove("active"));
        pill.classList.add("active");
        activeFilter = pill.getAttribute("data-filter");
        applyFilters();
      });
    });
    applyFilters();
  }

  function initRollingTabs(){
    $$(".rolling-tab").forEach(tab=>{
      tab.addEventListener("click", ()=>{
        $$(".rolling-tab").forEach(t=>t.classList.remove("active"));
        tab.classList.add("active");
        renderRolling(tab.getAttribute("data-rolling"));
      });
    });
    renderRolling("national");
  }

  /* ---------------- NAV / HEADER ---------------- */
  function initNav(){
    const header = $("#siteHeader");
    const toggle = $("#navToggle");
    const nav = $("#mainNav");
    toggle.addEventListener("click", ()=>{
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$("#mainNav a").forEach(a=>{
      a.addEventListener("click", ()=> nav.classList.remove("open"));
    });

    const sections = $$("section[id]");
    const navLinks = $$("#mainNav a");

    function onScroll(){
      header.classList.toggle("scrolled", window.scrollY > 10);

      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      const pct = scrollHeight>0 ? (scrollTop/scrollHeight)*100 : 0;
      $("#scrollProgress").style.width = pct+"%";

      let current = null;
      sections.forEach(sec=>{
        const rect = sec.getBoundingClientRect();
        if(rect.top <= 140 && rect.bottom >= 140) current = sec.id;
      });
      navLinks.forEach(l=>{
        l.classList.toggle("active", l.getAttribute("href")===`#${current}`);
      });

      $$(".reveal").forEach(el=>{
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 80){ el.classList.add("in"); }
      });
    }
    document.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }

  function initToTop(){
    $("#toTop").addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
  }

  function initModal(){
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", e=>{
      if(e.target.id==="modalOverlay") closeModal();
    });
    document.addEventListener("keydown", e=>{
      if(e.key==="Escape") closeModal();
    });
  }

  function revealOnLoad(){
    requestAnimationFrame(()=>{
      $$(".reveal").forEach(el=>{
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 40){ el.classList.add("in"); }
      });
    });
  }

  function observeStatsOnce(){
    const el = $("#heroStats");
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ animateCounters(); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener("DOMContentLoaded", ()=>{
    renderHeroStats();
    renderLetter();
    renderCalendar();
    renderDeadlineList();
    renderGrantSections();
    initToolbar();
    initRollingTabs();
    initNav();
    initToTop();
    initModal();
    revealOnLoad();
    observeStatsOnce();
  });
})();
