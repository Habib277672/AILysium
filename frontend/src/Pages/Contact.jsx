import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/UI/Button";
import { Badge } from "../Components/UI/Badge";
import { Card } from "../Components/UI/Card";
import { Input } from "../Components/UI/Input";
import { FAQItem } from "../Components/UI/FAQItem";

const PLACEHOLDER_EMAIL = "email@mybusiness.com";
const PLACEHOLDER_PHONE = "+12345678900";
const WHATSAPP_LINK = `https://wa.me/${PLACEHOLDER_PHONE.replace("+", "")}`;

const programOptions = [
    "Kids AI",
    "VIP One-on-One Mentorship",
    "Freelancer AI",
];

// Source data lists these as FAQ *topics* only, with no answer text
// provided — kept as clearly labeled placeholders rather than invented.
const contactFaqs = [
    { question: "Kids AI installment payments", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
    { question: "Scheduling weekly sessions", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
    { question: "Missed classes", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
    { question: "Access to course materials and roadmap", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
    { question: "VIP payment", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
    { question: "Tool/resource availability after the course", answer: "[PLACEHOLDER CONTENT — answer to be provided]" },
];

const initialForm = {
    name: "",
    email: "",
    phone: "",
    program: "",
    age: "",
    message: "",
};

export const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // NOTE: no /api/contact endpoint exists in the specified backend API —
        // the project scope only defines auth/courses/enrollments/payments/admin
        // routes. This is a frontend-only mock submission for now; wiring this
        // to a real endpoint (or an email service) is a decision for later.
        setSubmitted(true);
    };

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(96,165,250,0.18) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sky/25 blur-[120px]" />

                <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
                    <Badge variant="sky" className="bg-white/10 text-sky-light">
                        Contact
                    </Badge>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight md:text-5xl">
                        Contact AiLysium to start learning AI
                    </h1>
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/70">
                        <span>
                            Email:{" "}
                            <span className="text-white">{PLACEHOLDER_EMAIL}</span>{" "}
                            <span className="text-amber-400/80">(placeholder)</span>
                        </span>
                        <span>
                            Phone/WhatsApp:{" "}
                            <span className="text-white">{PLACEHOLDER_PHONE}</span>{" "}
                            <span className="text-amber-400/80">(placeholder)</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* WhatsApp + Form */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
                    <Card variant="dark" padding="lg" className="h-fit">
                        <Badge variant="sky" className="bg-sky/15 text-sky-light">
                            WhatsApp
                        </Badge>
                        <h2 className="mt-4 font-heading text-2xl font-bold">
                            Chat with AiLysium on WhatsApp
                        </h2>
                        <p className="mt-3 text-sm text-white/70">
                            Ask us anything about the Kids AI course or VIP program. Send a
                            message on WhatsApp or use the form and we'll help you get
                            started.
                        </p>
                        <Button
                            as="a"
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            variant="primary"
                            size="md"
                            className="mt-6"
                        >
                            Message us on WhatsApp
                        </Button>
                    </Card>

                    <Card padding="lg">
                        {submitted ? (
                            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky/10 text-sky">
                                    ✓
                                </div>
                                <p className="font-heading text-xl font-semibold text-ink">
                                    Message sent
                                </p>
                                <p className="max-w-sm text-sm text-slate">
                                    Thanks for reaching out — we'll get back to you soon. (Mock
                                    submission — not yet wired to a backend endpoint.)
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setForm(initialForm);
                                        setSubmitted(false);
                                    }}
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid gap-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input
                                        id="name"
                                        label="Name"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="email"
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Input
                                        id="phone"
                                        label="Phone"
                                        type="tel"
                                        placeholder="+92 3XX XXXXXXX"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        id="age"
                                        label="Student's age"
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 17"
                                        value={form.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Input
                                    id="program"
                                    label="Which program are you interested in?"
                                    as="select"
                                    value={form.program}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a program
                                    </option>
                                    {programOptions.map((program) => (
                                        <option key={program} value={program}>
                                            {program}
                                        </option>
                                    ))}
                                </Input>
                                <Input
                                    id="message"
                                    label="Message"
                                    as="textarea"
                                    placeholder="Tell us a bit about what you're looking for"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                                <Button type="submit" variant="primary" size="lg" className="justify-self-start">
                                    Send message
                                </Button>
                            </form>
                        )}
                    </Card>
                </div>
            </section>

            {/* Contact FAQs */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="font-heading text-3xl font-bold text-ink">
                        Common questions
                    </h2>
                    <div className="mt-8">
                        {contactFaqs.map((faq) => (
                            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <Badge variant="sky">Location</Badge>
                        <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
                            Discover AiLysium in Pakistan
                        </h2>
                        <p className="mt-4 text-slate">
                            We are located in Pakistan, providing accessible AI education
                            and training to students across the country.
                        </p>
                        <p className="mt-4 text-sm text-slate">
                            A specific address / embedded Google Maps location was not
                            provided in the source data —{" "}
                            <span className="font-medium text-ink">
                                [PLACEHOLDER: exact address / map embed pending]
                            </span>
                            .
                        </p>
                    </div>
                    <Card className="flex h-64 items-center justify-center bg-cloud text-center text-sm text-slate">
                        [PLACEHOLDER — Google Maps embed]
                    </Card>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-ink py-20 text-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
                    <h2 className="font-heading text-3xl font-bold md:text-4xl">
                        Don't wait for your kid to fall behind
                    </h2>
                    <p className="max-w-md text-white/70">
                        Every week your child waits is a skill they miss. Book a free
                        consultation today and see them start building with AI, not just
                        watching it.
                    </p>
                    <Button as={Link} to="/courses" variant="primary" size="lg">
                        Explore programs
                    </Button>
                </div>
            </section>
        </div>
    );
};