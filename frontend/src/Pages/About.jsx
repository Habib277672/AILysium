import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { TestimonialSection } from "../Components/UI/TestimonialSection";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import founderImg from "../assets/Images/founder_img.webp";

const whatWeDoCards = [
    {
        title: "Live, Instructor-Led Sessions",
        description:
            "Every program runs on real, scheduled sessions with a mentor — not pre-recorded lectures you watch alone.",
    },
    {
        title: "Learn From Anywhere",
        description:
            "Based in Pakistan, built for students anywhere with an internet connection — no campus required.",
    },
    {
        title: "Personalised Feedback",
        description:
            "Your mentor reviews your actual work each week, so feedback is specific to what you built, not generic.",
    },
];

const whyChooseUsCards = [
    {
        title: "Built Around Real Projects",
        description:
            "Every course is structured so you finish with something you built, not just notes you took.",
    },
    {
        title: "Named, Committed Mentors",
        description:
            "You learn from a specific mentor for your program — not a rotating pool of unknown instructors.",
    },
    {
        title: "Real Human Support",
        description:
            "Questions get answered by a person, on WhatsApp or email, not just a support ticket queue.",
    },
];

const teamMembers = [
    { name: "Muhammad Abdullah", role: "Mentor — Kids AI" },
    { name: "Seerat Munir", role: "Mentor — Freelancer AI" },
];

export const About = () => {
    return (
        <div>
            {/* Top section */}
            <section className="relative overflow-hidden bg-cloud py-24 md:py-32">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/15 blur-[160px]" />

                <div className="relative mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        About AiLysium
                    </span>
                    <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                        Building AI skills, one{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            real project
                        </span>{" "}
                        at a time
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-muted">
                        AiLysium exists because most AI education is talk, not practice.
                        We built a place where teen beginners and freelancers learn by
                        actually shipping things.
                    </p>
                </div>
            </section>

            {/* Who We Are */}
            <section className="relative overflow-hidden bg-white py-24 md:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
                                <span className="h-1 w-1 rounded-full bg-sky" />
                                Who We Are
                            </span>
                            <h2 className="mt-5 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
                                Personalised learning,{" "}
                                <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                    anytime, anywhere
                                </span>
                            </h2>
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                                AiLysium is an AI education platform based in Pakistan,
                                training teen beginners through the Kids AI program and
                                freelancers through Freelancer AI. We're not a video library —
                                every program is mentor-led, hands-on, and structured around
                                shipping a real project, not just finishing a syllabus.
                            </p>
                            <div className="mt-7 flex items-center gap-6">
                                <div>
                                    <p className="font-heading text-2xl font-bold text-ink">2+</p>
                                    <p className="text-xs text-muted">Programs</p>
                                </div>
                                <div className="h-10 w-px bg-slate/15" />
                                <div>
                                    <p className="font-heading text-2xl font-bold text-ink">1:1</p>
                                    <p className="text-xs text-muted">Mentor feedback</p>
                                </div>
                                <div className="h-10 w-px bg-slate/15" />
                                <div>
                                    <p className="font-heading text-2xl font-bold text-ink">100%</p>
                                    <p className="text-xs text-muted">Hands-on</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/8 via-transparent to-sky-light/8" />
                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-slate/10 bg-white p-5 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2 13l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-3 font-heading text-sm font-bold text-ink">Mentor-led</p>
                                        <p className="mt-1 text-xs text-muted">Real instructors, not videos</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate/10 bg-white p-5 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                        </div>
                                        <p className="mt-3 font-heading text-sm font-bold text-ink">Weekly builds</p>
                                        <p className="mt-1 text-xs text-muted">Ship something every week</p>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="rounded-2xl border border-slate/10 bg-white p-5 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none"><path d="M15 7.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 10l3 3m0 0l3-3m-3 3V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-3 font-heading text-sm font-bold text-ink">Real portfolio</p>
                                        <p className="mt-1 text-xs text-muted">Projects you can show</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate/10 bg-white p-5 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none"><path d="M17 10c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 3v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-3 font-heading text-sm font-bold text-ink">Pakistan-based</p>
                                        <p className="mt-1 text-xs text-muted">Accessible to all</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who's behind AiLysium */}
            <section className="relative overflow-hidden bg-cloud py-24 md:py-28">
                <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6">
                    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                        {/* Left — Founder image */}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/8 via-transparent to-sky-light/8" />
                            <div className="relative overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-xl shadow-ink/5">
                                <img
                                    src={founderImg}
                                    alt="Muhammad Abdullah — Founder of AiLysium"
                                    className="h-80 w-full object-cover object-top sm:h-96 md:h-[26rem]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 rounded-2xl border border-slate/10 bg-white px-5 py-3 shadow-lg shadow-ink/5">
                                <p className="font-heading text-sm font-bold text-ink">Founder</p>
                                <p className="text-xs text-muted">AiLysium</p>
                            </div>
                        </div>

                        {/* Right — Data */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                                <span className="h-1 w-1 rounded-full bg-sky" />
                                Meet the Founder
                            </span>
                            <h2 className="mt-5 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
                                Muhammad{" "}
                                <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                    Abdullah
                                </span>
                            </h2>
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                                The person behind AiLysium — building a platform where teen
                                beginners and freelancers learn AI through real, hands-on
                                projects instead of just watching videos.
                            </p>

                            <div className="mt-7 grid grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-slate/10 bg-white p-4 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                    <p className="font-heading text-xl font-bold text-ink">2+</p>
                                    <p className="mt-1 text-xs text-muted">Programs</p>
                                </div>
                                <div className="rounded-2xl border border-slate/10 bg-white p-4 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                    <p className="font-heading text-xl font-bold text-ink">1:1</p>
                                    <p className="mt-1 text-xs text-muted">Mentoring</p>
                                </div>
                                <div className="rounded-2xl border border-slate/10 bg-white p-4 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8">
                                    <p className="font-heading text-xl font-bold text-ink">100%</p>
                                    <p className="mt-1 text-xs text-muted">Hands-on</p>
                                </div>
                            </div>

                            <Button as={Link} to="/contact" variant="primary" size="md" className="mt-7 rounded-full px-6 shadow-lg shadow-sky/20 hover:shadow-sky/35">
                                Connect with founder
                            </Button>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mt-16">
                        <h3 className="font-heading text-xl font-bold text-ink">
                            Mentors leading our courses
                        </h3>
                        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="group flex items-center gap-4 rounded-2xl border border-slate/10 bg-white p-5 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-lg hover:shadow-sky/8">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky to-sky-light text-sm font-bold text-white shadow-md shadow-sky/20">
                                        {member.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-heading text-sm font-bold text-ink">{member.name}</p>
                                        <p className="mt-0.5 text-xs text-muted">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="relative overflow-hidden bg-white py-24 md:py-28">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        Online Learning, Done Right
                    </span>
                    <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
                        What{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            we do
                        </span>
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted">
                        Live sessions with a real mentor, built around one goal: you
                        finish with something you built yourself.
                    </p>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {whatWeDoCards.map((card, index) => (
                            <div
                                key={card.title}
                                className="group relative overflow-hidden rounded-3xl border border-slate/10 bg-white p-7 text-left shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8"
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky/8 to-transparent transition-transform duration-500 group-hover:scale-150" />
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-md shadow-sky/25 transition-transform duration-300 group-hover:scale-110">
                                    {index === 0 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                    {index === 1 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                    {index === 2 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                </div>
                                <h3 className="mt-5 font-heading text-lg font-bold text-ink transition-colors group-hover:text-sky">
                                    {card.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="relative overflow-hidden bg-cloud py-24 md:py-28">
                <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        Built on Trust
                    </span>
                    <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-ink md:text-[2.75rem] md:leading-tight">
                        Why choose{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            AiLysium
                        </span>
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted">
                        We'd rather teach fewer students well than a lot of students
                        poorly — that shows up in how every program is run.
                    </p>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {whyChooseUsCards.map((card, index) => (
                            <div
                                key={card.title}
                                className="group relative overflow-hidden rounded-3xl border border-slate/10 bg-white/70 p-7 text-left shadow-sm shadow-ink/4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8"
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky/8 to-transparent transition-transform duration-500 group-hover:scale-150" />
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-md shadow-sky/25 transition-transform duration-300 group-hover:scale-110">
                                    {index === 0 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                    {index === 1 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                    {index === 2 && (
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    )}
                                </div>
                                <h3 className="mt-5 font-heading text-lg font-bold text-ink transition-colors group-hover:text-sky">
                                    {card.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialSection />

            {/* Consultation CTA */}
            <ConsultationSection
                heading={<>Get ready to <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">build with AI</span></>}
                description="Browse our programs or talk to us first — either way, the next step is a real conversation, not a signup form."
                primaryCta={{ text: "Explore programs", href: "/courses" }}
                secondaryCta={{ text: "Contact us", to: "/contact" }}
            />
        </div>
    );
};