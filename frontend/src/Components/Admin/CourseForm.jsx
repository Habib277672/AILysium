import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { CustomSelect } from "../UI/CustomSelect";

const courseToFormState = (course) => ({
  title: course?.title ?? "",
  slug: course?.slug ?? "",
  description: course?.description ?? "",
  price: course?.price?.toString() ?? "",
  status: course?.status ?? "COMING_SOON",
  isFeatured: course?.isFeatured ?? false,
  isFree: course?.isFree ?? false,
  duration: course?.duration ?? "",
  mentor: course?.mentor ?? "",
  format: course?.format ?? "",
  benefits: course?.benefits?.join(", ") ?? "",
  ageRange: course?.ageRange ?? "",
  projectsCount: course?.projectsCount?.toString() ?? "",
  toolsCovered: course?.toolsCovered?.join(", ") ?? "",
  imageUrl: course?.imageUrl ?? "",
});

const formStateToPayload = (form) => ({
  title: form.title.trim(),
  ...(form.slug.trim() && { slug: form.slug.trim() }),
  description: form.description.trim(),
  price: Number(form.price),
  status: form.status,
  isFeatured: form.isFeatured,
  isFree: form.isFree,
  duration: form.duration.trim(),
  format: form.format.trim(),
  mentor: form.mentor.trim() || null,
  benefits: form.benefits
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  toolsCovered: form.toolsCovered
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  ageRange: form.ageRange.trim() || null,
  projectsCount: form.projectsCount.trim() ? Number(form.projectsCount) : null,
  imageUrl: form.imageUrl.trim() || null,
});

const statusOptions = [
  { value: "AVAILABLE", label: "Available" },
  { value: "COMING_SOON", label: "Coming soon" },
  { value: "UNPUBLISHED", label: "Unpublished" },
];

const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3">
    <h3 className="text-muted text-xs font-semibold tracking-wider uppercase">
      {children}
    </h3>
    <div className="bg-slate/10 h-px flex-1" />
  </div>
);

export const CourseForm = ({ course, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(() => courseToFormState(course));
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const isEditing = Boolean(course);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);

      const { data } = await api.post("/admin/uploads/course-image", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      toast.success("Image uploaded.");
    } catch (err) {
      const message =
        err.response?.data?.error || "Image upload failed. Please try again.";
      setUploadError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await onSubmit(formStateToPayload(form));
      // No success toast here — AdminCourses.jsx's handleCreate/
      // handleUpdate own the "course created/updated" toast, since they
      // know whether this was a create or an edit and this form doesn't.
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Basics */}
      <SectionTitle>Basics</SectionTitle>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          id="slug"
          label="Slug (optional — auto-generated from title if left blank)"
          value={form.slug}
          onChange={handleChange}
          placeholder="e.g. kids-ai"
        />
      </div>

      <Input
        id="description"
        label="Description"
        as="textarea"
        value={form.description}
        onChange={handleChange}
        required
      />

      {/* Pricing & availability */}
      <SectionTitle>Pricing &amp; availability</SectionTitle>

      <div className="grid gap-5 sm:grid-cols-3">
        <Input
          id="price"
          label="Price (PKR)"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Input
          id="duration"
          label="Duration"
          placeholder="e.g. 12 weeks"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <CustomSelect
          label="Status"
          value={form.status}
          onChange={(value) => setForm((prev) => ({ ...prev, status: value }))}
          options={statusOptions}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="border-slate/20 hover:border-sky/40 flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                isFeatured: event.target.checked,
              }))
            }
            className="accent-sky border-slate/30 text-sky focus:ring-sky mt-0.5 h-4 w-4 rounded"
          />
          <span>
            <span className="text-ink block text-sm font-medium">
              Feature on homepage
            </span>
            <span className="text-muted mt-0.5 block text-xs">
              Shows this course in the featured section.
            </span>
          </span>
        </label>

        <label className="border-slate/20 hover:border-sky/40 flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors">
          <input
            type="checkbox"
            checked={form.isFree}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, isFree: event.target.checked }))
            }
            className="accent-sky border-slate/30 text-sky focus:ring-sky mt-0.5 h-4 w-4 rounded"
          />
          <span>
            <span className="text-ink block text-sm font-medium">
              Free course
            </span>
            <span className="text-muted mt-0.5 block text-xs">
              Enrollments skip the payment step entirely.
            </span>
          </span>
        </label>
      </div>

      {/* Course details */}
      <SectionTitle>Course details</SectionTitle>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="mentor"
          label="Mentor (optional)"
          value={form.mentor}
          onChange={handleChange}
        />
        <Input
          id="format"
          label="Format"
          placeholder="e.g. Live sessions; weekly labs"
          value={form.format}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        id="benefits"
        label="Benefits (comma-separated)"
        as="textarea"
        placeholder="Weekly hands-on labs, Build a real project, Direct mentorship"
        value={form.benefits}
        onChange={handleChange}
      />

      <Input
        id="toolsCovered"
        label="Tools covered (comma-separated)"
        placeholder="ChatGPT, MidJourney, Runway, ElevenLabs"
        value={form.toolsCovered}
        onChange={handleChange}
      />

      {/* Audience */}
      <SectionTitle>Audience &amp; projects</SectionTitle>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="ageRange"
          label="Age range (optional)"
          placeholder="e.g. 17-18"
          value={form.ageRange}
          onChange={handleChange}
        />
        <Input
          id="projectsCount"
          label="Projects count (optional)"
          type="number"
          min="0"
          value={form.projectsCount}
          onChange={handleChange}
        />
      </div>

      {/* Cover image */}
      <SectionTitle>Cover image</SectionTitle>

      <div>
        <span className="text-ink mb-2 block text-sm font-medium">
          Course image (optional)
        </span>

        {form.imageUrl ? (
          <div className="border-slate/20 flex flex-wrap items-center gap-4 rounded-xl border p-3">
            <img
              src={form.imageUrl}
              alt="Course preview"
              className="h-20 w-32 rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveImage}
              className="cursor-pointer"
            >
              Remove image
            </Button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageSelect}
            disabled={uploading}
            className="border-slate/20 hover:border-sky/40 text-slate file:bg-sky/10 file:text-sky hover:file:bg-sky/20 w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-sm transition-colors file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
          />
        )}

        {uploading && <p className="text-muted mt-2 text-xs">Uploading…</p>}
        {uploadError && (
          <p className="mt-2 text-xs text-red-600">{uploadError}</p>
        )}
      </div>

      {/* Actions */}
      <div className="border-slate/10 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={submitting || uploading}
          className="w-full cursor-pointer sm:w-auto"
        >
          {submitting
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Create course"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          className="hover:shadow-sky/10 w-full cursor-pointer bg-white transition-all hover:shadow-sm sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
