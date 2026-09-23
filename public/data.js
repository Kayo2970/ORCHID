/* ORCHID Newsletter — Issue No. 27 | September 2026
   Office of Research & Innovation (ORI), M.S. Ramaiah University of Applied Sciences
   Structured content extracted from the source newsletter deck. */

const NEWSLETTER = {
  issue: "Issue 27",
  month: "September 2026",
  contactEmail: "Grants.research@msruas.ac.in",
  letter: {
    greeting: "Dear RUAS Researchers,",
    paragraphs: [
      "Greetings from the Office of Research & Innovation (ORI)!",
      "We are pleased to present the ORCHID Newsletter – Issue No. 27 (September 2026), featuring a wide range of national and international research grants, collaborative programs, fellowships, travel grants, awards, and rolling calls from leading funding agencies.",
      "This edition highlights opportunities from ANRF, ICMR, DST, ICSSR, BIRAC, CEFIPRA, AICTE, DBT, VGST, CSIR, iDEX, and other prestigious organizations across key research domains such as AI & Data Science, Healthcare & Biotechnology, Defence, Sustainability, Agriculture, and Social Sciences.",
      "With several major deadlines falling this month — including DBT BioCARe (23 Sep), multiple VGST schemes and the DBT T Cell Vaccines & Biologics Programme (25 Sep), and CSIR, ICMR-VDRL, CEFIPRA and iDEX calls (30 Sep) — we encourage all faculty members and research scholars to act early and submit competitive, high-quality research proposals. ORI remains committed to supporting researchers throughout the grant application process."
    ]
  },
  thesisStats: [
    { label: "Health Sciences", count: 49 },
    { label: "Data Science & Artificial Intelligence", count: 19 },
    { label: "Advanced Materials, Manufacturing & Nano-technology", count: 13 },
    { label: "Miscellaneous", count: 12 }
  ]
};

/* Each grant: id, title, category (national|international|fellowship), agency,
   summary, thrust, funding, deadline (ISO date or null), noFixedDeadline (bool), link */
const GRANTS = [
  // ---------------- NATIONAL RESEARCH GRANTS ----------------
  {
    id: "dbt-biocare",
    category: "national",
    title: "DBT – BioCARe Programme 2026–27",
    agency: "DBT",
    logo: "assets/logos/dbt.jpeg",
    summary: "Supports career development and re-orientation of women researchers in Biotechnology and allied areas, particularly those seeking to establish or advance their research careers.",
    thrust: "Animal & Marine Biotechnology, Bioengineering & Biomaterials, Medical Biotechnology, Environmental Biotechnology & Bioenergy, and Plant & Agricultural Biotechnology.",
    funding: "As per DBT BioCARe programme norms",
    deadline: "2026-09-23",
    link: "https://rcb.res.in/files/2026-08/call_for_application_under_dbt-biocare_for_2026-27.pdf"
  },
  {
    id: "vgst-gre",
    category: "national",
    title: "VGST – Grants for Research Excellence (GRE) 2026–27",
    agency: "KSTePS, Government of Karnataka",
    logo: "assets/logos/vgst-ksteps.png",
    summary: "Supports high-quality research in Science, Engineering and Medical Sciences by providing financial assistance to eligible researchers in Karnataka.",
    thrust: "Science & Technology, Engineering, Medical Sciences and interdisciplinary research.",
    funding: "Up to ₹40 lakh for 2 years for undertaking impactful research projects.",
    deadline: "2026-09-25",
    link: "https://vgstdst.karnataka.gov.in/uploads/Call%20for%20Proposals%202026-27_1788515985.pdf"
  },
  {
    id: "vgst-kfist",
    category: "national",
    title: "VGST – Karnataka Fund for Infrastructure Strengthening in Science & Technology (K-FIST)",
    agency: "KSTePS, Government of Karnataka",
    logo: "assets/logos/vgst-ksteps.png",
    summary: "Supports strengthening and upgrading research infrastructure and facilities in higher education and research institutions across Karnataka.",
    thrust: "Research infrastructure, advanced scientific equipment, laboratory strengthening and capacity building in Science, Technology, Engineering & allied disciplines.",
    funding: "Up to ₹20 lakh for 2 years",
    deadline: "2026-09-25",
    link: "https://vgstdst.karnataka.gov.in/uploads/Call%20for%20Proposals%202026-27_1788515985.pdf"
  },
  {
    id: "vgst-ecra",
    category: "national",
    title: "VGST – Early Career Research Award (ECRA) 2026–27",
    agency: "KSTePS, Government of Karnataka",
    logo: "assets/logos/vgst-ksteps.png",
    summary: "Provides financial support to higher educational institutions and research centres in Karnataka for creating or upgrading S&T-based infrastructure to strengthen education and research.",
    thrust: "Emerging and innovative research across Science, Technology, Engineering, Medical and allied disciplines.",
    funding: "Up to ₹10 lakh for 2 years",
    deadline: "2026-09-25",
    link: "https://vgstdst.karnataka.gov.in/uploads/Call%20for%20Proposals%202026-27_1788515985.pdf"
  },
  {
    id: "vgst-aorp",
    category: "national",
    title: "VGST – Award for Outstanding Research Publications (AORP) 2026–27",
    agency: "KSTePS, Government of Karnataka",
    logo: "assets/logos/vgst-ksteps.png",
    summary: "Recognizes outstanding peer-reviewed research publications by researchers in Karnataka and encourages high-quality research and scholarly contributions.",
    thrust: "High-quality research publications, scientific excellence and impactful scholarly contributions across Science, Technology, Engineering, Medical and allied disciplines.",
    funding: "₹25,000 cash award for an eligible outstanding research publication.",
    deadline: "2026-09-25",
    link: "https://vgstdst.karnataka.gov.in/uploads/Call%20for%20Proposals%202026-27_1788515985.pdf"
  },
  {
    id: "vgst-fdp",
    category: "national",
    title: "VGST – Faculty Development Program (FDP) 2026–27",
    agency: "KSTePS, Government of Karnataka",
    logo: "assets/logos/vgst-ksteps.png",
    summary: "Supports faculty training and capacity building through short-term workshops focused on emerging technologies and advancements in Science & Technology.",
    thrust: "Faculty development, emerging technologies, skill enhancement and research/teaching capacity building across relevant RUAS faculties.",
    funding: "₹3 lakh per 4-day workshop.",
    deadline: "2026-09-25",
    link: "https://vgstdst.karnataka.gov.in/uploads/Call%20for%20Proposals%202026-27_1788515985.pdf"
  },
  {
    id: "csir-emeritus",
    category: "national",
    title: "CSIR – Emeritus Scientist Scheme 2026",
    agency: "CSIR",
    logo: "assets/logos/csir.png",
    summary: "Provides support to eminent and superannuated scientists to continue active research in Science & Engineering through a host institution with appropriate research facilities.",
    thrust: "Animal Sciences & Biotechnology, Disaster Preparedness, Earth, Physical, Engineering, Chemical, Mathematical, Medical and Plant Sciences.",
    funding: "₹20,000/month Scientist Allowance + annual contingency grant + technical assistance through research fellows/associates.",
    deadline: "2026-09-30",
    link: "https://csirhrdg.res.in/SiteContent/ManagedContent/ATContent/Advertisement_for_Seeking_Research_Proposal_under__CSIR_Emeritus_Scientist_Scheme__20260903172320444.pdf"
  },
  {
    id: "icmr-vdrl",
    category: "national",
    title: "ICMR – Viral Research & Diagnosis Laboratories (VRDL) 2026",
    agency: "ICMR",
    logo: "assets/logos/icmr.png",
    summary: "Supports establishment/strengthening of Viral Research & Diagnosis Laboratories for viral disease diagnosis, surveillance, outbreak investigation and preparedness, and research on emerging and re-emerging viral infections.",
    thrust: "Viral disease diagnosis & surveillance, emerging/re-emerging viral infections, outbreak preparedness, infectious disease research and strengthening of viral diagnostic capacity.",
    funding: "Approx. ₹3.83 crore over 5 years, including ₹1.507 crore non-recurring and ₹46.4 lakh/year recurring support.",
    deadline: "2026-09-30",
    link: "https://www.icmr.gov.in/icmrobject/uploads/Call/1787297129_callforproposalforvrdl.pdf"
  },
  {
    id: "dbt-tcell",
    category: "national",
    title: "DBT – T Cell Vaccines & Biologics Research Programme 2026",
    agency: "DBT",
    logo: "assets/logos/dbt.jpeg",
    summary: "Supports research and development of T cell-based vaccines, biologics and engineered cellular therapies addressing major health challenges, including infectious diseases, cancer and autoimmune disorders.",
    thrust: "T cell-based vaccines, biologics, engineered cellular therapies, infectious diseases, cancer and autoimmune disorders.",
    funding: "Up to ₹15 crore per project",
    deadline: "2026-09-25",
    link: "https://dbt.gov.in/storage/media/kD4sCpy1loK6v13u8bhOdCHaJDCxTn0B1yzs1qRY.pdf"
  },
  {
    id: "dst-ncstc",
    category: "national",
    title: "DST–NCSTC – Call for Proposals on Science Communication & Popularization 2026",
    agency: "DST",
    logo: "assets/logos/dst.png",
    summary: "Supports projects that promote public understanding of science, STEM engagement, scientific literacy and innovative science communication.",
    thrust: "Samvaad (STEM student engagement), Science & Technology Communication Tools, Bhartiya Ganita Literacy, Children Science Congress, SciCom for Sustainable Future, Hands-on Science Programme, AI, robotics, quantum computing and semiconductors.",
    funding: "As per approved project budget",
    deadline: "2026-09-30",
    link: "https://onlinedst.gov.in/Projectproposalformat.aspx?Id=2344"
  },
  {
    id: "idex-open",
    category: "national",
    title: "iDEX – Open Challenge 2026",
    agency: "iDEX",
    logo: "assets/logos/idex.jpeg",
    summary: "Supports innovative defence and aerospace technologies developed by startups, innovators and MSMEs.",
    thrust: "AI, robotics, autonomous systems, advanced materials, intelligent machines, predictive technologies, rocket engines and other defence technologies.",
    funding: "Up to ₹1.5 Crore",
    deadline: "2026-09-30",
    link: "https://idex.gov.in/disc-category/18"
  },
  {
    id: "india-eu-ttc",
    category: "national",
    title: "India–EU TTC – Recycling of EV Batteries 2026",
    agency: "Ministry of Heavy Industries, Govt. of India",
    logo: "assets/logos/ministry-heavy-industries.jpeg",
    summary: "Supports India–EU collaborative projects on advanced EV battery recycling and circular economy technologies.",
    thrust: "EV battery recycling, material recovery, safe collection systems, digitalization, critical raw materials and pilot-scale recycling technologies.",
    funding: "Up to ₹65 crore per project from India",
    deadline: "2026-10-15",
    link: "https://www.indiascienceandtechnology.gov.in/announcementsopportunity/call-proposals-india-eu-ttc-call-recycling-ev-batteries"
  },
  {
    id: "anrf-pm-professorship",
    category: "national",
    title: "ANRF – Prime Minister Professorship",
    agency: "ANRF",
    logo: "assets/logos/anrf.jpeg",
    summary: "Supports distinguished senior scientists, researchers and industry professionals to provide research leadership and mentorship in Science & Technology, including Engineering, Agriculture, Medicine and S&T-linked Social Sciences.",
    thrust: "All areas of Science & Technology.",
    funding: "₹30 lakh/year fellowship + ₹24 lakh/year research grant + ₹1 lakh/year overheads for up to 5 years.",
    deadline: "2026-10-15",
    link: "https://www.anrfonline.in/ANRF/PMProfessorship_anrf?HomePage=New&utm"
  },
  {
    id: "steel-rd",
    category: "national",
    title: "Ministry of Steel – R&D Support for Iron & Steel Sector",
    agency: "Ministry of Steel, Govt. of India",
    logo: "assets/logos/ministry-steel.png",
    summary: "Supports academic institutions, research labs and steel companies to develop practical technologies and solutions for the iron & steel industry.",
    thrust: "Raw-material beneficiation, steel quality, waste utilization, energy efficiency, low-carbon technologies, GHG reduction, waste-heat recovery and innovative steel technologies.",
    funding: "Up to ₹5–10 crore",
    deadline: null,
    noFixedDeadline: true,
    link: "https://steel.gov.in/sites/default/files/2025-05/Scheme%20Guidelines%20%28Annexure-1%29%20Revised%20-%20May%202025.pdf"
  },

  // ---------------- INTERNATIONAL RESEARCH GRANTS ----------------
  {
    id: "cefipra",
    category: "international",
    title: "CEFIPRA – Industry-Academia R&D Programme 2026",
    agency: "CEFIPRA",
    logo: "assets/logos/cefipra.png",
    summary: "Supports Indo-French collaborative research between academic institutions and industry.",
    thrust: "AI & ML, healthcare, clean energy, smart mobility, agriculture, sustainable development and waste management.",
    funding: "Up to ₹2.44 Crores per project",
    deadline: "2026-09-30",
    link: "https://www.cefipra.org/PgmIA.aspx?p=IR"
  },
  {
    id: "biocodex-gut",
    category: "international",
    title: "Biocodex Microbiota Foundation – Gut Microbiota International Research Grant 2027",
    agency: "Biocodex Microbiota Foundation",
    logo: "assets/logos/biocodex.jpeg",
    summary: "Supports international research on gut microbiota and human disease, with the 2027 theme focusing on diet–microbiome interactions and immune function.",
    thrust: "Gut microbiome, microbiome analysis, immunophenotyping, diet–microbiome interactions and human disease; experimental validation is expected.",
    funding: "Up to ₹2.21 Crores per project",
    deadline: "2026-11-30",
    link: "https://www.biocodexmicrobiotafoundation.com/international-research-grant/international-call-projects"
  },
  {
    id: "biocodex-womens-health",
    category: "international",
    title: "Biocodex Microbiota Foundation – Microbiota & Women's Health International Grant 2027",
    agency: "Biocodex Microbiota Foundation",
    logo: "assets/logos/biocodex.jpeg",
    summary: "Supports international research on microbiota and women's health, with the 2027 theme focusing on male–female genital microbiome interactions and vaginal dysbiosis.",
    thrust: "Genital microbiome, vaginal dysbiosis/bacterial vaginosis, microbial transmission, penile microbiome, microbiome-based interventions and treatment recurrence.",
    funding: "Up to ₹2.21 Crores per project",
    deadline: "2027-01-15",
    link: "https://www.biocodexmicrobiotafoundation.com/international-research-grant/international-call-projects"
  },

  // ---------------- FELLOWSHIPS ----------------
  {
    id: "icgeb-smart",
    category: "fellowship",
    title: "ICGEB – Arturo Falaschi SMART Fellowship 2026",
    agency: "ICGEB",
    logo: "assets/logos/icgeb.png",
    summary: "Supports research training and mobility for young scientists in biotechnology and life sciences at ICGEB laboratories.",
    thrust: "Biotechnology, molecular biology, life sciences, infectious diseases, cancer, agriculture and related fields.",
    funding: "As per ICGEB provisions.",
    deadline: "2026-09-30",
    link: "https://www.icgeb.org/fellowships/arturo-falaschi-smart-fellowships-september-2026/"
  },
  {
    id: "icgeb-postdoc",
    category: "fellowship",
    title: "ICGEB – Arturo Falaschi Postdoctoral Fellowship",
    agency: "ICGEB",
    logo: "assets/logos/icgeb.png",
    summary: "Supports postdoctoral research in Life Sciences at ICGEB laboratories in India.",
    thrust: "Life Sciences, biotechnology, health, agriculture and related research areas.",
    funding: "As per ICGEB provisions.",
    deadline: "2026-09-30",
    link: "https://www.icgeb.org/fellowships/arturo-falaschi-postdoctoral-fellowships-september-2026/"
  },
  {
    id: "inqua",
    category: "fellowship",
    title: "INQUA Fellowship Programme 2026",
    agency: "INQUA",
    logo: "assets/logos/inqua.jpeg",
    summary: "Supports early-career researchers to gain international research experience in Quaternary Science.",
    thrust: "Climate change, palaeoclimate, geohazards, sediments, human evolution, environmental change and Quaternary research.",
    funding: "Up to ₹16.62 Lakhs for travel, accommodation and living expenses.",
    deadline: "2026-09-30",
    link: "https://www.inqua.org/projects-fellowships/fellowships"
  },
  {
    id: "aicte-apdf",
    category: "fellowship",
    title: "AICTE – Post-Doctoral Fellowship (APDF) 2025–26",
    agency: "AICTE",
    logo: "assets/logos/aicte.png",
    summary: "Supports full-time post-doctoral research in AICTE-approved Institutes/Universities.",
    thrust: "Engineering, Management, Design, Applied Sciences, Planning, Computer Applications, Interdisciplinary areas and related fields.",
    funding: "As per AICTE APDF guidelines.",
    deadline: "2026-10-20",
    link: "https://aicte.gov.in/sites/default/files/Notification%202025-26%20%281%29.pdf"
  }
];

/* Rolling calls — schemes open throughout the year (no fixed deadline, no link supplied) */
const ROLLING_CALLS = {
  national: [
    { title: "BRNS | Research Grant Scheme", agency: "BRNS", summary: "Supports research projects aligned with the programmes of the Department of Atomic Energy (DAE), generally undertaken in collaboration with a DAE unit." },
    { title: "BRNS | Young Scientist Research Programme (YSRP)", agency: "BRNS", summary: "Supports young researchers undertaking innovative research in areas relevant to DAE programmes and national priorities." },
    { title: "DRDO | Aeronautics Research & Development Board (ARDB) Grant", agency: "DRDO", summary: "Supports academic research and development in aeronautics and related technologies of strategic importance to India." },
    { title: "DRDO | Life Sciences Research Board (LSRB) Grant", agency: "DRDO", summary: "Supports research in life sciences, biomedical devices, soldier health, biotechnology, extreme-environment physiology, food and agriculture." },
    { title: "DRDO | Naval Research Board (NRB) Grant", agency: "DRDO", summary: "Supports research addressing emerging technologies and future security requirements of the Indian Navy." },
    { title: "DRDO | Armament Research Board (ARMREB) Grant", agency: "DRDO", summary: "Provides research support for development of innovative technologies related to armaments and defence applications." },
    { title: "AERB | Safety Research Programme", agency: "AERB", summary: "Supports research focused on nuclear and radiation safety, helping strengthen safety assessment, regulation and protection practices." },
    { title: "Ministry of Coal | S&T Programme for Research", agency: "Ministry of Coal", summary: "Supports short-duration, application-oriented R&D projects addressing technological challenges and commercial applications in the coal sector." },
    { title: "MoWR/CGWB | R&D Programme in Water Sector", agency: "MoWR / CGWB", summary: "Promotes research and innovation in water resources engineering, groundwater management and related water-sector challenges." },
    { title: "MoFPI | Research & Development in Food Processing Sector", agency: "MoFPI", summary: "Supports demand-driven R&D projects aimed at technological development and innovation in the food-processing sector." },
    { title: "DSIR | Technology Development & Utilization Programme for Women (TDUPW)", agency: "DSIR", summary: "Supports women-focused technology development and utilization projects, particularly technologies addressing societal needs and strengthening technology capabilities." },
    { title: "ANRF | National Post Doctoral Fellowship (N-PDF)", agency: "ANRF", summary: "Supports motivated young researchers in frontier areas of science and engineering to develop independent research capabilities under an experienced mentor." },
    { title: "SERB/ANRF | Prime Minister's Fellowship for Doctoral Research", agency: "SERB / ANRF", summary: "Supports full-time PhD scholars working in industry-relevant and nationally important areas of Science, Technology, Engineering, Agriculture and Medicine." },
    { title: "DST | WISE-PhD Programme", agency: "DST", summary: "Provides research fellowship support to women pursuing PhD programmes in basic and applied sciences." },
    { title: "DST | WISE-SCOPE Fellowship", agency: "DST", summary: "Supports women scientists with PhDs to undertake science and technology projects addressing grassroots and societal challenges." },
    { title: "DST | WIDUSHI Programme", agency: "DST", summary: "Supports senior women scientists, including those nearing retirement or retired, to undertake interdisciplinary research in science and technology." },
    { title: "DST | National Postdoctoral Fellowship in Nano Science & Technology", agency: "DST", summary: "Supports talented researchers undertaking advanced postdoctoral research in nanoscience, nanotechnology and their applications." }
  ],
  international: [
    { title: "IGSTC | WISER – Women Involvement in Science and Engineering Research", agency: "IGSTC", summary: "Supports women researchers from India and Germany to participate in collaborative R&D projects and strengthen bilateral research networks." },
    { title: "IGSTC | Small Immediate Need Grants (SING)", agency: "IGSTC", summary: "Supports motivated young researchers in frontier areas of science and engineering to develop independent research capabilities under an experienced mentor." },
    { title: "IGSTC | Seed Funding", agency: "IGSTC", summary: "Provides early-stage support for India–Germany collaborative ideas involving innovation, rapid prototyping, technology development and industrial R&D." },
    { title: "DST–DFG | International Research Training Groups (IRTG)", agency: "DST / DFG", summary: "Promotes long-term India–Germany scientific collaboration through joint research programmes and structured training for researchers." },
    { title: "Open Technology Fund | Internet Freedom Fund", agency: "Open Technology Fund", summary: "Supports technology and research initiatives promoting internet freedom, open access, digital rights and human rights." },
    { title: "Waitt Foundation | Rapid Ocean Conservation Grants", agency: "Waitt Foundation", summary: "Provides small, rapid-response grants for innovative solutions addressing emerging marine conservation and ocean-protection challenges." },
    { title: "The Habitats Trust | THT Seed Grant", agency: "The Habitats Trust", summary: "Supports conservation initiatives addressing critical gaps in biodiversity protection, particularly projects involving lesser-known species and habitats." },
    { title: "Nestlé Foundation | Training Grant for Research", agency: "Nestlé Foundation", summary: "Supports small-scale research and training projects, including MSc and PhD thesis work, in public health and nutrition." },
    { title: "Nestlé Foundation | Pilot Grant", agency: "Nestlé Foundation", summary: "Supports pilot research in public health and nutrition with potential to develop into larger research projects." },
    { title: "Nestlé Foundation | Small Research Grant", agency: "Nestlé Foundation", summary: "Provides financial support for small-scale research studies addressing public health and nutrition-related questions." },
    { title: "Nestlé Foundation | Large Research Grant", agency: "Nestlé Foundation", summary: "Supports larger, substantial research projects in public health and nutrition with potential for significant scientific and societal impact." },
    { title: "Alexander von Humboldt Foundation | Research Fellowship", agency: "Alexander von Humboldt Foundation", summary: "Supports postdoctoral and experienced researchers of various disciplines to conduct independent research in collaboration with a host institution in Germany." },
    { title: "DFG | Walter Benjamin Programme", agency: "DFG", summary: "Enables postdoctoral researchers to independently pursue their own research project at a research institution of their choice, including opportunities abroad." },
    { title: "DAAD | Research Scholarships / Fellowships", agency: "DAAD", summary: "Provides funding opportunities for international students and researchers to undertake postgraduate study, doctoral research or research stays in Germany." },
    { title: "Swiss Government Excellence Scholarships", agency: "Swiss Confederation", summary: "Supports international researchers and postgraduate scholars undertaking research, doctoral or postdoctoral opportunities in Switzerland." }
  ]
};

/* September 2026 deadline map for the calendar widget: day -> list of grant ids */
const CALENDAR_2026_09 = {
  startWeekday: 2, // 0=Sun ... Tuesday 1 Sep 2026
  daysInMonth: 30,
  deadlineDays: {
    23: ["dbt-biocare"],
    25: ["vgst-gre", "vgst-kfist", "vgst-ecra", "vgst-aorp", "vgst-fdp", "dbt-tcell"],
    30: ["csir-emeritus", "icmr-vdrl", "dst-ncstc", "idex-open", "cefipra", "icgeb-smart", "icgeb-postdoc", "inqua"]
  }
};
