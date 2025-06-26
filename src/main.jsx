import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const queryClient = new QueryClient()
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./contexts/authcontext/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
       <Toaster />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
