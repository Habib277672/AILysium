import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";

export const NotFound = () => {
    const navigate = useNavigate();

    // Goes back to wherever the user actually came from (a wrong link, a
    // typo'd URL, a stale bookmark) rather than always dumping them on the
    // homepage. If there's no real history to go back to — e.g. they landed
    // here directly by typing the URL — history.state.idx will be 0/undefined,
    // and we send them home instead of leaving them stuck.
    const handleGoBack = () => {
        const hasHistory = window.history.state && window.history.state.idx > 0;
        if (hasHistory) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink px-6 text-white">
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage: "radial-gradient(rgba(59,159,251,0.18) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                }}
            />
            <div className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-96 w-96 rounded-full bg-sky-light/10 blur-[120px]" />

            <div className="relative mx-auto max-w-lg text-center">
                <Badge variant="sky" className="bg-white/10 text-sky-light">
                    404
                </Badge>
                <h1 className="mt-6 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl">
                    Page not found
                </h1>
                <p className="mt-4 text-white/70">
                    The page you're looking for doesn't exist, may have been moved, or
                    the link you followed might be broken.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                    <Button variant="primary" size="lg" onClick={handleGoBack}>
                        ← Go back
                    </Button>
                    <Button
                        as={Link}
                        to="/"
                        variant="outline"
                        size="lg"
                        className="border-white/25 text-white hover:border-sky hover:text-sky-light"
                    >
                        Back to home
                    </Button>
                </div>

                <p className="mt-8 text-sm text-white/50">
                    Or explore our{" "}
                    <Link to="/courses" className="font-medium text-sky-light hover:underline">
                        programs
                    </Link>{" "}
                    instead.
                </p>
            </div>
        </div>
    );
};