// Mock course data for Phase 3 (frontend-only). This mirrors the shape of
// the future `Course` Prisma model (id, title, slug, description, price,
// status, duration) so swapping this file for a real `/api/courses` fetch
// later is a drop-in replacement, not a rewrite.

export const courses = [
    {
        id: 1,
        slug: "kids-ai",
        title: "Kids AI",
        price: "PKR 4,999",
        status: "Available",
        duration: "12 weeks",
        mentor: "Muhammad Abdullah",
        format: "Live sessions; weekly labs; hands-on weekly builds",
        shortDescription:
            "A 12-week journey for ages 17-18, from AI basics to building your own web project.",
        // Known content quirk from source data: named "Kids AI" while the
        // displayed age range is 17-18. Preserved as-is, not silently "fixed".
        ageNote:
            "Labelled \"Kids AI\" with a displayed age range of 17-18. This wording is retained as current website data.",
        benefits: [
            "Weekly hands-on labs, not passive lectures",
            "Build a real web project by the end of the course",
            "Direct mentorship from Muhammad Abdullah",
        ],
    },
    {
        id: 2,
        slug: "vip-mentorship",
        title: "VIP One-on-One Mentorship",
        price: "Coming Soon",
        status: "Coming Soon",
        duration: "Flexible",
        mentor: null,
        format: "Coaching; flexible schedule; personal project reviews",
        shortDescription:
            "Master AI at your own pace. Work directly with an AiLysium mentor who builds with you, week by week.",
        ageNote: null,
        benefits: [
            "Weekly projects — build something new every week",
            "Career-ready skills — the AI stack freelancers and companies use",
            "Flexible schedule — morning, evening, or weekends",
            "1:1 sessions with direct feedback on every project",
            "Job placement support and a money-back guarantee",
        ],
    },
    {
        id: 3,
        slug: "freelancer-ai",
        // Live site typo "Flantsers AI" is intentionally NOT used here — this
        // is the main catalog, where the correct name applies per instructions.
        title: "Freelancer AI",
        price: "PKR 35,000",
        status: "Coming Soon",
        duration: "4+ months",
        mentor: "Seerat Munir",
        format: "Live lectures; client work; client-ready workflow",
        shortDescription:
            "Coming soon. A freelancer track to find clients and start earning with your new skills.",
        ageNote: null,
        benefits: [
            "Live lectures with real client work",
            "Client-ready workflow from day one",
            "Direct mentorship from Seerat Munir",
        ],
    },
];

export const getCourseBySlug = (slug) =>
    courses.find((course) => course.slug === slug);