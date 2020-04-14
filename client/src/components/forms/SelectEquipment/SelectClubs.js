import React, { useEffect } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';


export default ({ gameData, equipment, setEquipment }) => {
  const { clubTypes, clubs } = gameData;

  useEffect(() => {
    clubTypes.forEach((clubType) => {
      // FIXME: Move ls.getting stuff to gameview or smth.
      const clubId = localStorage.getItem(`vyardage.equipment.${clubType}`);
      const club = clubs.find((c) => c.id === clubId);
      setEquipment((prev) => ({ ...prev, [clubType]: club }));
    });
  }, [clubs, clubTypes, setEquipment]);

  const setClub = (club) => {
    localStorage.setItem(`vyardage.equipment.${club.clubType}`, club.id);
    setEquipment((prev) => ({ ...prev, [club.clubType]: club }));
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
            data-cy="select-ball"
          />
        </Grid>
      ))}
    </>
  );
};
