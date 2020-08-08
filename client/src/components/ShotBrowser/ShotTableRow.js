import React, { useState } from 'react';
import {
  TableRow, TableCell, Collapse, Box, Typography,
} from '@material-ui/core';


export default ({ shot }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <TableRow key={shot.id} onClick={toggleOpen}>
        <TableCell>{shot.actCarry}</TableCell>
        <TableCell>{shot.elevation}</TableCell>
        <TableCell>{`${shot.windDir} / ${shot.windSpeed}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component="div">
                {`Power: ${shot.power} Spin: ${shot.spin}`}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
