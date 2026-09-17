import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Card } from "./Card";

const statusLabel = {
  AVAILABLE: "Available",
  COMING_SOON: "Coming Soon",
};

const statusBadgeVariant = {
  AVAILABLE: "success",
  COMING_SOON: "warning",
};

export const CourseCard = ({ course }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate/10 bg-white shadow-sm shadow-ink/4 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/20 hover:shadow-xl hover:shadow-sky/8">
      {course.imageUrl && (
        <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="h-52 w-[calc(100%+3rem)] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge variant={statusBadgeVariant[course.status]}>{statusLabel[course.status]}</Badge>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col px-1">
        <h3 className="font-heading text-xl font-bold text-ink transition-colors group-hover:text-sky">{course.title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{course.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-sky/60" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {course.duration}
          </span>
          {course.mentor && (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-sky/60" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M3 14.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {course.mentor}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate/10 pt-5">
          <div>
            <span className="text-xs text-muted">Starting from</span>
            <p className="font-heading text-lg font-bold text-ink">PKR {course.price.toLocaleString()}</p>
          </div>
          <Button as={Link} to={`/courses/${course.slug}`} variant="primary" size="sm" className="rounded-full px-5">
            View programme
          </Button>
        </div>
      </div>
    </Card>
  );
};
