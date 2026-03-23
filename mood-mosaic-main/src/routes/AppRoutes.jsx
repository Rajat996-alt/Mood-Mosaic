import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardRouter from "../pages/dashboard/DashboardRouter";
import CreateJournal from "../pages/journal/CreateJournal";
import MyJournals from "../pages/journal/MyJournals";
import Canvas from "../pages/canvas/CanvasPage";
import CanvasGallery from "../pages/canvas/CanvasGallery";
import Analytics from "../pages/analytics/AnalyticsPage";
import Profile from "../pages/profile/ProfilePage";
import Admin from "../pages/admin/AdminPage";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import GamesPage from "../pages/games/GamesPage";
import BreathingGame from "../games/BreathingGame";
import BubblePopGame from "../games/BubblePopGame";
import ZenGardenGame from "../games/ZenGardenGame";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/journal/new" element={<CreateJournal />} />
          <Route path="/journals" element={<MyJournals />} />
          <Route path="/canvas" element={<CanvasGallery />} />
          <Route path="/canvas/:canvasId" element={<Canvas />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />

          {/*Games*/}
          <Route path="games" element={<GamesPage />} />
          <Route path="games/breathing" element={<BreathingGame/>} />
          <Route path="games/bubbles" element={<BubblePopGame />} />
          <Route path="games/zen-garden" element={<ZenGardenGame/>} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;