import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/Layout/AppLayout";
import { AdminLayout } from "./Components/Layout/AdminLayout";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { GuestOnlyRoute } from "./Components/Auth/GuestOnlyRoute";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Courses } from "./Pages/Courses";
import { CourseDetails } from "./Pages/CourseDetails";
import { AITools } from "./Pages/AITools";
import { Contact } from "./Pages/Contact";
import { SignUp } from "./Pages/SignUp";
import { Login } from "./Pages/Login";
import { Profile } from "./Pages/Profile";
import { AllCourses } from "./Pages/AllCourses";
import { Enroll } from "./Pages/Enroll";
import { Payment } from "./Pages/Payment";
import { PaymentResult } from "./Pages/PaymentResult";
import { AdminDashboard } from "./Pages/Admin/Dashboard";
import { AdminEnrollments } from "./Pages/Admin/Enrollments";
import { AdminCourses } from "./Pages/Admin/Courses";
import { AdminUsers } from "./Pages/Admin/Users";
import { AdminUserDetail } from "./Pages/Admin/UserDetail";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";

const App = () => {
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
        {
          element: <ProtectedRoute studentOnly />,
          children: [
            { path: "/profile", element: <Profile /> },
            { path: "/all-courses", element: <AllCourses /> },
            { path: "/enroll/:courseId", element: <Enroll /> },
            { path: "/payment", element: <Payment /> },
            { path: "/payment/success", element: <PaymentResult outcome="success" /> },
            { path: "/payment/failed", element: <PaymentResult outcome="failed" /> },
          ],
        },
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;