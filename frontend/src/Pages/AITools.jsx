import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { categories, aiTools } from "../data/aiTools";
import { HiOutlineSearch } from "react-icons/hi";

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
            <section className="relative overflow-hidden bg-cloud py-28 md:py-36">
                <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/15 blur-[160px]" />

                <div className="relative mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full bg-sky" />
                        AI Tools
                    </span>
                    <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                        The tools you'll{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            actually build with
                        </span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-muted">
                        A directory of the AI tools shaping how people build, write,
                        design, and automate today — browse by category to find what
                        fits your project.
                    </p>
                </div>
            </section>

            {/* Search + category tabs + tool grid */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-center font-heading text-3xl font-bold text-ink">
                    Explore AI tools{" "}
                    <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                        by category
                    </span>
                </h2>

                <div className="mx-auto mt-8 max-w-md">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
                        <input
                            type="text"
                            placeholder="Search tools…"
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full rounded-full border border-slate/15 bg-white py-3 pl-11 pr-5 text-sm shadow-sm shadow-ink/3 transition-all duration-300 placeholder:text-muted/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/15 focus:shadow-md focus:shadow-sky/8"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryChange(category)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${activeCategory === category
                                ? "border-sky bg-sky text-white shadow-md shadow-sky/25"
                                : "border-slate/15 bg-white text-muted hover:border-sky/40 hover:text-sky shadow-sm shadow-ink/3"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleTools.map((tool, index) => (
                        <div
                            key={`${tool.name}-${index}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky/15 hover:shadow-xl hover:shadow-sky/8"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-center gap-3.5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate/5 to-slate/10 transition-all duration-300 group-hover:from-sky/10 group-hover:to-sky/5 group-hover:shadow-md group-hover:shadow-sky/10">
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
                                        className="flex h-full w-full items-center justify-center font-heading text-base font-bold text-slate/25"
                                        style={{ display: tool.image ? "none" : "flex" }}
                                    >
                                        {tool.name.charAt(0)}
                                    </span>
                                </div>

                                <div>
                                    <p className="font-heading text-[15px] font-semibold text-ink transition-colors group-hover:text-sky">{tool.name}</p>
                                    <p className="mt-0.5 text-xs font-medium text-sky/70">{tool.category}</p>
                                </div>
                            </div>

                            <p className="mt-4 flex-1 text-[13px] leading-relaxed text-muted">{tool.description}</p>

                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {tool.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate/4 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted/80 transition-colors group-hover:bg-sky/5 group-hover:text-sky/70"
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
                                    className="mt-5 inline-flex items-center gap-1.5 self-end text-sm font-medium text-sky transition-all duration-200 hover:text-sky-light hover:gap-2.5"
                                >
                                    Visit tool
                                    <span aria-hidden="true">→</span>
                                </a>
                            )}
                        </div>
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
                            className="rounded-full cursor-pointer"
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-cloud py-16 md:py-20">
                <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/10 blur-[160px]" />

                <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        Want to work with AI tools{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            hands-on?
                        </span>
                    </h2>
                    <p className="max-w-md text-base text-muted">
                        Every AiLysium program is built around real, weekly practice with
                        AI tools — not just watching demos.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button as={Link} to="/courses" variant="primary" size="lg" className="rounded-full cursor-pointer px-8 shadow-lg shadow-sky/25 hover:shadow-xl hover:shadow-sky/35">
                            Explore programs
                        </Button>
                        <Button
                            as={Link}
                            to="/contact"
                            variant="outline"
                            size="lg"
                            className="rounded-full cursor-pointer"
                        >
                            Talk to us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};