import { useState, useEffect } from "react";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { categories, aiTools } from "../data/aiTools";
import {
    HiOutlineSearch,
    HiOutlineGlobeAlt,
    HiOutlineVideoCamera,
    HiOutlinePhotograph,
    HiOutlinePencilAlt,
    HiOutlineCode,
    HiOutlineChatAlt2,
    HiOutlineTrendingUp,
    HiOutlineLightBulb,
    HiOutlineColorSwatch,
    HiOutlineUserGroup,
    HiOutlineChartBar,
    HiOutlineCog,
    HiOutlineAcademicCap,
    HiOutlineMusicNote,
    HiOutlineBriefcase,
    HiOutlinePhone,
    HiOutlineSearchCircle,
    HiOutlineShieldCheck,
    HiOutlineAdjustments,
    HiOutlineCollection,
} from "react-icons/hi";

const PAGE_SIZE = 9;

const categoryIcons = {
    "All Tools": HiOutlineCollection,
    "Video Generation": HiOutlineVideoCamera,
    "Image Generation": HiOutlinePhotograph,
    "AI Writing": HiOutlinePencilAlt,
    "AI Coding": HiOutlineCode,
    "AI Chatbots": HiOutlineChatAlt2,
    "SEO & Marketing": HiOutlineTrendingUp,
    "Productivity Tools": HiOutlineLightBulb,
    "Design & UI": HiOutlineColorSwatch,
    "Analysis & Digital Humans": HiOutlineUserGroup,
    "Data & Analytics": HiOutlineChartBar,
    "Automation Agents": HiOutlineCog,
    "Education & Learning": HiOutlineAcademicCap,
    "Music & Audio": HiOutlineMusicNote,
    "Business AI": HiOutlineBriefcase,
    "Sales AI": HiOutlinePhone,
    "Research & Search": HiOutlineSearchCircle,
    "AI Security": HiOutlineShieldCheck,
    "AI Utilities": HiOutlineAdjustments,
    "Web & App Builders": HiOutlineGlobeAlt,
};

export const AITools = () => {
    const [activeCategory, setActiveCategory] = useState("All Tools");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredTools = aiTools.filter((tool) => {
        const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
        const matchesSearch = tool.name.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
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
                <div className="text-center">
                    <h2 className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">
                        Explore AI tools{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            by category
                        </span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                        Browse through our curated collection of AI tools organized by what they do best.
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-md">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted/50" />
                        <input
                            type="text"
                            placeholder="Search tools…"
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full rounded-full border border-slate/15 bg-white py-3.5 pl-12 pr-5 text-sm shadow-sm shadow-ink/3 transition-all duration-300 placeholder:text-muted/40 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/15 focus:shadow-md focus:shadow-sky/8"
                        />
                    </div>
                </div>

                <div className="mx-auto mt-8 flex max-w-md items-center gap-4">
                    <div className="h-px flex-1 bg-slate/15" />
                    <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted/60">
                        Explore categories
                    </p>
                    <div className="h-px flex-1 bg-slate/15" />
                </div>

                <div className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-2">
                    {categories.map((category) => {
                        const Icon = categoryIcons[category] || HiOutlineGlobeAlt;
                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryChange(category)}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${activeCategory === category
                                    ? "border-sky bg-sky text-white shadow-md shadow-sky/25"
                                    : "border-slate/15 bg-white text-muted hover:border-sky/40 hover:text-sky shadow-sm shadow-ink/3"
                                    }`}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {category}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleTools.map((tool, index) => (
                        <div
                            key={`${tool.name}-${index}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky/15 hover:shadow-xl hover:shadow-sky/8 animate-[fadeInUp_0.4s_ease-out_both]"
                            style={{ animationDelay: `${(index % PAGE_SIZE) * 50}ms` }}
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

                            <div className="my-4 h-px bg-slate/10" />

                            <div className="flex items-center justify-between">
                                {tool.link ? (
                                    <a
                                        href={tool.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full bg-sky/8 px-3 py-1.5 text-xs font-semibold text-sky transition-all duration-200 hover:bg-sky/15 hover:shadow-sm"
                                    >
                                        Try now
                                        <span aria-hidden="true">→</span>
                                    </a>
                                ) : (
                                    <span />
                                )}
                                <span className="text-[11px] font-medium text-muted/50">
                                    {tool.category}
                                </span>
                            </div>
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
                        <button
                            type="button"
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-sm shadow-ink/3 transition-all duration-300 hover:border-sky/40 hover:text-sky hover:shadow-md hover:shadow-sky/10"
                        >
                            Load more Tools
                            <span className="inline-flex items-center justify-center rounded-full bg-sky/10 px-2 py-0.5 text-xs font-bold text-sky transition-colors group-hover:bg-sky/20">
                                {filteredTools.length - visibleCount}
                            </span>
                        </button>
                    </div>
                )}
            </section>

            {/* CTA */}
            <ConsultationSection
                heading={<>Want to work with AI tools{" "}<span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">hands-on?</span></>}
                description="Every AiLysium program is built around real, weekly practice with AI tools — not just watching demos."
                primaryCta={{ text: "Explore programs", href: "/courses" }}
                secondaryCta={{ text: "Talk to us", to: "/contact" }}
            />
        </div>
    );
};