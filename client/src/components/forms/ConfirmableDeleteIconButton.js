import React, { useState } from 'react';
import {
  IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


export default ({ onRemove, name }) => {
  const [open, setOpen] = useState();

  const remove = () => {
    onRemove();
    setOpen(false);
  };

  return (
    <>
      <IconButton color="secondary" aria-label="delete" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to remove ${name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={remove} color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
