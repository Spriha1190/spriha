/**
 * Single source of truth for Spriha Ghosh Puja's portfolio & CV data.
 * Public-safe phone and illustrative competitive-programming stats are explicitly flagged (Demo).
 * Academic credentials, 7 engineering projects, and DIU reference match her verified CV.
 */
window.SPRIHA_DATA = {
  profile: {
    name: 'Spriha Ghosh Puja',
    shortName: 'Spriha Ghosh',
    role: 'CSE Undergraduate · Software & UI Builder',
    phoneDisplay: '+880 1700-000000',
    phoneNote: '(Demo)',
    email: 'puja23105101302@gmail.com',
    github: 'https://github.com/Spriha1190',
    githubHandle: 'Spriha1190',
    linkedin: 'https://www.linkedin.com/in/spriha-ghosh-puja-1907b3451',
    presentAddress: 'Ashulia, Savar, Dhaka',
    permanentAddress: 'Natore, Rajshahi',
    reference: {
      name: 'Mohammad Monirul Islam',
      title: 'Assistant Professor',
      institution: 'Daffodil International University',
      email: 'monirul@diu.edu.bd'
    }
  },

  projects: [
    {
      index: '01',
      id: 'artificial-life-simulator',
      title: 'Artificial Life Evolution Simulator',
      category: 'Graphics & Simulation',
      course: 'Computer Graphics Design',
      featured: true,
      demoType: 'life',
      summary: 'Interactive visual simulation modeling cellular agents that navigate 2D space, seek nutrients, mutate traits, and evolve over successive generations.',
      architecture: 'Built around a real-time frame loop separating organism state vectors (position, energy, speed, trait hue) from 2D raster rendering and generational population analytics.',
      highlights: [
        'Real-time generational life-cycle visualization on a 2D coordinate plane',
        'Trait inheritance and stochastic mutation across energy-seeking agents',
        'Interactive controls (play/pause, mutation boost, speed tuning)'
      ],
      tags: ['Computer Graphics', '2D Simulation', 'Evolutionary Logic', 'State Loop']
    },
    {
      index: '02',
      id: 'office-network-architecture',
      title: 'Office Network Architecture',
      category: 'Hardware & Networks',
      course: 'Computer Networks',
      featured: true,
      demoType: 'network',
      summary: 'Segmented multi-department enterprise network blueprint featuring VLAN isolation, subnetting, Layer-3 routing, and security access policies.',
      architecture: 'Designed hierarchical core-distribution topology isolating Admin, Engineering, Server DMZ, and Guest Wi-Fi subnets with inter-VLAN routing and firewall ACL boundaries.',
      highlights: [
        'CIDR IPv4 subnet planning across four isolated departmental VLANs',
        'Gateway redundancy and firewall policy verification for DMZ services',
        'Deterministic packet-hop verification from workstation to target server'
      ],
      tags: ['VLANs', 'Subnetting', 'Routing & ACL', 'Network Topology']
    },
    {
      index: '03',
      id: 'luggage-security-system',
      title: 'Luggage Security System (DLD)',
      category: 'Hardware & Networks',
      course: 'Digital Logic Design',
      featured: true,
      demoType: 'dld',
      summary: 'Combinational and sequential digital logic alarm system engineered to protect traveler baggage against unauthorized tampering and separation.',
      architecture: 'Combines armed lock toggle, physical tamper contact sensor, and proximity-loss signal through deterministic AND/OR logic gates to drive visual and audible alerts.',
      highlights: [
        'Boolean truth-table optimization minimizing gate count and propagation delay',
        'Fail-safe armed gating: ALARM = Armed AND (Tamper OR ProximityLoss)',
        'Clear status indicators distinguishing Standby, Armed Safe, and Alert states'
      ],
      tags: ['Digital Logic', 'Boolean Algebra', 'Combinational Gates', 'Hardware Design']
    },
    {
      index: '04',
      id: 'hotel-management-system',
      title: 'Hotel Management System',
      category: 'Management Systems',
      course: 'Object-Oriented Programming (OOP)',
      featured: true,
      demoType: 'mockup',
      summary: 'Modular OOP hospitality management solution encapsulating room tiers, guest check-in/check-out workflows, reservation conflict checks, and billing.',
      architecture: 'Applies encapsulation, inheritance (Standard, Deluxe, Suite room classes), and polymorphism for dynamic tariff calculation and clean state persistence.',
      highlights: [
        'Clean class hierarchy separating Guest, Room, Booking, and Invoice models',
        'Automated room availability validation and itemized invoice generation',
        'Maintainable OOP patterns ready for database or GUI extension'
      ],
      tags: ['OOP Architecture', 'Encapsulation', 'Reservation Logic', 'Billing']
    },
    {
      index: '05',
      id: 'hospital-management-system',
      title: 'Hospital Management System',
      category: 'Management Systems',
      course: 'Software & Database Systems',
      featured: false,
      demoType: 'mockup',
      summary: 'Structured healthcare operations portal uniting patient registration, doctor appointment scheduling, ward allocation, and clinical billing records.',
      architecture: 'Organizes clinical entities around relational keys linking patients, physicians, diagnostic slots, and pharmacy/ward charges with strict validation.',
      highlights: [
        'Patient intake, medical ID lookup, and appointment conflict prevention',
        'Doctor shift scheduling and ward/bed occupancy tracking',
        'Consolidated discharge billing summary with transparent line items'
      ],
      tags: ['System Design', 'Patient Records', 'Scheduling', 'Data Integrity']
    },
    {
      index: '06',
      id: 'restaurant-management-system',
      title: 'Restaurant Management System',
      category: 'Management Systems',
      course: 'Software & System Design',
      featured: false,
      demoType: 'mockup',
      summary: 'End-to-end dining workflow manager coordinating table status, digital order tickets, kitchen preparation queues, and split/taxed receipts.',
      architecture: 'State-driven table and order lifecycle tracking items from table seating through kitchen queue completion to final payment settlement.',
      highlights: [
        'Live table occupancy map (Available, Occupied, Billing Ready)',
        'Menu catalog lookup with modifier notes and automatic subtotal/VAT math',
        'Kitchen ticket prioritization reducing order handoff ambiguity'
      ],
      tags: ['Workflow State', 'Order Queue', 'Menu Modeling', 'Invoicing']
    },
    {
      index: '07',
      id: 'cafe-management-system',
      title: 'Cafe Management System',
      category: 'Management Systems',
      course: 'Application & POS Design',
      featured: false,
      demoType: 'mockup',
      summary: 'Fast counter point-of-sale interface built for beverage customization, quick order entry, stock alerts, and daily sales summaries.',
      architecture: 'Streamlined counter POS layout prioritizing minimal clicks per order, ingredient consumption tracking, and end-of-day revenue reporting.',
      highlights: [
        'Quick-select beverage & bakery catalog with size/add-on pricing',
        'Real-time cart tallying and instant customer receipt formatting',
        'Daily sales & popular item summary metrics for inventory planning'
      ],
      tags: ['POS Interface', 'Cart Logic', 'Inventory Tracking', 'Reporting']
    }
  ],

  researchInterests: [
    {
      title: 'Artificial Intelligence',
      tag: 'Core Track',
      description: 'Intelligent agent behavior, knowledge representation, and human-centered automation.'
    },
    {
      title: 'Machine Learning',
      tag: 'Core Track',
      description: 'Pattern discovery, predictive modeling, and structured data analysis workflows.'
    },
    {
      title: 'Graphics Design',
      tag: 'Visual Computing',
      description: '2D generative simulations, editorial UI composition, typography, and motion systems.'
    },
    {
      title: 'Software Engineering',
      tag: 'Systems',
      description: 'Modular OOP design, accessible front-end architecture, and maintainable web apps.'
    }
  ],

  researchPapers: [
    {
      id: 'res-ai-life',
      badge: 'Undergraduate Research Track · Simulation & AI',
      title: 'Behavioral Adaptation & Trait Emergence in 2D Artificial Life Environments',
      venue: 'Department of CSE, Daffodil International University — Ongoing Exploration',
      abstract: 'Investigates how lightweight rule-based autonomous agents respond to spatial resource scarcity and stochastic mutation in interactive 2D graphics pipelines, bridging foundational AI concepts with real-time browser visualization.'
    },
    {
      id: 'res-se-ux',
      badge: 'Undergraduate Research Track · Software Engineering & UI',
      title: 'Accessible Architecture Patterns for Academic & Healthcare Management Systems',
      venue: 'Software Engineering Study Notes — Working Draft',
      abstract: 'Examines how semantic HTML5 validation, relational entity modeling, and low-friction user interfaces reduce data-entry errors across hospitality, restaurant, and hospital management workflows.'
    }
  ],

  programmingProfiles: [
    {
      platform: 'GitHub',
      handle: '@Spriha1190',
      url: 'https://github.com/Spriha1190',
      isDemo: true,
      summary: 'Public profile for software architecture, web interfaces, and academic project repositories.',
      stats: [
        { label: 'Public Repos (Demo)', value: '12+' },
        { label: 'Primary Focus', value: 'Web / OOP' },
        { label: 'Status', value: 'Active' }
      ]
    },
    {
      platform: 'Codeforces',
      handle: 'spriha_puja (Demo)',
      url: 'https://codeforces.com/',
      isDemo: true,
      summary: 'Algorithmic problem solving in C++ and Java covering greedy logic, arrays, and constructive math.',
      stats: [
        { label: 'Handle Type', value: 'Demo Profile' },
        { label: 'Solved (Demo)', value: '120+' },
        { label: 'Core Lang', value: 'C++ / Java' }
      ]
    }
  ],

  mediaGallery: [
    {
      id: 'photography',
      title: 'Photography',
      subtitle: 'Light, Architecture & Quiet Moments',
      image: 'assets/images/media-photography.svg',
      alt: 'Editorial illustration of a classic rangefinder camera bathed in warm golden-hour botanical shadows',
      caption: 'Exploring natural sunlight, framing, and candid storytelling through everyday scenes around campus and Natore.'
    },
    {
      id: 'drawing',
      title: 'Drawing & Sketching',
      subtitle: 'Botanical Studies & Visual Balance',
      image: 'assets/images/media-drawing.svg',
      alt: 'Editorial illustration of an open botanical sketchbook with fine-line ink floral art and brass pen',
      caption: 'Hand-drawn botanical studies and geometric compositions that sharpen my eye for layout proportion and UI whitespace.'
    },
    {
      id: 'crafting',
      title: 'Handcrafted Design',
      subtitle: 'Tactile Paper Art & Detail Work',
      image: 'assets/images/media-crafting.svg',
      alt: 'Editorial illustration of artisan handmade paper floral origami with silk ribbon and gold thread',
      caption: 'Patience-driven paper crafting and textured arrangements that inspire thoughtful color harmony in digital design.'
    },
    {
      id: 'singing',
      title: 'Singing & Acoustic Rhythm',
      subtitle: 'Vocal Expression & Melody',
      image: 'assets/images/media-singing.svg',
      alt: 'Editorial illustration of a vintage studio condenser microphone framed by golden acoustic sound waves',
      caption: 'Music brings cadence and calm focus to my engineering routine—listen to the acoustic loop sample below.'
    },
    {
      id: 'travelling',
      title: 'Travelling',
      subtitle: 'From Natore to Dhaka & Beyond',
      image: 'assets/images/media-travelling.svg',
      alt: 'Editorial illustration of misty hills and a serene river winding beneath a rose-gold dawn sky',
      caption: 'Discovering new landscapes, local culture, and fresh perspectives outside the screen.'
    }
  ],

  commands: [
    { label: 'Home — Portfolio Hub', hint: 'Page', action: 'navigate', target: 'index.html' },
    { label: 'About — Education, Research, Activities & Media', hint: 'Page', action: 'navigate', target: 'about.html' },
    { label: 'Projects — All 7 Engineering Works', hint: 'Page', action: 'navigate', target: 'projects.html' },
    { label: 'Contact — Form & Academic Reference', hint: 'Page', action: 'navigate', target: 'contact.html' },
    { label: 'CV — Printable Curriculum Vitae', hint: 'Document', action: 'navigate', target: 'cv.html' },
    { label: 'Research Interests (AI · ML · Graphics · SE)', hint: 'Section', action: 'navigate', target: 'index.html#research-section' },
    { label: 'Programming Profiles (GitHub & Codeforces)', hint: 'Section', action: 'navigate', target: 'index.html#profiles-section' },
    { label: 'Toggle Light / Dark Theme', hint: 'Action', action: 'theme' },
    { label: 'Copy Email (puja23105101302@gmail.com)', hint: 'Copy', action: 'copy', target: 'puja23105101302@gmail.com' }
  ]
};
