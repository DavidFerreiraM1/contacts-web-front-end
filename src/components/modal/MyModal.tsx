/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, makeStyles, Box, Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const myModalStyles = makeStyles(() => ({
  paper: {
    maxWidth: '800px !important',
    width: 'auto',
  },
  content: {
    padding: '24px 24px',
  },
}));

interface IProps {
  title?: string;
  open: boolean;
  handleClose: () => void;
  children?: any;
}

export default function MyModal(props: IProps) {
  const classes = myModalStyles(props);
  const {
    open, handleClose, children, title,
  } = props;
  return (
    <Dialog classes={{ paper: classes.paper }} open={open} onClose={handleClose}>

      <DialogTitle>
        <Box style={{ verticalAlign: 'top', display: 'inline-block', width: '80%' }}>
          {title}
        </Box>
        <Box style={{ verticalAlign: 'top', display: 'inline-block', width: '20%' }}>
          <Box height="0" width="100%" display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{
                background: 'red', minWidth: '32px', width: '38px',
              }}
              onClick={() => handleClose()}
            >
              <CloseIcon style={{ fontSize: '24px', position: 'relative', left: '0' }} />
            </Button>
          </Box>
        </Box>


      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
