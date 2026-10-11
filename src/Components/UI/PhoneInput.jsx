import { useEffect, useRef, useState } from "react";
import { countries } from "../../data/countries";
import { HiOutlineChevronDown } from "react-icons/hi";

const DEFAULT_COUNTRY = countries.find((c) => c.iso2 === "PK");

const flagUrl = (iso2, size = 24) =>
  `https://flagsapi.com/${iso2}/flat/${size}.png`;

// Combines a country-code picker (flag + dial code, via flagsapi.com) with
// a plain digits input for the rest of the number. Emits the full E.164
// string ("+923001234567") via onChange, matching exactly what the
// backend's registerSchema regex (^\+[1-9]\d{7,14}$) expects — the
// component owns the "+" and country prefix so the user never has to type
// them correctly by hand.
export const PhoneInput = ({ label, onChange, required }) => {
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
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
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
      c.dialCode.includes(search),
  );

  const handleLocalNumberChange = (event) => {
    // Digits only — the country code is handled entirely by the dropdown,
    // so there's no reason to allow "+", spaces, or letters here.
    setLocalNumber(event.target.value.replace(/\D/g, ""));
  };

  return (
    <div ref={containerRef} className="relative">
      <span className="text-ink mb-2 block text-sm font-medium">{label}</span>
      <div className="border-slate/20 focus-within:border-sky focus-within:ring-sky/20 flex rounded-xl border bg-white focus-within:ring-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="border-slate/20 hover:bg-cloud flex shrink-0 cursor-pointer items-center gap-2 rounded-l-xl border-r px-3 py-3 text-sm transition-colors"
        >
          <img
            src={flagUrl(country.iso2)}
            alt={country.name}
            className="h-4 w-6 object-cover"
          />
          <span className="text-slate">+{country.dialCode}</span>
          <HiOutlineChevronDown
            className={`text-slate/50 h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <input
          type="tel"
          value={localNumber}
          onChange={handleLocalNumberChange}
          placeholder="3001234567"
          required={required}
          className="text-ink placeholder:text-slate/40 w-full rounded-r-xl px-4 py-3 text-sm transition-all focus:shadow-[0_0_0_4px_rgba(0,133,254,0.1)] focus:outline-none"
        />
      </div>

      <div
        className={`border-slate/10 absolute z-20 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200 ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
      >
        <div className="border-slate/10 border-b p-2">
          <input
            type="text"
            autoFocus={open}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search country or code…"
            className="border-slate/20 focus:border-sky w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <div
          data-lenis-prevent
          className="scrollbar-hide max-h-56 overflow-y-auto"
        >
          {filteredCountries.map((c) => (
            <button
              key={c.iso2}
              type="button"
              onClick={() => {
                setCountry(c);
                setOpen(false);
                setSearch("");
              }}
              className="hover:bg-cloud flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
            >
              <img
                src={flagUrl(c.iso2)}
                alt={c.name}
                className="h-4 w-6 object-cover"
              />
              <span className="text-ink flex-1">{c.name}</span>
              <span className="text-slate/60">+{c.dialCode}</span>
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <p className="text-slate px-4 py-6 text-center text-sm">
              No countries match "{search}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
