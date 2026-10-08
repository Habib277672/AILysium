import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ConsultationSection } from "../Components/UI/ConsultationSection";
import { Reveal } from "../Components/UI/Reveal";
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
    const previousTitle = document.title;
    const description =
      "Explore the 30+ AI tools used in AiLysium courses, grouped by purpose: assistants, research, media, study, building and automation.";
    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    document.title =
      "AI Tools We Teach | ChatGPT, Claude, Gemini and More | AiLysium";
    meta.setAttribute("content", description);
    return () => {
      document.title = previousTitle;
      if (previousDescription === null) meta.remove();
      else meta.setAttribute("content", previousDescription);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredTools = aiTools.filter((tool) => {
    const matchesCategory =
      activeCategory === "All Tools" || tool.category === activeCategory;
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleTools = filteredTools.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTools.length;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setVisibleCount(PAGE_SIZE);
    // Restore the full grid immediately on clear instead of waiting
    // for the debounce — otherwise the last search result lingers.
    if (value === "") {
      setDebouncedSearch("");
    }
  };

  return (
    <div>
      {/* Top section */}
      <section className="bg-cloud relative overflow-hidden py-16 md:py-36">
        <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="bg-sky/15 pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >

          <h1 className="font-heading text-ink text-3xl leading-tight font-extrabold sm:text-4xl md:mt-5 md:text-5xl">
            The Tools You'll{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              <br />
              Actually Build With
            </span>
          </h1>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:mt-5">
            Explore the AI tools used in AiLysium courses, from ChatGPT, Claude
            and Gemini to research, image, video, study and automation tools.
            Browse by category to find the right tool for your project.
          </p>
        </motion.div>
      </section>

      {/* Search + category tabs + tool grid */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Reveal id="aitools-header" className="text-center">
          <h2 className="font-heading text-ink text-lg font-extrabold whitespace-nowrap max-[359px]:text-base md:text-4xl">
            Explore AI Tools{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              By Category
            </span>
          </h2>
          <p className="text-muted mx-auto mt-3 max-w-md text-sm leading-relaxed md:max-w-lg">
            Find AI tools grouped by what they do best, including AI assistants,
            research, image and video creation, study, coding and automation.
          </p>
        </Reveal>

        <Reveal
          id="aitools-search"
          y={12}
          delay={0.1}
          className="mx-auto mt-6 max-w-md sm:mt-8"
        >
          <div className="relative">
            <HiOutlineSearch className="text-muted/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AI tools"
              value={search}
              onChange={handleSearchChange}
              className="border-slate/15 shadow-ink/3 placeholder:text-muted/40 focus:border-sky focus:ring-sky/15 focus:shadow-sky/8 w-full rounded-full border bg-white py-3 pr-5 pl-12 text-sm shadow-sm transition-all duration-300 focus:shadow-md focus:ring-2 focus:outline-none sm:py-3.5"
            />
          </div>
        </Reveal>

        <Reveal
          id="aitools-divider"
          y={8}
          delay={0.15}
          className="mx-auto mt-6 flex max-w-md items-center gap-4 sm:mt-8"
        >
          <div className="bg-slate/15 h-px flex-1" />
          <p className="text-muted/60 shrink-0 text-xs font-semibold tracking-wider uppercase">
            Explore categories
          </p>
          <div className="bg-slate/15 h-px flex-1" />
        </Reveal>

        <Reveal
          id="aitools-categories"
          y={12}
          delay={0.2}
          className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-1.5 sm:gap-2"
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category] || HiOutlineGlobeAlt;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 sm:px-3.5 sm:py-2 ${activeCategory === category
                  ? "border-sky text-white"
                  : "border-slate/15 text-muted hover:border-sky/40 hover:text-sky shadow-ink/3 bg-white shadow-sm"
                  }`}
              >
                {activeCategory === category && (
                  <motion.span
                    layoutId="aitools-tab-active"
                    className="bg-sky shadow-sky/25 absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {category}
                </span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence>
            {visibleTools.map((tool, index) => (
              <motion.div
                key={`${activeCategory}-${tool.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                transition={{
                  duration: 0.4,
                  delay: (index % PAGE_SIZE) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-slate/10 hover:border-sky/15 hover:shadow-sky/8 relative flex flex-col overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
              >
                <div className="via-sky/20 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-center gap-3">
                  <div className="from-slate/5 to-slate/10 group-hover:from-sky/10 group-hover:to-sky/5 group-hover:shadow-sky/10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br transition-all duration-300 group-hover:shadow-md sm:h-12 sm:w-12">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          event.currentTarget.nextSibling.style.display =
                            "flex";
                        }}
                      />
                    ) : null}
                    <span
                      className="font-heading text-slate/25 flex h-full w-full items-center justify-center text-base font-bold"
                      style={{ display: tool.image ? "none" : "flex" }}
                    >
                      {tool.name.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="font-heading text-ink group-hover:text-sky truncate text-sm font-semibold transition-colors sm:text-[15px]">
                      {tool.name}
                    </p>
                    <p className="text-sky/70 mt-0.5 text-xs font-medium">
                      {tool.category}
                    </p>
                  </div>
                </div>

                <p className="text-muted mt-3 flex-1 text-xs leading-relaxed sm:mt-4 sm:text-[13px]">
                  {tool.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate/4 text-muted/80 group-hover:bg-sky/5 group-hover:text-sky/70 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide transition-colors sm:px-2.5 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="bg-slate/10 my-3 h-px sm:my-4" />

                <div className="flex items-center justify-between">
                  {tool.link ? (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sky/8 text-sky hover:bg-sky/15 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:shadow-sm"
                    >
                      Try now
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span />
                  )}
                  <span className="text-muted/50 text-[11px] font-medium">
                    {tool.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleTools.length === 0 && (
            <p className="text-slate col-span-full py-10 text-center text-sm">
              No tools match "{search}" in this category.
            </p>
          )}
        </div>

        {hasMore && (
          <Reveal
            id="aitools-loadmore"
            y={12}
            className="mt-8 text-center sm:mt-10"
          >
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="group border-slate/15 text-ink shadow-ink/3 hover:border-sky/40 hover:text-sky hover:shadow-sky/10 inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md sm:px-7 sm:py-3.5"
            >
              Load more Tools
              <span className="bg-sky/10 text-sky group-hover:bg-sky/20 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold transition-colors">
                {filteredTools.length - visibleCount}
              </span>
            </button>
          </Reveal>
        )}
      </section>

      {/* CTA */}
      <Reveal id="aitools-consultation">
        <ConsultationSection
          heading={
            <>
              Want to Use AI Tools{" "}
              <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
                Hands-on?
              </span>
            </>
          }
          description="Every AiLysium course is built around live classes and weekly practice with real AI tools. You learn one skill at a time and finish with something you made."
          primaryCta={{ text: "Explore programs", to: "/courses" }}
          secondaryCta={{ text: "Talk to us", to: "/contact" }}
        />
      </Reveal>
    </div>
  );
};
