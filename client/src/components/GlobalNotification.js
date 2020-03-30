import React, { useState, useEffect } from 'react';
import { createStore, useStore } from 'react-hookstore';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


createStore('globalNotification', {});

export default () => {
  const [open, setOpen] = useState(false);
  const [useNotification, setNotification] = useStore('globalNotification');

  const { type, message } = useNotification;
  const severity = type || 'info';
  const autoHideDuration = useNotification.autoHide ? 5000 : null;

  const close = () => setOpen(false);
  const reset = () => setNotification({});

  useEffect(() => {
    if (useNotification.type) {
      setOpen(true);
    }
  }, [useNotification]);

  return (
    <Snackbar open={open} onClose={close} onExited={reset} autoHideDuration={autoHideDuration}>
      <Alert severity={severity} variant="filled" onClose={close}>
        {message}
      </Alert>
    </Snackbar>
  );
};
