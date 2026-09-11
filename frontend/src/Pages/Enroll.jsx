import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Button } from "../Components/UI/Button";

export const Enroll = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // There's no public "get course by id" endpoint (only by slug, for
        // SEO-friendly URLs) — /enroll/:courseId uses the DB id directly since
        // it's linked from AllCourses/Profile where the id is already in hand.
        // Fetching the full list and filtering client-side is fine at this
        // course count; if the catalog grows significantly, a dedicated
        // GET /api/courses/id/:id endpoint would be worth adding.
        const loadCourse = async () => {
            try {
                const { data } = await api.get("/courses");
                const match = data.find((c) => c.id === courseId);
                if (!match) {
                    setError("This course could not be found or is no longer available.");
                } else {
                    setCourse(match);
                }
            } catch (err) {
                setError("Something went wrong loading this course.");
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [courseId]);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError("");

        try {
            const { data: enrollment } = await api.post("/enrollments", { courseId });
            navigate(`/payment?enrollmentId=${enrollment.id}`, { replace: true });
        } catch (err) {
            // Covers "already enrolled" (409) and any validation errors (400)
            // from the backend, surfaced directly rather than a generic message.
            const message =
                err.response?.data?.error || "Couldn't start enrollment. Please try again.";
            setError(message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center text-sm text-slate">
                Loading…
            </div>
        );
    }

    if (!course) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center">
                <Badge variant="warning">Not found</Badge>
                <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                    {error || "This course could not be found."}
                </h1>
                <Button as={Link} to="/all-courses" variant="primary" size="lg" className="mt-8">
                    Browse courses
                </Button>
            </div>
        );
    }

    const isAvailable = course.status === "AVAILABLE";

    return (
        <div className="mx-auto max-w-2xl px-6 py-16">
            <Badge variant="sky">Enroll</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Confirm your enrollment
            </h1>
            <p className="mt-2 text-sm text-slate">
                Review the details below before continuing to payment.
            </p>

            <Card padding="lg" className="mt-8">
                <h2 className="font-heading text-xl font-semibold text-ink">
                    {course.title}
                </h2>
                <p className="mt-2 text-sm text-slate">{course.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-slate/10 pt-6">
                    <span className="text-sm text-slate">Price</span>
                    <span className="font-heading text-2xl font-bold text-ink">
                        PKR {course.price.toLocaleString()}
                    </span>
                </div>

                {!isAvailable && (
                    <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        This program is marked "Coming Soon" and isn't open for
                        enrollment yet.
                    </p>
                )}

                {error && (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <Button
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={handleConfirm}
                    disabled={!isAvailable || submitting}
                >
                    {submitting ? "Starting enrollment..." : "Continue to payment"}
                </Button>
            </Card>
        </div>
    );
};