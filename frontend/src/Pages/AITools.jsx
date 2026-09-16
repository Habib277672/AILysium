import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { categories, aiTools } from "../data/aiTools";

const PAGE_SIZE = 9;

export const AITools = () => {
    const [activeCategory, setActiveCategory] = useState("All Tools");
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filteredTools = aiTools.filter((tool) => {
        const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
        const matchesSearch = tool.name.toLowerCase().includes(search.trim().toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleTools = filteredTools.slice(0, visibleCount);
    const hasMore = visibleCount < filteredTools.length;

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(PAGE_SIZE);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <div>
            {/* Top section */}
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
                    <Badge variant="sky" className="bg-white/10 text-sky-light">
                        AI Tools
                    </Badge>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">
                        The tools you'll actually build with
                    </h1>
                    <p className="mt-6 text-white/70">
                        A directory of the AI tools shaping how people build, write,
                        design, and automate today — browse by category to find what
                        fits your project.
                    </p>
                </div>
            </section>

            {/* Search + category tabs + tool grid */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-center font-heading text-3xl font-bold text-ink">
                    Explore AI tools by category
                </h2>

                <div className="mx-auto mt-8 max-w-md">
                    <input
                        type="text"
                        placeholder="Search tools…"
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full rounded-full border border-slate/20 px-5 py-3 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                    />
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryChange(category)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${activeCategory === category
                                ? "border-sky bg-sky/10 text-sky"
                                : "border-slate/20 text-slate hover:border-sky/50 hover:text-sky"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleTools.map((tool, index) => (
                        <Card
                            key={`${tool.name}-${index}`}
                            className="flex flex-col border-t-4 border-t-sky"
                        >
                            <div className="flex items-center gap-3">
                                {/* Small icon */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cloud">
                                    {tool.image ? (
                                        <img
                                            src={tool.image}
                                            alt={tool.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                            onError={(event) => {
                                                event.currentTarget.style.display = "none";
                                                event.currentTarget.nextSibling.style.display = "flex";
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        className="flex h-full w-full items-center justify-center font-heading text-sm font-semibold text-slate/40"
                                        style={{ display: tool.image ? "none" : "flex" }}
                                    >
                                        {tool.name.charAt(0)}
                                    </span>
                                </div>

                                <div>
                                    <p className="font-heading font-semibold text-ink">{tool.name}</p>
                                    <p className="text-xs text-sky">{tool.category}</p>
                                </div>
                            </div>
                            <p className="mt-3 flex-1 text-sm text-slate">{tool.description}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {tool.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-cloud px-2.5 py-1 text-[10px] font-medium tracking-wide text-slate"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {tool.link && (
                                <a
                                    href={tool.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sky hover:text-sky-light"
                                >
                                    Visit tool
                                    <span aria-hidden="true">↗</span>
                                </a>
                            )}
                        </Card>
                    ))}

                    {visibleTools.length === 0 && (
                        <p className="col-span-full py-10 text-center text-sm text-slate">
                            No tools match "{search}" in this category.
                        </p>
                    )}
                </div>

                {hasMore && (
                    <div className="mt-10 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-ink-soft py-20 text-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
                    <h2 className="font-heading text-3xl font-bold">
                        Want to work with AI tools hands-on?
                    </h2>
                    <p className="max-w-md text-white/70">
                        Every AiLysium program is built around real, weekly practice with
                        AI tools — not just watching demos.
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