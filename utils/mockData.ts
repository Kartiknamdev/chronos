import { WorldData, WhatIfData } from '@/types';

// Mock World: Netflix
export const netflixWorld: WorldData = {
  metadata: {
    name: 'Netflix',
    tagline: 'From DVD rental by mail to global streaming empire.',
    description: 'An exploration of how Netflix transformed the media industry by pioneering streaming video, migrating its entire infrastructure to the cloud, and developing a sophisticated global content delivery network.',
    category: 'Company & Technology',
    icon: 'Tv'
  },
  timeline: [
    {
      year: '1997',
      title: 'Foundation',
      description: 'Reed Hastings and Marc Randolph found Netflix in Scotts Valley, California, offering DVD rentals by mail.',
      isMilestone: true,
      technologies: ['HTML', 'PostgreSQL', 'DVD format'],
      decisions: ['Flat-rate rental model', 'No late fees'],
      impact: 'Disrupted traditional video rental stores like Blockbuster by eliminating friction in returns.'
    },
    {
      year: '2007',
      title: 'Launch of Streaming',
      description: 'Netflix introduces "Watch Instantly," allowing subscribers to stream movies and TV shows directly on their PCs.',
      isMilestone: true,
      technologies: ['Silverlight', 'Windows Media Video', 'HTTP Progressive Download'],
      decisions: ['Investing in streaming despite slow broadband speeds', 'Licensing external content catalog'],
      impact: 'Shifted user consumption from physical media to on-demand digital content.'
    },
    {
      year: '2010',
      title: 'The Great Cloud Migration',
      description: 'Following a major database corruption in 2008, Netflix decides to move its entire infrastructure to AWS.',
      isMilestone: true,
      technologies: ['AWS EC2', 'AWS S3', 'Apache Cassandra'],
      decisions: ['Moving away from proprietary datacenters', 'Adopting cloud-native microservices architecture'],
      impact: 'Increased operational resilience and allowed horizontal scaling to support massive user growth.'
    },
    {
      year: '2012',
      title: 'Open Connect CDN & Global Expansion',
      description: 'Netflix launches Open Connect, its own custom Content Delivery Network, to bypass commercial CDNs and ISP congestion.',
      isMilestone: true,
      technologies: ['FreeBSD', 'Nginx', 'BGP routing', 'Custom storage hardware'],
      decisions: ['Building hardware appliances and giving them to ISPs for free'],
      impact: 'Kept ISP traffic local, reduced buffering, and enabled 4K/HDR streaming globally.'
    },
    {
      year: '2016',
      title: 'Going Global & Microservices Scale',
      description: 'Netflix launches in 130 new countries simultaneously, expanding to a global network serving over 100M subscribers.',
      isMilestone: false,
      technologies: ['Kafka', 'Zuul API Gateway', 'EVCache', 'Hystrix Circuit Breaker'],
      decisions: ['Polyglot microservices', 'Simian Army (Chaos Monkey) for resiliency testing'],
      impact: 'Standardized modern cloud architectures and proved that system resilience can be automated.'
    },
    {
      year: '2021',
      title: 'Next-Gen Video Encoding',
      description: 'Netflix rolls out AV1 video codec streaming for compatible TVs, achieving high visual quality at significantly lower bitrates.',
      isMilestone: false,
      technologies: ['AV1 Codec', 'Dynamic Optimizer AI', 'FFmpeg'],
      decisions: ['Adopting royalty-free video codecs', 'Dynamic per-scene asset optimization'],
      impact: 'Reduced cellular bandwidth usage for mobile users and improved quality on low-speed connections.'
    }
  ],
  entities: [
    {
      id: 'client',
      name: 'Client Applications',
      type: 'client',
      description: 'Smart TVs, Mobile Devices, Web Browsers, and Consoles rendering the UI and handling video playback decryption.',
      tech: 'React, Exoplayer, AV1/HEVC decoders'
    },
    {
      id: 'gateway',
      name: 'API Gateway (Zuul)',
      type: 'gateway',
      description: 'Entry point for all requests. Handles routing, load balancing, filters, and security checks.',
      tech: 'Java, Netty, Zuul 2'
    },
    {
      id: 'auth_service',
      name: 'Authentication Service',
      type: 'auth',
      description: 'Authenticates user sessions, manages credentials, and enforces DRM rights.',
      tech: 'OAuth 2.0, Widevine/FairPlay Integration'
    },
    {
      id: 'subscriber_service',
      name: 'Subscriber Profile Service',
      type: 'service',
      description: 'Manages user profile settings, viewing history, and preferences.',
      tech: 'Spring Boot, Cassandra'
    },
    {
      id: 'recommendation_engine',
      name: 'Recommendation System',
      type: 'service',
      description: 'Complex machine learning pipeline generating personalized content homepages in real-time.',
      tech: 'Python, TensorFlow, Spark, Meson'
    },
    {
      id: 'cache_layer',
      name: 'Distributed Cache (EVCache)',
      type: 'cache',
      description: 'High-speed cache wrapper around Memcached, optimized for fast subscriber metadata access.',
      tech: 'EVCache, Memcached'
    },
    {
      id: 'db_cassandra',
      name: 'Cassandra Database Cluster',
      type: 'database',
      description: 'Primary active-active multi-region datastore storing subscriber history and preferences.',
      tech: 'Apache Cassandra'
    },
    {
      id: 'cdn_openconnect',
      name: 'Open Connect CDN',
      type: 'external',
      description: 'Netflix-owned server appliances installed inside ISPs, storing cached video files close to the user.',
      tech: 'FreeBSD, Nginx, Solid State Storage'
    }
  ],
  relationships: [
    {
      source: 'client',
      target: 'gateway',
      label: 'Secure API Requests (HTTPS)',
      type: 'data'
    },
    {
      source: 'client',
      target: 'cdn_openconnect',
      label: 'Stream Video Blocks (TCP/HTTPS)',
      type: 'data'
    },
    {
      source: 'gateway',
      target: 'auth_service',
      label: 'Authenticate Requests',
      type: 'rpc'
    },
    {
      source: 'gateway',
      target: 'subscriber_service',
      label: 'Fetch Profiles',
      type: 'rpc'
    },
    {
      source: 'gateway',
      target: 'recommendation_engine',
      label: 'Get Homepage Layout',
      type: 'rpc'
    },
    {
      source: 'subscriber_service',
      target: 'cache_layer',
      label: 'Fast Lookup',
      type: 'data'
    },
    {
      source: 'subscriber_service',
      target: 'db_cassandra',
      label: 'Persist History',
      type: 'data'
    },
    {
      source: 'recommendation_engine',
      target: 'db_cassandra',
      label: 'Analyze User History',
      type: 'data'
    }
  ],
  architecture: {
    overview: 'Netflix uses a hybrid cloud model: AWS handles all non-streaming tasks (signup, billing, recommendation, search, database management) in a microservice structure. Live video streaming itself is routed through Open Connect, a global custom Content Delivery Network designed to optimize bandwidth by caching content directly inside internet service providers.',
    scalingStrategy: 'Multi-region replication with active-active databases, automated failover routing, and Chaos Engineering pipelines that continuously test outages in production.',
    databaseChoices: 'NoSQL Cassandra for scalable, low-latency profile history writes. Relational databases in AWS RDS for acid-compliant transactional billing data. Memcached/EVCache for sub-millisecond session state lookup.'
  },
  technologies: [
    {
      name: 'Apache Cassandra',
      purpose: 'Scale-out profile history data storage across multiple geographic regions.',
      pros: ['Masterless architecture', 'Excellent write throughput', 'Tunable consistency']
    },
    {
      name: 'EVCache',
      purpose: 'Low-latency in-memory cache backing microservices.',
      pros: ['High replication throughput', 'AWS-aware integration', 'Linear scaling']
    },
    {
      name: 'AV1 Codec',
      purpose: 'Next generation royalty-free video compression.',
      pros: ['30% more efficient than VP9', 'Outstanding HDR reproduction', 'Low bandwidth requirements']
    }
  ],
  futurePredictions: [
    {
      timeframe: '1-3 Years',
      trend: 'Dynamic Real-time Personalization',
      prediction: 'Generative AI custom-creates video thumbnails and previews tuned to the exact mood and immediate search behavior of the user.',
      challenges: ['High computational costs on AWS', 'Quality assurance for dynamically generated assets']
    },
    {
      timeframe: '3-5 Years',
      trend: 'Interactive Edge WebAssembly',
      prediction: 'Streaming media becomes interactive, executing lightweight WebAssembly-based gaming and narrative branching code directly on the nearest Open Connect CDN node.',
      challenges: ['Sandboxing security risks on ISP-hosted hardware', 'Ensuring low-latency synchronization across devices']
    }
  ],
  interestingFacts: [
    {
      title: 'The Chaos Monkey',
      fact: 'Netflix engineers created Chaos Monkey, a tool that randomly shuts down production servers. This forced developers to build systems that survive individual instance failures without bringing down the service.'
    },
    {
      title: '30% of US Internet Traffic',
      fact: 'At its peak streaming hours in the mid-2010s, Netflix accounted for over one-third of downstream internet traffic in North America.'
    }
  ],
  references: [
    {
      title: 'Netflix Tech Blog - Medium',
      url: 'https://netflixtechblog.com'
    },
    {
      title: 'How Netflix Migrated to AWS',
      url: 'https://aws.amazon.com/solutions/case-studies/netflix-case-study/'
    }
  ]
};

// Mock World: Instagram
export const instagramWorld: WorldData = {
  metadata: {
    name: 'Instagram',
    tagline: 'Connecting people through photos, stories, and reels at scale.',
    description: 'An architectural deep dive into how Instagram scaled from a simple photo-sharing app built in a few months to a massive social network serving over a billion active users.',
    category: 'Company & Technology',
    icon: 'Camera'
  },
  timeline: [
    {
      year: '2010',
      title: 'Launch on iOS',
      description: 'Kevin Systrom and Mike Krieger launch Instagram as a photo-sharing app with retro filters.',
      isMilestone: true,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Objective-C'],
      decisions: ['Focusing exclusively on mobile', 'Square-only photos', 'Simple filter tools'],
      impact: 'Reached 100,000 users in one week, transforming photo sharing into a visual social network.'
    },
    {
      year: '2012',
      title: 'Android Launch & Facebook Acquisition',
      description: 'Instagram launches on Android (securing 1M downloads in 24 hours) and is acquired by Facebook for $1B shortly after.',
      isMilestone: true,
      technologies: ['Android SDK', 'Java', 'Ubuntu servers'],
      decisions: ['Staying independent as an app team', 'Migrating backend servers to Facebook datacenters'],
      impact: 'Accelerated user scaling and gave access to Facebook\'s world-class server infrastructure.'
    },
    {
      year: '2013',
      title: 'Direct Messaging & Video Content',
      description: 'Instagram introduces Direct Messaging (DM) and 15-second video uploads, moving beyond static images.',
      isMilestone: false,
      technologies: ['MP4 Video Encoding', 'WebSockets', 'Redis Queue'],
      decisions: ['Adding real-time messaging pipeline', 'Limiting video length to ensure fast uploads'],
      impact: 'Transformed Instagram into a messaging platform, capturing video-sharing market share.'
    },
    {
      year: '2016',
      title: 'Stories Launch & Algorithm Feed',
      description: 'Instagram introduces "Stories" (ephemeral photos and videos disappearing after 24h) and shifts the feed from chronological to algorithmic.',
      isMilestone: true,
      technologies: ['Cassandra', 'PyTorch ML', 'React Native'],
      decisions: ['Cloning Snapchat format directly', 'Using user-engagement models to reorder home feed'],
      impact: 'Drastically increased time spent on app, successfully countering Snapchat\'s growth.'
    },
    {
      year: '2020',
      title: 'Reels and E-commerce',
      description: 'Instagram launches Reels to compete with TikTok and adds shopping tags to images and stories.',
      isMilestone: true,
      technologies: ['H.265/HEVC video', 'Graph APIs', 'PyTorch'],
      decisions: ['Prioritizing short-form video algorithms over photo updates'],
      impact: 'Pivoted the app architecture into a video-first algorithm and shopping hub.'
    }
  ],
  entities: [
    {
      id: 'client',
      name: 'Mobile Client (iOS/Android)',
      type: 'client',
      description: 'Rich mobile application rendering feeds, stories, capturing media, and performing local filtering.',
      tech: 'React Native, Objective-C, Java'
    },
    {
      id: 'load_balancer',
      name: 'Load Balancer (Nginx)',
      type: 'gateway',
      description: 'Routes API calls to backend server pools. Handles SSL termination and request rate limiting.',
      tech: 'Nginx, HAProxy'
    },
    {
      id: 'django_app',
      name: 'Application Server (Django)',
      type: 'service',
      description: 'Monolithic Django application pool handling feed logic, uploads, comments, and relationship graphs.',
      tech: 'Python, Django, uWSGI'
    },
    {
      id: 'redis_cache',
      name: 'In-Memory Cache (Redis)',
      type: 'cache',
      description: 'Caches user timelines, social graph links, and session metadata for lightning-fast reads.',
      tech: 'Redis, Memcached'
    },
    {
      id: 'db_postgres',
      name: 'PostgreSQL DB (Sharded)',
      type: 'database',
      description: 'Primary transactional database storing profiles, photo metadata, likes, and follows.',
      tech: 'PostgreSQL, PL/pgSQL, Sharding keys'
    },
    {
      id: 's3_storage',
      name: 'Media Storage (S3 / CDN)',
      type: 'storage',
      description: 'Stores raw and compressed photos and videos, served globally through CDNs.',
      tech: 'AWS S3, Cloudflare, Akamai'
    },
    {
      id: 'celery_workers',
      name: 'Asynchronous Workers',
      type: 'service',
      description: 'Process video transcoding, notification delivery, and feed distribution in the background.',
      tech: 'Celery, RabbitMQ'
    }
  ],
  relationships: [
    {
      source: 'client',
      target: 'load_balancer',
      label: 'API Request (HTTPS)',
      type: 'data'
    },
    {
      source: 'client',
      target: 's3_storage',
      label: 'Fetch Images & Uploads',
      type: 'data'
    },
    {
      source: 'load_balancer',
      target: 'django_app',
      label: 'Route Request',
      type: 'rpc'
    },
    {
      source: 'django_app',
      target: 'redis_cache',
      label: 'Fetch Session/Feed Cache',
      type: 'data'
    },
    {
      source: 'django_app',
      target: 'db_postgres',
      label: 'Read/Write Data',
      type: 'data'
    },
    {
      source: 'django_app',
      target: 'celery_workers',
      label: 'Queue Background Task',
      type: 'pubsub'
    },
    {
      source: 'celery_workers',
      target: 's3_storage',
      label: 'Transcode & Save Media',
      type: 'data'
    }
  ],
  architecture: {
    overview: 'Instagram has famously scaled its Python/Django monolith. The infrastructure relies heavily on database sharding across thousands of PostgreSQL logical databases, backed by aggressive caching with Redis and Memcached. Dynamic workloads are offloaded to background worker queues, keeping the web request lifecycle short.',
    scalingStrategy: 'PostgreSQL database sharding based on customized user IDs (allowing all data for a single user to reside in the same shard), alongside massive caching of feed states in Redis clusters.',
    databaseChoices: 'PostgreSQL for robust, structured user schemas. Redis for fast index-caching and task queues. AWS S3 for secure object storage of heavy image files.'
  },
  technologies: [
    {
      name: 'Django Monolith',
      purpose: 'Core API routing and business logic execution.',
      pros: ['Rapid iteration speed', 'Mature codebase ecosystem', 'Simple debugging']
    },
    {
      name: 'PostgreSQL Sharding',
      purpose: 'Store relational data with manual range/hash sharding.',
      pros: ['ACID transactions', 'Custom SQL optimization', 'Scales across physical hardware']
    },
    {
      name: 'Redis',
      purpose: 'Fast temporal feeds caching and message broker.',
      pros: ['Microsecond lookups', 'Pub/sub messaging structures', 'Rich data types support']
    }
  ],
  futurePredictions: [
    {
      timeframe: '1-2 Years',
      trend: 'Generative AI Creation Tools',
      prediction: 'Users edit photo backdrops, expand borders, and generate full clothing options inside the camera view via local/cloud AI pipelines.',
      challenges: ['Mobile device GPU limitations', 'Moderation of synthesized imagery']
    },
    {
      timeframe: '3-5 Years',
      trend: 'Immersive 3D Spatial Feeds',
      prediction: 'Feeds transition to spatial assets viewable on VR/AR headsets, with virtual rooms replacing standard grid profiles.',
      challenges: ['New high-dimensional asset formats', 'Broadband bandwidth constraints for real-time 3D rendering']
    }
  ],
  interestingFacts: [
    {
      title: 'Only 13 Employees',
      fact: 'When Facebook bought Instagram for $1 Billion in 2012, the entire company had only 13 employees, serving over 30 million active users.'
    },
    {
      title: 'Scaling Python to Billions',
      fact: 'Instagram has one of the world\'s largest Django deployments. To improve efficiency, they have contributed numerous speed optimizations directly back to the Python Core and CPython compiler.'
    }
  ],
  references: [
    {
      title: 'Instagram Engineering Blog',
      url: 'https://instagram-engineering.com'
    },
    {
      title: 'How Instagram Shards Databases',
      url: 'https://instagram-engineering.com/sharding-ids-at-instagram-c1cf87ac2fce'
    }
  ]
};

// Mock What-If Scenario: "What if Linux had never existed?"
export const linuxWhatIf: WhatIfData = {
  metadata: {
    name: 'What if Linux Never Existed?',
    tagline: 'An alternate timeline of computing without the open-source kernel.',
    description: 'Explore the hypothetical timeline where Linus Torvalds abandoned his hobby project in 1991, leaving the software world to split between proprietary Unix vendors and Microsoft dominance.',
    category: 'Alternative History',
    icon: 'HelpCircle'
  },
  originalTimeline: [
    { year: '1991', event: 'Linus Torvalds releases the Linux kernel v0.01 under GPL.' },
    { year: '1993', event: 'Distributions like Slackware and Debian are founded, popularizing free open-source operating systems.' },
    { year: '1998', event: 'Major tech corporations (IBM, Oracle, Netscape) announce support for Linux, legitimizing it for enterprises.' },
    { year: '2001', event: 'Linux runs the web, power-scaling server infrastructures.' },
    { year: '2008', event: 'Google releases Android, built on top of the Linux kernel, capturing the smartphone market.' },
    { year: '2013', event: 'Docker is released, ushering in the containerization era, entirely dependent on Linux kernel namespaces.' }
  ],
  branchPoint: {
    year: '1991',
    divergencePrompt: 'What if Linus Torvalds purchased a commercial UNIX license instead of writing his own kernel?',
    alternativeEvent: 'Linus Torvalds abandons his kernel project. GNU remains without a functional kernel (Hurd is stuck in development loops). UNIX remains expensive, proprietary, and legally restricted.'
  },
  alternativeTimeline: [
    {
      year: '1992',
      title: 'The BSD lawsuits stall Free Unix',
      description: 'USL (Unix System Laboratories) sues BSDI and UC Berkeley over BSD code copyrights, freezing the open-source BSD operating systems for two critical years.',
      isMilestone: true,
      technologies: ['386BSD', 'Proprietary AT&T UNIX'],
      decisions: ['Universities restrict access to networking stacks', 'Slower open-source kernel updates'],
      impact: 'Developers are afraid to build open-source infrastructure due to legal risks.'
    },
    {
      year: '1995',
      title: 'Microsoft Windows NT Dominates the Server Market',
      description: 'Without a free, reliable alternative, Microsoft Windows NT 3.51 achieves a monopoly in both consumer desktop and enterprise server segments.',
      isMilestone: true,
      technologies: ['Windows NT', 'IIS Server', 'MS-SQL'],
      decisions: ['Enterprise standardization on Active Directory', 'Proprietary ASP scripting dominance'],
      impact: 'Hosting a website is extremely expensive due to licensing costs per server CPU.'
    },
    {
      year: '2000',
      title: 'Commercial UNIX fragmentation',
      description: 'Sun Microsystems (Solaris), HP (HP-UX), and IBM (AIX) engage in the "Unix Wars," locking customers into expensive, proprietary RISC hardware architectures.',
      isMilestone: false,
      technologies: ['Solaris SPARC', 'IBM AIX PowerPC'],
      decisions: ['High licensing fees', 'Closed hardware-software ecosystem pairings'],
      impact: 'Startups face high barriers to entry, requiring venture capital just to purchase server hardware.'
    },
    {
      year: '2007',
      title: 'Symbian and Windows Mobile Monopolies',
      description: 'Without the free Linux kernel as a foundation, Google abandons the Android project. Smartphones run on Symbian or Windows Mobile 6.',
      isMilestone: true,
      technologies: ['Symbian OS', 'Windows CE', 'J2ME'],
      decisions: ['Strict carrier control over app store distribution', 'No unified free platform'],
      impact: 'The mobile app revolution is delayed and restricted by carrier gates.'
    },
    {
      year: '2013',
      title: 'VMware and Hyper-V Virtualization Dominance',
      description: 'Since Linux containers (namespaces/cgroups) were never invented, virtualization remains locked to heavy, full-OS hypervisors controlled by VMware.',
      isMilestone: false,
      technologies: ['ESXi hypervisors', 'Windows Server containers'],
      decisions: ['Slow deployment cycles (minutes vs milliseconds)', 'High hardware overheads'],
      impact: 'Modern microservices, Kubernetes, and serverless architectures do not exist in their current form.'
    }
  ],
  consequences: [
    'Computing remains highly centralized in corporate datacenters running proprietary code.',
    'Licensing costs consume 40%+ of technology startup capital, significantly slowing software innovation.',
    'Apple OS X (based on BSD Unix) becomes the only mainstream alternative to Windows, capturing the designer and developer workspace completely.',
    'The cloud computing revolution (AWS, Azure) is built entirely on Windows Server and proprietary UNIX, driving up subscription costs globally.'
  ]
};

// Mock What-If Scenario: "What if HTTP had never been invented?"
export const httpWhatIf: WhatIfData = {
  metadata: {
    name: 'What if HTTP Never Existed?',
    tagline: 'A hypermedia web built on separate, fragmented protocols.',
    description: 'Explore the alternate reality where Tim Berners-Lee\'s proposal for the World Wide Web was rejected in 1989, forcing internet communication to rely on Gopher, FTP, and commercial networks.',
    category: 'Alternative History',
    icon: 'HelpCircle'
  },
  originalTimeline: [
    { year: '1989', event: 'Tim Berners-Lee proposes the World Wide Web at CERN.' },
    { year: '1991', event: 'The HTTP/0.9 protocol and HTML browser are released.' },
    { year: '1996', event: 'HTTP/1.0 is standardized, adding headers and status codes.' },
    { year: '2015', event: 'HTTP/2 is released, enabling multiplexing over single TCP links.' }
  ],
  branchPoint: {
    year: '1989',
    divergencePrompt: 'What if CERN management rejected the hypermedia project as too complex and niche?',
    alternativeEvent: 'Tim Berners-Lee\'s project is archived. Internet navigation remains text-based, utilizing independent directories, terminal commands, and proprietary portals.'
  },
  alternativeTimeline: [
    {
      year: '1991',
      title: 'Gopher Protocol Dominance',
      description: 'The University of Minnesota Gopher protocol becomes the standard for internet document index retrieval, featuring a hierarchical, folder-like menu system.',
      isMilestone: true,
      technologies: ['Gopher Protocol', 'FTP', 'Telnet'],
      decisions: ['Restricting documents to menus and plain text', 'No embedded hypermedia support'],
      impact: 'Internet browsing feels like traversing a command-line file directory, lacking inline images or rich layouts.'
    },
    {
      year: '1994',
      title: 'Gopher licensing backlash',
      description: 'The University of Minnesota announces licensing fees for Gopher usage, causing companies to flee the protocol.',
      isMilestone: true,
      technologies: ['Proprietary Gopher server licenses'],
      decisions: ['Monetizing internet directory routing'],
      impact: 'The internet splits into proprietary commercial networks.'
    },
    {
      year: '1996',
      title: 'The Rise of Commercial Wall Gardens',
      description: 'AOL, CompuServe, and MSN become the primary online experiences, serving graphics and curated portals via proprietary software clients.',
      isMilestone: true,
      technologies: ['AOL client software', 'Prodigy networks'],
      decisions: ['Subscription fees based on hours online', 'No cross-portal linking'],
      impact: 'Information is siloed. A user on AOL cannot read content hosted on CompuServe.'
    },
    {
      year: '2005',
      title: 'XML-over-TCP APIs and custom clients',
      description: 'Instead of universal web pages, applications deploy custom graphical binaries for every service (e.g., custom bank apps, news clients), connecting via custom TCP sockets.',
      isMilestone: false,
      technologies: ['Custom C++ GUIs', 'XML-RPC', 'Sockets'],
      decisions: ['Developers build separate clients for Windows, Mac, and Linux'],
      impact: 'No search engine indexing exists because there are no crawlable web pages, only private API endpoints.'
    }
  ],
  consequences: [
    'The "Web Browser" does not exist; instead, users boot up portal applications (like AOL) or direct FTP directories.',
    'E-commerce is highly fragmented and restricted to large corporate clients who can build desktop apps.',
    'Information sharing is restricted to academic institutions running free Gopher systems, while consumers are locked into corporate portals.',
    'Search engines like Google are never created, as there is no public web of crawlable, hyperlinked pages.'
  ]
};

// Utility function to get mock worlds
export function getMockWorld(query: string): WorldData | null {
  const norm = query.toLowerCase();
  if (norm.includes('netflix')) return netflixWorld;
  if (norm.includes('instagram')) return instagramWorld;
  // Default to Netflix if search is empty or unknown for demo purposes
  return netflixWorld;
}

// Utility function to get mock what-ifs
export function getMockWhatIf(query: string): WhatIfData | null {
  const norm = query.toLowerCase();
  if (norm.includes('http')) return httpWhatIf;
  if (norm.includes('linux')) return linuxWhatIf;
  // Default to Linux what-if if unknown
  return linuxWhatIf;
}
