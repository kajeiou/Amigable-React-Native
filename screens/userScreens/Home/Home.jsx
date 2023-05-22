import React from 'react';

import TabHome from '../../tabs/TabHome';
import MenuScreen from '../Menu/MenuScreen';

export default function Home({newNotifications}) {
  return (
    <>
      <TabHome />     
      <MenuScreen newNotifications={newNotifications}/>
    </>
    
  );
}

