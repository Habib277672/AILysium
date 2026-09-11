import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Button } from "../Components/UI/Button";

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

        // There's no GET /api/enrollments/:id endpoint (only /api/me/enrollments
        // as a list) — reusing that list and finding the one we need. Same
        // "fine at this scale, revisit if it grows" tradeoff as Enroll.jsx.
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
            // The backend — not this button — is what actually decides the
            // final paymentStatus. `simulateOutcome` only exists because there's
            // no real gateway yet; a real integration replaces this whole
            // function body, not the guarantee that the frontend never sets the
            // outcome itself.
            const { data } = await api.post("/payments", {
                enrollmentId,
                simulateOutcome: outcome,
            });

            if (data.status === "CONFIRMED") {
                navigate(`/payment/success?enrollmentId=${enrollmentId}`, { replace: true });
            } else {
                navigate(`/payment/failed?enrollmentId=${enrollmentId}`, { replace: true });
            }
        } catch (err) {
            const message =
                err.response?.data?.error || "Payment could not be processed. Please try again.";
            setError(message);
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center text-sm text-slate">
                Loading…
            </div>
        );
    }

    if (!enrollment) {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center">
                <Badge variant="warning">Not found</Badge>
                <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                    {error || "This enrollment could not be found."}
                </h1>
                <Button as={Link} to="/all-courses" variant="primary" size="lg" className="mt-8">
                    Browse courses
                </Button>
            </div>
        );
    }

    if (enrollment.paymentStatus === "CONFIRMED") {
        return (
            <div className="mx-auto max-w-2xl px-6 py-24 text-center">
                <Badge variant="success">Already paid</Badge>
                <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
                    This enrollment is already confirmed
                </h1>
                <Button as={Link} to="/profile" variant="primary" size="lg" className="mt-8">
                    Go to profile
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-6 py-16">
            <Badge variant="sky">Payment</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                Complete your payment
            </h1>
            <p className="mt-2 text-sm text-slate">
                {enrollment.course.title} — a real payment gateway isn't connected
                yet, so this uses a simulated payment for now.
            </p>

            <Card padding="lg" className="mt-8">
                {error && (
                    <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between border-b border-slate/10 pb-4">
                    <span className="text-sm text-slate">Course</span>
                    <span className="font-medium text-ink">{enrollment.course.title}</span>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-slate">Status</span>
                    <Badge variant="warning">{enrollment.paymentStatus}</Badge>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={() => handleSimulatePayment("succeed")}
                    disabled={processing}
                >
                    {processing ? "Processing..." : "Simulate Payment"}
                </Button>

                {/* Kept visible only to make the failure path testable without a
            real gateway — safe to remove once one is connected. */}
                <button
                    type="button"
                    onClick={() => handleSimulatePayment("fail")}
                    disabled={processing}
                    className="mt-3 w-full text-center text-xs text-slate/50 underline underline-offset-2 hover:text-slate"
                >
                    (dev only) simulate a failed payment
                </button>
            </Card>
        </div>
    );
};