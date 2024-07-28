// project import
import dashboard from './dashboard';
import ArtisanDashboard from './artisan_dashboard';
import adminDashboard from './admin_dashboard';

// ==============================|| MENU ITEMS ||============================== //

const getMenuItems = async (userId = null) => {
  console.log('Current user ID in menu items:', userId);

  const artisanDashboard = await ArtisanDashboard(userId);

  return {
    items: [dashboard, artisanDashboard, adminDashboard].filter(Boolean)
  };
};

export default getMenuItems;