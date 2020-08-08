import React from 'react';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import useData from '../../context/useData';


export default ({ selectedClub, setSelectedClub }) => {
  const { clubTypes, equipment } = useData();
  const onChange = (event) => setSelectedClub(event.target.value);

  // Do it this way because `clubTypes` is ordered and `equipment` is not.
  const options = clubTypes
    .filter((type) => !!equipment[type])
    .map((type) => equipment[type]);

  return (
    <FormControl>
      <InputLabel id="club-selection-label">Age</InputLabel>
      <Select
        labelId="club-selection-labell"
        id="club-selection"
        value={selectedClub}
        onChange={onChange}
      >
        {options.map((club) => <MenuItem value={club.id} key={club.id}>{club.clubType}</MenuItem>)}
      </Select>
    </FormControl>
  );
};
