import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Boutique from './pages/Boutique.jsx';
import Contact from './pages/Contact.jsx';
import Carrieres from './pages/Carrieres.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Actualites from './pages/Actualites.jsx';
import NewsDetail from './pages/NewsDetail.jsx';
import Stations from './pages/Stations.jsx';
import ZenCard from './pages/ZenCard.jsx';
import BonPlan from './pages/BonPlan.jsx';

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

function ClientLayout({ children }) {
  return (
    <div className="client-app">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <BrowserRouter>
          <Routes>
            {/* SITE PUBLIC */}
            <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
            <Route path="/a-propos" element={<ClientLayout><About /></ClientLayout>} />
            <Route path="/services" element={<ClientLayout><Services /></ClientLayout>} />
            <Route path="/boutique" element={<ClientLayout><Boutique /></ClientLayout>} />
            <Route path="/contact" element={<ClientLayout><Contact /></ClientLayout>} />
            <Route path="/carrieres" element={<ClientLayout><Carrieres /></ClientLayout>} />
            <Route path="/carrieres/offre/:id" element={<ClientLayout><JobDetail /></ClientLayout>} />
            <Route path="/actualites" element={<ClientLayout><Actualites /></ClientLayout>} />
            <Route path="/news/:id" element={<ClientLayout><NewsDetail /></ClientLayout>} />
            <Route path="/stations" element={<ClientLayout><Stations /></ClientLayout>} />
            <Route path="/zencard" element={<ClientLayout><ZenCard /></ClientLayout>} />
            <Route path="/bon_plan" element={<ClientLayout><BonPlan /></ClientLayout>} />

            {/* ADMIN */}
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
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}

export default App;
