import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";

// Per the project data: the source PDFs confirm the project scope requires
// an About page (mission, approach, values, team/background) but do NOT
// provide finalized copy for it. Every block below is a clearly labeled
// placeholder, not invented copy — swap in real content when it's ready.

const values = [
    {
        title: "[PLACEHOLDER VALUE TITLE]",
        description: "[PLACEHOLDER CONTENT — value description to be provided]",
    },
    {
        title: "[PLACEHOLDER VALUE TITLE]",
        description: "[PLACEHOLDER CONTENT — value description to be provided]",
    },
    {
        title: "[PLACEHOLDER VALUE TITLE]",
        description: "[PLACEHOLDER CONTENT — value description to be provided]",
    },
];

const teamMembers = [
    { name: "Muhammad Abdullah", role: "Mentor — Kids AI" },
    { name: "Seerat Munir", role: "Mentor — Freelancer AI" },
    { name: "[PLACEHOLDER NAME]", role: "[PLACEHOLDER ROLE]" },
];

export const About = () => {
    return (
        <div>
            {/* Hero */}
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
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        [PLACEHOLDER — About page hero headline]
                    </h1>
                    <p className="mt-6 text-white/70">
                        [PLACEHOLDER CONTENT — a short description of AiLysium, its
                        mission, and who it serves has not been finalized yet. This
                        section will describe why AiLysium exists and who it's built
                        for.]
                    </p>
                </div>
            </section>

            {/* Mission & Approach */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-10 md:grid-cols-2">
                    <Card padding="lg">
                        <Badge variant="sky">Our mission</Badge>
                        <h2 className="mt-4 font-heading text-2xl font-bold text-ink">
                            [PLACEHOLDER — Mission statement]
                        </h2>
                        <p className="mt-4 text-sm text-slate">
                            [PLACEHOLDER CONTENT — mission copy to be provided. This is a
                            known content gap, not an omission — the project scope
                            requires this section but no finalized copy exists yet.]
                        </p>
                    </Card>

                    <Card padding="lg">
                        <Badge variant="sky">Our approach</Badge>
                        <h2 className="mt-4 font-heading text-2xl font-bold text-ink">
                            [PLACEHOLDER — Approach statement]
                        </h2>
                        <p className="mt-4 text-sm text-slate">
                            [PLACEHOLDER CONTENT — approach copy to be provided. Based on
                            home page content, this likely relates to hands-on, weekly
                            project-based learning rather than passive lectures — to be
                            confirmed and written properly.]
                        </p>
                    </Card>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        What we value
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-slate">
                        [PLACEHOLDER CONTENT — a short intro to AiLysium's values has not
                        been finalized. The three cards below are placeholder slots.]
                    </p>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {values.map((value, index) => (
                            <Card key={index} className="border-t-4 border-t-sky">
                                <p className="font-heading text-lg font-semibold text-ink">
                                    {value.title}
                                </p>
                                <p className="mt-2 text-sm text-slate">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team / background */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="font-heading text-3xl font-bold text-ink">
                    Who's behind AiLysium
                </h2>
                <p className="mt-3 max-w-xl text-sm text-slate">
                    Confirmed mentors from the current program data are shown below.
                    Broader team/background copy is a placeholder pending finalized
                    content.
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
            </section>

            {/* Why choose AiLysium */}
            <section className="bg-ink-soft py-20 text-white">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="font-heading text-3xl font-bold">
                        [PLACEHOLDER — Why choose AiLysium]
                    </h2>
                    <p className="mt-4 max-w-xl text-white/70">
                        [PLACEHOLDER CONTENT — a finalized "why choose us" section has
                        not been provided. Confirmed differentiators from existing
                        program data — live mentorship, weekly hands-on builds, and a
                        portfolio-first approach — could inform this section once
                        written.]
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 py-20 text-center">
                <h2 className="font-heading text-3xl font-bold text-ink">
                    Want to know more?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-slate">
                    Explore our programs or reach out directly — we're happy to answer
                    questions before you enroll.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button as={Link} to="/courses" variant="primary" size="lg">
                        Explore programs
                    </Button>
                    <Button as={Link} to="/contact" variant="outline" size="lg">
                        Contact us
                    </Button>
                </div>
            </section>
        </div>
    );
};