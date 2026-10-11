import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/Layout/AppLayout";
import { AdminLayout } from "./Components/Layout/AdminLayout";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { GuestOnlyRoute } from "./Components/Auth/GuestOnlyRoute";

// Route-level code splitting — each page becomes its own chunk so the
// initial bundle stays small (the admin panel + recharts, AITools data,
// etc. only load when their route is visited).
const lazyPage = (loader) => lazy(loader);

const Home = lazyPage(() => import("./Pages/Home").then((m) => ({ default: m.Home })));
const About = lazyPage(() => import("./Pages/About").then((m) => ({ default: m.About })));
const Courses = lazyPage(() => import("./Pages/Courses").then((m) => ({ default: m.Courses })));
const CourseDetails = lazyPage(() => import("./Pages/CourseDetails").then((m) => ({ default: m.CourseDetails })));
const AITools = lazyPage(() => import("./Pages/AITools").then((m) => ({ default: m.AITools })));
const Contact = lazyPage(() => import("./Pages/Contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazyPage(() => import("./Pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazyPage(() => import("./Pages/TermsConditions").then((m) => ({ default: m.TermsConditions })));
const SignUp = lazyPage(() => import("./Pages/SignUp").then((m) => ({ default: m.SignUp })));
const Login = lazyPage(() => import("./Pages/Login").then((m) => ({ default: m.Login })));
const ForgotPassword = lazyPage(() => import("./Pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazyPage(() => import("./Pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const VerifyEmail = lazyPage(() => import("./Pages/VerifyEmail").then((m) => ({ default: m.VerifyEmail })));
const Profile = lazyPage(() => import("./Pages/Profile").then((m) => ({ default: m.Profile })));
const AllCourses = lazyPage(() => import("./Pages/AllCourses").then((m) => ({ default: m.AllCourses })));
const Enroll = lazyPage(() => import("./Pages/Enroll").then((m) => ({ default: m.Enroll })));
const Payment = lazyPage(() => import("./Pages/Payment").then((m) => ({ default: m.Payment })));
const PaymentResult = lazyPage(() => import("./Pages/PaymentResult").then((m) => ({ default: m.PaymentResult })));
const AdminDashboard = lazyPage(() => import("./Pages/Admin/Dashboard").then((m) => ({ default: m.AdminDashboard })));
const AdminEnrollments = lazyPage(() => import("./Pages/Admin/Enrollments").then((m) => ({ default: m.AdminEnrollments })));
const AdminCourses = lazyPage(() => import("./Pages/Admin/Courses").then((m) => ({ default: m.AdminCourses })));
const AdminUsers = lazyPage(() => import("./Pages/Admin/Users").then((m) => ({ default: m.AdminUsers })));
const AdminUserDetail = lazyPage(() => import("./Pages/Admin/UserDetail").then((m) => ({ default: m.AdminUserDetail })));
const NotFound = lazyPage(() => import("./Pages/NotFound").then((m) => ({ default: m.NotFound })));
const AdminContactMessages = lazyPage(() => import("./Pages/Admin/ContactMessages").then((m) => ({ default: m.AdminContactMessages })));
const AdminContactMessageDetail = lazyPage(() => import("./Pages/Admin/ContactMessageDetail").then((m) => ({ default: m.AdminContactMessageDetail })));

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="relative flex h-50 w-50 items-center justify-center">
      <span className="border-sky/15 border-t-sky absolute inset-0 animate-spin rounded-full border-[3px]" />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:slug", element: <CourseDetails /> },
      { path: "/ai-tools", element: <AITools /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-and-conditions", element: <TermsConditions /> },
      // Standalone — must work for BOTH logged-out (fresh signup) and
      // logged-in (resend from Profile) users. Neither ProtectedRoute
      // nor GuestOnlyRoute is correct here; both would redirect away
      // before the verify API call ever fires.
      {
        element: <ProtectedRoute studentOnly />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/all-courses", element: <AllCourses /> },
          { path: "/enroll/:courseId", element: <Enroll /> },
          { path: "/payment", element: <Payment /> },
          {
            path: "/payment/success",
            element: <PaymentResult outcome="success" />,
          },
          {
            path: "/payment/failed",
            element: <PaymentResult outcome="failed" />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  {
    element: <ProtectedRoute adminOnly />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "enrollments", element: <AdminEnrollments /> },
          { path: "courses", element: <AdminCourses /> },
          { path: "users", element: <AdminUsers /> },
          { path: "users/:id", element: <AdminUserDetail /> },
          { path: "contact-messages", element: <AdminContactMessages /> },
          { path: "contact-messages/:id", element: <AdminContactMessageDetail /> },
        ],
      },
    ],
  },
]);

const App = () => (
  <Suspense fallback={<PageFallback />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
