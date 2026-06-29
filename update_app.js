const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const newData = `// Audit Findings Database
const findings = [
  {
    id: "f1",
    title: "Scroll animation hides content without JS",
    severity: "critical",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "The page uses scroll animation classes that are causing content to be invisible. Every element with the class animate-on-scroll starts at opacity: 0 and only becomes visible when JavaScript adds the class is-visible.",
    why: "Since the CMS preview doesn't run that JavaScript, the entire page appears blank.",
    effect: "Broken CMS preview, layout shifts, and negative indexability/UX impact.",
    fix: "Add <script>document.documentElement.classList.add('js')</script> right after <meta charset>. Change CSS .animate-on-scroll to only hide when .js is present.",
    weight: 15,
    resolved: false
  },
  {
    id: "f2",
    title: "LCP image is lazy loaded",
    severity: "critical",
    category: "Performance",
    specialist: "blaze",
    description: "The hero image (Perfection-Auto-Detail-Wash-Las-Vegas-1.jpg) includes loading='lazy' and lacks fetchpriority='high'.",
    why: "The browser waits until the DOM is fully parsed and layout is calculated before prioritizing the download.",
    effect: "LCP delayed by ~300ms to 600ms",
    fix: "Remove loading='lazy' and add fetchpriority='high' to the hero image.",
    weight: 15,
    resolved: false
  },
  {
    id: "f3",
    title: "Severe Accessibility Failures",
    severity: "critical",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Six images lack alt text and eleven interactive elements are missing aria labels.",
    why: "Visually impaired users cannot navigate the site or understand image context.",
    effect: "Alienates users with disabilities and introduces ADA compliance risks.",
    fix: "Add descriptive alt attributes to all images and aria-labels to interactive buttons.",
    weight: 15,
    resolved: false
  },
  {
    id: "f4",
    title: "Missing Essential Conversion Sections",
    severity: "critical",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Absence of pricing tables, customer testimonials, FAQs, and a direct booking calendar.",
    why: "High ticket service businesses require immediate social proof and frictionless scheduling to capture leads.",
    effect: "Potential customers bounce to competitors offering easier booking flows and visible reviews.",
    fix: "Add pricing, testimonials, FAQs, and a clear booking system.",
    weight: 15,
    resolved: false
  },
  {
    id: "f5",
    title: "Render-blocking JavaScript",
    severity: "high",
    category: "Performance",
    specialist: "blaze",
    description: "jquery.min.js, jquery-migrate.min.js and Divi's scripts.min.js load synchronously.",
    why: "The browser pauses HTML parsing to download and execute them.",
    effect: "Delays FCP and LCP with high INP risk",
    fix: "Add defer attributes to scripts to avoid blocking rendering.",
    weight: 10,
    resolved: false
  },
  {
    id: "f6",
    title: "Render-blocking CSS",
    severity: "high",
    category: "Performance",
    specialist: "blaze",
    description: "Heavy Divi stylesheets load synchronously via rel='stylesheet'.",
    why: "The browser blocks rendering until these files are fully parsed.",
    effect: "Delays FCP and LCP",
    fix: "Preload critical CSS or defer non-critical styles.",
    weight: 10,
    resolved: false
  },
  {
    id: "f7",
    title: "Heavy main thread execution from third-party scripts",
    severity: "high",
    category: "Performance",
    specialist: "blaze",
    description: "Facebook Pixel, Google Tag Manager and Google Call Tracking load asynchronously but execute on the main thread during initial page load.",
    why: "Third-party scripts competing for main thread can cause input delays.",
    effect: "INP >200ms risk due to main thread congestion",
    fix: "Delay third party scripts using Partytown or similar methods.",
    weight: 10,
    resolved: false
  },
  {
    id: "f8",
    title: "Structured Data missing LocalBusiness",
    severity: "high",
    category: "Structured Data",
    specialist: "scout",
    description: "yoast-schema-graph contains WebPage and WebSite but lacks LocalBusiness.",
    why: "Search engines need explicit entity data to map local services.",
    effect: "Negative ranking impact in local pack",
    fix: "Add valid JSON-LD LocalBusiness schema with NAP data.",
    weight: 10,
    resolved: false
  },
  {
    id: "f9",
    title: "E-E-A-T signals lacking",
    severity: "high",
    category: "On-Page SEO",
    specialist: "scout",
    description: "No review or testimonial text detected on the homepage.",
    why: "Trust signals are required to validate business credibility to users and crawlers.",
    effect: "Negative ranking impact",
    fix: "Embed real customer reviews and testimonials prominently.",
    weight: 10,
    resolved: false
  },
  {
    id: "f10",
    title: "Missing HTML5 client-side validation on Contact form",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "Form fields lack the required attribute. The email field uses type='text' instead of type='email'.",
    why: "Client side validation ensures data integrity before submission.",
    effect: "Users can submit empty forms or malformed email addresses, causing potential loss of leads or increased spam.",
    fix: "Add required attributes and correct input types (email).",
    weight: 10,
    resolved: false
  },
  {
    id: "f11",
    title: "Phone number missing tel: link on homepage",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "The phone number is plain text and not wrapped in a clickable <a href='tel:...'> anchor tag, unlike the contact page.",
    why: "Clickable phone numbers are expected on modern mobile sites.",
    effect: "Mobile users cannot tap to call the business directly from the homepage, introducing friction to conversions.",
    fix: "Wrap phone numbers in <a href='tel:...'> tags.",
    weight: 10,
    resolved: false
  },
  {
    id: "f12",
    title: "Visual Quality Needs Modernization",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Flat visual execution lacking modern affordances like hover states or depth.",
    why: "Static elements fail to communicate interactivity and diminish the premium perception of detailing services.",
    effect: "Reduced trust and lower conversion rates from high value clients expecting premium experiences.",
    fix: "Add hover states, shadows, and subtle micro-interactions to buttons and cards.",
    weight: 10,
    resolved: false
  },
  {
    id: "f13",
    title: "Desktop hero typography dominates the viewport space",
    severity: "high",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Desktop hero typography wraps awkwardly.",
    why: "Oversized text pushes the primary call to action below the fold on standard laptop screens.",
    effect: "Increased bounce rate as users struggle to find immediate booking actions.",
    fix: "Adjust typography scale for standard desktop viewports.",
    weight: 10,
    resolved: false
  },
  {
    id: "f14",
    title: "Missing preconnect for Google Fonts",
    severity: "medium",
    category: "Performance",
    specialist: "blaze",
    description: "Fonts load via a stylesheet without a <link rel='preconnect' href='https://fonts.gstatic.com'>.",
    why: "The browser discovers font URLs late and must establish a new connection before downloading.",
    effect: "Adds ~200ms to font load time causing FOUT or FOIT",
    fix: "Add preconnect links for fonts.gstatic.com.",
    weight: 5,
    resolved: false
  },
  {
    id: "f15",
    title: "Legacy image formats used",
    severity: "medium",
    category: "Performance",
    specialist: "blaze",
    description: "Large images like the hero JPG and PNG logos serve in original formats instead of highly compressed WebP or AVIF.",
    why: "Legacy formats are significantly larger than modern formats.",
    effect: "Increased payload sizes slow down LCP on slower connections",
    fix: "Convert and serve images in WebP or AVIF.",
    weight: 5,
    resolved: false
  },
  {
    id: "f16",
    title: "Hardcoded inline colors & lack of CSS variables",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Hardcoded styles prevent global brand updates and create visual inconsistencies across different pages.",
    why: "A proper design system requires design tokens.",
    effect: "Maintenance costs rise and future brand updates require manual overrides.",
    fix: "Refactor CSS to use variables for colors and typography.",
    weight: 5,
    resolved: false
  },
  {
    id: "f17",
    title: "Heavy DOM bloat from page builder wrappers",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Deeply nested container structures increase render time and overall page weight.",
    why: "Divi and other builders tend to over-nest HTML elements.",
    effect: "Slower load times hurt search engine rankings and increase user abandonment.",
    fix: "Simplify DOM structure by removing unnecessary wrapper elements.",
    weight: 5,
    resolved: false
  },
  {
    id: "f18",
    title: "Missing semantic structural tags",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "aria",
    description: "Proper H1 is present but layout lacks semantic structural tags like article or section.",
    why: "Screen readers and search crawlers rely on semantic tags to interpret page architecture beyond headings.",
    effect: "Missed opportunities for featured snippets and optimized local search visibility.",
    fix: "Use semantic HTML5 elements like <section>, <article>, and <main>.",
    weight: 5,
    resolved: false
  },
  {
    id: "f19",
    title: "Empty logo navigation link",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "The main logo link has no text content and is missing an aria-label or title.",
    why: "Screen reader users will hear an empty link without understanding its destination.",
    effect: "Degrades accessibility.",
    fix: "Add an aria-label='Home' to the logo anchor tag.",
    weight: 5,
    resolved: false
  },
  {
    id: "f20",
    title: "Missing skip-to-content links",
    severity: "medium",
    category: "Accessibility & QA",
    specialist: "vega",
    description: "No internal anchor links (e.g., #main) are provided at the top of the document for keyboard users.",
    why: "Keyboard users need a way to skip repetitive navigation.",
    effect: "Keyboard-only users are forced to tab through the entire navigation on every page before reaching the main content.",
    fix: "Add a visually hidden skip link that becomes visible on focus.",
    weight: 5,
    resolved: false
  },
  {
    id: "f21",
    title: "Open Graph missing image",
    severity: "medium",
    category: "Technical SEO",
    specialist: "scout",
    description: "<meta property='og:image'> not found.",
    why: "Social shares will render without a preview image.",
    effect: "Negative CTR impact on social platforms",
    fix: "Add an og:image tag pointing to a representative branding image.",
    weight: 5,
    resolved: false
  },
  {
    id: "f22",
    title: "AI Search Readiness poor (no llms.txt)",
    severity: "medium",
    category: "Technical SEO",
    specialist: "scout",
    description: "/llms.txt returns 404, missing Q&A format in H2s.",
    why: "LLMs require structured, direct answers and markdown files to ground citations.",
    effect: "Negative ranking impact in AI Overviews",
    fix: "Add an llms.txt file and structure content with clear Q&A headings.",
    weight: 5,
    resolved: false
  },
  {
    id: "f23",
    title: "robots.txt lacks AI policy",
    severity: "low",
    category: "Technical SEO",
    specialist: "scout",
    description: "robots.txt present but allows all user agents without AI specific directives.",
    why: "Control over AI crawlers is necessary to protect content scraping.",
    effect: "Neutral indexability impact",
    fix: "Add explicit allow/disallow rules for AI crawlers like GPTBot in robots.txt.",
    weight: 2,
    resolved: false
  }
];

const categoryConfig = {
  "Technical SEO": { startScore: 30, findings: ["f21", "f22", "f23"], icon: "fa-solid fa-server" },
  "On-Page SEO": { startScore: 80, findings: ["f9"], icon: "fa-solid fa-file-code" },
  "Local SEO & GEO": { startScore: 100, findings: [], icon: "fa-solid fa-map-location-dot" },
  "Performance": { startScore: 60, findings: ["f2", "f5", "f6", "f7", "f14", "f15"], icon: "fa-solid fa-gauge-high" },
  "Accessibility & QA": { startScore: 40, findings: ["f1", "f3", "f4", "f10", "f11", "f12", "f13", "f16", "f17", "f18", "f19", "f20"], icon: "fa-solid fa-universal-access" },
  "Structured Data": { startScore: 60, findings: ["f8"], icon: "fa-solid fa-code" }
};

const passedItems = [
  { title: "Title Tags Optimized", category: "On-Page SEO", specialist: "scout", desc: "Keyword-first structure matches user intent for local queries." },
  { title: "Meta Descriptions Present", category: "On-Page SEO", specialist: "scout", desc: "Provides clear service summary." },
  { title: "Heading Structure Correct", category: "On-Page SEO", specialist: "scout", desc: "Single H1 establishes correct topical hierarchy." },
  { title: "Canonical Tags Present", category: "Technical SEO", specialist: "scout", desc: "Prevents duplicate content issues." },
  { title: "Routing and Pages", category: "Accessibility & QA", specialist: "vega", desc: "All internal navigation links return a 200 OK status. 404s are handled correctly." }
];`;

const startIndex = appJs.indexOf('// Audit Findings Database');
const endIndex = appJs.indexOf('let activeSeverityFilter = ');

appJs = appJs.substring(0, startIndex) + newData + "\\n\\n" + appJs.substring(endIndex);

// replace 'royalty_audit_state' with 'perfection_audit_state'
appJs = appJs.replace(/royalty_audit_state/g, 'perfection_audit_state');

fs.writeFileSync('app.js', appJs);
console.log('Updated app.js successfully!');
