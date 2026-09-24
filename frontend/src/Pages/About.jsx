import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { TestimonialSection } from "../Components/UI/TestimonialSection";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { Reveal } from "../Components/UI/Reveal";
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
            <section className="relative overflow-hidden bg-cloud py-16 md:py-32">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/15 blur-[160px]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto max-w-3xl px-6 text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        About AiLysium
                    </span>
                    <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:mt-5 md:text-5xl">
                        Building AI skills, one{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            real project
                        </span>{" "}
                        at a time
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base md:mt-5">
                        AiLysium exists because most AI education is talk, not practice.
                        We built a place where teen beginners and freelancers learn by
                        actually shipping things.
                    </p>
                </motion.div>
            </section>

            {/* Who We Are */}
            <section className="relative overflow-hidden bg-white py-16 md:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                        <Reveal id="who-text" x={-20} className="text-center md:text-left">
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
                                <span className="h-1 w-1 rounded-full bg-sky" />
                                Who We Are
                            </span>
                            <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl md:mt-5 md:text-[2.75rem] md:leading-tight">
                                Personalised learning,{" "}
                                <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                    anytime, anywhere
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base md:mx-0 md:mt-5">
                                AiLysium is an AI education platform based in Pakistan,
                                training teen beginners through the Kids AI program and
                                freelancers through Freelancer AI. We're not a video library —
                                every program is mentor-led, hands-on, and structured around
                                shipping a real project, not just finishing a syllabus.
                            </p>
                            <div className="mt-6 flex items-center justify-center gap-5 sm:gap-6 md:justify-start md:mt-7">
                                <div>
                                    <p className="font-heading text-xl font-bold text-ink sm:text-2xl">2+</p>
                                    <p className="text-xs text-muted">Programs</p>
                                </div>
                                <div className="h-10 w-px bg-slate/15" />
                                <div>
                                    <p className="font-heading text-xl font-bold text-ink sm:text-2xl">1:1</p>
                                    <p className="text-xs text-muted">Mentor feedback</p>
                                </div>
                                <div className="h-10 w-px bg-slate/15" />
                                <div>
                                    <p className="font-heading text-xl font-bold text-ink sm:text-2xl">100%</p>
                                    <p className="text-xs text-muted">Hands-on</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal id="who-image" x={20} delay={0.1} className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/8 via-transparent to-sky-light/8" />
                            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="rounded-2xl border border-slate/10 bg-white p-4 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/10 text-sky sm:h-10 sm:w-10">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2 13l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-2.5 font-heading text-sm font-bold text-ink sm:mt-3">Mentor-led</p>
                                        <p className="mt-0.5 text-xs text-muted">Real instructors, not videos</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate/10 bg-white p-4 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/10 text-sky sm:h-10 sm:w-10">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                        </div>
                                        <p className="mt-2.5 font-heading text-sm font-bold text-ink sm:mt-3">Weekly builds</p>
                                        <p className="mt-0.5 text-xs text-muted">Ship something every week</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                                    <div className="rounded-2xl border border-slate/10 bg-white p-4 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/10 text-sky sm:h-10 sm:w-10">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="none"><path d="M15 7.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 10l3 3m0 0l3-3m-3 3V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-2.5 font-heading text-sm font-bold text-ink sm:mt-3">Real portfolio</p>
                                        <p className="mt-0.5 text-xs text-muted">Projects you can show</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate/10 bg-white p-4 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/10 text-sky sm:h-10 sm:w-10">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="none"><path d="M17 10c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 3v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <p className="mt-2.5 font-heading text-sm font-bold text-ink sm:mt-3">Pakistan-based</p>
                                        <p className="mt-0.5 text-xs text-muted">Accessible to all</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Who's behind AiLysium */}
            <section className="relative overflow-hidden bg-cloud py-16 md:py-28">
                <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6">
                    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                        {/* Left — Founder image */}
                        <Reveal id="founder-image" x={-20} className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky/8 via-transparent to-sky-light/8" />
                            <div className="relative overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-xl shadow-ink/5">
                                <img
                                    src={founderImg}
                                    alt="Muhammad Abdullah — Founder of AiLysium"
                                    className="h-64 w-full object-cover object-top sm:h-80 md:h-[26rem]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 rounded-2xl border border-slate/10 bg-white px-4 py-2.5 shadow-lg shadow-ink/5 sm:-bottom-4 sm:-right-4 sm:px-5 sm:py-3">
                                <p className="font-heading text-sm font-bold text-ink">Founder</p>
                                <p className="text-xs text-muted">AiLysium</p>
                            </div>
                        </Reveal>

                        {/* Right — Data */}
                        <Reveal id="founder-text" x={20} delay={0.1} className="text-center md:text-left">
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                                <span className="h-1 w-1 rounded-full bg-sky" />
                                Meet the Founder
                            </span>
                            <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl md:mt-5 md:text-[2.75rem] md:leading-tight">
                                Muhammad{" "}
                                <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                    Abdullah
                                </span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base md:mx-0 md:mt-5">
                                The person behind AiLysium — building a platform where teen
                                beginners and freelancers learn AI through real, hands-on
                                projects instead of just watching videos.
                            </p>

                            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 md:mt-7">
                                <div className="rounded-2xl border border-slate/10 bg-white p-3 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-4">
                                    <p className="font-heading text-lg font-bold text-ink sm:text-xl">2+</p>
                                    <p className="mt-0.5 text-xs text-muted sm:mt-1">Programs</p>
                                </div>
                                <div className="rounded-2xl border border-slate/10 bg-white p-3 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-4">
                                    <p className="font-heading text-lg font-bold text-ink sm:text-xl">1:1</p>
                                    <p className="mt-0.5 text-xs text-muted sm:mt-1">Mentoring</p>
                                </div>
                                <div className="rounded-2xl border border-slate/10 bg-white p-3 text-center shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/8 sm:p-4">
                                    <p className="font-heading text-lg font-bold text-ink sm:text-xl">100%</p>
                                    <p className="mt-0.5 text-xs text-muted sm:mt-1">Hands-on</p>
                                </div>
                            </div>

                            <Button as={Link} to="/contact" variant="primary" size="md" className="mt-6 rounded-full px-6 shadow-lg shadow-sky/20 hover:shadow-sky/35 md:mt-7">
                                Connect with founder
                            </Button>
                        </Reveal>
                    </div>

                    {/* Team */}
                    <Reveal id="team" className="mt-12 md:mt-16">
                        <h3 className="font-heading text-lg font-bold text-ink sm:text-xl">
                            Mentors leading our courses
                        </h3>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-6 md:grid-cols-3">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="group flex items-center gap-3.5 rounded-2xl border border-slate/10 bg-white p-4 shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-lg hover:shadow-sky/8 sm:gap-4 sm:p-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky to-sky-light text-xs font-bold text-white shadow-md shadow-sky/20 sm:h-12 sm:w-12 sm:text-sm">
                                        {member.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-heading text-sm font-bold text-ink">{member.name}</p>
                                        <p className="mt-0.5 text-xs text-muted">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* What We Do */}
            <section className="relative overflow-hidden bg-white py-16 md:py-28">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <Reveal id="what-header">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky">
                            <span className="h-1 w-1 rounded-full bg-sky" />
                            Online Learning, Done Right
                        </span>
                        <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-[2.75rem] md:leading-tight">
                            What{" "}
                            <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                we do
                            </span>
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                            Live sessions with a real mentor, built around one goal: you
                            finish with something you built yourself.
                        </p>
                    </Reveal>

                    <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
                        {whatWeDoCards.map((card, index) => (
                            <Reveal
                                key={card.title}
                                id={`what-${index}`}
                                delay={index * 0.1}
                                className="group relative overflow-hidden rounded-3xl border border-slate/10 bg-white p-5 text-left shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8 sm:p-7"
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky/8 to-transparent transition-transform duration-500 group-hover:scale-150" />
                                <div className="flex items-center gap-3 sm:block sm:gap-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-md shadow-sky/25 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                                        {index === 0 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                    </div>
                                    <h3 className="font-heading text-base font-bold text-ink transition-colors group-hover:text-sky sm:mt-5 sm:text-lg">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {card.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="relative overflow-hidden bg-cloud py-16 md:py-28">
                <div className="pointer-events-none absolute top-0 left-0 h-40 w-full bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6 text-center">
                    <Reveal id="why-header">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                            <span className="h-1 w-1 rounded-full bg-sky" />
                            Built on Trust
                        </span>
                        <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-[2.75rem] md:leading-tight">
                            Why choose{" "}
                            <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                                AiLysium
                            </span>
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                            We'd rather teach fewer students well than a lot of students
                            poorly — that shows up in how every program is run.
                        </p>
                    </Reveal>

                    <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
                        {whyChooseUsCards.map((card, index) => (
                            <Reveal
                                key={card.title}
                                id={`why-${index}`}
                                delay={index * 0.1}
                                className="group relative overflow-hidden rounded-3xl border border-slate/10 bg-white p-5 text-left shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8 sm:bg-white/70 sm:backdrop-blur-md sm:p-7"
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky/8 to-transparent transition-transform duration-500 group-hover:scale-150" />
                                <div className="flex items-center gap-3 sm:block sm:gap-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-md shadow-sky/25 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                                        {index === 0 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                    </div>
                                    <h3 className="font-heading text-base font-bold text-ink transition-colors group-hover:text-sky sm:mt-5 sm:text-lg">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {card.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialSection revealPrefix="about-testimonials" />

            {/* Consultation CTA */}
            <Reveal id="about-consultation">
                <ConsultationSection
                    heading={<>Get ready to <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">build with AI</span></>}
                    description="Browse our programs or talk to us first — either way, the next step is a real conversation, not a signup form."
                    primaryCta={{ text: "Explore programs", to: "/courses" }}
                    secondaryCta={{ text: "Contact us", to: "/contact" }}
                />
            </Reveal>
        </div>
    );
};