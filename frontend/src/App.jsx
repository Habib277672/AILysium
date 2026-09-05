import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/Layout/AppLayout";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Courses } from "./Pages/Courses";
import { AITools } from "./Pages/AITools";
import { Contact } from "./Pages/Contact";
import { SignUp } from "./Pages/SignUp";
import { Login } from "./Pages/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [{
        path: "/",
        element: <Home />
      }, {
        path: "/about",
        element: <About />
      }, {
        path: "/courses",
        element: <Courses />
      }, {
        path: "/aitools",
        element: <AITools />
      }, {
        path: "/contact",
        element: <Contact />
      }]
    }, {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default App