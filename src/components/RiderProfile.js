import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RIDER_DETAILS } from '../queries/GET_RIDER_DETAILS';
import { GET_DRIVER_DETAILS } from '../queries/GET_DRIVER_DETAILS';
import { Grid, Box } from '@material-ui/core';
import { useParams } from "react-router-dom";
import { RatingCards } from '../components/RatingCards';
import Button from '@material-ui/core/Button';
import RatingDialog from '../components/RatingDialog';
import { UPDATE_RIDER_RIDES } from '../queries/UPDATE_RIDER_RIDES';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import { UPDATE_DRIVER_RATINGS } from '../queries/UPDATE_DRIVER_RATINGS';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: 'blue',
        marginBottom: '10px',
    },
    profile: {
        backgroundColor: 'skyblue',
        paddingLeft: '70px',
    },
    star: {
        color: 'green',
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: '16px'
    },
    flex: {
        display: 'flex',
    }
}));
export const RiderProfile = () => {
    const classes = useStyles();
    const { loading, error: rerror, data: rdata } = useQuery(GET_RIDER_DETAILS);
    const {error:derror, data: ddata } = useQuery(GET_DRIVER_DETAILS);
    if(rerror) Sentry.captureException(rerror);
    if(derror) Sentry.captureException(derror);
    const [updateRiderRides] = useMutation(UPDATE_RIDER_RIDES);
    const [updateDriverRating] = useMutation(UPDATE_DRIVER_RATINGS);
    const [open, setOpen] = React.useState(false);
    const { riderid } = useParams();
    const [selectedValue, setSelectedValue] = React.useState(1);
    const navigate = useNavigate();
    const updateCache = (cache, { data }) => {
        const currentValue = cache.readQuery({
            query: GET_RIDER_DETAILS,
        });
        const updatedData = data;
        cache.writeQuery({
            query: GET_RIDER_DETAILS,
            data: { rider: [updatedData, ...currentValue.rider] },
        });
    };
    const riderdata = rdata?.rider.find((e) => e.riderid === riderid);
    let rides = riderdata?.riderrides ? JSON.parse(riderdata?.riderrides) : [];
    const pickRide = (() => {
        const driverCount = ddata?.driver?.length;
        return ddata?.driver?.[Math.floor(Math.random() * (driverCount))];

    })();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false)
        const index = rides.findIndex(object => {
            return object.id === pickRide?.driverid;
        });
        const finaljson = (() => {
            if (index < 0) { rides.push({ id: pickRide?.driverid, name: pickRide?.drivername, rating: value, rides: 1 }); return rides }
            else return rides.map((obj, ind) => {
                if (ind === index) {
                    return { ...obj, rating: Math.floor((obj.rating + value) / 2), rides: obj.rides + 1 };
                }
                return obj
            })
        })();
        updateDriverRating({
            variables: {
                driverid: pickRide?.driverid,
                drivertrips: pickRide?.drivertrips + 1,
                driverrating: Math.floor((pickRide?.driverrating + value) / 2),
            },
        })

        updateRiderRides({
            variables: {
                riderid: riderid,
                ridertrips: riderdata?.ridertrips + 1 ?? 0,
                riderrides: JSON.stringify(finaljson),
            },
            update: updateCache
        })
        setSelectedValue(0);
    };
    return <div>
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid className={classes.profile} item xs={4}>
                    {loading ? <p>loading....</p> : <div>
                        <h1>Rider profile</h1>
                        <h3>Name: {riderdata?.ridername}</h3>
                        <div className={classes.flex}>
                            <div><h3>Rating: {riderdata?.riderrating} </h3>
                            </div><div className={classes.star}><StarsRoundedIcon />
                            </div></div>
                        <h3>Rides: {riderdata?.ridertrips}</h3>
                        <Button className={classes.button} onClick={handleClickOpen}>Start Ride</Button> <br />
                        <Button className={classes.button} onClick={() => navigate('/login')}>Logout</Button>
                    </div>}
                </Grid>
                <Grid item xs={8}>

                    <RatingCards ddata={ddata} rides={rides} />
                </Grid>
            </Grid>
        </Box>
        <RatingDialog open={open} selectedValue={selectedValue} pickRide={pickRide} type='rider' onClose={handleClose} />
    </div>
}