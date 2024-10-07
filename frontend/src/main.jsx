import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "./components/mode-toggle";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <Toaster />
      <Layout />
    </ThemeProvider>
  </QueryClientProvider>
);
