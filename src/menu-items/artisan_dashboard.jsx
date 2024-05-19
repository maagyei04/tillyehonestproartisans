// assets
import { DashboardOutlined, UserOutlined, SearchOutlined, CreditCardOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  SearchOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
};

// ==============================|| MENU ITEMS - ARTISAN DASHBOARD ||============================== //

const artisanDashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group2',
  children: [
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
      icon: icons.ShoppingCartOutlined,
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
    }
  ]
};

export default artisanDashboard;
