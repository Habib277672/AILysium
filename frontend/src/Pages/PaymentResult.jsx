import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

export const PaymentResult = ({ outcome }) => {
    const [searchParams] = useSearchParams();
    const enrollmentId = searchParams.get("enrollmentId");

    const isSuccess = outcome === "success";

    return (
        <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-24">
            <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${
                    isSuccess ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
                }`}
            >
                {isSuccess ? (
                    <HiOutlineCheckCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                ) : (
                    <HiOutlineXCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                )}
            </div>

            <h1 className="mt-5 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
                {isSuccess ? "You're enrolled!" : "Your payment didn't go through"}
            </h1>
            <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-muted sm:text-base">
                {isSuccess
                    ? "Your enrollment is confirmed. You can find it anytime in your profile."
                    : "No charge was completed. You can try again from your profile."}
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Button as={Link} to="/profile" variant="primary" size="lg" className="w-full rounded-full cursor-pointer sm:w-auto">
                    Go to profile
                </Button>
                {!isSuccess && enrollmentId && (
                    <Button
                        as={Link}
                        to={`/payment?enrollmentId=${enrollmentId}`}
                        variant="outline"
                        size="lg"
                        className="w-full cursor-pointer rounded-full sm:w-auto"
                    >
                        Try again
                    </Button>
                )}
            </div>
        </div>
    );
};