import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollRestoration from './components/ScrollRestoration.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import PromoModal from './components/PromoModal.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Boutique from './pages/Boutique.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Contact from './pages/Contact.jsx';
import Carrieres from './pages/Carrieres.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Actualites from './pages/Actualites.jsx';
import NewsDetail from './pages/NewsDetail.jsx';
import Stations from './pages/Stations.jsx';
import StationDetail from './pages/StationDetail.jsx';
import ZenCard from './pages/ZenCard.jsx';
import BonPlan from './pages/BonPlan.jsx';
import FAQ from './pages/FAQ.jsx';
import Confidentialite from './pages/Confidentialite.jsx';

import { AdminAuthProvider } from './admin/AdminAuthContext.jsx';
import { AdminDataProvider } from './admin/AdminDataContext.jsx';
import RequireAdminAuth from './admin/RequireAdminAuth.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/pages/Login.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import OffresList from './admin/pages/OffresList.jsx';
import OffreCreate from './admin/pages/OffreCreate.jsx';
import OffreEdit from './admin/pages/OffreEdit.jsx';
import CandidaturesList from './admin/pages/CandidaturesList.jsx';
import CandidatureDetail from './admin/pages/CandidatureDetail.jsx';
import ContactList from './admin/pages/ContactList.jsx';
import ContactDetail from './admin/pages/ContactDetail.jsx';
import ZencardList from './admin/pages/ZencardList.jsx';
import ZencardDetail from './admin/pages/ZencardDetail.jsx';
import NewsList from './admin/pages/NewsList.jsx';
import NewsCreate from './admin/pages/NewsCreate.jsx';
import NewsDetailAdmin from './admin/pages/NewsDetail.jsx';

import { ClientAuthProvider } from './portal/ClientAuthContext.jsx';
import { ClientDataProvider } from './portal/ClientDataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import RequireClientAuth from './portal/RequireClientAuth.jsx';
import ClientPortalLayout from './portal/ClientPortalLayout.jsx';
import ClientLogin from './portal/pages/ClientLogin.jsx';
import ClientRegister from './portal/pages/ClientRegister.jsx';
import Profile from './portal/pages/Profile.jsx';
import MyZencards from './portal/pages/MyZencards.jsx';
import MyTransactions from './portal/pages/MyTransactions.jsx';
import ReclamationsList from './portal/pages/ReclamationsList.jsx';
import ReclamationCreate from './portal/pages/ReclamationCreate.jsx';
import ReclamationDetail from './portal/pages/ReclamationDetail.jsx';

import { BackOfficeAuthProvider } from './backoffice/BackOfficeAuthContext.jsx';
import { BackOfficeDataProvider } from './backoffice/BackOfficeDataContext.jsx';
import RequireBackOfficeAuth from './backoffice/RequireBackOfficeAuth.jsx';
import BackOfficeLayout from './backoffice/BackOfficeLayout.jsx';
import BackOfficeLogin from './backoffice/pages/BackOfficeLogin.jsx';
import BODashboard from './backoffice/pages/BODashboard.jsx';
import Agents from './backoffice/pages/Agents.jsx';
import Appels from './backoffice/pages/Appels.jsx';
import Tickets from './backoffice/pages/Tickets.jsx';
import Affectations from './backoffice/pages/Affectations.jsx';
import SLA from './backoffice/pages/SLA.jsx';
import BOZencard from './backoffice/pages/BOZencard.jsx';
import SAP from './backoffice/pages/SAP.jsx';
import Statistiques from './backoffice/pages/Statistiques.jsx';
import Reporting from './backoffice/pages/Reporting.jsx';

function ClientLayout({ children }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="client-app">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      <PromoModal chatOpen={chatOpen} />
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <ClientAuthProvider>
          <ClientDataProvider>
            <BackOfficeAuthProvider>
              <BackOfficeDataProvider>
                <CartProvider>
                <BrowserRouter>
                  <ScrollRestoration />
                  <Routes>
                    {/* ==================== SITE PUBLIC ==================== */}
                    <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
                    <Route path="/a-propos" element={<ClientLayout><About /></ClientLayout>} />
                    <Route path="/services" element={<ClientLayout><Services /></ClientLayout>} />
                    <Route path="/boutique" element={<ClientLayout><Boutique /></ClientLayout>} />
                    <Route path="/panier" element={<ClientLayout><Cart /></ClientLayout>} />
                    <Route path="/commande" element={<ClientLayout><Checkout /></ClientLayout>} />
                    <Route path="/contact" element={<ClientLayout><Contact /></ClientLayout>} />
                    <Route path="/carrieres" element={<ClientLayout><Carrieres /></ClientLayout>} />
                    <Route path="/carrieres/offre/:id" element={<ClientLayout><JobDetail /></ClientLayout>} />
                    <Route path="/actualites" element={<ClientLayout><Actualites /></ClientLayout>} />
                    <Route path="/news/:id" element={<ClientLayout><NewsDetail /></ClientLayout>} />
                    <Route path="/stations" element={<ClientLayout><Stations /></ClientLayout>} />
                    <Route path="/stations/:id" element={<ClientLayout><StationDetail /></ClientLayout>} />
                    <Route path="/zencard" element={<ClientLayout><ZenCard /></ClientLayout>} />
                    <Route path="/bon_plan" element={<ClientLayout><BonPlan /></ClientLayout>} />
                    <Route path="/faq" element={<ClientLayout><FAQ /></ClientLayout>} />
                    <Route path="/confidentialite" element={<ClientLayout><Confidentialite /></ClientLayout>} />

                    {/* ==================== PORTAIL CLIENT ==================== */}
                    <Route path="/portail-client/connexion" element={<ClientLogin />} />
                    <Route path="/portail-client/inscription" element={<ClientRegister />} />

                    <Route
                      element={
                        <RequireClientAuth>
                          <ClientPortalLayout />
                        </RequireClientAuth>
                      }
                    >
                      <Route path="/portail-client/profil" element={<Profile />} />
                      <Route path="/portail-client/zencards" element={<MyZencards />} />
                      <Route path="/portail-client/transactions" element={<MyTransactions />} />
                      <Route path="/portail-client/reclamations" element={<ReclamationsList />} />
                      <Route path="/portail-client/reclamations/nouvelle" element={<ReclamationCreate />} />
                      <Route path="/portail-client/reclamations/:id" element={<ReclamationDetail />} />
                    </Route>

                    {/* ============ BACK-OFFICE CUSTOMER CARE ============ */}
                    <Route path="/back-office/connexion" element={<BackOfficeLogin />} />

                    <Route
                      element={
                        <RequireBackOfficeAuth>
                          <BackOfficeLayout />
                        </RequireBackOfficeAuth>
                      }
                    >
                      <Route path="/back-office" element={<BODashboard />} />
                      <Route path="/back-office/agents" element={<Agents />} />
                      <Route path="/back-office/appels" element={<Appels />} />
                      <Route path="/back-office/tickets" element={<Tickets />} />
                      <Route path="/back-office/affectations" element={<Affectations />} />
                      <Route path="/back-office/sla" element={<SLA />} />
                      <Route path="/back-office/zencard" element={<BOZencard />} />
                      <Route path="/back-office/sap" element={<SAP />} />
                      <Route path="/back-office/statistiques" element={<Statistiques />} />
                      <Route path="/back-office/reporting" element={<Reporting />} />
                    </Route>

                    {/* ==================== ADMIN (gestion de contenu) ==================== */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    <Route
                      element={
                        <RequireAdminAuth>
                          <AdminLayout />
                        </RequireAdminAuth>
                      }
                    >
                      <Route path="/admin-panel" element={<Dashboard />} />
                      <Route path="/admin-panel/carrieres/offres" element={<OffresList />} />
                      <Route path="/admin-panel/carrieres/offres/ajouter" element={<OffreCreate />} />
                      <Route path="/admin-panel/carrieres/offres/:id/modifier" element={<OffreEdit />} />
                      <Route path="/admin-panel/carrieres/candidatures" element={<CandidaturesList />} />
                      <Route path="/admin-panel/carrieres/candidatures/:id" element={<CandidatureDetail />} />
                      <Route path="/admin-panel/contact" element={<ContactList />} />
                      <Route path="/admin-panel/contact/:id" element={<ContactDetail />} />
                      <Route path="/admin-panel/zencard" element={<ZencardList />} />
                      <Route path="/admin-panel/zencard/:id" element={<ZencardDetail />} />
                      <Route path="/admin-panel/news" element={<NewsList />} />
                      <Route path="/admin-panel/news/create" element={<NewsCreate />} />
                      <Route path="/admin-panel/news/:id" element={<NewsDetailAdmin />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
                </CartProvider>
              </BackOfficeDataProvider>
            </BackOfficeAuthProvider>
          </ClientDataProvider>
        </ClientAuthProvider>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}

export default App;
