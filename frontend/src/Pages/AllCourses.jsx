import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Button } from "../Components/UI/Button";

const statusBadgeVariant = {
    AVAILABLE: "success",
    COMING_SOON: "warning",
};

const statusLabel = {
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
};

export const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                // Both requests run in parallel — this page needs both the full
                // course catalog AND the user's own enrollments to compute
                // "already enrolled" state per card.
                const [coursesRes, enrollmentsRes] = await Promise.all([
                    api.get("/courses"),
                    api.get("/me/enrollments"),
                ]);
                setCourses(coursesRes.data);
                setEnrollments(enrollmentsRes.data);
            } catch (err) {
                setError("Couldn't load courses. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const enrollmentByCourseId = enrollments.reduce((map, enrollment) => {
        map[enrollment.course.id] = enrollment;
        return map;
    }, {});

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-6 py-24 text-center text-sm text-slate">
                Loading courses…
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-6 py-24 text-center">
                <p className="text-sm text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <Badge variant="sky">All programs</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Browse and manage your courses
            </h1>
            <p className="mt-2 text-sm text-slate">
                See what you're already enrolled in, and discover what's next.
            </p>

            {courses.length === 0 ? (
                <Card padding="lg" className="mt-10 text-center text-sm text-slate">
                    No programs are available right now. Check back soon.
                </Card>
            ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {courses.map((course) => {
                        const enrollment = enrollmentByCourseId[course.id];
                        const isAvailable = course.status === "AVAILABLE";

                        return (
                            <Card
                                key={course.id}
                                className="flex flex-col border-t-4 border-t-sky"
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant={statusBadgeVariant[course.status]}>
                                        {statusLabel[course.status]}
                                    </Badge>
                                    {enrollment && (
                                        <Badge
                                            variant={
                                                enrollment.paymentStatus === "CONFIRMED"
                                                    ? "success"
                                                    : "warning"
                                            }
                                        >
                                            {enrollment.paymentStatus === "CONFIRMED"
                                                ? "Enrolled"
                                                : "Enrollment pending"}
                                        </Badge>
                                    )}
                                </div>

                                <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
                                    {course.title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm text-slate">
                                    {course.description}
                                </p>
                                <p className="mt-4 font-heading text-lg font-bold text-ink">
                                    PKR {course.price.toLocaleString()}
                                </p>

                                {enrollment ? (
                                    enrollment.paymentStatus === "PENDING" ? (
                                        <Button
                                            as={Link}
                                            to={`/payment?enrollmentId=${enrollment.id}`}
                                            variant="primary"
                                            size="sm"
                                            className="mt-6"
                                        >
                                            Complete payment
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" className="mt-6" disabled>
                                            Already enrolled
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        as={Link}
                                        to={`/enroll/${course.id}`}
                                        variant="primary"
                                        size="sm"
                                        className="mt-6"
                                        disabled={!isAvailable}
                                    >
                                        {isAvailable ? "Enroll now" : "Coming Soon"}
                                    </Button>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};