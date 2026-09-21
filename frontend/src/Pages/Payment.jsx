import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { Button } from "../Components/UI/Button";
import { Skeleton } from "../Components/UI/Skeleton";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineCreditCard } from "react-icons/hi";

export const Payment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const enrollmentId = searchParams.get("enrollmentId");

    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!enrollmentId) {
            setError("Missing enrollment reference.");
            setLoading(false);
            return;
        }

        const loadEnrollment = async () => {
            try {
                const { data } = await api.get("/me/enrollments");
                const match = data.find((e) => e.id === enrollmentId);
                if (!match) {
                    setError("This enrollment could not be found.");
                } else {
                    setEnrollment(match);
                }
            } catch (err) {
                setError("Something went wrong loading this enrollment.");
            } finally {
                setLoading(false);
            }
        };
        loadEnrollment();
    }, [enrollmentId]);

    const handleSimulatePayment = async (outcome) => {
        setProcessing(true);
        setError("");

        try {
            const { data } = await api.post("/payments", {
                enrollmentId,
                simulateOutcome: outcome,
            });

            if (data.status === "CONFIRMED") {
                toast.success("Payment confirmed — you're enrolled!");
                navigate(`/payment/success?enrollmentId=${enrollmentId}`, { replace: true });
            } else {
                toast.error("Payment failed. You can try again.");
                navigate(`/payment/failed?enrollmentId=${enrollmentId}`, { replace: true });
            }
        } catch (err) {
            const message =
                err.response?.data?.error || "Payment could not be processed. Please try again.";
            setError(message);
            toast.error(message);
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-48 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="mt-6 h-12 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!enrollment) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 sm:h-14 sm:w-14">
                    <HiOutlineExclamationCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                    {error || "This enrollment could not be found."}
                </h1>
                <p className="mt-2 text-sm text-muted">
                    It may have been removed or the link is incorrect.
                </p>
                <Button as={Link} to="/courses" variant="primary" size="lg" className="mt-8 rounded-full cursor-pointer">
                    Browse courses
                </Button>
            </div>
        );
    }

    if (enrollment.paymentStatus === "CONFIRMED") {
        return (
            <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 sm:h-14 sm:w-14">
                    <HiOutlineCheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h1 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                    This enrollment is already confirmed
                </h1>
                <p className="mt-2 text-sm text-muted">
                    No payment needed — you're all set.
                </p>
                <Button as={Link} to="/profile" variant="primary" size="lg" className="mt-8 rounded-full cursor-pointer">
                    Go to profile
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
            {/* Header */}
            <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-sky-light text-white shadow-lg shadow-sky/25 sm:h-16 sm:w-16">
                    <HiOutlineCreditCard className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                    Complete your{" "}
                    <span className="bg-gradient-to-r from-sky to-sky-light bg-clip-text text-transparent">
                        payment
                    </span>
                </h1>
                <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-muted">
                    {enrollment.course.title} — a real payment gateway isn't connected
                    yet, so this uses a simulated payment for now.
                </p>
            </div>

            {/* Card */}
            <div className="mx-auto mt-8 max-w-md rounded-3xl border border-slate/10 bg-white p-6 shadow-xl shadow-ink/5 sm:p-8">
                {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                        <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 text-red-500" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Summary */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate/10 px-4 py-3.5 transition-colors hover:border-sky/15 hover:bg-sky/[0.02]">
                        <span className="shrink-0 text-sm text-muted">Course</span>
                        <span className="truncate text-right font-medium text-ink">{enrollment.course.title}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate/10 px-4 py-3.5 transition-colors hover:border-sky/15 hover:bg-sky/[0.02]">
                        <span className="shrink-0 text-sm text-muted">Status</span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            {enrollment.paymentStatus}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-slate/10" />

                {/* CTA */}
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full cursor-pointer rounded-full py-4 text-base font-semibold shadow-lg shadow-sky/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky/35"
                    onClick={() => handleSimulatePayment("succeed")}
                    disabled={processing}
                >
                    {processing ? "Processing..." : "Simulate Payment"}
                </Button>

                <button
                    type="button"
                    onClick={() => handleSimulatePayment("fail")}
                    disabled={processing}
                    className="mt-3 w-full cursor-pointer text-center text-xs text-slate/50 underline underline-offset-2 transition-colors hover:text-slate"
                >
                    (dev only) simulate a failed payment
                </button>
            </div>
        </div>
    );
};