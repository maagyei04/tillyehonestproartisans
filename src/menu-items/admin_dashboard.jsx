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

// ==============================|| MENU ITEMS - ADMIN DASHBOARD ||============================== //

const adminDashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group3',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/admin_dashboard/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'appointment',
      title: 'Appointments',
      type: 'item',
      url: '/admin_dashboard/appointments',
      icon: icons.ShoppingOutlined,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/admin_dashboard/orders',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: false
    },
    {
      id: 'financial',
      title: 'Financial History',
      type: 'item',
      url: '/admin_dashboard/financial_history',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/admin_dashboard/clients',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'artisans',
      title: 'Artisans',
      type: 'item',
      url: '/admin_dashboard/artisans',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/admin_dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default adminDashboard;
