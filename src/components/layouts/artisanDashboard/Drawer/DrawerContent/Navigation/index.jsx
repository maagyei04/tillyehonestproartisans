import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../../contexts/authContext';

// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import getMenuItems from '../../../../../../menu-items/index';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation({ children }) {
  const { currentUser, userLoggedIn } = useAuth();
  const userId = userLoggedIn && currentUser ? currentUser.uid : null;
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems(userId);
      setMenuItems(items);
    };
    fetchMenuItems();
  }, [userId]);

  if (!menuItems) return null; // or a loading indicator

  const navGroups = menuItems.items.map((item) => {
    if (!item) {
      console.warn('Encountered null or undefined menu item');
      return null;
    }

    switch (item.type) {
      case 'group2':
        return <NavGroup key={item.id} item={item} />;
      default:
        console.warn(`Unknown menu item type: ${item.type}`);
        return null;
    }
  }).filter(Boolean); // Remove null items

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}