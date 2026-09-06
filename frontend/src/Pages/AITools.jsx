import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";

// Per the project data: the source PDFs confirm the scope requires a public
// AI Tools page, but the live site did not expose a verifiable AI Tools
// catalog — so no tool list has been invented. The only confirmed signal is
// the homepage mentioning "premium AI tools" and practical work across
// video generation, image generation, website generation, Python,
// JavaScript, and prompting. Those six areas are used below as category
// placeholders — not as a real, finalized tool catalog.

const toolCategories = [
    {
        area: "Video generation",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
    {
        area: "Image generation",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
    {
        area: "Website generation",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
    {
        area: "Python",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
    {
        area: "JavaScript",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
    {
        area: "Prompting",
        description: "[PLACEHOLDER CONTENT — specific tools to be confirmed]",
    },
];

export const AITools = () => {
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
                <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
                    <Badge variant="sky" className="bg-white/10 text-sky-light">
                        AI Tools
                    </Badge>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        The tools you'll actually build with
                    </h1>
                    <p className="mt-6 text-white/70">
                        AiLysium courses work with premium AI tools across video, image,
                        and website generation, plus real Python, JavaScript, and
                        prompting practice. A full tool-by-tool catalog for this page is
                        still being finalized.
                    </p>
                </div>
            </section>

            {/* Tool category grid */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        Areas you'll work in
                    </h2>
                    <p className="max-w-sm text-sm text-slate">
                        Confirmed practice areas from current program content. Specific
                        tool names and logos are placeholders pending a finalized
                        catalog.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {toolCategories.map((category) => (
                        <Card
                            key={category.area}
                            className="border-t-4 border-t-sky"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky/10 text-sky">
                                {/* Generic placeholder icon mark — real tool icons pending */}
                                <span className="font-heading text-lg font-bold">
                                    {category.area[0]}
                                </span>
                            </div>
                            <p className="mt-4 font-heading text-lg font-semibold text-ink">
                                {category.area}
                            </p>
                            <p className="mt-2 text-sm text-slate">{category.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Placeholder tool showcase strip */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        Featured tools
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-slate">
                        [PLACEHOLDER CONTENT — a specific, verified list of the premium
                        AI tools students use (with names, logos, and short
                        descriptions) has not been provided yet. This section is a
                        layout placeholder for that catalog.]
                    </p>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink/5 text-sm font-medium text-slate">
                                    Tool
                                </div>
                                <p className="mt-4 font-heading font-semibold text-ink">
                                    [PLACEHOLDER TOOL NAME]
                                </p>
                                <p className="mt-2 text-sm text-slate">
                                    [PLACEHOLDER CONTENT]
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-ink-soft py-20 text-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
                    <h2 className="font-heading text-3xl font-bold">
                        Want to work with these tools hands-on?
                    </h2>
                    <p className="max-w-md text-white/70">
                        Every AiLysium program is built around real, weekly practice with
                        these tools — not just watching demos.
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
                            Talk to us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};