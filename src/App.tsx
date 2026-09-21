import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import EventRegistration from '@/pages/EventRegistration';
import ParentRegistration from '@/pages/ParentRegistration';
import Contact from '@/pages/Contact';
import WonderTeam from '@/pages/WonderTeam';

function App() {
  return (
    <BrowserRouter>
      <div className="registration-page">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/event-registration" element={<EventRegistration />} />
          <Route path="/parent-registration" element={<ParentRegistration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wonder-team" element={<WonderTeam />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
