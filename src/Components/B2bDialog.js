import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function B2bDialog(props) {
    const { onClose, dataname, open, handleSubmit } = props;
    const [quantity, setQuantity] = useState("");

    const handleClose = () => {
        onClose();
    };
    const handleCancel = () => {
        onClose();
    };
    return (
        <Dialog open={open}>
            <DialogTitle>{dataname}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleCancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <TextField label="Enter Quantity(KGs)" name={dataname}
                onChange={(ev) => setQuantity(ev.target.value)}
                variant="filled" color="success" margin="normal" />
            <Button variant='contained' color="primary" onClick={(ev) => handleSubmit(ev, dataname, quantity)} >Submit</Button>
        </Dialog>
    );
}
export default B2bDialog;