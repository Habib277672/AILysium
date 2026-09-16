import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";

const testimonials = [
    {
        name: "Ayesha Khan",
        role: "Parent of a Kids AI Course Student",
        summary:
            "Her son progressed from gaming to building his own web project over three months.",
    },
    {
        name: "Bilal Ahmed",
        role: "Parent of a VIP Program Student",
        summary:
            "Values the one-on-one guidance and hands-on work with image and video AI tools.",
    },
    {
        name: "Fatima Noor",
        role: "Parent of a Kids AI Course Student",
        summary:
            "Appreciates the clear roadmap, the focus on responsible AI use, and AI agents.",
    },
    {
        name: "Imran Ali",
        role: 'Parent of a "Flantsers AI" Course Student',
        summary:
            "Highlights the freelancer preparation — video, websites, automation — and his child's growing confidence.",
    },
];

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
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
                    <Badge variant="sky" className="bg-white/10 text-sky-light">
                        About AiLysium
                    </Badge>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">
                        Building AI skills, one real project at a time
                    </h1>
                    <p className="mt-6 text-white/70">
                        AiLysium exists because most AI education is talk, not practice.
                        We built a place where teen beginners and freelancers learn by
                        actually shipping things.
                    </p>
                </div>
            </section>

            {/* Who We Are */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <Badge variant="sky">Personalised Learning, Anytime, Anywhere</Badge>
                        <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
                            Who we are
                        </h2>
                        <p className="mt-4 text-slate">
                            AiLysium is an AI education platform based in Pakistan,
                            training teen beginners through the Kids AI program and
                            freelancers through Freelancer AI. We're not a video library —
                            every program is mentor-led, hands-on, and structured around
                            shipping a real project, not just finishing a syllabus.
                        </p>
                    </div>
                    <Card padding="lg" className="border-t-4 border-t-sky">
                        <p className="font-heading text-lg font-semibold text-ink">
                            Weekly, not one-time
                        </p>
                        <p className="mt-2 text-sm text-slate">
                            Each program is broken into weekly milestones with a real
                            deliverable, so progress is visible from week one, not just at
                            the end.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Who's behind AiLysium */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        Who's behind AiLysium
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-slate">
                        Every program has a named mentor who actually teaches it —
                        here's who's currently leading our courses.
                    </p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky/10 font-heading text-lg font-semibold text-sky">
                                    {member.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .join("")
                                        .slice(0, 2)}
                                </div>
                                <p className="mt-4 font-heading font-semibold text-ink">
                                    {member.name}
                                </p>
                                <p className="text-sm text-slate">{member.role}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="bg-soft-blue py-20">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <Badge variant="sky">Online Learning, Done Right</Badge>
                    <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
                        What we do
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-slate">
                        Live sessions with a real mentor, built around one goal: you
                        finish with something you built yourself.
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {whatWeDoCards.map((card) => (
                            <Card key={card.title} className="text-left">
                                <p className="font-heading text-lg font-semibold text-ink">
                                    {card.title}
                                </p>
                                <p className="mt-2 text-sm text-slate">{card.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="mx-auto max-w-6xl px-6 py-20 text-center">
                <Badge variant="sky">Built on Trust, Refined Over Time</Badge>
                <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
                    Why choose AiLysium
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-slate">
                    We'd rather teach fewer students well than a lot of students
                    poorly — that shows up in how every program is run.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {whyChooseUsCards.map((card) => (
                        <Card key={card.title} className="border-t-4 border-t-sky text-left">
                            <p className="font-heading text-lg font-semibold text-ink">
                                {card.title}
                            </p>
                            <p className="mt-2 text-sm text-slate">{card.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        What our happy users say
                    </h2>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.name} className="flex flex-col">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky/10 font-heading font-semibold text-sky">
                                    {testimonial.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .join("")}
                                </div>
                                <p className="mt-4 font-heading font-semibold text-ink">
                                    {testimonial.name}
                                </p>
                                <p className="text-sm text-sky">{testimonial.role}</p>
                                <p className="mt-3 text-sm text-slate">{testimonial.summary}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Get Ready */}
            <section className="relative overflow-hidden bg-ink py-20 text-white">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent" />
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
                    <h2 className="font-heading text-3xl font-bold md:text-4xl">
                        Get ready to build with AI
                    </h2>
                    <p className="max-w-md text-white/70">
                        Browse our programs or talk to us first — either way, the next
                        step is a real conversation, not a signup form.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button as={Link} to="/courses" variant="primary" size="lg">
                            Explore programs
                        </Button>
                        <Button
                            as={Link}
                            to="/contact"
                            variant="outline"
                            size="lg"
                            className="border-white/25 text-white hover:border-sky hover:text-sky-light"
                        >
                            Contact us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};