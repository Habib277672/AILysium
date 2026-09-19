import { useEffect, useRef, useState } from "react";
import { countries } from "../../data/countries";
import { HiOutlineChevronDown } from "react-icons/hi";

const DEFAULT_COUNTRY = countries.find((c) => c.iso2 === "PK");

const flagUrl = (iso2, size = 24) => `https://flagsapi.com/${iso2}/flat/${size}.png`;

// Combines a country-code picker (flag + dial code, via flagsapi.com) with
// a plain digits input for the rest of the number. Emits the full E.164
// string ("+923001234567") via onChange, matching exactly what the
// backend's registerSchema regex (^\+[1-9]\d{7,14}$) expects — the
// component owns the "+" and country prefix so the user never has to type
// them correctly by hand.
export const PhoneInput = ({ label, value, onChange, required }) => {
    const [country, setCountry] = useState(DEFAULT_COUNTRY);
    const [localNumber, setLocalNumber] = useState("");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);

    // Keep the parent's `value` in sync whenever country or local number
    // changes — this is a controlled-from-the-inside, reported-outward
    // pattern rather than fully controlled, since splitting a combined
    // E.164 string back into "which country + which local digits" on every
    // keystroke would be far more fragile than owning the split internally.
    useEffect(() => {
        onChange(`+${country.dialCode}${localNumber}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, localNumber]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dialCode.includes(search)
    );

    const handleLocalNumberChange = (event) => {
        // Digits only — the country code is handled entirely by the dropdown,
        // so there's no reason to allow "+", spaces, or letters here.
        setLocalNumber(event.target.value.replace(/\D/g, ""));
    };

    return (
        <div ref={containerRef} className="relative">
            <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
            <div className="flex rounded-xl border border-slate/20 bg-white focus-within:border-sky focus-within:ring-2 focus-within:ring-sky/20">
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex shrink-0 items-center gap-2 cursor-pointer rounded-l-xl border-r border-slate/20 px-3 py-3 text-sm transition-colors hover:bg-cloud"
                >
                    <img
                        src={flagUrl(country.iso2)}
                        alt={country.name}
                        className="h-4 w-6 object-cover"
                    />
                    <span className="text-slate">+{country.dialCode}</span>
                    <HiOutlineChevronDown className={`h-3.5 w-3.5 text-slate/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </button>

                <input
                    type="tel"
                    value={localNumber}
                    onChange={handleLocalNumberChange}
                    placeholder="3001234567"
                    required={required}
                    className="w-full rounded-r-xl px-4 py-3 text-sm text-ink placeholder:text-slate/40 transition-all focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)]"
                />
            </div>

            <div className={`absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate/10 bg-white shadow-lg transition-all duration-200 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <div className="border-b border-slate/10 p-2">
                    <input
                        type="text"
                        autoFocus={open}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search country or code…"
                        className="w-full rounded-lg border border-slate/20 px-3 py-2 text-sm focus:border-sky focus:outline-none"
                    />
                </div>
                <div className="max-h-56 overflow-y-auto scrollbar-hide">
                    {filteredCountries.map((c) => (
                        <button
                            key={c.iso2}
                            type="button"
                            onClick={() => {
                                setCountry(c);
                                setOpen(false);
                                setSearch("");
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-cloud"
                        >
                            <img
                                src={flagUrl(c.iso2)}
                                alt={c.name}
                                className="h-4 w-6 object-cover"
                            />
                            <span className="flex-1 text-ink">{c.name}</span>
                            <span className="text-slate/60">+{c.dialCode}</span>
                        </button>
                    ))}

                    {filteredCountries.length === 0 && (
                        <p className="px-4 py-6 text-center text-sm text-slate">
                            No countries match "{search}".
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};