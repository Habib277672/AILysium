import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../UI/ScrollToTop";
import { AdminHeader } from "../UI/AdminHeader";
import { AdminSidebar } from "../UI/AdminSidebar";

const SIDEBAR_STORAGE_KEY = "adminSidebarExpanded";
const SIDEBAR_WIDTH = 256; // expanded (16rem)
const RAIL_WIDTH = 88; // collapsed icon rail (5.5rem)
const SLIDE_EASE = "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";

export const AdminLayout = () => {
  // Desktop collapse state is persisted; the mobile drawer is session-only
  // so the sidebar never covers the page on a fresh phone visit.
  const [expanded, setExpanded] = useState(
    () => localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "0",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );
  // The content column swaps its margin instantly and is visually slid into
  // place with a transform — animating the margin itself would reflow the
  // whole page (and re-render the charts) on every frame.
  const [slide, setSlide] = useState({ offset: 0, animate: false });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (event) => setIsDesktop(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, expanded ? "1" : "0");
  }, [expanded]);

  // Collapsed on desktop = icon rail (labels hidden, still usable).
  const rail = isDesktop && !expanded;

  const toggleSidebar = () => {
    if (!isDesktop) {
      setMobileOpen((value) => !value);
      return;
    }
    const before = expanded ? SIDEBAR_WIDTH : RAIL_WIDTH;
    const next = !expanded;
    const after = next ? SIDEBAR_WIDTH : RAIL_WIDTH;
    setExpanded(next);
    // Phase 1: jump to the new margin, offset back to the old visual
    // position with transitions disabled.
    setSlide({ offset: before - after, animate: false });
    // Phase 2: next frame, release the offset with the transition enabled.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlide({ offset: 0, animate: true }));
    });
  };

  const closeMobileDrawer = () => setMobileOpen(false);

  return (
    <div className="bg-cloud flex min-h-screen">
      <ScrollToTop />

      <AdminSidebar
        rail={rail}
        mobileOpen={mobileOpen}
        onToggle={toggleSidebar}
        onClose={closeMobileDrawer}
      />

      <div
        className={`flex min-w-0 flex-1 flex-col ${rail ? "md:ml-[5rem]" : "md:ml-64"}`}
        style={{
          transform: `translateX(${slide.offset}px)`,
          transition: slide.animate ? SLIDE_EASE : undefined,
        }}
      >
        <AdminHeader
          expanded={expanded}
          isDesktop={isDesktop}
          rail={rail}
          mobileOpen={mobileOpen}
          onToggle={toggleSidebar}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
