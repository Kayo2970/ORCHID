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

  const CATEGORY_LABEL = { national:"National", international:"International", fellowship:"Fellowship", student:"UG & PG Students" };

  function agencyBadgeHTML(g, extraClass){
    const cls = extraClass ? `agency-logo ${extraClass}` : "agency-logo";
    if(g.logo){
      return `<span class="${cls}"><img src="${g.logo}" alt="${g.agency} logo" loading="lazy"></span>`;
    }
    const avatarCls = extraClass ? `agency-avatar ${extraClass}` : "agency-avatar";
    return `<span class="${avatarCls}">${initials(g.agency)}</span>`;
  }

  /* ---------------- HERO STATS ---------------- */
  function renderHeroStats(){
    const national = GRANTS.filter(g=>g.category==="national").length;
    const intl = GRANTS.filter(g=>g.category==="international").length;
    const fellow = GRANTS.filter(g=>g.category==="fellowship").length;
    const student = GRANTS.filter(g=>g.category==="student").length;
    const rolling = ROLLING_CALLS.national.length + ROLLING_CALLS.international.length;
    const stats = [
      { num: national, label: "National Grants" },
      { num: student, label: "UG & PG Grants" },
      { num: fellow, label: "Fellowships" },
      { num: intl, label: "International Grants" },
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
    const cal = CALENDAR;
    let html = DOW.map(d=>`<div class="cal-dow">${d}</div>`).join("");

    for(let i=0;i<cal.startWeekday;i++){
      html += `<div class="cal-cell empty"></div>`;
    }

    const isTodayMonth = NOW.getFullYear()===cal.year && NOW.getMonth()===cal.month;

    for(let day=1; day<=cal.daysInMonth; day++){
      const ids = cal.deadlineDays[day];
      const isToday = isTodayMonth && NOW.getDate()===day;
      if(ids && ids.length){
        const grants = ids.map(id=>GRANTS.find(g=>g.id===id)).filter(Boolean);
        const iso = `${cal.year}-${String(cal.month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
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
      cell.setAttribute("tabindex","0");
      cell.setAttribute("role","button");
      const act = ()=>{
        const day = cell.getAttribute("data-day");
        const ids = cal.deadlineDays[day];
        if(!ids || !ids.length) return;
        if(ids.length===1){ openModal(GRANTS.find(g=>g.id===ids[0])); return; }
        $$(".cal-cell.selected", grid).forEach(c=>c.classList.remove("selected"));
        cell.classList.add("selected");
        highlightDeadlines(ids, `${day} ${cal.label.split(" ")[0]}`);
      };
      cell.addEventListener("click", act);
      cell.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); act(); } });
    });
  }

  function renderDeadlineList(){
    const dated = GRANTS
      .filter(g=>g.deadline)
      .sort((a,b)=> new Date(a.deadline) - new Date(b.deadline));
    const undated = GRANTS.filter(g=>!g.deadline);
    const upcoming = dated.concat(undated);

    $("#deadlineList").innerHTML = upcoming.map(g=>{
      const hasDate = !!g.deadline;
      const dl = hasDate ? daysLeft(g.deadline) : null;
      const cls = hasDate ? urgencyClass(g.deadline,false) : "open";
      const passed = hasDate && dl < 0;
      const num = !hasDate ? (g.upcoming ? "Soon" : "Open") : (passed ? "—" : dl);
      const unit = !hasDate ? (g.upcoming ? "upcoming" : "all year") : (passed ? "closed" : (dl===1 ? "day" : "days"));
      const meta = hasDate ? fmtDate(g.deadline) : (g.upcoming ? "Upcoming call" : "Open throughout the year");
      return `
        <li class="deadline-item" data-id="${g.id}" tabindex="0" role="button">
          <div class="dl-countdown ${cls} ${hasDate?"":"pending"}">
            <div class="num">${num}</div>
            <div class="unit">${unit}</div>
          </div>
          <div class="dl-main">
            <div class="dl-title" title="${g.title.replace(/"/g,"&quot;")}">${g.title}</div>
            <div class="dl-meta">${meta} &middot; ${g.agency}</div>
          </div>
          <span class="dl-badge badge-${g.category}">${CATEGORY_LABEL[g.category]}</span>
        </li>`;
    }).join("");

    $$(".deadline-item", $("#deadlineList")).forEach(item=>{
      const open = ()=>{
        const g = GRANTS.find(x=>x.id===item.getAttribute("data-id"));
        if(g) openModal(g);
      };
      item.addEventListener("click", open);
      item.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });
    });
  }

  function highlightDeadlines(ids, label){
    const list = $("#deadlineList");
    clearHighlight(true);
    const note = document.createElement("div");
    note.className = "deadline-filter-note";
    note.id = "deadlineNote";
    note.innerHTML = `<span>${ids.length} deadlines on ${label}</span><button type="button">Show all</button>`;
    list.parentNode.insertBefore(note, list);
    note.querySelector("button").addEventListener("click", ()=> clearHighlight(false));
    let first = null;
    $$(".deadline-item", list).forEach(it=>{
      const hit = ids.includes(it.getAttribute("data-id"));
      it.classList.toggle("is-highlighted", hit);
      if(hit){
        if(!first) first = it;
        list.insertBefore(it, list.querySelector(".deadline-item:not(.is-highlighted)") || null);
      }
    });
    list.scrollTop = 0;
    if(first && window.matchMedia("(max-width:900px)").matches){
      list.scrollIntoView({behavior:"smooth", block:"center"});
    }
  }
  function clearHighlight(keepOrder){
    const note = $("#deadlineNote");
    if(note) note.remove();
    $$(".cal-cell.selected").forEach(c=>c.classList.remove("selected"));
    if(keepOrder) { $$(".deadline-item.is-highlighted").forEach(i=>i.classList.remove("is-highlighted")); return; }
    renderDeadlineList();
  }

  /* ---------------- GRANT CARDS ---------------- */
  function grantCardHTML(g){
    const cls = urgencyClass(g.deadline, g.noFixedDeadline);
    let deadlineLabel;
    if(g.noFixedDeadline){
      deadlineLabel = "Open throughout the year";
    } else if(g.upcoming){
      deadlineLabel = "Upcoming call";
    } else {
      const dl = daysLeft(g.deadline);
      deadlineLabel = dl < 0 ? `Closed &middot; ${fmtDate(g.deadline)}` : `${dl} day${dl===1?"":"s"} left &middot; ${fmtDate(g.deadline)}`;
    }
    return `
      <article class="grant-card" data-id="${g.id}" tabindex="0">
        <div class="grant-card-top">
          <span class="grant-agency-chip">
            ${agencyBadgeHTML(g)}
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
      card.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });
    });
  }

  function renderGrantSections(){
    ["national","student","fellowship","international"].forEach(cat=>{
      const el = $(`#${cat}Grid`);
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
      deadlineLabel = "Open throughout the year";
    } else if(g.upcoming){
      deadlineLabel = "Upcoming call";
    } else {
      const dl = daysLeft(g.deadline);
      deadlineLabel = dl < 0 ? `Closed on ${fmtDate(g.deadline)}` : `${dl} day${dl===1?"":"s"} left &middot; closes ${fmtDate(g.deadline)}`;
    }
    $("#modalContent").innerHTML = `
      <div class="modal-header">
        ${agencyBadgeHTML(g, "lg")}
        <div class="modal-header-text">
          <div class="modal-cat">${CATEGORY_LABEL[g.category]}</div>
          <h3 class="modal-title">${g.title}</h3>
          <p class="modal-agency">${g.agency}</p>
        </div>
      </div>
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
        ${g.link ? `<a href="${g.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Official Call →</a>` : ""}
      </div>
    `;
    lastFocus = document.activeElement;
    $("#modalCard").setAttribute("aria-labelledby","modalTitleText");
    const t = $(".modal-title", $("#modalContent")); if(t) t.id = "modalTitleText";
    $("#modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }
  let lastFocus = null;
  function closeModal(){
    const ov = $("#modalOverlay");
    if(!ov.classList.contains("open")) return;
    ov.classList.remove("open");
    document.body.style.overflow = "";
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------------- ROLLING CALLS ---------------- */
  let rollingView = "national", rollingQuery = "", rollingAgency = "";
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  function rollingMatches(r, q){
    return !q || `${r.title} ${r.agency} ${r.summary}`.toLowerCase().includes(q);
  }
  function setRollingTab(view){
    rollingView = view;
    $$(".rolling-tab").forEach(t=>{
      const on = t.getAttribute("data-rolling")===view;
      t.classList.toggle("active", on); t.setAttribute("aria-selected", on?"true":"false");
    });
  }
  function renderRolling(){
    const q = rollingQuery.trim().toLowerCase();
    // tab counts for the current search
    $$(".rolling-tab").forEach(t=>{
      const v = t.getAttribute("data-rolling");
      const n = ROLLING_CALLS[v].filter(r=>rollingMatches(r,q)).length;
      let c = $(".rt-count", t);
      if(!c){ c = document.createElement("span"); c.className="rt-count"; t.appendChild(c); }
      c.textContent = n;
    });
    // if the current tab has no match but the other one does, jump to it
    if(q && !ROLLING_CALLS[rollingView].some(r=>rollingMatches(r,q))){
      const other = rollingView==="national" ? "international" : "national";
      if(ROLLING_CALLS[other].some(r=>rollingMatches(r,q))) setRollingTab(other);
    }
    const base = ROLLING_CALLS[rollingView].filter(r=>rollingMatches(r,q));
    // agency index (chips) for the current tab + search
    const counts = {};
    base.forEach(r=>{ counts[r.agency] = (counts[r.agency]||0)+1; });
    if(rollingAgency && !counts[rollingAgency]) rollingAgency = "";
    const names = Object.keys(counts).sort((x,y)=>x.localeCompare(y));
    $("#rollingIndex").innerHTML = names.length>1 ? names.map(n=>
      `<button type="button" class="ri-chip ${n===rollingAgency?"active":""}" data-agency="${esc(n)}" aria-pressed="${n===rollingAgency}">${n} <span>${counts[n]}</span></button>`
    ).join("") : "";
    $$(".ri-chip", $("#rollingIndex")).forEach(b=>b.addEventListener("click", ()=>{
      const ag = b.getAttribute("data-agency");
      rollingAgency = rollingAgency===ag ? "" : ag;
      renderRolling();
    }));
    const list = base.filter(r=>!rollingAgency || r.agency===rollingAgency);
    $("#rollingCount").textContent = (q||rollingAgency)
      ? `${list.length} scheme${list.length===1?"":"s"} found`
      : `${base.length} schemes`;
    $("#rollingList").innerHTML = list.length ? list.map(r=>`
      <div class="rolling-item">
        <div class="ri-head">${agencyBadgeHTML(r)}<div class="ri-agency">${r.agency}</div></div>
        <div class="ri-title">${r.title}</div>
        <p class="ri-summary">${r.summary}</p>
        ${r.link ? `<a class="ri-link" href="${r.link}" target="_blank" rel="noopener noreferrer">Official page →</a>` : ""}
      </div>
    `).join("") : `<div class="section-empty">No schemes match your search. Try another keyword or clear the search.</div>`;
  }

  /* ---------------- SEARCH + FILTER ---------------- */
  let activeFilter = "all";
  let activeQuery = "";

  function applyFilters(){
    const q = activeQuery.trim().toLowerCase();
    let visible = 0;

    ["national","student","fellowship","international"].forEach(cat=>{
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
      let empty = $(".section-empty", el);
      if(!anyVisible && activeFilter===cat){
        if(!empty){ empty = document.createElement("div"); empty.className="section-empty"; el.appendChild(empty); }
        empty.textContent = "No grants in this section match your search.";
      } else if(empty){ empty.remove(); }
    });

    let globalEmpty = $("#globalEmpty");
    if(visible===0 && activeFilter==="all"){
      if(!globalEmpty){
        globalEmpty = document.createElement("div");
        globalEmpty.id = "globalEmpty"; globalEmpty.className = "global-empty wrap";
        globalEmpty.innerHTML = `<h3>No grants found</h3><p>Try a different keyword, or browse everything.</p><button type="button" class="btn btn-primary" id="resetSearch">Clear search</button>`;
        $("#toolbarSection").after(globalEmpty);
        $("#resetSearch").addEventListener("click", ()=> $("#clearSearch").click());
      }
    } else if(globalEmpty){ globalEmpty.remove(); }

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
    // Fallback pills (rendered only inside <noscript>, i.e. when the
    // RubberSegment React island can't mount) still work if present.
    $$(".pill", $("#filterPills")).forEach(pill=>{
      pill.addEventListener("click", ()=>{
        $$(".pill", $("#filterPills")).forEach(p=>p.classList.remove("active"));
        pill.classList.add("active");
        activeFilter = pill.getAttribute("data-filter");
        applyFilters();
      });
    });
    window.ORCHID = window.ORCHID || {};
    window.ORCHID.setFilter = filterValue => {
      activeFilter = filterValue;
      applyFilters();
    };
    applyFilters();
  }

  function initRollingTabs(){
    $$(".rolling-tab").forEach(tab=>{
      tab.addEventListener("click", ()=>{
        setRollingTab(tab.getAttribute("data-rolling"));
        rollingAgency = "";
        renderRolling();
      });
    });
    const input = $("#rollingSearch"), clear = $("#rollingClear");
    input.addEventListener("input", ()=>{
      rollingQuery = input.value; rollingAgency = ""; clear.hidden = !rollingQuery; renderRolling();
    });
    clear.addEventListener("click", ()=>{
      input.value = ""; rollingQuery = ""; rollingAgency = ""; clear.hidden = true; renderRolling(); input.focus();
    });
    renderRolling();
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
