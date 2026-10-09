import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAdminCourses } from "../../hooks/useAdmin";
import {
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useExportCourseEnrollments,
} from "../../hooks/useAdminCourseMutations";
import { motion } from "motion/react";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { Card } from "../../Components/UI/Card";
import { Skeleton } from "../../Components/UI/Skeleton";
import { CourseForm } from "../../Components/Admin/CourseForm";
import { FaBookOpen, FaDownload, FaPen, FaPlus, FaTrash } from "react-icons/fa";

const statusBadgeVariant = {
  AVAILABLE: "successSoft",
  COMING_SOON: "warningSoft",
  UNPUBLISHED: "ink",
};

const statusLabels = {
  AVAILABLE: "Available",
  COMING_SOON: "Coming soon",
  UNPUBLISHED: "Unpublished",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const actionBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none";
const downloadBtn = `${actionBtn} border-slate/20 bg-white text-ink hover:border-sky hover:text-sky hover:shadow-sky/10 hover:shadow-sm`;
const editBtn = `${actionBtn} border-sky/30 bg-sky/5 text-sky hover:bg-sky/10 hover:shadow-sky/10 hover:shadow-sm`;
const deleteBtn = `${actionBtn} border-red-200 bg-white text-red-600 hover:border-red-400 hover:bg-red-50 hover:shadow-sm`;

export const AdminCourses = () => {
  const {
    data: courses = [],
    isLoading: loading,
    isError: error,
  } = useAdminCourses();
  const [formTarget, setFormTarget] = useState(null); // null | "new" | course object
  const [deleteError, setDeleteError] = useState("");
  const formRef = useRef(null);

  // Smoothly bring the form into view whenever it opens (Edit from a card
  // far down the list, or New course from the header).
  useEffect(() => {
    if (formTarget && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formTarget]);

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const submitting = createCourse.isPending || updateCourse.isPending;

  const handleCreate = async (payload) => {
    await createCourse.mutateAsync(payload);
    toast.success("Course created.");
    setFormTarget(null);
  };

  const handleUpdate = async (payload) => {
    await updateCourse.mutateAsync({ id: formTarget.id, payload });
    toast.success("Course updated.");
    setFormTarget(null);
  };

  const handleDelete = (course) => {
    setDeleteError("");
    const confirmed = window.confirm(
      `Delete "${course.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    deleteCourse.mutate(course.id, {
      onSuccess: () => toast.success("Course deleted."),
      onError: (err) => {
        const message =
          err.response?.data?.error || "Couldn't delete this course.";
        setDeleteError(message);
        toast.error(message);
      },
    });
  };

  const exportEnrollments = useExportCourseEnrollments();

  const handleExport = (course) => {
    toast.promise(
      exportEnrollments.mutateAsync({
        courseId: course.id,
        courseTitle: course.title,
      }),
      {
        loading: "Preparing download…",
        success: "Download started.",
        error: "Couldn't export enrollments for this course.",
      },
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="min-w-0">
          <h1 className="font-heading text-ink mt-3 text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
            Manage{" "}
            <span className="from-sky to-sky-light bg-gradient-to-r bg-clip-text text-transparent">
              courses
            </span>
          </h1>
          <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
            Create, edit and publish courses — or export each course&apos;s
            enrollment list as a spreadsheet.
          </p>
        </div>

        {!formTarget && (
          <Button
            variant="primary"
            size="md"
            onClick={() => setFormTarget("new")}
            className="w-full cursor-pointer sm:w-auto"
          >
            <FaPlus className="text-xs" />
            New course
          </Button>
        )}
      </motion.div>

      {deleteError && (
        <motion.p
          variants={fadeUp}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {deleteError}
        </motion.p>
      )}

      {/* Create / edit form */}
      {formTarget && (
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="scroll-mt-24"
        >
          <Card padding="sm" className="sm:p-6 lg:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="bg-sky/10 text-sky grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11">
                {formTarget === "new" ? <FaPlus /> : <FaPen />}
              </span>
              <div className="min-w-0">
                <h2 className="font-heading text-ink text-base font-bold sm:text-lg">
                  {formTarget === "new"
                    ? "Create a course"
                    : `Editing "${formTarget.title}"`}
                </h2>
                <p className="text-muted mt-1 text-sm leading-relaxed">
                  {formTarget === "new"
                    ? "Fill in the details below — you can edit everything later."
                    : "Update the course details below. Changes apply everywhere immediately."}
                </p>
              </div>
            </div>

            <div className="border-slate/10 mt-5 h-px" />

            <div className="mt-5">
              <CourseForm
                course={formTarget === "new" ? null : formTarget}
                onSubmit={formTarget === "new" ? handleCreate : handleUpdate}
                onCancel={() => setFormTarget(null)}
                submitting={submitting}
              />
            </div>
          </Card>
        </motion.div>
      )}

      {/* Course list */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-ink text-xl font-bold sm:text-2xl">
            All courses
          </h2>
          {!loading && !error && (
            <p className="text-muted text-sm">
              {courses.length} {courses.length === 1 ? "course" : "courses"}
            </p>
          )}
        </div>

        <div className="mt-4 grid gap-4">
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-slate/10 rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
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
                      <Skeleton className="h-8 w-16 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {!loading && error && (
            <Card padding="lg" className="text-center">
              <p className="text-sm text-red-600">
                Couldn&apos;t load courses. Please try again.
              </p>
            </Card>
          )}

          {!loading &&
            !error &&
            courses.map((course) => (
              <Card
                key={course.id}
                padding="sm"
                className="hover:border-sky/20 hover:shadow-sky/5 flex flex-col gap-4 transition-all sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="bg-sky/10 text-sky grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12">
                    <FaBookOpen />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-heading text-ink truncate text-sm font-semibold sm:text-base">
                        {course.title}
                      </p>
                      <Badge
                        size="sm"
                        variant={statusBadgeVariant[course.status] ?? "sky"}
                      >
                        {statusLabels[course.status] ?? course.status}
                      </Badge>
                    </div>
                    <p className="text-muted mt-1 truncate text-xs">
                      /{course.slug}
                      <span className="bg-sky/10 text-sky ml-2 inline-block rounded-full px-2 py-0.5 font-semibold">
                        {course.price > 0
                          ? `PKR ${course.price.toLocaleString()}`
                          : "Free"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleExport(course)}
                    disabled={exportEnrollments.isPending}
                    className={downloadBtn}
                  >
                    <FaDownload className="text-xs" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTarget(course)}
                    className={editBtn}
                  >
                    <FaPen className="text-xs" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(course)}
                    className={deleteBtn}
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </Card>
            ))}

          {!loading && !error && courses.length === 0 && (
            <Card padding="lg" className="text-center">
              <span className="bg-slate/10 text-slate mx-auto grid h-12 w-12 place-items-center rounded-full">
                <FaBookOpen className="text-xl" />
              </span>
              <p className="text-slate mt-3 text-sm">
                No courses yet — create your first one above.
              </p>
            </Card>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
