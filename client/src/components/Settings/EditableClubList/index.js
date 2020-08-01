import React from 'react';
import { Grid } from '@material-ui/core';
import useData from '../../../context/useData';
import ClubTypePanel from './ClubTypePanel';


export default () => {
  const { clubTypes, clubs } = useData();

  // Show different length irons as one item.
  const compactClubTypes = [...new Set(clubTypes.map(
    (type) => (type.slice(-4) === 'iron' ? 'Iron set' : type),
  ))];

  const clubsByType = compactClubTypes.map(
    (type) => ({
      type,
      clubs: clubs.filter(
        (club) => (type === 'Iron set' ? club.clubType === '3-iron' : club.clubType === type),
      ),
    }),
  );

  return (
    <Grid container spacing={3}>
      {clubsByType.map((clubType) => (
        <Grid item xs={12} md={6} key={`${clubType.type}-panel`}>
          <ClubTypePanel
            clubType={clubType.type}
            clubs={clubType.clubs}
          />
        </Grid>
      ))}
    </Grid>
  );
};
