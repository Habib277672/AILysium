import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

const emptyForm = {
    title: "",
    slug: "",
    description: "",
    price: "",
    status: "COMING_SOON",
    isFeatured: false,
    duration: "",
    mentor: "",
    format: "",
    benefits: "",
    ageRange: "",
    projectsCount: "",
    toolsCovered: "",
    imageUrl: "",
};

const courseToFormState = (course) => ({
    title: course?.title ?? "",
    slug: course?.slug ?? "",
    description: course?.description ?? "",
    price: course?.price?.toString() ?? "",
    status: course?.status ?? "COMING_SOON",
    isFeatured: course?.isFeatured ?? false,
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
    duration: form.duration.trim(),
    format: form.format.trim(),
    mentor: form.mentor.trim() || null,
    benefits: form.benefits.split(",").map((item) => item.trim()).filter(Boolean),
    toolsCovered: form.toolsCovered.split(",").map((item) => item.trim()).filter(Boolean),
    ageRange: form.ageRange.trim() || null,
    projectsCount: form.projectsCount.trim() ? Number(form.projectsCount) : null,
    imageUrl: form.imageUrl.trim() || null,
});

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

            <div className="grid gap-5 sm:grid-cols-2">
                <Input id="title" label="Title" value={form.title} onChange={handleChange} required />
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
                <Input id="duration" label="Duration" placeholder="e.g. 12 weeks" value={form.duration} onChange={handleChange} required />
                <Input
                    id="status"
                    label="Status"
                    as="select"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="COMING_SOON">Coming Soon</option>
                    <option value="UNPUBLISHED">Unpublished</option>
                </Input>
            </div>
            <label className="flex items-center gap-3 rounded-xl border border-slate/20 px-4 py-3">
                <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) =>
                        setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))
                    }
                    className="h-4 w-4 rounded border-slate/30 text-sky focus:ring-sky"
                />
                <span className="text-sm text-ink">
                    Feature this course on the homepage
                </span>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
                <Input id="mentor" label="Mentor (optional)" value={form.mentor} onChange={handleChange} />
                <Input id="format" label="Format" placeholder="e.g. Live sessions; weekly labs" value={form.format} onChange={handleChange} required />
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
                placeholder="Python, JavaScript, Prompting"
                value={form.toolsCovered}
                onChange={handleChange}
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <Input id="ageRange" label="Age range (optional)" placeholder="e.g. 17-18" value={form.ageRange} onChange={handleChange} />
                <Input
                    id="projectsCount"
                    label="Projects count (optional)"
                    type="number"
                    min="0"
                    value={form.projectsCount}
                    onChange={handleChange}
                />
            </div>

            <div>
                <span className="mb-2 block text-sm font-medium text-ink">
                    Course image (optional)
                </span>

                {form.imageUrl ? (
                    <div className="flex items-center gap-4">
                        <img
                            src={form.imageUrl}
                            alt="Course preview"
                            className="h-20 w-32 rounded-lg object-cover"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={handleRemoveImage}>
                            Remove image
                        </Button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageSelect}
                        disabled={uploading}
                        className="w-full rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-sky/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky hover:file:bg-sky/20"
                    />
                )}

                {uploading && <p className="mt-2 text-xs text-slate">Uploading…</p>}
                {uploadError && (
                    <p className="mt-2 text-xs text-red-600">{uploadError}</p>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" size="md" disabled={submitting || uploading}>
                    {submitting ? "Saving..." : isEditing ? "Save changes" : "Create course"}
                </Button>
                <Button type="button" variant="ghost" size="md" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};