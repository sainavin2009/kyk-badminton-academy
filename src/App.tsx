import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import MainLayout from "@/components/layout/main-layout";
import Home from "./pages/home";
import About from "./pages/about";
import Programs from "./pages/programs";
import Gallery from "./pages/gallery";
import Join from "./pages/join";
import Contact from "./pages/contact";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin-dashboard";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <Home />
              </MainLayout>
            } />
            <Route path="/about" element={
              <MainLayout>
                <About />
              </MainLayout>
            } />
            <Route path="/programs" element={
              <MainLayout>
                <Programs />
              </MainLayout>
            } />
            <Route path="/gallery" element={
              <MainLayout>
                <Gallery />
              </MainLayout>
            } />
            <Route path="/join" element={
              <MainLayout>
                <Join />
              </MainLayout>
            } />
            <Route path="/contact" element={
              <MainLayout>
                <Contact />
              </MainLayout>
            } />
            <Route path="/login" element={
              <MainLayout>
                <Login />
              </MainLayout>
            } />
            <Route path="/admin" element={
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            } />
            <Route path="*" element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;