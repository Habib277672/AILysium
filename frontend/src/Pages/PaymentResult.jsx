import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "../Components/UI/Badge";
import { Button } from "../Components/UI/Button";

export const PaymentResult = ({ outcome }) => {
    const [searchParams] = useSearchParams();
    const enrollmentId = searchParams.get("enrollmentId");

    const isSuccess = outcome === "success";

    return (
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isSuccess ? "bg-sky/10 text-sky" : "bg-red-50 text-red-500"
                    }`}
            >
                {isSuccess ? "✓" : "✕"}
            </div>

            <Badge variant={isSuccess ? "success" : "warning"} className="mt-6">
                {isSuccess ? "Payment confirmed" : "Payment failed"}
            </Badge>

            <h1 className="mt-4 font-heading text-3xl font-bold text-ink">
                {isSuccess ? "You're enrolled!" : "Your payment didn't go through"}
            </h1>
            <p className="mt-3 text-sm text-slate">
                {isSuccess
                    ? "Your enrollment is confirmed. You can find it anytime in your profile."
                    : "No charge was completed. You can try again from your profile."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button as={Link} to="/profile" variant="primary" size="lg">
                    Go to profile
                </Button>
                {!isSuccess && enrollmentId && (
                    <Button
                        as={Link}
                        to={`/payment?enrollmentId=${enrollmentId}`}
                        variant="outline"
                        size="lg"
                    >
                        Try again
                    </Button>
                )}
            </div>
        </div>
    );
};