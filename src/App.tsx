import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Suppliers from "./pages/Suppliers";
import SupplierProfile from "./pages/SupplierProfile";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import HowItWorks from "./pages/HowItWorks";
import Plans from "./pages/Plans";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSuppliers from "./pages/AdminSuppliers";
import AdminCategories from "./pages/AdminCategories";
import AdminUsers from "./pages/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fornecedores" element={<Suppliers />} />
          <Route path="/fornecedores/:id" element={<SupplierProfile />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categorias/:category" element={<Categories />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/como-funciona" element={<HowItWorks />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:supplierId" element={<Chat />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/fornecedores" element={<AdminSuppliers />} />
          <Route path="/admin/categorias" element={<AdminCategories />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
