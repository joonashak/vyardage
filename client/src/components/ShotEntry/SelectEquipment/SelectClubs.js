import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useData from '../../../context/useData';


export default () => {
  const {
    clubTypes, clubs, equipment, setEquipment,
  } = useData();

  const setClub = (club) => {
    localStorage.setItem(`vyardage.equipment.${club.clubType}`, club.id);
    setEquipment({ [club.clubType]: club });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">
          Clubs
        </Typography>
      </Grid>

      {clubTypes.map((clubType) => (
        <Grid item xs={12} md={6} key={`grid-club-${clubType}`}>
          <Autocomplete
            id={`select-club-${clubType}`}
            options={clubs.filter((club) => club.clubType === clubType)}
            getOptionLabel={(club) => club.name}
            renderInput={(params) => <TextField {...params} label={clubType} variant="outlined" fullWidth />}
            onChange={(_, value) => setClub(value)}
            value={equipment[clubType] || null}
            data-cy={`select-club-${clubType}`}
          />
        </Grid>
      ))}
    </>
  );
};
