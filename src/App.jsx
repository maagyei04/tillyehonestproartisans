import './App.css'
import ThemeCustomization from './themes';
import router from './routes';

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { CartProvider } from './contexts/cartContext';
import { store } from './stores/store'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeCustomization>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </ThemeCustomization>
        </AuthProvider>
      </Provider>
    </LocalizationProvider>

  )
}

export default App