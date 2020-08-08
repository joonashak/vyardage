import React, { useState } from 'react';
import {
  Drawer, List, Container, Divider, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import MenuItem from './MenuItem';


export default () => {
  const [isOpen, setMenuState] = useState(false);

  const toggle = () => {
    setMenuState(!isOpen);
  };

  return (
    <>
      <IconButton onClick={toggle} aria-label="Open Menu">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={isOpen} onClose={toggle}>
        <Container maxWidth="md">
          <List>
            <MenuItem text="Home" icon={<HomeIcon />} to="/" />
          </List>
          <Divider />
          <List>
            <MenuItem text="Play Golf" icon={<GolfCourseIcon />} to="/play" />
          </List>
          <List>
            <MenuItem text="Browse Shots" icon={<ViewListIcon />} to="/browse" />
          </List>
          <List>
            <MenuItem text="Settings" icon={<SettingsIcon />} to="/settings" />
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
