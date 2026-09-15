import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Button } from "../Components/UI/Button";

const statusBadgeVariant = {
    AVAILABLE: "success",
    COMING_SOON: "warning",
    UNPUBLISHED: "ink",
};

const statusLabel = {
    AVAILABLE: "Available",
    COMING_SOON: "Coming Soon",
    UNPUBLISHED: "No longer listed",
};

export const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
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

    const publicCourseIds = new Set(courses.map((c) => c.id));
    const orphanedEnrolledCourses = enrollments
        .filter((enrollment) => !publicCourseIds.has(enrollment.course.id))
        .map((enrollment) => ({
            id: enrollment.course.id,
            slug: enrollment.course.slug,
            title: enrollment.course.title,
            status: "UNPUBLISHED",
            description: "",
            price: null,
            duration: null,
            mentor: null,
            imageUrl: null,
        }));

    const displayedCourses = [...courses, ...orphanedEnrolledCourses];

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

            {displayedCourses.length === 0 ? (
                <Card padding="lg" className="mt-10 text-center text-sm text-slate">
                    No programs are available right now. Check back soon.
                </Card>
            ) : (
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {displayedCourses.map((course) => {
                        const enrollment = enrollmentByCourseId[course.id];
                        const isAvailable = course.status === "AVAILABLE";
                        const isUnpublished = course.status === "UNPUBLISHED";

                        return (
                            <Card
                                key={course.id}
                                className="flex flex-col overflow-hidden border-t-4 border-t-sky"
                            >
                                {course.imageUrl && (
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="-mx-6 -mt-6 mb-4 h-40 w-[calc(100%+3rem)] object-cover"
                                    />
                                )}

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
                                {course.description && (
                                    <p className="mt-2 flex-1 text-sm text-slate">
                                        {course.description}
                                    </p>
                                )}
                                {course.price != null && (
                                    <p className="mt-4 font-heading text-lg font-bold text-ink">
                                        PKR {course.price.toLocaleString()}
                                    </p>
                                )}

                                <div className="mt-6 flex flex-col gap-2">
                                    {/* Unpublished courses have no live details page anymore
                      (the public GET /courses/:slug excludes them) — no
                      point linking to a page that'll 404. */}
                                    {!isUnpublished && (
                                        <Button
                                            as={Link}
                                            to={`/courses/${course.slug}`}
                                            variant="outline"
                                            size="sm"
                                        >
                                            View details
                                        </Button>
                                    )}

                                    {enrollment ? (
                                        enrollment.paymentStatus === "PENDING" ? (
                                            <Button
                                                as={Link}
                                                to={`/payment?enrollmentId=${enrollment.id}`}
                                                variant="primary"
                                                size="sm"
                                            >
                                                Complete payment
                                            </Button>
                                        ) : (
                                            <Button variant="outline" size="sm" disabled>
                                                Already enrolled
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            as={Link}
                                            to={`/enroll/${course.id}`}
                                            variant="primary"
                                            size="sm"
                                            disabled={!isAvailable || isUnpublished}
                                        >
                                            {isAvailable ? "Enroll now" : "Coming Soon"}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};