import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/main/Homepage';
import About from './pages/main/About';
import Explore from './pages/main/explore';
import Contact from './pages/main/contact';
import Register from './pages/register/register';
import PaymentMethod from './pages/register/paymentMethod';
import PersonalInfo from './pages/register/personalInfo';
import InfoReview from './pages/register/infoReview';
import BusinessDetails from './pages/register/businessDetails';
import NotFound from './pages/NotFound';
import Layout from './components/layouts/BasicLayout';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      < Router >
        <Layout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment_method" element={<PaymentMethod />} />
            <Route path="/personal_info" element={<PersonalInfo />} />
            <Route path="/info_review" element={<InfoReview />} />
            <Route path="/business_details" element={<BusinessDetails />} />
            <Route element={<NotFound />} />
          </Routes>
        </Layout>
      </Router >
    </AuthProvider>

  )
}

export default App