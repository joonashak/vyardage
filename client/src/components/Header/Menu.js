import React, { useState } from 'react';
import { Button, Drawer } from '@material-ui/core';


export default () => {
  const [isOpen, setMenuState] = useState(false);

  const toggle = () => {
    setMenuState(!isOpen);
  };

  return (
    <>
      Vyardage.
      <Button onClick={toggle}>
        Menu
      </Button>
      <Drawer anchor="top" open={isOpen} onClose={toggle}>
        Moi
      </Drawer>
    </>
  );
};
