import React from 'react';
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
} from '@material-ui/core';
import ShotTableRow from './ShotTableRow';


export default ({ shots }) => {
  const orderedShots = shots.sort((a, b) => a.elevation - b.elevation);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Carry</TableCell>
            <TableCell>Elevation</TableCell>
            <TableCell>Wind</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedShots.map((shot) => <ShotTableRow shot={shot} key={shot.id} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
