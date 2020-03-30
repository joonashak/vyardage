import React, { useState } from 'react';
import { Button, Drawer } from '@material-ui/core';
import { useStore } from 'react-hookstore';
import { logout } from '../../services/loginService';


export default () => {
  const [isOpen, setMenuState] = useState(false);
  const [, setLoggedIn] = useStore('loggedIn');

  const toggle = () => {
    setMenuState(!isOpen);
  };

  return (
    <>
      Vyardage.
      <Button onClick={toggle}>
        Menu
      </Button>
      <Button onClick={async () => {
        await logout();
        setLoggedIn(false);
      }}
      >
        Log Out
      </Button>
      <Drawer anchor="top" open={isOpen} onClose={toggle}>
        Moi
      </Drawer>
    </>
  );
};
