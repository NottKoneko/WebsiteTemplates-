/**
 * SITE CONFIGURATION
 * Open-Source Retro Pastel Profile Template Boilerplate
 * Customize all text, links, headings, and images directly here without editing HTML!
 */

window.SITE_CONFIG = {
  // Website Metadata & Faux Address Bar
  meta: {
    title: "Retro Pastel Profile Template",
    domainPill: "yourdomain.com",
    domainUrl: "https://yourdomain.com",
  },

  // Top Header Chrome & Banner Configuration
  header: {
    navLinks: [
      { id: "home", label: "home" },
      { id: "menu", label: "menu" },
    ],
    bannerImage: {
      url: "assets/banner-placeholder.png",
      alt: "Banner Placeholder",
      maxHeight: "180px", // Set to "180px" or null/"none" for natural image aspect-ratio
    },
  },

  // Home Section Data (3 Columns Grid)
  homeSection: {
    // Column 1 (Left Sidebar)
    leftColumn: {
      avatarUrl: "assets/avatar-placeholder.png",
      name: "CreatorName",
      tagline: "A short customizable creator tagline or cozy introduction goes here.",
      statsButtonLabel: "stats",
      stats: [
        { label: "Energy", value: "★★★★☆" },
        { label: "Creativity", value: "★★★★★" },
        { label: "Comfy", value: "★★★★★" },
      ],
      favoriteThings: {
        title: "FAVORITE THINGS",
        items: [
          { category: "Interests", value: "Drawing, Gaming, Music" },
          { category: "Hobbies", value: "Coffee, Baking, Reading" },
          { category: "Music", value: "Lofi, Indie Pop, Acoustic" },
        ],
      },
      varietySchedule: {
        title: "Main schedule",
        text: "⧽・Every Monday & Thursday stream / content release at 6pm EST.",
      },
    },

    // Column 2 (Center Main Content)
    centerColumn: {
      heading: "Welcome to my room~",
      subheading: "Official information board & links directory",
      paragraphs: [
        "⧽・꒰ Welcome to my little corner on the web! Cozy vibes and daily updates ꒱",
        "・Use this space to introduce yourself, your creative projects, lore, or community guidelines.",
        "・Customize these text paragraphs easily inside config.js without editing any HTML.",
        "⧽・Thank you for visiting, and feel free to check out all my official links and projects below!",
      ],
      linkGroups: [
        {
          title: "Community & Contact",
          links: [
            { label: "Discord Server", url: "https://discord.gg/" },
            { label: "Contact / Q&A", url: "https://example.com" },
          ],
        },
        {
          title: "Support & Tips",
          links: [
            { label: "Ko-fi Tip Jar", url: "https://ko-fi.com/" },
            { label: "Wishlist", url: "https://throne.com/" },
            { label: "Donation Link", url: "https://paypal.com/" },
          ],
        },
        {
          title: "Streaming Channels",
          links: [
            { label: "Main Stream Channel", url: "https://twitch.tv/" },
            { label: "Secondary / VODs", url: "https://youtube.com/" },
          ],
        },
        {
          title: "Social Media",
          links: [
            { label: "Main Account", url: "https://x.com/" },
            { label: "Art & Media Account", url: "https://instagram.com/" },
            { label: "Updates Only", url: "https://x.com/" },
          ],
        },
        {
          title: "Portfolio & Commissions",
          links: [
            { label: "Portfolio / VGen", url: "https://vgen.co/" },
            { label: "Commission Form", url: "https://forms.google.com/" },
          ],
        },
      ],
    },

    // Column 3 (Right Sidebar)
    rightColumn: {
      todosTitle: "To dos:",
      todos: [
        "Update stream schedule",
        "Draw new emotes",
        "Drink plenty of water",
      ],
      statusTitle: "status",
      statusText: "♥ Working on new creative projects & stream assets!",
      calendarTitle: "Calendar",
      calendarDate: "Upcoming Event:",
      calendarEvent: "Next community stream and special event announcement.",
      sideScheduleTitle: "Side schedule",
      sideScheduleItems: [
        "⧽・Every Sunday weekly video release.",
        "・Every Friday special community gaming night at 7pm EST.",
      ],
      asmrScheduleTitle: "Side schedule",
      asmrScheduleItems: [
        "⧽・Every Sunday weekly video release.",
        "・Every Friday special community gaming night at 7pm EST.",
      ],
    },
  },

  // Subpage Section Data (Menu / Commissions / Catalog - 2 Columns)
  menuSection: {
    leftColumn: {
      commissionsHeading: "Custom Commissions",
      commissionsStatus: "OPEN",
      commissionsDesc: "⧽・Custom creative commissions and personal requests are currently open.",
      commissionButton: { label: "Request Form", url: "https://forms.google.com/" },
      disclaimerTitle: "Notice & Policy",
      disclaimerText: "⧽・All content and voice works are created for cozy entertainment. Please maintain respectful community boundaries and enjoy your stay!",
    },

    rightColumn: {
      title: "Service Catalog / Menu",
      description: "⧽・Feel free to suggest custom requests or choose from the categories below.",
      categories: [
        {
          title: "Category Group A",
          items: [
            "Item Option 1", "Item Option 2", "Item Option 3", "Item Option 4"
          ],
        },
        {
          title: "Category Group B",
          items: [
            "Item Option 1", "Item Option 2", "Item Option 3", "Item Option 4"
          ],
        },
        {
          title: "Category Group C",
          items: [
            "Item Option 1", "Item Option 2", "Item Option 3", "Item Option 4"
          ],
        },
      ],
    },
  },

  // Floating Footer Configuration
  footer: {
    text: '© built by <a href="https://github.com/NottKoneko" target="_blank" rel="noopener noreferrer" class="footer-github-link" aria-label="GitHub Profile"><svg class="github-icon" viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg></a>',
  },
};
