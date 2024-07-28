import { DashboardOutlined, UserOutlined, SearchOutlined, CreditCardOutlined, ShoppingOutlined, ShoppingCartOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { fetchArtisanData } from '../stores/actions';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  SearchOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined
};

// ==============================|| MENU ITEMS - ARTISAN DASHBOARD ||============================== //

const ArtisanDashboard = async (userId = null) => {
  console.log('Current user ID:', userId);

  let artisanSellerStatus = null;

  try {
    const data = await fetchArtisanData(userId);
    console.log('Artisan data:', data);
    artisanSellerStatus = data.seller;
    console.log('Artisan seller status:', artisanSellerStatus);
  } catch (error) {
    console.error('Error fetching artisan data:', error);
  }

  const dashboardItems = [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/artisan_dashboard/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'appointment',
      title: 'Appointments',
      type: 'item',
      url: '/artisan_dashboard/appointments',
      icon: icons.ShoppingOutlined,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/artisan_dashboard/orders',
      icon: icons.MenuFoldOutlined,
      breadcrumbs: false
    },
    {
      id: 'financial',
      title: 'Financial History',
      type: 'item',
      url: '/artisan_dashboard/financial_history',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/artisan_dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'shop',
      title: 'Shop',
      type: 'item',
      url: '/artisan_dashboard/shop',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: false
    }
  ];

  console.log('Final dashboard items:', dashboardItems);

  return {
    id: 'artisan-dashboard',
    title: 'Navigation',
    type: 'group2',
    children: dashboardItems
  };
};

export default ArtisanDashboard;