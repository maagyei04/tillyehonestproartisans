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
            <Route exact path="/tillyehonestproartisans/" element={<HomePage />} />
            <Route path="/tillyehonestproartisans/about" element={<About />} />
            <Route path="/tillyehonestproartisans/contact" element={<Contact />} />
            <Route path="/tillyehonestproartisans/explore" element={<Explore />} />
            <Route path="/tillyehonestproartisans/register" element={<Register />} />
            <Route path="/tillyehonestproartisans/payment_method" element={<PaymentMethod />} />
            <Route path="/tillyehonestproartisans/personal_info" element={<PersonalInfo />} />
            <Route path="/tillyehonestproartisans/info_review" element={<InfoReview />} />
            <Route path="/tillyehonestproartisans/business_details" element={<BusinessDetails />} />
            <Route element={<NotFound />} />
          </Routes>
        </Layout>
      </Router >
    </AuthProvider>

  )
}

export default App