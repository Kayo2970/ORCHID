/* ORCHID Newsletter — Issue No. 29 | November 2026
   Office of Research & Innovation (ORI), M.S. Ramaiah University of Applied Sciences
   Structured content extracted from the source newsletter deck. */

const NEWSLETTER = {
  issue: "Issue 29",
  month: "November 2026",
  contactEmail: "Grants.research@msruas.ac.in",
  letter: {
    greeting: "Dear RUAS Researchers,",
    paragraphs: [
      "Welcome to the November 2026 issue of ORCHID, the Grants & Fellowships Newsletter of the Office of Research & Innovation (ORI). This issue brings together national, international and fellowship opportunities, along with schemes that remain open throughout the year, so that you can plan your proposals well in advance.",
      "November is a busy month for funding deadlines. The ANRF Inclusivity Research Grant (03-Nov), the Amazon Research Awards and the WCRF INSPIRE Research Challenge (both 04-Nov) close early in the month, followed by the ICMR Centres for Advanced Research under NIRMAN–AT (13-Nov). Several important calls then close on 30-Nov, including the ICMR First in the World Challenge Grants, the IndiaAI fellowships, the KSCST Student Project Programme, the Science Academies Summer Research Fellowship Programme and the Syngene Early Career Research Awards.",
      "Our UG and PG students are warmly encouraged to explore the KSCST, Science Academies and IndiaAI student opportunities, while faculty and research scholars will find calls spread across Health Sciences, Advanced Materials & Nano-technology, and Data Science & Artificial Intelligence. The cover page maps the live calls to these thrust areas so that you can quickly find what matches your work. The ANRF AI for Science and Engineering Mission is listed as an upcoming call, and early planning of collaborations is advised.",
      "Please read the full guidelines, eligibility conditions and deadlines on the official page of each agency through the links provided. For any assistance with your proposals, write to us at Grants.research@msruas.ac.in. Let us keep innovating and applying. Wishing you a productive and rewarding month ahead."
    ]
  },
  thesisStats: [
    { label: "Health Sciences", count: 4 },
    { label: "Data Science & Artificial Intelligence", count: 4 },
    { label: "Advanced Materials & Nano-technology", count: 3 },
    { label: "Miscellaneous", count: 4 }
  ]
};

/* Each grant: id, title, category (national|student|fellowship|international), agency,
   summary, thrust, funding, deadline (ISO date or null), noFixedDeadline (bool), upcoming (bool), link */
const GRANTS = [
  // ---------------- NATIONAL RESEARCH GRANTS ----------------
  {
    id: "anrf-irg", category: "national",
    title: "ANRF – Inclusivity Research Grant (IRG) 2026", agency: "ANRF", logo: "assets/logos/anrf.jpeg",
    summary: "The Anusandhan National Research Foundation (ANRF), Government of India, invites research proposals from eligible researchers belonging to Scheduled Caste (SC) and Scheduled Tribe (ST) categories to undertake innovative research in Science and Engineering.",
    thrust: "All areas of Science and Engineering, including frontier research, interdisciplinary science, engineering and technology.",
    funding: "Up to ₹60 lakh plus overhead charges for a maximum period of 3 years.",
    deadline: "2026-11-03", link: "https://anrfonline.in/ANRF/inrg_anrf"
  },
  {
    id: "icssr-senior", category: "national",
    title: "ICSSR – Senior Fellowship Grant 2026–27 (Second Call)", agency: "ICSSR", logo: "assets/logos/icssr.png",
    summary: "The Indian Council of Social Science Research (ICSSR), Government of India, invites applications from eligible senior Indian researchers to undertake full-time research contributing to national development and evidence-based solutions to social challenges.",
    thrust: "Social Sciences and allied disciplines, including economics, sociology, political science, public administration, education, law, gender studies, social inclusion, heritage and interdisciplinary research.",
    funding: "₹45,000 per month, plus a contingency grant of ₹40,000 per annum for 2 years.",
    deadline: "2026-11-20", link: "https://www.icssr.org/index.php/hi/node/701?"
  },
  {
    id: "icmr-car", category: "national",
    title: "ICMR – Centres for Advanced Research (CAR) under NIRMAN–AT 2026", agency: "ICMR", logo: "assets/logos/icmr.png",
    summary: "The Indian Council of Medical Research (ICMR) invites research proposals to establish advanced research centres for developing, evaluating and translating affordable assistive technologies for persons with disabilities and functional limitations.",
    thrust: "Mobility aids, prosthetics and orthotics, vision and hearing aids, communication technologies, self-care devices, fall prevention, safety and independent living.",
    funding: "Up to ₹15 crore per centre for a maximum period of 5 years.",
    deadline: "2026-11-13", link: "https://www.icmr.gov.in/icmrobject/uploads/Call/1791972387_carassistivetechcall_v2.pdf"
  },
  {
    id: "mines-st", category: "national",
    title: "Ministry of Mines, Government of India – Science & Technology (S&T) R&D Scheme 2026", agency: "Ministry of Mines, Govt. of India", logo: "assets/logos/ministry-mines.jpeg",
    summary: "The Ministry of Mines invites research proposals from eligible universities, academic institutions, national institutes and recognised R&D institutions to promote scientific research and technological innovation in mining, mineral processing and metallurgy.",
    thrust: "Critical and rare-earth minerals, mineral exploration, sustainable mining, mineral beneficiation, metallurgy, advanced materials, recycling and recovery of valuable metals from industrial waste, green technologies and decarbonisation.",
    funding: "Project-based financial assistance as per the Ministry of Mines' S&T-R&D scheme guidelines and approved project requirements.",
    deadline: "2026-11-21", link: "https://mines.gov.in"
  },
  {
    id: "drdo-dftm", category: "national",
    title: "DRDO – DFTM Call for Research Proposals under DIA-CoEs 2026", agency: "DRDO", logo: "assets/logos/drdo.png",
    summary: "The Defence Research and Development Organisation (DRDO), through its Directorate of Futuristic Technology Management (DFTM), invites research proposals from academia and national research institutes to address identified defence research problems through multidisciplinary and collaborative research.",
    thrust: "Stealth and aerospace technologies, navigation systems, radar, advanced materials, quantum-dot infrared detectors, FPGA technology, electronic systems, induction motors and defence power sources.",
    funding: "Project-based funding as per DRDO/DIA-CoE guidelines.",
    deadline: "2026-12-31", link: "https://drdo.gov.in/drdo/en/announcement/call-proposals-dftm-invites-research-proposals-research-problems-dia-coes"
  },
  {
    id: "icmr-fiw", category: "national",
    title: "ICMR – First in the World (FiW) Challenge Grants 2026", agency: "ICMR", logo: "assets/logos/icmr.png",
    summary: "The Indian Council of Medical Research (ICMR), Government of India, invites innovative, high-risk research proposals aimed at developing biomedical breakthroughs that are genuinely new at the global level.",
    thrust: "Novel diagnostics, vaccines, therapeutics, medical devices, biomedical technologies, digital health, and other innovative healthcare solutions.",
    funding: "Stage-wise funding of up to ₹1 crore for Proof of Concept, ₹4 crore for Prototype Development, and ₹8 crore for Final Product/Model Development.",
    deadline: "2026-11-30", link: "https://www.icmr.gov.in/icmrobject/uploads/Call/1790846907_call_fiw_2026.pdf"
  },
  {
    id: "anrf-aise", category: "national",
    title: "ANRF – AI for Science and Engineering (AI-SE) Mission 2026", agency: "ANRF", logo: "assets/logos/anrf.jpeg",
    summary: "The Anusandhan National Research Foundation (ANRF), Government of India, invites collaborative research proposals integrating Artificial Intelligence (AI) with scientific and engineering disciplines to accelerate discoveries, develop innovative technologies and address complex research challenges.",
    thrust: "AI for Science and Science of AI; AI for Engineering and Advanced Materials; AI for Earth, Atmosphere and Ocean Sciences; and AI for Bio and Life Sciences, including AI-driven drug discovery, healthcare, robotics, semiconductor design, renewable energy and agriculture.",
    funding: "Up to ₹30 crore for 3 years; exceptionally, funding up to ₹50 crore may be considered, subject to the call guidelines.",
    deadline: null, upcoming: true, link: "https://anrfonline.in/ANRF/aise_anrf"
  },

  // ---------------- UG & PG STUDENTS GRANTS ----------------
  {
    id: "kscst-spp", category: "student",
    title: "KSCST – Student Project Programme (SPP), 50th Series 2026–27", agency: "KSCST", logo: "assets/logos/kscst.jpeg",
    summary: "The Karnataka State Council for Science and Technology (KSCST), Bengaluru, invites project proposals from final-year students to support innovative, practical research addressing real-world challenges and regional development needs.",
    thrust: "Science, Engineering and Technology, Agriculture, Environmental Sustainability, Healthcare, Rural Development, Artificial Intelligence, Renewable Energy and other themes specified in the official call.",
    funding: "As per Guidelines",
    deadline: "2026-11-30", link: "https://www.kscst.org.in/spp/50_series/50S_SPP_Poster_Proposal_Format_Guidelines/02_SPP_50_Series_Guidelines_for_submission_of_project_proposals.pdf"
  },
  {
    id: "srfp-2027", category: "student",
    title: "Science Academies – Summer Research Fellowship Programme (SRFP) 2027", agency: "Science Academies (IASc, INSA, NASI)", logo: "assets/logos/science-academies.jpeg",
    summary: "The Indian Academy of Sciences (IASc), Bengaluru, in collaboration with the Indian National Science Academy (INSA), New Delhi, and the National Academy of Sciences, India (NASI), Prayagraj, invites applications from eligible students and college/university teachers to undertake a two-month research project under scientists associated with the three academies.",
    thrust: "Biological Sciences, Chemical Sciences, Physical Sciences, Mathematical Sciences, Engineering, Environmental Sciences and interdisciplinary research, depending on the available research guides and projects.",
    funding: "Monthly fellowship to meet living expenses at the research location, along with eligible round-trip train fare.",
    deadline: "2026-11-30", link: "https://www.ias.ac.in/public/Resources/News/SRFP2027_Announcement.pdf"
  },
  {
    id: "indiaai-ugpg", category: "student",
    title: "IndiaAI – Fellowship for Undergraduate (UG) and Postgraduate (PG) Students 2026–27", agency: "IndiaAI, MeitY", logo: "assets/logos/indiaai.jpeg",
    summary: "IndiaAI, under the Ministry of Electronics and Information Technology (MeitY), GOI, invites eligible UG and PG students to undertake research projects in Artificial Intelligence (AI) and related fields. The fellowship supports innovative student research and practical AI applications across academic disciplines.",
    thrust: "Artificial Intelligence, Machine Learning, Deep Learning, Data Science, Natural Language Processing, Computer Vision, Robotics, AI in Healthcare, Agriculture, Engineering, Business and other AI-related interdisciplinary applications.",
    funding: "UG students: up to ₹1 lakh for the eligible project; PG students: up to ₹2 lakh for the eligible programme; additional support of up to ₹1 lakh for eligible international AI conference travel and accommodation, subject to scheme guidelines.",
    deadline: "2026-11-30", link: "https://fellowship.indiaai.gov.in/formats/Updated_Guidelines_IndiaAI_Fellowship_010725.pdf"
  },

  // ---------------- FELLOWSHIP & AWARDS ----------------
  {
    id: "anrf-ramanujan", category: "fellowship",
    title: "ANRF – Ramanujan Fellowship 2026", agency: "ANRF", logo: "assets/logos/anrf.jpeg",
    summary: "The Anusandhan National Research Foundation (ANRF), Government of India, invites nominations from outstanding Indian and Indian-origin scientists and engineers working abroad who wish to return to India and pursue advanced research at eligible Indian academic and research institutions.",
    thrust: "All areas of Science, Engineering and Technology, including interdisciplinary and emerging research areas.",
    funding: "₹1,35,000 per month as fellowship, ₹7 lakh per annum as research grant, and ₹60,000 per annum as institutional overheads, for a maximum period of 5 years.",
    deadline: "2026-12-31", link: "https://anrfonline.in/ANRF/Ramanujan_fellowship"
  },
  {
    id: "syngene-ecra", category: "fellowship",
    title: "Syngene International – Early Career Research Awards 2026–27", agency: "Syngene International", logo: "assets/logos/syngene.jpeg",
    summary: "Syngene International Limited invites applications from early-career faculty members in Life Sciences at Indian universities and research institutions to support independent, innovative, high-risk, high-reward research addressing healthcare challenges.",
    thrust: "Drug discovery and development, translational research, novel technologies, biomarkers, assays, disease models, and Artificial Intelligence (AI) and Machine Learning (ML) applications in healthcare research.",
    funding: "Research grant of ₹50 lakh per award for up to 4 years, as per the official guidelines.",
    deadline: "2026-11-30", link: "https://www.syngeneintl.com/about-us/corporate-social-responsibility/syngene-early-career-research-awards-2026/"
  },
  {
    id: "indiaai-phd", category: "fellowship",
    title: "IndiaAI – Research Fellowship for PhD Scholars 2026–27", agency: "IndiaAI, MeitY", logo: "assets/logos/indiaai.jpeg",
    summary: "IndiaAI, under the Ministry of Electronics and Information Technology (MeitY), GOI, invites applications to support eligible full-time PhD scholars conducting research in Artificial Intelligence (AI) and related fields, strengthening India's AI research and innovation ecosystem.",
    thrust: "Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Data Science, Robotics and other AI-related research areas.",
    funding: "Monthly fellowship of ₹70,000 in Years 1–2, ₹75,000 in Year 3, and ₹80,000 in Years 4–5; annual research grant of ₹2 lakh; and one-time international conference travel/accommodation support of up to ₹1 lakh, subject to scheme guidelines.",
    deadline: "2026-11-30", link: "https://fellowship.indiaai.gov.in/formats/Updated_Guidelines_IndiaAI_Fellowship_010725.pdf"
  },
  {
    id: "ayush-phd", category: "fellowship",
    title: "Ministry of AYUSH – AYUSH PhD Fellowship Scheme 2026", agency: "Ministry of AYUSH, Govt. of India", logo: "assets/logos/ayush.jpeg",
    summary: "The Ministry of AYUSH, Government of India, through the Central Council for Research in Ayurvedic Sciences (CCRAS) and the Central Council for Research in Yoga & Naturopathy (CCRYN), invites eligible NET-qualified scholars to pursue PhD research in AYUSH-related disciplines and allied life sciences.",
    thrust: "Ayurveda, Yoga and Naturopathy, medicinal plants, pharmacognosy, phytochemistry, clinical research, drug development, therapeutic validation and interdisciplinary biomedical research.",
    funding: "Junior Research Fellow (JRF): ₹37,000 per month + HRA; Senior Research Fellow (SRF): ₹42,000 per month + HRA; additional grants: ₹20,000 annual contingency grant and a one-time research grant of ₹1,00,000.",
    deadline: "2026-12-09", link: "https://phd.ccras.org.in/"
  },
  {
    id: "humboldt", category: "fellowship",
    title: "Alexander von Humboldt Foundation – Humboldt Research Fellowship 2027", agency: "Alexander von Humboldt Foundation", logo: "assets/logos/humboldt.png",
    summary: "The Alexander von Humboldt Foundation, Germany, invites applications from highly qualified international postdoctoral and experienced researchers to conduct independent research in collaboration with a host institution in Germany. The fellowship is open to researchers across all academic disciplines.",
    thrust: "All academic disciplines, including Life Sciences, Medicine, Engineering, Natural Sciences, Mathematics, Physics, Chemistry, Environmental Sciences, Social Sciences and Humanities.",
    funding: "Postdoctoral researchers: €3,000 per month for 6–24 months; experienced researchers: €3,600 per month for 6–18 months. Additional benefits: research-cost support for the host institution, travel expenses, health insurance subsidies, family allowances and German-language courses, subject to eligibility and programme rules.",
    deadline: "2026-12-09", link: "https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship"
  },
  {
    id: "cob-travel", category: "fellowship",
    title: "The Company of Biologists – Travelling Fellowships 2026", agency: "The Company of Biologists", logo: "assets/logos/company-of-biologists.jpeg",
    summary: "The Company of Biologists offers travelling fellowships to graduate students and postdoctoral researchers to undertake collaborative research visits to other laboratories, develop new research skills and establish scientific collaborations.",
    thrust: "Developmental Biology, Cell Biology, Experimental Biology and Disease Models, aligned with the participating journals.",
    funding: "Up to £3,000 to cover travel, accommodation, subsistence, visa fees and laboratory bench fees, as applicable.",
    deadline: null, noFixedDeadline: true, link: "https://www.biologists.com/travelling-fellowships/"
  },

  // ---------------- INTERNATIONAL RESEARCH GRANTS ----------------
  {
    id: "biocodex-gut", category: "international",
    title: "Biocodex Microbiota Foundation – Gut Microbiota International Research Grant 2027", agency: "Biocodex Microbiota Foundation", logo: "assets/logos/biocodex.jpeg",
    summary: "Supports international research on gut microbiota and human disease, with the 2027 theme focusing on diet–microbiome interactions and immune function.",
    thrust: "Gut microbiome, microbiome analysis, immunophenotyping, diet–microbiome interactions and human disease; experimental validation is expected.",
    funding: "Up to ₹2.21 Crores per project",
    deadline: "2026-11-13", link: "https://www.biocodexmicrobiotafoundation.com/international-research-grant/international-call-projects"
  },
  {
    id: "biocodex-womens-health", category: "international",
    title: "Biocodex Microbiota Foundation – Microbiota & Women's Health International Grant 2027", agency: "Biocodex Microbiota Foundation", logo: "assets/logos/biocodex.jpeg",
    summary: "Supports international research on microbiota and women's health, with the 2027 theme focusing on male–female genital microbiome interactions and vaginal dysbiosis.",
    thrust: "Genital microbiome, vaginal dysbiosis/bacterial vaginosis, microbial transmission, penile microbiome, microbiome-based interventions and treatment recurrence.",
    funding: "Up to ₹2.21 Crores per project",
    deadline: "2027-01-15", link: "https://www.biocodexmicrobiotafoundation.com/international-research-grant/international-call-projects"
  },
  {
    id: "amazon-ara", category: "international",
    title: "Amazon – Amazon Research Awards (ARA), Fall 2026", agency: "Amazon Science", logo: "assets/logos/amazon-science.png",
    summary: "Amazon Research Awards invites university faculty and eligible nonprofit researchers worldwide to submit innovative research proposals addressing scientific and technological challenges.",
    thrust: "Agentic AI, AI for Information Security, Amazon Security, Automated Reasoning, AWS Cryptography, AI kernel and framework development using Trainium, Multilingual and Contextual AI Evaluation, On-Device Multimodal Perception, and Synthetic Data Generation for Multimodal Perception.",
    funding: "Unrestricted research funding and AWS promotional credits, with award amounts depending on the specific research area and call guidelines.",
    deadline: "2026-11-04", link: "https://www.amazon.science/research-awards/latest-news/amazon-research-awards-opens-fall-2026-call-for-proposals"
  },
  {
    id: "wcrf-inspire", category: "international",
    title: "World Cancer Research Fund International (WCRF) – INSPIRE Research Challenge", agency: "WCRF International", logo: "assets/logos/wcrf.jpeg",
    summary: "The INSPIRE Research Challenge supports early-career researchers worldwide in conducting innovative cancer research to improve cancer prevention, treatment and survivorship.",
    thrust: "Integrative Oncology, Lifestyle and Weight-Loss Medications, Early-Onset Cancers, Early-Life Exposures and Future Cancer Risk, Ingested Contaminants in Food and Drinking Water, Ultra-Processed Foods and Cancer Risk.",
    funding: "As per the Guidelines",
    deadline: "2026-11-04", link: "https://www.wcrf.org/research-policy/our-grant-programmes/inspire-research-challenge/"
  }
];

/* Rolling calls — schemes open throughout the year (no fixed deadline, no link supplied) */
const ROLLING_CALLS = {
  national: [
    { title: "BRNS | Research Grant Scheme", agency: "BRNS", logo: "assets/logos/rolling/dae-brns.jpg", summary: "Supports research projects aligned with the programmes of the Department of Atomic Energy (DAE), generally undertaken in collaboration with a DAE unit.", link: "https://www.indiascienceandtechnology.gov.in/programme-schemes/research-and-development/dae-relevant-research-project-rp" },
    { title: "BRNS | Young Scientist Research Programme (YSRP)", agency: "BRNS", logo: "assets/logos/rolling/dae-brns.jpg", summary: "Supports young researchers undertaking innovative research in areas relevant to DAE programmes and national priorities.", link: "https://www.indiascienceandtechnology.gov.in/funding-opportunities/research-grants/individual/dae-young-scientist-research-award-dae-ysra" },
    { title: "DRDO | Aeronautics Research & Development Board (ARDB) Grant", agency: "DRDO", logo: "assets/logos/drdo.png", summary: "Supports academic research and development in aeronautics and related technologies of strategic importance to India.", link: "https://academyresearch.drdo.gov.in/DRDO/ARDB_ERG" },
    { title: "DRDO | Life Sciences Research Board (LSRB) Grant", agency: "DRDO", logo: "assets/logos/drdo.png", summary: "Supports research in life sciences, biomedical devices, soldier health, biotechnology, extreme-environment physiology, food and agriculture.", link: "https://drdo.gov.in/life-sciences-research-board/application-grant" },
    { title: "DRDO | Naval Research Board (NRB) Grant", agency: "DRDO", logo: "assets/logos/drdo.png", summary: "Supports research addressing emerging technologies and future security requirements of the Indian Navy.", link: "https://academyresearch.drdo.gov.in/DRDO/NRB_ERG" },
    { title: "DRDO | Armament Research Board (ARMREB) Grant", agency: "DRDO", logo: "assets/logos/drdo.png", summary: "Provides research support for development of innovative technologies related to armaments and defence applications.", link: "https://academyresearch.drdo.gov.in/DRDO/ARMREB_ERG" },
    { title: "AERB | Safety Research Programme", agency: "AERB", summary: "Supports research focused on nuclear and radiation safety, helping strengthen safety assessment, regulation and protection practices.", link: "https://www.aerb.gov.in/english/safety-research-programmes1" },
    { title: "Ministry of Coal | S&T Programme for Research", agency: "Ministry of Coal", logo: "assets/logos/rolling/ministry-coal.png", summary: "Supports short-duration, application-oriented R&D projects addressing technological challenges and commercial applications in the coal sector.", link: "https://www.coal.nic.in/sites/default/files/2021-03/S%26T-Guidelines-MoC.pdf" },
    { title: "MoWR/CGWB | R&D Programme in Water Sector", agency: "MoWR / CGWB", logo: "assets/logos/rolling/govt-of-india-emblem.svg", summary: "Promotes research and innovation in water resources engineering, groundwater management and related water-sector challenges.", link: "https://cgwb.gov.in/node/210" },
    { title: "MoFPI | Research & Development in Food Processing Sector", agency: "MoFPI", logo: "assets/logos/rolling/govt-of-india-emblem.svg", summary: "Supports demand-driven R&D projects aimed at technological development and innovation in the food-processing sector." },
    { title: "DSIR | Technology Development & Utilization Programme for Women (TDUPW)", agency: "DSIR", logo: "assets/logos/rolling/govt-of-india-emblem.svg", summary: "Supports women-focused technology development and utilization projects, particularly technologies addressing societal needs and strengthening technology capabilities.", link: "https://www.indiascienceandtechnology.gov.in/programme-schemes/women-schemes/technology-development-and-utilization-programme-women-tdupw" },
    { title: "ANRF | National Post Doctoral Fellowship (N-PDF)", agency: "ANRF", logo: "assets/logos/anrf.jpeg", summary: "Supports motivated young researchers in frontier areas of science and engineering to develop independent research capabilities under an experienced mentor.", link: "https://anrfonline.in/ANRF/npdf" },
    { title: "SERB/ANRF | Prime Minister's Fellowship for Doctoral Research", agency: "SERB / ANRF", logo: "assets/logos/anrf.jpeg", summary: "Supports full-time PhD scholars working in industry-relevant and nationally important areas of Science, Technology, Engineering, Agriculture and Medicine.", link: "https://www.indiascienceandtechnology.gov.in/nurturing-minds/scholarships/phd/prime-minister-fellowship-scheme-doctoral-research" },
    { title: "DST | WISE-PhD Programme", agency: "DST", summary: "Provides research fellowship support to women pursuing PhD programmes in basic and applied sciences.", link: "https://dst.gov.in/wise-fellowship-phd-wise-phd" },
    { title: "DST | WISE-SCOPE Fellowship", agency: "DST", summary: "Supports women scientists with PhDs to undertake science and technology projects addressing grassroots and societal challenges.", link: "https://www.myscheme.gov.in/hi/schemes/wise-scope-fellowship" },
    { title: "DST | WIDUSHI Programme", agency: "DST", summary: "Supports senior women scientists, including those nearing retirement or retired, to undertake interdisciplinary research in science and technology.", link: "https://myscheme.gov.in/schemes/widushi" },
    { title: "DST | National Postdoctoral Fellowship in Nano Science & Technology", agency: "DST", summary: "Supports talented researchers undertaking advanced postdoctoral research in nanoscience, nanotechnology and their applications.", link: "https://www.indiascienceandtechnology.gov.in/programme-schemes/research-and-development/mission-nano-science-and-technology-nano-mission" }
  ],
  international: [
    { title: "IGSTC | WISER – Women Involvement in Science and Engineering Research", agency: "IGSTC", summary: "Supports women researchers from India and Germany to participate in collaborative R&D projects and strengthen bilateral research networks.", link: "https://www.indiascienceandtechnology.gov.in/programme-schemes/women-schemes/women-involvement-science-and-engineering-research-wiser" },
    { title: "IGSTC | Small Immediate Need Grants (SING)", agency: "IGSTC", summary: "Supports motivated young researchers in frontier areas of science and engineering to develop independent research capabilities under an experienced mentor.", link: "https://www.igstc.org" },
    { title: "IGSTC | Seed Funding", agency: "IGSTC", summary: "Provides early-stage support for India–Germany collaborative ideas involving innovation, rapid prototyping, technology development and industrial R&D.", link: "https://www.igstc.org" },
    { title: "DST–DFG | International Research Training Groups (IRTG)", agency: "DST / DFG", logo: "assets/logos/rolling/dfg.png", summary: "Promotes long-term India–Germany scientific collaboration through joint research programmes and structured training for researchers.", link: "https://www.indiascienceandtechnology.gov.in/announcementsopportunity/dst-dfg-joint-call-international-research-training-groups-irtg" },
    { title: "Open Technology Fund | Internet Freedom Fund", agency: "Open Technology Fund", logo: "assets/logos/rolling/open-technology-fund.png", summary: "Supports technology and research initiatives promoting internet freedom, open access, digital rights and human rights.", link: "https://www.opentech.fund/funds/internet-freedom-fund/" },
    { title: "Waitt Foundation | Rapid Ocean Conservation Grants", agency: "Waitt Foundation", logo: "assets/logos/rolling/waitt-foundation.png", summary: "Provides small, rapid-response grants for innovative solutions addressing emerging marine conservation and ocean-protection challenges.", link: "https://www.waittfoundation.org/roc-grants" },
    { title: "The Habitats Trust | THT Seed Grant", agency: "The Habitats Trust", logo: "assets/logos/rolling/habitats-trust.png", summary: "Supports conservation initiatives addressing critical gaps in biodiversity protection, particularly projects involving lesser-known species and habitats.", link: "https://thehabitatstrust.org" },
    { title: "Nestlé Foundation | Training Grant for Research", agency: "Nestlé Foundation", summary: "Supports small-scale research and training projects, including MSc and PhD thesis work, in public health and nutrition.", link: "https://www.nestlefoundation.org" },
    { title: "Nestlé Foundation | Pilot Grant", agency: "Nestlé Foundation", summary: "Supports pilot research in public health and nutrition with potential to develop into larger research projects.", link: "https://www.nestlefoundation.org" },
    { title: "Nestlé Foundation | Small Research Grant", agency: "Nestlé Foundation", summary: "Provides financial support for small-scale research studies addressing public health and nutrition-related questions.", link: "https://www.nestlefoundation.org" },
    { title: "Nestlé Foundation | Large Research Grant", agency: "Nestlé Foundation", summary: "Supports larger, substantial research projects in public health and nutrition with potential for significant scientific and societal impact.", link: "https://www.nestlefoundation.org" },
    { title: "Alexander von Humboldt Foundation | Research Fellowship", agency: "Alexander von Humboldt Foundation", logo: "assets/logos/humboldt.png", summary: "Supports postdoctoral and experienced researchers of various disciplines to conduct independent research in collaboration with a host institution in Germany.", link: "https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship" },
    { title: "DFG | Walter Benjamin Programme", agency: "DFG", logo: "assets/logos/rolling/dfg.png", summary: "Enables postdoctoral researchers to independently pursue their own research project at a research institution of their choice, including opportunities abroad.", link: "https://www.dfg.de/en/research_funding/programmes/individual/walter_benjamin/" },
    { title: "DAAD | Research Scholarships / Fellowships", agency: "DAAD", logo: "assets/logos/rolling/daad.svg", summary: "Provides funding opportunities for international students and researchers to undertake postgraduate study, doctoral research or research stays in Germany.", link: "https://www.daad.in" },
    { title: "Swiss Government Excellence Scholarships", agency: "Swiss Confederation", logo: "assets/logos/rolling/swiss-confederation.svg", summary: "Supports international researchers and postgraduate scholars undertaking research, doctoral or postdoctoral opportunities in Switzerland.", link: "https://research.swiss/swiss-government-excellence-scholarships-for-foreign-scholars-and-artists/" }
  ]
};

/* November 2026 deadline map for the calendar widget: day -> list of grant ids.
   Built automatically from GRANTS so it never drifts from the data. */
const CALENDAR = (function(){
  const year = 2026, month = 10; // November (0-indexed)
  const deadlineDays = {};
  GRANTS.forEach(g=>{
    if(!g.deadline) return;
    const [y,m,d] = g.deadline.split("-").map(Number);
    if(y===year && m-1===month){ (deadlineDays[d] = deadlineDays[d] || []).push(g.id); }
  });
  return {
    year, month,
    label: "November 2026",
    startWeekday: new Date(year, month, 1).getDay(), // Sunday 1 Nov 2026
    daysInMonth: new Date(year, month+1, 0).getDate(),
    deadlineDays
  };
})();
