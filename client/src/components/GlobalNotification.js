/**
 * This component renders a single, global notification in accordance with Material Design rules.
 * To trigger the notification, use the hookstore `globalNotification`, setting its value to an
 * object with the fields:
 *  - `type`: One of Material-UI's Alert severity values (`error`, `warning`, `info` or `success`).
 *  - `message`: The message to show in the notification.
 *  - `autoHide` (optional): Set to `true` to automatically hide the notification after a while.
 */
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
