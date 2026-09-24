import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../Components/UI/Button";
import { useEffect, useState } from "react";

export const NotFound = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const handleGoBack = () => {
        const hasHistory = window.history.state && window.history.state.idx > 0;
        if (hasHistory) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-cloud px-5 py-14 sm:px-6 sm:py-20">
            {/* Gradient blends */}
            <div className="pointer-events-none absolute top-0 left-0 h-48 w-full bg-gradient-to-b from-white via-white/80 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />

            {/* Glow blobs */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/10 blur-[160px]" />

            {/* Floating dots */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #0085fe 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-lg text-center"
            >
                {/* Large 404 number */}
                <div className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <span className="font-heading text-[6rem] font-extrabold leading-none text-sky/10 sm:text-[8rem] md:text-[10rem]">
                        404
                    </span>
                </div>

                {/* Content overlapping the number */}
                <div className={`relative -mt-20 transition-all delay-200 duration-700 ease-out sm:-mt-28 md:-mt-36 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                    {/* Icon */}
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky/10 text-sky sm:h-20 sm:w-20 sm:mb-6">
                        <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                    </div>

                    <h1 className="font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
                        Page not{" "}
                        <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                            found
                        </span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                        The page you're looking for doesn't exist, may have been moved, or the link you followed might be broken.
                    </p>

                    {/* Action buttons */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
                        <Button variant="primary" size="md" onClick={handleGoBack} className="rounded-full px-6 shadow-lg shadow-sky/20">
                            ← Go back
                        </Button>
                        <Button as={Link} to="/" variant="outline" size="md" className="rounded-full px-6">
                            Back to home
                        </Button>
                    </div>

                    {/* Explore link */}
                    <p className="mt-4 text-sm text-muted sm:mt-5">
                        Or explore our{" "}
                        <Link to="/courses" className="font-medium text-sky transition-colors hover:text-sky-light">
                            programs
                        </Link>{" "}
                        instead.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};
