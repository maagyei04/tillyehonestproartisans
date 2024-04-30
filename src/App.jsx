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
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route element={<NotFound />} />
        </Routes>
      </Layout>
    </Router >

  )
}

export default App