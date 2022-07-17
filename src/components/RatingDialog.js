import React, { useState, useRef,forwardRef, useImperativeHandle } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
// import {HoverRating} from './HoverRating';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
        margin: '15px',
        width: '250px',
    },
    content: {
        paddingLeft: '20px',
    }
});
const labels = {
    1: 'Very poor',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};
 const RatingDialog = forwardRef(({selectedValue, pickRide, type, onClose},ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    // const { onClose, selectedValue, pickRide, ref } = props;
    const [rating, setRating] = useState(selectedValue ?? 0);
    const [hover, setHover] = React.useState(-1);
    // const { riderid } = useParams();

    console.log(rating, pickRide,type);
    const innerRef = useRef();
  
    useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false)
    }));
    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} ref={innerRef}>
            <DialogTitle id="simple-dialog-title">Rating</DialogTitle>
            <div className={classes.content}>
                <h4>Name: {pickRide?.[type==='driver'?'ridername':'drivername']}</h4>
               {type === 'rider' && <h4>Trips: {pickRide?.drivertrips}</h4>}
            </div>
            <div className={classes.root}>
                <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={1}
                    defaultValue={5}
                    onChange={(event, newValue) => {
                        console.log(event.target.value, newValue)
                        setRating(Math.floor(newValue));
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
            </div>
            <Button onClick={() => handleListItemClick(rating)}>Submit</Button>
        </Dialog>
    );
});

export default RatingDialog;