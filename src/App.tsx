
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { ContactsProvider } from "./contexts/ContactsContext";

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
import Transaction from "./pages/singleTransaction/Transaction";

// Import new pages
import SendMoney from "./pages/sendMoney/SendMoney";
import ApproveRequest from "./pages/approveRequest/ApproveRequest";
import EnterPINModal from "./components/shared/EnterPINModal";
import FastagRecharge from "./pages/bbps/FastagRecharge";
import ElectricityBill from "./pages/bbps/ElectricityBill";
import MutualFund from "./pages/mutualfund/MutualFund";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ContactsProvider>
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
                  <Route path="/history" element={<History />}/>
                  <Route path="/history/:id" element={<Transaction />} />
                  <Route path="/scan-qr" element={<ScanQR />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Feature Section Routes */}
                  <Route path="/bbps" element={<BBPS />} />
                  <Route path="/bbps/fastag" element={<FastagRecharge />} />
                  <Route path="/bbps/electricity" element={<ElectricityBill />} />
                  <Route path="/ondc" element={<ONDC />} />
                  <Route path="/ondc/mutualfunds" element = {<MutualFund/>}/>
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/bazaar" element={<Bazaar />} />
                  
                  {/* UPI Action Routes */}
                  <Route path="/send-money" element={<SendMoney />} />
                  <Route path="/approve-request" element={<ApproveRequest />} />
                  <Route path="/self-transfer" element={<div className="p-4">Self Transfer Page</div>} />
                  <Route path="/tap-to-pay" element={<div className="p-4">Tap to Pay Page</div>} />
                  <Route path="/upi-lite" element={<div className="p-4">UPI Lite Page</div>} />
                </Route>
                
                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ContactsProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
