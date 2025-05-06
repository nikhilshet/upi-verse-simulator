
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Import Pages
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/history/History";
import ScanQR from "./pages/scan/ScanQR";
import Profile from "./pages/profile/Profile";
import Bazaar from "./pages/bazaar/Bazaar";
import BBPS from "./pages/bbps/BBPS";
import ONDC from "./pages/ondc/ONDC";
import Financial from "./pages/financial/Financial";
import Onboarding from "./pages/onboarding/Onboarding";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

// Create Mock pages for UPI actions
const SendMoney = () => <div className="p-4">Send Money Page</div>;
const RequestMoney = () => <div className="p-4">Request Money Page</div>;
const SelfTransfer = () => <div className="p-4">Self Transfer Page</div>;
const ApproveRequest = () => <div className="p-4">Approve Request Page</div>;
const TapToPay = () => <div className="p-4">Tap to Pay Page</div>;
const UpiLite = () => <div className="p-4">UPI Lite Page</div>;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Onboarding Route */}
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Main App Layout */}
              <Route element={<AppLayout />}>
                {/* Dashboard (Home) */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Main Navigation Routes */}
                <Route path="/history" element={<History />} />
                <Route path="/scan-qr" element={<ScanQR />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Feature Section Routes */}
                <Route path="/bbps" element={<BBPS />} />
                <Route path="/ondc" element={<ONDC />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/bazaar" element={<Bazaar />} />
                
                {/* UPI Action Routes */}
                <Route path="/send-money" element={<SendMoney />} />
                <Route path="/request-money" element={<RequestMoney />} />
                <Route path="/self-transfer" element={<SelfTransfer />} />
                <Route path="/approve-request" element={<ApproveRequest />} />
                <Route path="/tap-to-pay" element={<TapToPay />} />
                <Route path="/upi-lite" element={<UpiLite />} />
              </Route>
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
