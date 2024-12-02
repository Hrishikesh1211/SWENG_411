import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { DailyOverview } from './components/dashboard/DailyOverview';
import { QuickLinks } from './components/dashboard/QuickLinks';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { CheckIn } from './pages/CheckIn';
import { PickUp } from './pages/PickUp';
import { Reports } from './pages/Reports';
import { PackageDetails } from './pages/PackageDetails';
import { PackageProvider } from './context/PackageContext';

function Dashboard() {
  return (
    <div className="space-y-8">
      <DailyOverview />
      <QuickLinks />
      <RecentActivity />
    </div>
  );
}

function App() {
  return (
    <PackageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/pick-up" element={<PickUp />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/package/:id" element={<PackageDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PackageProvider>
  );
}

export default App;