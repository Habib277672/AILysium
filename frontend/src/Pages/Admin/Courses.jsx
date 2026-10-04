import { useState } from "react";
import toast from "react-hot-toast";
import { useAdminCourses } from "../../hooks/useAdmin";
import { useCreateCourse, useUpdateCourse, useDeleteCourse, useExportCourseEnrollments } from "../../hooks/useAdminCourseMutations";
import { motion } from "motion/react";
// import { api } from "../../lib/api";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { Card } from "../../Components/UI/Card";
import { Skeleton } from "../../Components/UI/Skeleton";
import { CourseForm } from "../../Components/Admin/CourseForm";

const statusBadgeVariant = {
    AVAILABLE: "success",
    COMING_SOON: "warning",
    UNPUBLISHED: "ink",
};

export const AdminCourses = () => {
    const { data: courses = [], isLoading: loading, isError: error } = useAdminCourses();
    const [formTarget, setFormTarget] = useState(null); // null | "new" | course object
    const [deleteError, setDeleteError] = useState("");

    const createCourse = useCreateCourse();
    const updateCourse = useUpdateCourse();
    const deleteCourse = useDeleteCourse();

    const submitting = createCourse.isPending || updateCourse.isPending;

    const handleCreate = async (payload) => {
        await createCourse.mutateAsync(payload);
        toast.success("Course created.");
        setFormTarget(null);
    };

    // const handleCreate = (payload) => {
    //     createCourse.mutate(payload, {
    //         onSuccess: () => {
    //             toast.success("Course created.");
    //             setFormTarget(null);
    //         },
    //         onError: (err) => {
    //             const message = err.response?.data?.error || "Something went wrong. Please try again.";
    //             toast.error(message);
    //             throw err; // re-throw so CourseForm's own inline error box also shows it
    //         },
    //     });
    // };

    const handleUpdate = async (payload) => {
        await updateCourse.mutateAsync({ id: formTarget.id, payload });
        toast.success("Course updated.");
        setFormTarget(null);
    };

    // const handleUpdate = (payload) => {
    //     updateCourse.mutate(
    //         { id: formTarget.id, payload },
    //         {
    //             onSuccess: () => {
    //                 toast.success("Course updated.");
    //                 setFormTarget(null);
    //             },
    //             onError: (err) => {
    //                 const message = err.response?.data?.error || "Something went wrong. Please try again.";
    //                 toast.error(message);
    //                 throw err;
    //             },
    //         }
    //     );
    // };

    const handleDelete = (course) => {
        setDeleteError("");
        const confirmed = window.confirm(`Delete "${course.title}"? This cannot be undone.`);
        if (!confirmed) return;

        deleteCourse.mutate(course.id, {
            onSuccess: () => toast.success("Course deleted."),
            onError: (err) => {
                const message = err.response?.data?.error || "Couldn't delete this course.";
                setDeleteError(message);
                toast.error(message);
            },
        });
    };


    const exportEnrollments = useExportCourseEnrollments();

    const handleExport = (course) => {
        toast.promise(
            exportEnrollments.mutateAsync({ courseId: course.id, courseTitle: course.title }),
            {
                loading: "Preparing download…",
                success: "Download started.",
                error: "Couldn't export enrollments for this course.",
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
                {loading && (
                    <div className="grid gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate/10 bg-white p-5 shadow-sm">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-40 rounded-lg" />
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-3 w-56 rounded-lg" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-16 rounded-lg" />
                                    <Skeleton className="h-8 w-16 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleExport(course)}
                                        disabled={exportEnrollments.isPending}
                                        className="cursor-pointer"
                                    >
                                        Download
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setFormTarget(course)} className="cursor-pointer">
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50 cursor-pointer"
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
        </motion.div>
    );
};