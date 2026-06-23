// Audit Findings Database
const findings = [
  {
    id: "f1",
    title: "Duplicate FAQ Title & Meta Description on Key Pages",
    severity: "critical",
    category: "On-Page SEO",
    specialist: "scout",
    description: "The Contact Us (contact.html) and Service Areas (service-areas.html) pages use the exact same title tag and meta description as the FAQ page.",
    why: "Search engines penalize duplicate titles and meta descriptions, preventing search bots from indexing your contact and service pages correctly.",
    effect: "Severely reduces local search engine visibility for contact page and service areas; users land on contact pages when searching for FAQs.",
    fix: "Update contact.html title to 'Contact Us | Parkersons Heating and Air' and service-areas.html title to 'Our HVAC Service Areas | Parkersons Heating and Air', with corresponding custom descriptions.",
    weight: 15,
    resolved: false
  },
  {
    id: "f2",
    title: "Three-Way Production Domain Mismatch",
    severity: "critical",
    category: "Technical SEO",
    specialist: "scout",
    description: "The canonical links point to parkersonsheatingandair.com, the active site runs on parkersons.vercel.app, and sitemap/robots reference parkersonshvac.com.",
    why: "A consistent primary domain is essential. Mismatched domain references across sitemaps, robots.txt, and canonical tags split page authority and confuse crawlers.",
    effect: "Search bots may index the wrong domain, fail to index updates, or flag canonical mismatch warnings.",
    fix: "Standardize all configurations to use the primary domain (e.g. parkersonsheatingandair.com) for sitemaps, canonical tags, and robots.txt rules.",
    weight: 15,
    resolved: false
  },
  {
    id: "f3",
    title: "Austin, TX Mismatch in llms.txt (AI Search / GEO)",
    severity: "critical",
    category: "Local SEO & GEO",
    specialist: "scout",
    description: "The llms.txt file lists Austin, TX, phone (555) 234-5678, and support@parkersonshvac.com. The site pages correctly show Brandon, FL and (813) 359-3020.",
    why: "Generative AI engines (like SearchGPT, Perplexity, and Gemini) scrape llms.txt to answer local search queries directly.",
    effect: "AI search results will present incorrect contact details and wrong location information to customers.",
    fix: "Update llms.txt to match your actual Brandon, FL address, (813) 359-3020 phone number, and info@parkersonsheatingandair.com email.",
    weight: 15,
    resolved: false
  },
  {
    id: "f4",
    title: "Primary Pages Omitted from XML Sitemap",
    severity: "high",
    category: "Technical SEO",
    specialist: "scout",
    description: "contact.html and service-areas.html are not listed in the sitemap.xml file.",
    why: "XML sitemaps ensure search engine spiders find and index all primary landing pages.",
    effect: "Delays or prevents indexation of your service areas and contact pages.",
    fix: "Add contact.html and service-areas.html entries with appropriate priority weights to sitemap.xml.",
    weight: 10,
    resolved: false
  },
  {
    id: "f5",
    title: "Completely Missing Open Graph / Twitter Cards",
    severity: "high",
    category: "Technical SEO",
    specialist: "scout",
    description: "No Open Graph meta tags exist in the header of any HTML file.",
    why: "Social sharing protocols (Open Graph, Twitter Cards) control how links appear when shared on Slack, social networks, or messaging apps.",
    effect: "Shared links look plain and unprofessional, leading to lower CTR.",
    fix: "Add standard og:title, og:description, og:image, and og:url tags in the head element of all pages.",
    weight: 10,
    resolved: false
  },
  {
    id: "f6",
    title: "Contact & FAQ Form Inputs Missing name Attributes",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "Form inputs on contact.html and faq.html have IDs but lack name attributes.",
    why: "Form data is sent to form handlers using the name attribute. Inputs without name attributes are omitted on form submission.",
    effect: "Forms submit blank values to any attached form-handling backend.",
    fix: "Add name='name', name='phone', name='email', name='service-type', name='details' attributes to all form inputs.",
    weight: 10,
    resolved: false
  },
  {
    id: "f7",
    title: "Images Missing Explicit Dimensions",
    severity: "medium",
    category: "Performance",
    specialist: "blaze",
    description: "Every single image element on the website lacks width and height attributes.",
    why: "Browsers need dimensions to reserve space for images during page load, preventing visual shifts.",
    effect: "Increases Cumulative Layout Shift (CLS), dragging down Core Web Vitals score.",
    fix: "Add explicit width and height attributes to all img tags in the HTML files.",
    weight: 5,
    resolved: false
  },
  {
    id: "f8",
    title: "Render-Blocking Google Fonts @import",
    severity: "medium",
    category: "Performance",
    specialist: "blaze",
    description: "Google Fonts are loaded via CSS @import at the very top of styles.css.",
    why: "CSS @import statements block layout rendering while the font stylesheet downloads.",
    effect: "Increases First Contentful Paint (FCP) and Largest Contentful Paint (LCP) load times.",
    fix: "Move Google Fonts to preconnect and link stylesheet tags in the HTML head instead.",
    weight: 5,
    resolved: false
  },
  {
    id: "f9",
    title: "Reviews Widget iframe Lacks Accessibility Title",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "The dynamically loaded customer reviews iframe in app.js has no title attribute.",
    why: "Screen readers require titles on iframes to identify the widget contents for visually impaired users.",
    effect: "Fails WCAG 2.1 AA accessibility guidelines.",
    fix: "Modify app.js to set iframe.title = 'Customer Reviews Widget' before appending the iframe.",
    weight: 5,
    resolved: false
  },
  {
    id: "f10",
    title: "Non-Clean Internal URLs with Query Parameters",
    severity: "medium",
    category: "On-Page SEO",
    specialist: "scout",
    description: "Internal navigation links end with .html?v=3 (e.g. repairs.html?v=3).",
    why: "Query parameters are suboptimal for search indexing and create a cluttered address bar.",
    effect: "Minor SEO indexing impact and degraded URL aesthetics.",
    fix: "Remove development cache-busting query strings and standardise clean URLs.",
    weight: 5,
    resolved: false
  },
  {
    id: "f11",
    title: "Weak Home Page H1 Keyword Value",
    severity: "low",
    category: "On-Page SEO",
    specialist: "scout",
    description: "The H1 on the home page is 'Being cool is not just an expression.'",
    why: "H1 tags hold high search ranking weight and should include primary local target keywords.",
    effect: "Missed SEO ranking opportunity for terms like 'Brandon FL HVAC' or 'Heating and Air'.",
    fix: "Change Home H1 to include local target keywords (e.g. 'Parkersons Heating & Air: Expert HVAC Services in Brandon, FL').",
    weight: 2,
    resolved: false
  },
  {
    id: "f12",
    title: "Missing Lazy Loading on Subpage Images",
    severity: "low",
    category: "Performance",
    specialist: "blaze",
    description: "Offscreen images (FAQs, team photos, maintenance page) lack loading='lazy'.",
    why: "Lazy loading ensures images are only downloaded when they enter the user's viewport.",
    effect: "Slows down load performance and wastes user bandwidth on mobile connections.",
    fix: "Add loading='lazy' to all offscreen images.",
    weight: 2,
    resolved: false
  }
];

const categoryConfig = {
  "Technical SEO": { startScore: 30, findings: ["f2", "f4", "f5"], icon: "fa-solid fa-server" },
  "On-Page SEO": { startScore: 45, findings: ["f1", "f10", "f11"], icon: "fa-solid fa-file-code" },
  "Local SEO & GEO": { startScore: 50, findings: ["f3"], icon: "fa-solid fa-map-location-dot" },
  "Performance": { startScore: 40, findings: ["f7", "f8", "f12"], icon: "fa-solid fa-gauge-high" },
  "Accessibility & QA": { startScore: 60, findings: ["f6", "f9"], icon: "fa-solid fa-universal-access" },
  "Structured Data": { startScore: 90, findings: [], icon: "fa-solid fa-code" }
};

const passedItems = [
  { title: "Alt Text Coverage", category: "Accessibility & QA", specialist: "aria", desc: "100% of image elements contain descriptive alt text." },
  { title: "Heading Hierarchy", category: "On-Page SEO", specialist: "scout", desc: "All pages follow a strict H1 → H2 → H3 structure with no skipped levels." },
  { title: "Relative Anchors", category: "Accessibility & QA", specialist: "vega", desc: "All local section anchors (e.g. #calculator) correspond to existing element IDs." },
  { title: "Structured Data Integration", category: "Structured Data", specialist: "scout", desc: "Valid JSON-LD schema objects exist on all pages, including LocalBusiness reviews." }
];

let activeSeverityFilter = 'all';
let activeSpecialistFilter = 'all';
let searchQuery = '';

// Load resolved status from localStorage if available
function loadState() {
  const savedState = localStorage.getItem('parkersons_audit_state');
  if (savedState) {
    const resolvedIds = JSON.parse(savedState);
    findings.forEach(f => {
      f.resolved = resolvedIds.includes(f.id);
    });
  }
}

function saveState() {
  const resolvedIds = findings.filter(f => f.resolved).map(f => f.id);
  localStorage.setItem('parkersons_audit_state', JSON.stringify(resolvedIds));
}

// Calculate and Update Scores
function updateScores() {
  // Global calculation variables
  const baseGlobal = 60;
  const maxGlobalAdd = 40;
  const totalWeight = findings.reduce((sum, f) => sum + f.weight, 0);
  const resolvedWeight = findings.filter(f => f.resolved).reduce((sum, f) => sum + f.weight, 0);
  
  const overallScore = Math.round(baseGlobal + (resolvedWeight / totalWeight) * maxGlobalAdd);
  
  // Update overall score gauge
  const scoreValueEl = document.getElementById('overall-score-value');
  const ratingEl = document.getElementById('score-rating');
  const gaugeFillEl = document.getElementById('overall-gauge-fill');
  
  scoreValueEl.textContent = overallScore;
  
  // Set color ratings
  if (overallScore < 70) {
    ratingEl.textContent = "Needs Work";
    ratingEl.style.color = "var(--critical)";
    gaugeFillEl.style.stroke = "var(--critical)";
  } else if (overallScore < 90) {
    ratingEl.textContent = "Improving";
    ratingEl.style.color = "var(--medium)";
    gaugeFillEl.style.stroke = "var(--medium)";
  } else {
    ratingEl.textContent = "Good / Excellent";
    ratingEl.style.color = "var(--pass)";
    gaugeFillEl.style.stroke = "var(--pass)";
  }
  
  // SVG Stroke offset calculation: dasharray is 263.89
  const circumference = 263.89;
  const offset = circumference - (overallScore / 100) * circumference;
  gaugeFillEl.style.strokeDashoffset = offset;

  // Update Progress Tracker
  const resolvedCount = findings.filter(f => f.resolved).length;
  const totalCount = findings.length;
  const progressPercent = Math.round((resolvedCount / totalCount) * 100);
  
  document.getElementById('resolved-count').textContent = resolvedCount;
  document.getElementById('total-count').textContent = totalCount;
  document.getElementById('tracker-percentage').textContent = `${progressPercent}%`;
  document.getElementById('tracker-bar-fill').style.width = `${progressPercent}%`;

  // Update Severity Count Headers
  document.getElementById('count-critical').textContent = findings.filter(f => f.severity === 'critical' && !f.resolved).length;
  document.getElementById('count-high').textContent = findings.filter(f => f.severity === 'high' && !f.resolved).length;
  document.getElementById('count-medium').textContent = findings.filter(f => f.severity === 'medium' && !f.resolved).length;
  document.getElementById('count-low').textContent = findings.filter(f => f.severity === 'low' && !f.resolved).length;

  // Render Category Breakdown Cards
  renderCategories();
}

function renderCategories() {
  const container = document.getElementById('categories-container');
  container.innerHTML = '';
  
  Object.keys(categoryConfig).forEach(catName => {
    const config = categoryConfig[catName];
    let score = 100;
    
    if (config.findings.length > 0) {
      const associatedFindings = findings.filter(f => config.findings.includes(f.id));
      const totalCatWeight = associatedFindings.reduce((sum, f) => sum + f.weight, 0);
      const resolvedCatWeight = associatedFindings.filter(f => f.resolved).reduce((sum, f) => sum + f.weight, 0);
      
      score = Math.round(config.startScore + (resolvedCatWeight / totalCatWeight) * (100 - config.startScore));
    }
    
    let colorClass = 'var(--pass)';
    if (score < 50) colorClass = 'var(--critical)';
    else if (score < 80) colorClass = 'var(--medium)';
    
    const card = document.createElement('div');
    card.className = 'card category-card';
    card.innerHTML = `
      <div class="category-card-score" style="color: ${colorClass}">${score}</div>
      <div class="category-card-name"><i class="${config.icon}"></i> ${catName}</div>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" style="width: ${score}%; background-color: ${colorClass}"></div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Findings List
function renderFindings() {
  const container = document.getElementById('findings-container');
  container.innerHTML = '';
  
  // Filter active list
  let filteredList = [];
  
  if (activeSeverityFilter === 'pass') {
    // Show passed list
    passedItems.forEach(item => {
      if (searchQuery === '' || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())) {
        
        const card = document.createElement('div');
        card.className = 'finding-card';
        card.innerHTML = `
          <div class="finding-card-header" style="cursor: default;">
            <div class="finding-title-section">
              <div class="resolver-checkbox-wrapper" style="pointer-events: none;">
                <div class="checkbox-visual" style="background-color: var(--pass); border-color: var(--pass);">
                  <i class="fa-solid fa-check" style="opacity: 1; transform: scale(1);"></i>
                </div>
              </div>
              <div class="finding-header-info">
                <h4>${item.title}</h4>
                <div class="finding-badges">
                  <span class="mini-badge badge-pass">Passed</span>
                  <span class="mini-badge badge-${item.specialist}">${item.specialist}</span>
                  <span class="mini-badge badge-pass">${item.category}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="finding-card-details" style="max-height: 200px;">
            <div class="details-content">
              <div class="detail-row">
                <span class="detail-label">Status Summary</span>
                <span class="detail-value">${item.desc}</span>
              </div>
            </div>
          </div>
        `;
        container.appendChild(card);
      }
    });
    return;
  }
  
  findings.forEach(finding => {
    // Apply filters
    if (activeSeverityFilter !== 'all' && finding.severity !== activeSeverityFilter) return;
    if (activeSpecialistFilter !== 'all' && finding.specialist !== activeSpecialistFilter) return;
    
    // Apply search query
    if (searchQuery !== '') {
      const q = searchQuery.toLowerCase();
      const match = finding.title.toLowerCase().includes(q) || 
                    finding.description.toLowerCase().includes(q) ||
                    finding.category.toLowerCase().includes(q) ||
                    finding.fix.toLowerCase().includes(q);
      if (!match) return;
    }
    
    const isExpanded = false;
    const card = document.createElement('div');
    card.className = `finding-card ${finding.resolved ? 'resolved-item' : ''}`;
    card.dataset.id = finding.id;
    card.innerHTML = `
      <div class="finding-card-header">
        <div class="finding-title-section">
          <label class="resolver-checkbox-wrapper">
            <input type="checkbox" ${finding.resolved ? 'checked' : ''} class="resolver-checkbox">
            <div class="checkbox-visual">
              <i class="fa-solid fa-check"></i>
            </div>
          </label>
          <div class="finding-header-info">
            <h4>${finding.title}</h4>
            <div class="finding-badges">
              <span class="mini-badge badge-${finding.severity}">${finding.severity}</span>
              <span class="mini-badge badge-${finding.specialist}">${finding.specialist}</span>
              <span class="mini-badge badge-pass">${finding.category}</span>
            </div>
          </div>
        </div>
        <i class="fa-solid fa-chevron-down toggle-arrow"></i>
      </div>
      <div class="finding-card-details">
        <div class="details-content">
          <div class="detail-row">
            <span class="detail-label">What is the issue?</span>
            <span class="detail-value">${finding.description}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Why it matters</span>
            <span class="detail-value">${finding.why}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Direct Effect</span>
            <span class="detail-value">${finding.effect}</span>
          </div>
          <div class="detail-row detail-fix">
            <span class="detail-label">Proposed Fix</span>
            <span class="detail-value">${finding.fix}</span>
          </div>
        </div>
      </div>
    `;
    
    // Add Event Listeners for accordion expand
    const header = card.querySelector('.finding-card-header');
    header.addEventListener('click', (e) => {
      // Prevent expand if clicking on checkbox wrapper
      if (e.target.closest('.resolver-checkbox-wrapper')) return;
      card.classList.toggle('expanded');
    });

    // Add checkbox toggle listener
    const check = card.querySelector('.resolver-checkbox');
    check.addEventListener('change', (e) => {
      finding.resolved = e.target.checked;
      card.classList.toggle('resolved-item', finding.resolved);
      saveState();
      updateScores();
    });

    container.appendChild(card);
  });
  
  if (container.children.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-dark);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; margin-bottom: 12px;"></i>
        <p>No findings match your active filters.</p>
      </div>
    `;
  }
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateScores();
  renderFindings();
  
  // Severity Filters Click
  const severityBtns = document.querySelectorAll('#severity-filters .filter-btn');
  severityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      severityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSeverityFilter = btn.getAttribute('data-severity');
      renderFindings();
    });
  });

  // Specialist Filters Click
  const specialistBtns = document.querySelectorAll('#specialist-filters .filter-btn');
  specialistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      specialistBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSpecialistFilter = btn.getAttribute('data-specialist');
      renderFindings();
    });
  });

  // Search input change
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderFindings();
  });
});
