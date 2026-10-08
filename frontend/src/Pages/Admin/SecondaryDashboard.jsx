import { useState } from "react";
import toast from "react-hot-toast";
import { useAdminCourses } from "../../hooks/useAdmin";
import { useUserSearch, useCreateManualEnrollment } from "../../hooks/useAdminManualEnrollment";
import { Badge } from "../../Components/UI/Badge";
import { Card } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";

const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "CONFIRMED", label: "Confirmed (paid)" },
    { value: "FAILED", label: "Failed" },
    { value: "FREE", label: "Free" },
];

export const SecondaryDashboard = () => {
    const [userQuery, setUserQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [courseId, setCourseId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("CONFIRMED");

    const { data: matchingUsers = [] } = useUserSearch(userQuery);
    const { data: courses = [] } = useAdminCourses();
    const createEnrollment = useCreateManualEnrollment();

    const selectedCourse = courses.find((c) => c.id === courseId);

    const resetForm = () => {
        setUserQuery("");
        setSelectedUser(null);
        setCourseId("");
        setPaymentStatus("CONFIRMED");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedUser) {
            toast.error("Please select a user first.");
            return;
        }
        if (!courseId) {
            toast.error("Please select a course.");
            return;
        }

        try {
            await createEnrollment.mutateAsync({
                userId: selectedUser.id,
                courseId,
                paymentStatus,
            });
            toast.success(`Enrolled ${selectedUser.fullName} — status set to ${paymentStatus}.`);
            resetForm();
        } catch (err) {
            const message = err.response?.data?.error || "Couldn't create this enrollment.";
            toast.error(message);
        }
    };

    return (
        <div>
            <Badge variant="sky">Manual tool</Badge>
            <h1 className="mt-3 font-heading text-3xl font-bold text-ink">
                Secondary Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate">
                Manually enroll any user into any course and set their payment
                status directly — useful for offline payments, special cases, or
                corrections.
            </p>

            <Card padding="lg" className="mt-8 max-w-xl">
                <form onSubmit={handleSubmit} className="grid gap-5">
                    {/* User picker */}
                    <div>
                        <span className="mb-2 block text-sm font-medium text-ink">
                            User
                        </span>
                        {selectedUser ? (
                            <div className="flex items-center justify-between rounded-xl border border-sky/30 bg-sky/5 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-ink">{selectedUser.fullName}</p>
                                    <p className="text-xs text-slate">{selectedUser.email}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedUser(null)}
                                    className="text-xs font-medium text-sky hover:underline"
                                >
                                    Change
                                </button>
                            </div>
                        ) : (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name, username, or email (min 2 characters)…"
                                    value={userQuery}
                                    onChange={(event) => setUserQuery(event.target.value.replace(/^@/, ""))}
                                    className="w-full rounded-xl border border-slate/20 px-4 py-3 text-sm focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                                />
                                {userQuery.trim().length >= 2 && (
                                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-slate/10 bg-white shadow-lg">
                                        {matchingUsers
                                            .filter((u) => u.role !== "ADMIN")
                                            .map((user) => (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setUserQuery("");
                                                    }}
                                                    className="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-cloud"
                                                >
                                                    <span className="text-sm font-medium text-ink">{user.fullName}</span>
                                                    <span className="text-xs text-slate">{user.email}</span>
                                                </button>
                                            ))}
                                        {matchingUsers.filter((u) => u.role !== "ADMIN").length === 0 && (
                                            <p className="px-4 py-3 text-sm text-slate">No matching users.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Course picker */}
                    <Input
                        id="course"
                        label="Course"
                        as="select"
                        value={courseId}
                        onChange={(event) => setCourseId(event.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select a course
                        </option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title} {course.isFree ? "(Free)" : `— PKR ${course.price.toLocaleString()}`}
                            </option>
                        ))}
                    </Input>

                    {/* Payment status */}
                    <Input
                        id="paymentStatus"
                        label="Payment status"
                        as="select"
                        value={paymentStatus}
                        onChange={(event) => setPaymentStatus(event.target.value)}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Input>

                    {selectedCourse?.isFree && paymentStatus !== "FREE" && (
                        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                            This course is marked free — consider setting status to "Free"
                            instead of {paymentStatus.toLowerCase()}.
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={createEnrollment.isPending}
                    >
                        {createEnrollment.isPending ? "Enrolling..." : "Enroll user"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};