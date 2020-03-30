import React, { useState } from 'react';
import {
  Drawer, List, Container, Divider, Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import LockIcon from '@material-ui/icons/Lock';
import MenuItem from './MenuItem';


export default () => {
  const [isOpen, setMenuState] = useState(false);

  const toggle = () => {
    setMenuState(!isOpen);
  };

  return (
    <>
      <Button onClick={toggle}>
        <MenuIcon />
      </Button>
      <Drawer anchor="top" open={isOpen} onClose={toggle}>
        <Container maxWidth="md">
          <List>
            <MenuItem text="Home" icon={<HomeIcon />} to="/" />
          </List>
          <Divider />
          <List>
            <MenuItem text="Play Golf" icon={<GolfCourseIcon />} to="/play" />
          </List>
          <Divider />
          <List>
            <MenuItem text="Log Out" icon={<LockIcon />} to="/logout" />
          </List>
        </Container>
      </Drawer>
    </>
  );
};
