// Audit Findings Database
const findings = [
  {
    id: "f1",
    title: "Scroll animation hides content without JS",
    severity: "critical",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "Elements with the animate-on-scroll class default to zero opacity. They require JavaScript to append the is-visible class. CMS preview environments disable JavaScript execution, keeping content permanently hidden.",
    why: "Since the CMS preview doesn't run that JavaScript, the entire page appears blank.",
    effect: "Broken CMS preview, layout shifts, and negative indexability/UX impact.",
    fix: "Add <script>document.documentElement.classList.add('js')</script> right after <meta charset>. Change CSS .animate-on-scroll to only hide when .js is present.",
    weight: 15,
    resolved: false
  },
  {
    id: "f2",
    title: "Duplicate unused form injected in DOM",
    severity: "medium",
    category: "Performance",
    specialist: "blaze",
    description: "Page loads both a visible JotForm iframe and a hidden native Formidable Form (#form_contact).",
    why: "Loading multiple form assets unnecessarily bloats the DOM.",
    effect: "Wasted bandwidth and potential conflicts if the hidden native form captures enter key events.",
    fix: "Remove the unused Formidable Form shortcode or block from the page.",
    weight: 5,
    resolved: false
  },
  {
    id: "f3",
    title: "Heading hierarchy skips H2",
    severity: "medium",
    category: "On-Page SEO",
    specialist: "scout",
    description: "The H1 tag is followed immediately by H3 tags.",
    why: "Search engines use headings to understand the topical structure of the page.",
    effect: "Breaks document outline for screen readers and impacts SEO parsing.",
    fix: "Re-level headings so H2s are used for primary sub-sections.",
    weight: 5,
    resolved: false
  },
  {
    id: "f4",
    title: "Missing button role on close menu link",
    severity: "low",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "The <a> tag with class slide_out_area_close uses href='#' to close the menu but lacks role='button'.",
    why: "Links should navigate; buttons should perform actions.",
    effect: "Screen reader users will interpret it as a navigation link rather than an interactive toggle.",
    fix: "Add role='button' and an aria-label='Close menu'.",
    weight: 2,
    resolved: false
  },
  {
    id: "f5",
    title: "LCP image is lazy loaded",
    severity: "critical",
    category: "Performance",
    specialist: "blaze",
    description: "The main hero banner image has loading='lazy'.",
    why: "The browser waits until the DOM is fully parsed and layout is calculated before prioritizing the download.",
    effect: "LCP delayed by ~300ms to 600ms.",
    fix: "Remove loading='lazy' and add fetchpriority='high' to the hero image.",
    weight: 15,
    resolved: false
  },
  {
    id: "f6",
    title: "Structured Data missing LocalBusiness",
    severity: "high",
    category: "Structured Data",
    specialist: "scout",
    description: "The site lacks valid LocalBusiness schema.",
    why: "Search engines need explicit entity data to map local services.",
    effect: "Negative ranking impact in local pack.",
    fix: "Add valid JSON-LD LocalBusiness schema with NAP data.",
    weight: 10,
    resolved: false
  },
  {
    id: "f7",
    title: "Render-blocking JavaScript",
    severity: "high",
    category: "Performance",
    specialist: "blaze",
    description: "Multiple scripts load synchronously in the <head>.",
    why: "The browser pauses HTML parsing to download and execute them.",
    effect: "Delays FCP and LCP with high INP risk.",
    fix: "Add defer attributes to non-critical scripts.",
    weight: 10,
    resolved: false
  },
  {
    id: "f8",
    title: "Missing HTML5 client-side validation on Contact form",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "Form fields lack the required attribute.",
    why: "Client side validation ensures data integrity before submission.",
    effect: "Users can submit empty forms or malformed emails.",
    fix: "Add required attributes and correct input types.",
    weight: 10,
    resolved: false
  },
  {
    id: "f9",
    title: "Flat Visual Quality & Missing Affordances",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Flat visual execution lacking modern affordances like hover states or depth.",
    why: "Static elements fail to communicate interactivity.",
    effect: "Reduced trust and lower conversion rates from clients.",
    fix: "Add hover states, shadows, and subtle micro-interactions to buttons.",
    weight: 10,
    resolved: false
  },
  {
    id: "f10",
    title: "Open Graph missing image",
    severity: "medium",
    category: "Technical SEO",
    specialist: "scout",
    description: "<meta property='og:image'> not found.",
    why: "Social shares will render without a preview image.",
    effect: "Negative CTR impact on social platforms.",
    fix: "Add an og:image tag pointing to a representative branding image.",
    weight: 5,
    resolved: false
  }
];

const categoryConfig = {
  "Technical SEO": { startScore: 60, findings: ["f10"], icon: "fa-solid fa-server" },
  "On-Page SEO": { startScore: 70, findings: ["f3"], icon: "fa-solid fa-file-code" },
  "Local SEO & GEO": { startScore: 100, findings: [], icon: "fa-solid fa-map-location-dot" },
  "Performance": { startScore: 50, findings: ["f2", "f5", "f7"], icon: "fa-solid fa-gauge-high" },
  "Accessibility & QA": { startScore: 60, findings: ["f1", "f4", "f8", "f9"], icon: "fa-solid fa-universal-access" },
  "Structured Data": { startScore: 50, findings: ["f6"], icon: "fa-solid fa-code" }
};

const passedItems = [
  { title: "Title Tags Optimized", category: "On-Page SEO", specialist: "scout", desc: "Keyword-first structure matches user intent for local queries." },
  { title: "Meta Descriptions Present", category: "On-Page SEO", specialist: "scout", desc: "Provides clear service summary." },
  { title: "Canonical Tags Present", category: "Technical SEO", specialist: "scout", desc: "Prevents duplicate content issues." }
];

let activeSeverityFilter = 'all';
let activeSpecialistFilter = 'all';
let searchQuery = '';

// Load resolved status from localStorage if available
function loadState() {
  const savedState = localStorage.getItem('millard_audit_state');
  if (savedState) {
    const resolvedIds = JSON.parse(savedState);
    findings.forEach(f => {
      f.resolved = resolvedIds.includes(f.id);
    });
  }
}

function saveState() {
  const resolvedIds = findings.filter(f => f.resolved).map(f => f.id);
  localStorage.setItem('millard_audit_state', JSON.stringify(resolvedIds));
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
