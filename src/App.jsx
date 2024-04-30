import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import About from './pages/About';
import Explore from './pages/explore';
import Contact from './pages/contact';
import NotFound from './pages/NotFound';
import Layout from './components/layouts/BasicLayout';

function App() {
  return (
    < Router >
      <Layout>
        <Routes>
          <Route exact path="/tillyehonestproartisans" element={<HomePage />} />
          <Route exact path="/tillyehonestproartisans/about" element={<About />} />
          <Route exact path="/tillyehonestproartisans/contact" element={<Contact />} />
          <Route exact path="/tillyehonestproartisans/explore" element={<Explore />} />
          <Route element={<NotFound />} />
        </Routes>
      </Layout>
    </Router >

  )
}

export default App