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

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'client-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'item',
      url: '/client_dashboard/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'appointment',
      title: 'Appointments',
      type: 'item',
      url: '/client_dashboard/appointments',
      icon: icons.ShoppingOutlined,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/client_dashboard/orders',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: false
    },
    {
      id: 'financial',
      title: 'Financial History',
      type: 'item',
      url: '/client_dashboard/financial_history',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/client_dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
