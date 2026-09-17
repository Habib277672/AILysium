// AI Tools directory data. Sourced from a reconstructed approximation of
// the Aaghaz AI Tools directory (not a verified 1:1 scrape) — category
// overlaps (e.g. ChatGPT under both "AI Writing" and "AI Chatbots") are
// preserved from the source rather than silently deduplicated.
import gptLogo from "../assets/images/AITool_logos/gpt_logo.jpg";


export const categories = [
    "All Tools",
    "Video Generation",
    "Image Generation",
    "AI Writing",
    "AI Coding",
    "AI Chatbots",
    "SEO & Marketing",
    "Productivity Tools",
    "Design & UI",
    "Analysis & Digital Humans",
    "Data & Analytics",
    "Automation Agents",
    "Education & Learning",
    "Music & Audio",
    "Business AI",
    "Sales AI",
    "Research & Search",
    "AI Security",
    "AI Utilities",
];

export const aiTools = [
    // Video Generation
    { name: "Sora", description: "OpenAI's text-to-video model that creates realistic and imaginative scenes from text instructions.", category: "Video Generation", tags: ["TEXT-TO-VIDEO", "GENERATIVE AI", "OPENAI"], link: "https://openai.com/sora", image: gptLogo },
    { name: "Runway ML", description: "Advanced video editing and generation suite featuring Gen-1 and Gen-2 models for creators.", category: "Video Generation", tags: ["VIDEO EDITING", "VFX", "GEN-2"], link: "https://runwayml.com", image: gptLogo },
    { name: "Synthesia", description: "Create professional AI videos from text in over 120 languages with realistic digital avatars.", category: "Video Generation", tags: ["AVATARS", "TEXT-TO-VIDEO", "PRESENTATIONS"], link: "https://www.synthesia.io", image: gptLogo },
    { name: "HeyGen", description: "AI video generation platform that allows you to create engaging business videos with generative avatars.", category: "Video Generation", tags: ["BUSINESS VIDEO", "AVATARS", "MARKETING"], link: "https://www.heygen.com", image: gptLogo },
    { name: "Descript", description: "All-in-one video and audio editing software that lets you edit media by editing text.", category: "Video Generation", tags: ["TRANSCRIPTION", "PODCASTING", "EDITING"], link: "https://www.descript.com", image: gptLogo },
    { name: "Pika Labs", description: "An idea-to-video platform that brings your creativity to life with dynamic motion generation.", category: "Video Generation", tags: ["ANIMATION", "TEXT-TO-VIDEO", "CREATIVE"], link: "https://pika.art", image: gptLogo },
    { name: "Kaiber", description: "AI creative lab that generates visual stories and animations from images or text prompts.", category: "Video Generation", tags: ["MUSIC VIDEOS", "ANIMATION", "STORYTELLING"], link: "https://kaiber.ai", image: gptLogo },

    // Image Generation
    { name: "DALL-E 3", description: "OpenAI's image generation model integrated with ChatGPT for accurate prompt adherence.", category: "Image Generation", tags: ["TEXT-TO-IMAGE", "OPENAI", "ILLUSTRATION"], link: "https://openai.com/dall-e-3", image: gptLogo },
    { name: "Midjourney", description: "Independent research lab producing highly artistic and photorealistic images from text descriptions.", category: "Image Generation", tags: ["ART", "PHOTOREALISM", "DISCORD"], link: "https://www.midjourney.com", image: gptLogo },
    { name: "Stable Diffusion", description: "Open-source image generation model by Stability AI, allowing for local deployment and fine-tuning.", category: "Image Generation", tags: ["OPEN SOURCE", "CUSTOM MODELS", "GENERATIVE"], link: "https://stability.ai", image: gptLogo },
    { name: "Adobe Firefly", description: "Generative AI models integrated directly into Adobe Creative Cloud for commercially safer creation workflows.", category: "Image Generation", tags: ["COMMERCIAL SAFE", "DESIGN", "ADOBE"], link: "https://www.adobe.com/products/firefly.html", image: gptLogo },
    { name: "Leonardo.AI", description: "Feature-rich platform for creating production-quality visual assets for games and design.", category: "Image Generation", tags: ["GAMING ASSETS", "FINE-TUNING"], link: "https://leonardo.ai", image: gptLogo },
    { name: "Craiyon", description: "Free online AI image generator formerly known as DALL-E mini, accessible to everyone.", category: "Image Generation", tags: ["FREE", "ACCESSIBLE", "QUICK"], link: "https://www.craiyon.com", image: gptLogo },
    { name: "NightCafe", description: "AI art generator community that lets you create, share, and print AI-generated artwork.", category: "Image Generation", tags: ["COMMUNITY", "ART", "PRINTING"], link: "https://creator.nightcafe.studio", image: gptLogo },

    // AI Writing
    { name: "ChatGPT", description: "Versatile conversational AI by OpenAI capable of drafting emails, essays, code, and creative writing.", category: "AI Writing", tags: ["CONVERSATIONAL", "DRAFTING", "VERSATILE"], link: "https://chat.openai.com", image: gptLogo },
    { name: "Claude", description: "Anthropic's AI assistant known for large context windows, nuanced writing, and high safety standards.", category: "AI Writing", tags: ["LONG CONTEXT", "ANALYSIS", "SAFE AI"], link: "https://claude.ai", image: gptLogo },
    { name: "Jasper", description: "Enterprise-grade AI copilot for marketing teams to create on-brand content at scale.", category: "AI Writing", tags: ["MARKETING", "ENTERPRISE", "BRAND VOICE"], link: "https://www.jasper.ai", image: gptLogo },
    { name: "Copy.ai", description: "AI-powered copywriter that generates copy for ads, emails, websites, and blogs.", category: "AI Writing", tags: ["COPYWRITING", "TEMPLATES", "SOCIAL MEDIA"], link: "https://www.copy.ai", image: gptLogo },
    { name: "Grammarly", description: "AI writing assistant that reviews spelling, grammar, punctuation, clarity, and delivery.", category: "AI Writing", tags: ["EDITING", "GRAMMAR", "CLARITY"], link: "https://www.grammarly.com", image: gptLogo },
    { name: "Writesonic", description: "AI writer that creates SEO-friendly content for blogs, ads, and e-commerce use cases.", category: "AI Writing", tags: ["SEO", "ADS", "E-COMMERCE"], link: "https://writesonic.com", image: gptLogo },
    { name: "Rytr", description: "AI writing assistant that helps create high-quality content quickly with templates.", category: "AI Writing", tags: ["AFFORDABLE", "QUICK", "TEMPLATES"], link: "https://rytr.me", image: gptLogo },

    // AI Coding
    { name: "GitHub Copilot", description: "AI pair programmer that offers autocomplete-style suggestions as you code in your IDE.", category: "AI Coding", tags: ["AUTOCOMPLETE", "IDE INTEGRATION", "GITHUB"], link: "https://github.com/features/copilot", image: gptLogo },
    { name: "Tabnine", description: "AI assistant for software developers that predicts and suggests your next lines of code.", category: "AI Coding", tags: ["PREDICTION", "PRIVACY", "MULTI-LANGUAGE"], link: "https://www.tabnine.com", image: gptLogo },
    { name: "Codeium", description: "Free AI code acceleration toolkit providing code completion, chat, and search capabilities.", category: "AI Coding", tags: ["FREE TIER", "CHAT", "SEARCH"], link: "https://codeium.com", image: gptLogo },
    { name: "Amazon CodeWhisperer", description: "ML-powered coding companion that generates code recommendations from comments and existing code.", category: "AI Coding", tags: ["AWS", "SECURITY", "SCANS", "ENTERPRISE"], link: "https://aws.amazon.com/codewhisperer", image: gptLogo },
    { name: "Replit Ghostwriter", description: "AI coding assistant integrated into the Replit online IDE for seamless development.", category: "AI Coding", tags: ["ONLINE IDE", "COLLABORATION", "INSTANT DEPLOY"], link: "https://replit.com/site/ghostwriter", image: gptLogo },
    { name: "Cursor", description: "AI-first code editor built for productivity with chat and deep codebase understanding.", category: "AI Coding", tags: ["EDITOR", "CODEBASE AWARE", "PRODUCTIVITY"], link: "https://www.cursor.com", image: gptLogo },
    { name: "MutableAI", description: "AI-accelerated software development platform that can generate documentation and refactor code.", category: "AI Coding", tags: ["DOCUMENTATION", "REFACTORING", "ACCELERATION"], link: "https://mutable.ai", image: gptLogo },

    // AI Chatbots
    { name: "ChatGPT", description: "Industry-leading general-purpose conversational AI from OpenAI.", category: "AI Chatbots", tags: ["GENERAL PURPOSE", "GPT-4", "PLUGINS"], link: "https://chat.openai.com", image: gptLogo },
    { name: "Google Gemini", description: "Google's multimodal AI assistant with deep integration across Google products and search.", category: "AI Chatbots", tags: ["MULTIMODAL", "GOOGLE", "REAL-TIME"], link: "https://gemini.google.com", image: gptLogo },
    { name: "Microsoft Copilot", description: "Everyday AI companion powered by GPT models and integrated into Windows, Edge, and Microsoft 365.", category: "AI Chatbots", tags: ["MICROSOFT", "ENTERPRISE", "WEB SEARCH"], link: "https://copilot.microsoft.com", image: gptLogo },
    { name: "Perplexity AI", description: "AI-powered conversational search engine that answers questions using natural language and web sources.", category: "AI Chatbots", tags: ["SEARCH", "CITATIONS", "RESEARCH"], link: "https://www.perplexity.ai", image: gptLogo },

    // SEO & Marketing
    { name: "Surfer SEO", description: "Content intelligence platform combining content strategy, creation, and optimization.", category: "SEO & Marketing", tags: ["CONTENT OPTIMIZATION", "SERP ANALYSIS", "STRATEGY"], link: "https://surferseo.com", image: gptLogo },
    { name: "Semrush", description: "Comprehensive marketing toolkit with AI-driven insights for SEO, content, and competitor research.", category: "SEO & Marketing", tags: ["KEYWORD RESEARCH", "COMPETITOR ANALYSIS", "ALL-IN-ONE"], link: "https://www.semrush.com", image: gptLogo },
    { name: "Ahrefs", description: "Advanced SEO toolset using data and machine learning to analyze backlinks, keywords, and site health.", category: "SEO & Marketing", tags: ["BACKLINKS", "SITE AUDIT", "RANK TRACKING"], link: "https://ahrefs.com", image: gptLogo },
    { name: "MarketMuse", description: "AI content planning and optimization software that analyzes your site and provides personalized insights.", category: "SEO & Marketing", tags: ["CONTENT PLANNING", "TOPIC CLUSTERS", "AUTHORITY"], link: "https://www.marketmuse.com", image: gptLogo },

    // Productivity Tools
    { name: "Notion AI", description: "Connected AI assistant integrated into Notion to write, edit, summarize, and brainstorm.", category: "Productivity Tools", tags: ["WORKSPACE", "NOTES", "KNOWLEDGE BASE"], link: "https://www.notion.so/product/ai", image: gptLogo },
    { name: "Microsoft Copilot Pro", description: "Premium AI capabilities across Word, Excel, PowerPoint, and Outlook.", category: "Productivity Tools", tags: ["OFFICE 365", "ENTERPRISE", "DOCUMENTS"], link: "https://www.microsoft.com/en-us/microsoft-365/copilot/pricing", image: gptLogo },
    { name: "Otter.ai", description: "AI meeting assistant that records audio, captures notes and slides, and creates summaries.", category: "Productivity Tools", tags: ["MEETINGS", "TRANSCRIPTION", "SUMMARIES"], link: "https://otter.ai", image: gptLogo },
    { name: "Mem", description: "AI-powered workspace that automatically organizes and personalizes your notes.", category: "Productivity Tools", tags: ["ORGANIZATION", "PERSONALIZED", "NOTES"], link: "https://mem.ai", image: gptLogo },

    // Design & UI
    { name: "Figma AI", description: "AI features inside Figma that help designers generate assets, organize layers, and prototype faster.", category: "Design & UI", tags: ["UI/UX", "PROTOTYPING", "COLLABORATION"], link: "https://www.figma.com/ai", image: gptLogo },
    { name: "Adobe Generative Fill", description: "Photoshop AI tool for adding, extending, or removing image content non-destructively.", category: "Design & UI", tags: ["PHOTO EDITING", "RETOUCHING", "ADOBE"], link: "https://www.adobe.com/products/photoshop/generative-fill.html", image: gptLogo },
    { name: "Canva AI", description: "Canva's Magic Studio AI features for image generation, design, and presentation creation.", category: "Design & UI", tags: ["GRAPHIC DESIGN", "SOCIAL MEDIA", "TEMPLATES"], link: "https://www.canva.com/magic-studio", image: gptLogo },
    { name: "Looka", description: "AI-powered platform for creating logos and complete brand identities quickly.", category: "Design & UI", tags: ["LOGO DESIGN", "BRANDING", "STARTUPS"], link: "https://looka.com", image: gptLogo },

    // Analysis & Digital Humans
    { name: "D-ID", description: "Generative AI platform for creating customized talking-avatar videos from text and images.", category: "Analysis & Digital Humans", tags: ["TALKING HEADS", "AVATARS", "API"], link: "https://www.d-id.com", image: gptLogo },
    { name: "Soul Machines", description: "Creates autonomous Digital People for real-time customer interactions and experiences.", category: "Analysis & Digital Humans", tags: ["DIGITAL PEOPLE", "CUSTOMER EXPERIENCE", "AUTONOMOUS"], link: "https://www.soulmachines.com", image: gptLogo },
    { name: "Synthesia", description: "AI video platform using digital avatars for corporate training and communication.", category: "Analysis & Digital Humans", tags: ["CORPORATE TRAINING", "AVATARS"], link: "https://www.synthesia.io", image: gptLogo },

    // Data & Analytics
    { name: "Tableau AI", description: "Generative AI capabilities across Tableau to help users discover and communicate data insights.", category: "Data & Analytics", tags: ["VISUALIZATION", "ENTERPRISE", "INSIGHTS"], link: "https://www.tableau.com/ai", image: gptLogo },
    { name: "Power BI AI", description: "Microsoft analytics platform with Copilot capabilities for reports and natural-language analysis.", category: "Data & Analytics", tags: ["MICROSOFT", "DASHBOARDS", "BUSINESS INTELLIGENCE"], link: "https://www.microsoft.com/en-us/power-platform/products/power-bi", image: gptLogo },
    { name: "Looker", description: "Google Cloud platform for BI, data applications, and embedded analytics.", category: "Data & Analytics", tags: ["GOOGLE CLOUD", "EMBEDDED BI", "DATA MODELING"], link: "https://cloud.google.com/looker", image: gptLogo },
    { name: "Mixpanel", description: "Product analytics platform using machine learning to understand user behavior and conversion drivers.", category: "Data & Analytics", tags: ["PRODUCT ANALYTICS", "USER BEHAVIOR", "FUNNELS"], link: "https://mixpanel.com", image: gptLogo },

    // Automation Agents
    { name: "Zapier", description: "Connects apps and automates workflows with AI-powered step generation and data formatting.", category: "Automation Agents", tags: ["INTEGRATIONS", "WORKFLOWS", "NO-CODE"], link: "https://zapier.com", image: gptLogo },
    { name: "Make", description: "Visual automation platform for building and automating tasks and complex workflows.", category: "Automation Agents", tags: ["VISUAL BUILDER", "COMPLEX WORKFLOWS", "API"], link: "https://www.make.com", image: gptLogo },
    { name: "n8n", description: "Fair-code workflow automation platform for connecting services and custom AI nodes.", category: "Automation Agents", tags: ["SELF-HOSTED", "FAIR-CODE", "DEVELOPER FRIENDLY"], link: "https://n8n.io", image: gptLogo },
    { name: "Automation Anywhere", description: "Enterprise RPA platform combining robotic process automation with generative AI.", category: "Automation Agents", tags: ["RPA", "ENTERPRISE", "INTELLIGENT AUTOMATION"], link: "https://www.automationanywhere.com", image: gptLogo },

    // Education & Learning
    { name: "Khan Academy AI", description: "Khanmigo acts as an AI tutor for learners and an assistant for teachers.", category: "Education & Learning", tags: ["TUTORING", "K-12", "NON-PROFIT"], link: "https://www.khanmigo.ai", image: gptLogo },
    { name: "Duolingo Max", description: "AI-powered language learning features including roleplay and explain-my-answer experiences.", category: "Education & Learning", tags: ["LANGUAGES", "ROLEPLAY", "GAMIFIED"], link: "https://www.duolingo.com/max", image: gptLogo },
    { name: "Coursera AI", description: "AI-assisted learning platform with personalized recommendations and study coaching.", category: "Education & Learning", tags: ["HIGHER ED", "CERTIFICATIONS", "COACHING"], link: "https://www.coursera.org", image: gptLogo },
    { name: "Udemy AI", description: "Skills marketplace using AI to map learning paths and provide intelligent Q&A.", category: "Education & Learning", tags: ["SKILLS MARKETPLACE", "TECH LEARNING"], link: "https://www.udemy.com", image: gptLogo },

    // Music & Audio
    { name: "AIVA", description: "AI music composer for emotional soundtracks used in films, games, and commercials.", category: "Music & Audio", tags: ["COMPOSITION", "SOUNDTRACKS", "ROYALTY-FREE"], link: "https://www.aiva.ai", image: gptLogo },
    { name: "Soundraw", description: "AI music generator that lets creators customize length, composition, and instruments.", category: "Music & Audio", tags: ["CUSTOMIZABLE", "CREATORS", "BACKGROUND MUSIC"], link: "https://soundraw.io", image: gptLogo },
    { name: "Descript", description: "AI audio tools including Studio Sound for noise removal and voice enhancement.", category: "Music & Audio", tags: ["AUDIO ENHANCEMENT", "PODCASTING", "NOISE REDUCTION"], link: "https://www.descript.com", image: gptLogo },
    { name: "Murf AI", description: "AI voice generator that creates studio-quality voiceovers from text.", category: "Music & Audio", tags: ["VOICEOVERS", "TEXT-TO-SPEECH", "PRESENTATIONS"], link: "https://murf.ai", image: gptLogo },

    // Business AI
    { name: "Salesforce Einstein", description: "Integrated AI for CRM with predictions, recommendations, and generative capabilities.", category: "Business AI", tags: ["CRM", "PREDICTIVE", "ENTERPRISE"], link: "https://www.salesforce.com/products/einstein", image: gptLogo },
    { name: "HubSpot AI", description: "AI-powered tools inside HubSpot for marketing, sales, and customer service teams.", category: "Business AI", tags: ["INBOUND MARKETING", "SALES"], link: "https://www.hubspot.com/artificial-intelligence", image: gptLogo },
    { name: "Workday AI", description: "Enterprise AI embedded in HR and finance systems to streamline operations.", category: "Business AI", tags: ["HR", "FINANCE", "ERP"], link: "https://www.workday.com/en-us/artificial-intelligence.html", image: gptLogo },
    { name: "SAP Analytics Cloud", description: "Cloud analytics combining business intelligence, planning, predictive analytics, and machine learning.", category: "Business AI", tags: ["PLANNING", "PREDICTIVE", "ENTERPRISE"], link: "https://www.sap.com/products/technology-platform/cloud-analytics.html", image: gptLogo },

    // Sales AI
    { name: "Gong", description: "Revenue intelligence platform that analyzes customer interactions and gives AI-driven sales insights.", category: "Sales AI", tags: ["REVENUE INTELLIGENCE", "CALL ANALYSIS", "COACHING"], link: "https://www.gong.io", image: gptLogo },
    { name: "Outreach", description: "Sales execution platform using AI to optimize workflows, emails, and rep performance.", category: "Sales AI", tags: ["SALES EXECUTION", "EMAIL GENERATION", "WORKFLOWS"], link: "https://www.outreach.io", image: gptLogo },
    { name: "Chorus", description: "Conversation intelligence tool that analyzes sales calls to improve team performance.", category: "Sales AI", tags: ["CONVERSATION INTELLIGENCE", "ZOOMINFO", "ANALYSIS"], link: "https://www.chorus.ai", image: gptLogo },
    { name: "Clari", description: "Revenue platform using AI to forecast accurately and manage the revenue pipeline.", category: "Sales AI", tags: ["FORECASTING", "REVENUE", "PIPELINE"], link: "https://www.clari.com", image: gptLogo },

    // Research & Search
    { name: "Perplexity AI", description: "Conversational search engine that provides direct answers with inline citations.", category: "Research & Search", tags: ["SEARCH", "CITATIONS", "ACCURACY"], link: "https://www.perplexity.ai", image: gptLogo },
    { name: "Consensus", description: "AI search engine for scientific research that extracts findings from peer-reviewed papers.", category: "Research & Search", tags: ["ACADEMIC", "SCIENCE", "PEER-REVIEWED"], link: "https://consensus.app", image: gptLogo },
    { name: "Elicit", description: "AI research assistant that automates literature reviews and extracts data from research papers.", category: "Research & Search", tags: ["LITERATURE REVIEW", "DATA EXTRACTION", "ACADEMIC"], link: "https://elicit.com", image: gptLogo },
    { name: "Scite", description: "Research platform using Smart Citations to show whether studies support or contrast with claims.", category: "Research & Search", tags: ["SMART CITATIONS", "EVALUATION", "RESEARCH"], link: "https://scite.ai", image: gptLogo },

    // AI Security
    { name: "Darktrace", description: "Self-learning AI cybersecurity system that detects and responds to novel threats in real time.", category: "AI Security", tags: ["THREAT DETECTION", "SELF-LEARNING", "ENTERPRISE"], link: "https://www.darktrace.com", image: gptLogo },
    { name: "Fortinet FortiAI", description: "Virtual security analyst using deep neural networks to automate threat investigation and response.", category: "AI Security", tags: ["AUTOMATED RESPONSE", "NEURAL NETWORKS", "ANALYST"], link: "https://www.fortinet.com/products/fortiai", image: gptLogo },
    { name: "CrowdStrike Falcon", description: "Cloud-native endpoint protection platform using AI to stop breaches and advanced threats.", category: "AI Security", tags: ["ENDPOINT PROTECTION", "CLOUD-NATIVE", "PREVENTION"], link: "https://www.crowdstrike.com/platform", image: gptLogo },

    // AI Utilities
    { name: "Remove.bg", description: "AI tool that automatically removes image backgrounds in seconds.", category: "AI Utilities", tags: ["BACKGROUND REMOVAL", "IMAGE EDITING", "FAST"], link: "https://www.remove.bg", image: gptLogo },
    { name: "Upscayl", description: "Free and open-source AI image upscaler for enhancing low-resolution images.", category: "AI Utilities", tags: ["UPSCALING", "OPEN SOURCE", "ENHANCEMENT"], link: "https://upscayl.org", image: gptLogo },
    { name: "Cleanup.pictures", description: "AI retouching tool for removing unwanted objects, people, or text from photos.", category: "AI Utilities", tags: ["RETOUCHING", "OBJECT REMOVAL", "CLEANUP"], link: "https://cleanup.pictures", image: gptLogo },
    { name: "Bigjpg", description: "AI super-resolution tool optimized for enlarging anime images and illustrations.", category: "AI Utilities", tags: ["SUPER-RESOLUTION", "ANIME", "ILLUSTRATION"], link: "https://bigjpg.com", image: gptLogo },
];