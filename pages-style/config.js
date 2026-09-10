/**
 * SITE CONFIGURATION
 * Open-Source Editorial Creator Portfolio Skeleton ("Pages Style")
 * Fully customizable text, links, rates, images, and video embeds!
 */

window.SITE_CONFIG = {
  // Website Metadata & Social Embed
  meta: {
    title: "CREATOR — Portfolio & Commission Guide",
    description: "Personal creator site, portfolio showcase, and commission guidelines skeleton template.",
    socialImage: "assets/preview.svg",
    themeColor: "#000000",
    domainPill: "yourdomain.com",
    domainUrl: "https://yourdomain.com",
  },

  // Header Configuration
  header: {
    updatedDate: "Site Last Updated 9/5/26",
    logoUrl: "assets/logo.svg",
    logoAlt: "Creator Mascot Logo",
    name: "C R E A T O R",
    tagline: "Illustration, Graphic Design, & Creative Direction",
    navLinks: [
      { id: "home", label: "Home", icon: "globe" },
      { id: "about", label: "Lore", icon: "user" },
      { id: "commissions", label: "Commission Info", icon: "info" },
      { id: "tos", label: "TOS", icon: "check" },
      { id: "portfolio", label: "Portfolio", icon: "copy" },
      { id: "contact", label: "Contact", icon: "mail" },
    ],
  },

  // Section 1: Home Overview
  homeSection: {
    title: "H O M E",
    // Featured video embed (YouTube or custom 16:9 embed URL)
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&controls=1",
    creditsHtml: 'PROJECT CREDITS › Art & Design: <a href="#" target="_blank">@ArtistHandle</a> / Motion & Video: <a href="#" target="_blank">@CreatorHandle</a>',
    intro: {
      tag: "I N T R O D U C T I O N",
      greeting: "› Welcome!",
      paragraphs: [
        "Welcome to my creative portfolio and information hub. Here you'll find an overview of my current projects, commission guidelines, and gallery showcase.",
        "My work focuses on illustration, character design, and digital media, collaborating with fellow creators, indie teams, and clients worldwide.",
        "Feel free to explore the navigation tabs above to review commission pricing, terms of service, and recent portfolio works.",
      ],
    },
    news: {
      tag: "N E W S",
      bullets: [
        "› Currently open for select commission inquiries and commercial collaborations.",
        "› Commission availability and waitlist status are updated regularly — check Commission Info for rates.",
        "› New illustration collections, merch designs, and project showcases are in active production.",
        "› For behind-the-scenes sketches, work-in-progress previews, and support, visit my <a href=\"#\" target=\"_blank\">Ko-fi</a> page.",
      ],
      subNote: "For custom inquiries, commercial licensing, or questions, feel free to reach out via the contact section.",
    },
  },

  // Section 2: Lore & Story
  aboutSection: {
    title: "L O R E",
    origin: {
      tag: "O R I G I N",
      text: "A passionate digital creator and visual storyteller dedicated to designing characters, building vibrant worlds, and exploring new artistic mediums. Constantly creating, learning, and sharing the creative journey.",
    },
    journey: {
      tag: "J O U R N E Y",
      text: "Started sharing digital art and content online to connect with fellow artists and cultivate an active community. Grateful to collaborate with amazing creators, indie teams, and supportive community members along the way.",
    },
    // 4-column community tags table
    tags: [
      { label: "Fanart Tag", value: "#YourArtTag" },
      { label: "Clipping Tag", value: "#YourClipTag" },
      { label: "Fan Name", value: "Community" },
      { label: "Oshi Marks", value: "✦ 🎨 ✦" },
    ],
    // FAQ Block
    faq: {
      tag: "F A Q",
      items: [
        {
          question: "1. What tools and software do you use?",
          answer: "› Industry-standard digital drawing tablets and creative illustration software.",
        },
        {
          question: "2. Are you open to collaborating with me?",
          answer: "› Open to select collaborations with fellow creators, mutuals, and indie development partners!",
        },
      ],
    },
    // Character Portrait Image
    portraitUrl: "assets/about-placeholder.svg?v=3",
    portraitAlt: "Character Illustration",

    // Optional Art Credit (can be turned on and off)
    artCredit: {
      show: true, // Set to true to display the credit, or false to hide it
      label: "Art Credit ›",
      artistName: "@ArtistHandle",
      artistUrl: "https://x.com/",
    },
  },

  // Section 3: Commissions Menu & Rates
  commissionsSection: {
    title: "C O M M I S S I O N S",
    statusNotice: "Open For Waitlist & Commercial Projects",
    tiers: [
      {
        heading: "L 2 D _ I L L U S T.",
        status: "Waitlist Open",
        price: "$650+",
        specs: [
          { label: "Fullbody Model Illustration", value: "Includes x5 base facial expressions (happy, sad, surprised, angry, blush). Complex accessories or wings quoted separately." },
          { label: "Resolution", value: "Approx. 5000px × 8000px, 300 DPI" },
          { label: "Deliverables", value: "Organized rig-ready .PSD file with separated layers + preview PNG display" },
          { label: "Usage Rights", value: "Includes digital streaming and personal content creation rights" },
        ],
      },
      {
        heading: "I L L U S T.",
        status: "Open",
        price: "$250+",
        specs: [
          { label: "Full Character Illustration", value: "Full-color render with lighting and atmospheric background." },
          { label: "Resolution", value: "4000px × 6000px, 300 DPI" },
          { label: "Deliverables", value: "High-resolution artwork PNG + textless clean version" },
          { label: "Usage Rights", value: "Personal display rights (commercial licensing available upon request)" },
        ],
      },
      {
        heading: "D E S I G N",
        status: "Open",
        price: "$300+",
        specs: [
          { label: "Character Reference Sheet", value: "Orthographic front/back views, costume breakdown callouts, color palette swatches, and 3 expressions." },
          { label: "Deliverables", value: "Full layered .PSD and high-res printable .PNG" },
        ],
      },
      {
        heading: "G F X",
        status: "Open",
        price: "$80+",
        specs: [
          { label: "Stream Asset Package", value: "Custom stream schedule template, starting/offline screens, stream overlay elements, and chat badges." },
          { label: "Deliverables", value: "Web-optimized PNG / WebP assets ready for OBS & streaming software" },
        ],
      },
    ],
  },

  // Section 4: Terms of Service
  tosSection: {
    title: "T O S",
    preamble: "✦ By requesting or purchasing a commission, you confirm that you have read, understood, and agreed to the following Terms of Service. Failure to adhere to these terms may result in cancellation or blacklisting.",
    categories: [
      {
        tag: "RIGHTS & USAGE",
        bullets: [
          "The artist retains full copyright ownership of all created artwork, including the right to display the work in portfolios, social media, and artbooks.",
          "Clients receive personal display rights. If you require private non-disclosure or deferred public posting, please request an NDA quote prior to production.",
          "Credit must be visibly provided (@CreatorHandle or portfolio link) whenever the artwork is showcased publicly.",
          "Redistributing, selling as NFTs, feeding into AI/generative machine learning models, or claiming authorship is strictly prohibited.",
        ],
      },
      {
        tag: "COMMERCIAL RIGHTS",
        bullets: [
          "Commercial licensing fees apply to merchandise, physical sales, game assets, albums, and broadcast advertising.",
          "Commercial rights may be requested upfront or licensed post-completion upon agreement.",
          "Commissions with approved commercial licensing receive prioritized scheduling and delivery buffers.",
        ],
      },
      {
        tag: "PAYMENT & PROCESS",
        bullets: [
          "Payments are processed securely via PayPal or Stripe invoicing in USD.",
          "Full payment upfront is required for standard commissions; 50/50 milestone splits available for orders exceeding $500.",
          "Refunds are not granted once sketch approval has been finalized and final coloring/linework has begun.",
        ],
      },
    ],
  },

  // Section 5: Portfolio Gallery
  portfolioSection: {
    title: "P O R T F O L I O",
    groups: [
      {
        heading: "P O R T F O L I O ' 2 5",
        items: [
          { title: "Live2D Model Art — Project Lumina", image: "assets/portfolio-1.svg" },
          { title: "Character Concept Illustration — Project Echo", image: "assets/portfolio-2.svg" },
          { title: "Editorial Promotional Cover — Project Mirage", image: "assets/portfolio-3.svg" },
        ],
      },
      {
        heading: "P O R T F O L I O ' 2 4",
        items: [
          { title: "Mascot & Stream Asset Package — Project Nova", image: "assets/portfolio-4.svg" },
          { title: "Scenic Key Visual Study — Project Solstice", image: "assets/portfolio-5.svg" },
          { title: "Costume Design Reference Sheet — Project Velvet", image: "assets/portfolio-6.svg" },
        ],
      },
    ],
  },

  // Section 6: Contact & Form
  contactSection: {
    title: "C O N T A C T",
    heading: "COMMISSION ME",

    /**
     * =========================================================================
     * INQUIRY & CONTACT CHANNELS (3 INDEPENDENT TOGGLES)
     * -------------------------------------------------------------------------
     * You can toggle any or all 3 inquiry options ON (true) or OFF (false):
     *   1. form             -> Direct on-page commission inquiry form
     *   2. directEmail      -> Pre-addressed mail launcher button & card
     *   3. externalPlatform -> External portal link (VGen, Ko-fi, Google Forms)
     *
     * How they work together:
     *   - Only Form:             form.enabled: true,  others: false
     *   - Only External (VGen):  externalPlatform.enabled: true, others: false
     *   - Only Direct Email:     directEmail.enabled: true, others: false
     *   - Form + External:       form & externalPlatform: true, directEmail: false
     *   - All 3 Active:          all 3 set to true (Form with quick buttons below)
     *   - All 3 Off:             all 3 set to false (Right column hides, guidelines expand)
     * =========================================================================
     */

    // Option 1: Built-in Commission Request Form
    form: {
      enabled: true, // Set to true to display the form, false to hide it

      /**
       * Form submission mode:
       *   - "demo":     Client-side test simulation with an on-screen toast confirmation.
       *                 Zero setup or backend needed. Great for testing!
       *   - "endpoint": Sends form data to any free static backend (e.g. FormSubmit, Formspree, Basin).
       *                 Simply enter your email in the endpoint URL below!
       *   - "mailto":   Clicking Send opens the visitor's mail client with all filled fields in the email body.
       */
      mode: "demo",

      // Static form service endpoint (used when mode is "endpoint")
      // Recommended: Replace with your actual email: "https://formsubmit.co/your-email@example.com"
      endpoint: "https://formsubmit.co/your-email@example.com",

      // Submit button text
      submitButtonText: "S E N D",

      // Success toast notification text
      successMessage: "✦ Thank you! Your request has been recorded.",
    },

    // Option 2: Direct Email Launcher (Mailto button & card)
    directEmail: {
      enabled: true, // Set to true to show this direct email option, false to hide

      // Your contact email address
      email: "hello@example.com",

      // Pre-filled subject line for visitor emails
      subject: "[Commission Inquiry] Request from Website",

      // Button label
      buttonLabel: "EMAIL DIRECTLY",

      // Short explanation or description text
      note: "Prefer traditional email? Click below to launch your email client with inquiry details.",
    },

    // Option 3: External Commission Portal (VGen, Ko-fi, Artistree, Google Forms, etc.)
    externalPlatform: {
      enabled: true, // Set to true to show this external portal option, false to hide

      // Platform name
      platformName: "VGen",

      // Link to your external commission profile or Google Form
      platformUrl: "https://vgen.co/",

      // Button label
      buttonLabel: "ORDER VIA VGEN",

      // Short explanation or description text
      note: "Prefer automated milestone escrow, queue tracking, and verified reviews? Request directly via VGen.",
    },

    instructions: [
      "✦ If you wish to commission me, please send an inquiry through social media or submit the form on the side. I will review your project details and get back to you promptly.",
      "✦ Please confirm that your desired commission tier is marked as open before submitting, unless you are inquiring about a custom commercial contract.",
    ],
    newsBullets: [
      "✦ Commission queue status and availability is updated weekly.",
      "✦ Commercial licensing and indie game asset requests are welcome year-round.",
      "✦ International clients accepted via Stripe / PayPal invoicing.",
      "✦ For direct questions or rush inquiries, feel free to reach out via email.",
    ],
    contactEmail: "hello@example.com",

    /**
     * Social Media Links (displayed in the canvas footer)
     * -------------------------------------------------------------
     * You can toggle individual icons "on" or "off" using the 'status' field:
     *   - status: "on"  -> The icon will be displayed in the footer
     *   - status: "off" -> The icon will be hidden without deleting your link
     *
     * Available icon presets:
     *   "twitter", "x", "twitch", "tiktok", "youtube", "kofi", "throne",
     *   "discord", "instagram", "bluesky", "patreon", "vgen", "pixiv",
     *   "artstation", "github", "spotify", "soundcloud", "tumblr", "cara",
     *   "reddit", "paypal", "email"
     * -------------------------------------------------------------
     */
    socialLinks: [
      { name: "Twitter / X", url: "https://x.com/", icon: "twitter", status: "on" },
      { name: "Twitch", url: "https://twitch.tv/", icon: "twitch", status: "on" },
      { name: "TikTok", url: "https://tiktok.com/", icon: "tiktok", status: "on" },
      { name: "YouTube", url: "https://youtube.com/", icon: "youtube", status: "on" },
      { name: "Ko-fi", url: "https://ko-fi.com/", icon: "kofi", status: "on" },
      { name: "Throne", url: "https://throne.com/", icon: "throne", status: "on" },
      { name: "Discord", url: "https://discord.gg/", icon: "discord", status: "off" },
      { name: "Instagram", url: "https://instagram.com/", icon: "instagram", status: "on" },
      { name: "Bluesky", url: "https://bsky.app/", icon: "bluesky", status: "off" },
      { name: "Patreon", url: "https://patreon.com/", icon: "patreon", status: "on" },
      { name: "VGen", url: "https://vgen.co/", icon: "vgen", status: "off" },
      { name: "Pixiv", url: "https://pixiv.net/", icon: "pixiv", status: "on" },
      { name: "ArtStation", url: "https://artstation.com/", icon: "artstation", status: "on" },
      { name: "GitHub", url: "https://github.com/", icon: "github", status: "on" },
      { name: "Spotify", url: "https://spotify.com/", icon: "spotify", status: "on" },
      { name: "Cara", url: "https://cara.app/", icon: "cara", status: "on" },
    ],
  },

  // Floating Footer Configuration
  footer: {
    text: '© built by <a href="https://github.com/NottKoneko" target="_blank" rel="noopener noreferrer" class="footer-github-link" aria-label="GitHub Profile"><svg class="github-icon" viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg></a>',
  },
};
