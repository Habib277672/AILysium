import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { Card } from "../../Components/UI/Card";
import { CourseForm } from "../../Components/Admin/CourseForm";

const statusBadgeVariant = {
    AVAILABLE: "success",
    COMING_SOON: "warning",
    UNPUBLISHED: "ink",
};

export const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // null = closed, "new" = create form, a course object = editing it
    const [formTarget, setFormTarget] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const loadCourses = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/admin/courses");
            setCourses(data);
        } catch (err) {
            setError("Couldn't load courses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleCreate = async (payload) => {
        setSubmitting(true);
        try {
            await api.post("/admin/courses", payload);
            setFormTarget(null);
            await loadCourses();
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (payload) => {
        setSubmitting(true);
        try {
            await api.patch(`/admin/courses/${formTarget.id}`, payload);
            setFormTarget(null);
            await loadCourses();
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (course) => {
        setDeleteError("");
        const confirmed = window.confirm(
            `Delete "${course.title}"? This cannot be undone.`
        );
        if (!confirmed) return;

        try {
            await api.delete(`/admin/courses/${course.id}`);
            await loadCourses();
        } catch (err) {
            // Backend refuses to delete a course with existing enrollments
            // (409) — surface that specific message instead of a generic one.
            setDeleteError(
                err.response?.data?.error || "Couldn't delete this course."
            );
        }
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <Badge variant="sky">Manage</Badge>
                    <h1 className="mt-3 font-heading text-3xl font-bold text-ink">
                        Courses
                    </h1>
                </div>
                {!formTarget && (
                    <Button variant="primary" size="md" onClick={() => setFormTarget("new")}>
                        + New course
                    </Button>
                )}
            </div>

            {deleteError && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {deleteError}
                </p>
            )}

            {formTarget && (
                <Card padding="lg" className="mt-6">
                    <h2 className="font-heading text-lg font-semibold text-ink">
                        {formTarget === "new" ? "Create a course" : `Editing "${formTarget.title}"`}
                    </h2>
                    <div className="mt-5">
                        <CourseForm
                            course={formTarget === "new" ? null : formTarget}
                            onSubmit={formTarget === "new" ? handleCreate : handleUpdate}
                            onCancel={() => setFormTarget(null)}
                            submitting={submitting}
                        />
                    </div>
                </Card>
            )}

            <div className="mt-8">
                {loading && <p className="text-sm text-slate">Loading…</p>}
                {!loading && error && <p className="text-sm text-red-600">{error}</p>}

                {!loading && !error && (
                    <div className="grid gap-4">
                        {courses.map((course) => (
                            <Card
                                key={course.id}
                                className="flex flex-wrap items-center justify-between gap-4"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-heading font-semibold text-ink">
                                            {course.title}
                                        </p>
                                        <Badge variant={statusBadgeVariant[course.status]}>
                                            {course.status}
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-xs text-slate">
                                        /{course.slug} — PKR {course.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setFormTarget(course)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(course)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))}

                        {courses.length === 0 && (
                            <Card className="py-10 text-center text-sm text-slate">
                                No courses yet — create your first one above.
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};