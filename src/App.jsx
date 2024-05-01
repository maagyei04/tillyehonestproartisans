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
import Login from './pages/login/login';
import NotFound from './pages/NotFound';
import Layout from './components/layouts/BasicLayout';
import { AuthProvider } from './contexts/authContext';
import { store } from './stores/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
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
              <Route path="/tillyehonestproartisans/login" element={<Login />} />
              <Route element={<NotFound />} />
            </Routes>
          </Layout>
        </Router >
      </AuthProvider>
    </Provider>
  )
}

export default App