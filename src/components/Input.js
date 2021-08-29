import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '500px',
        },
    },
    error: {
        color: '#f44336'
    }
}));

export default function BasicTextField({
                                           label,
                                           type,
                                           multiline = false,
                                           setState,
                                           handleChangeImage,
                                           errorImage,
                                           disabled = false,
                                           setError,
                                           error,
                                           stateName,
                                           state
}) {
    const classes = useStyles();

    const handleChangeState = (e) => {
        const value = e.target.value;
        if( stateName === 'amount' ||  stateName === 'price' ) {
            if (!Number(value)) {
                return;
            }
        }

        if (value.length > 0 && stateName === 'place') {
            setError({place: false})
            setState(value)
        }

        if (value.length > 0 && stateName === 'price') {
            setError({price: false})
            setState(value)
        }

        if (value.length > 0 && stateName === 'amount') {
            setError({amount: false})
            setState(value)
        }
        if (value.length > 0 && stateName === 'name') {
            setError({name: false})
            setState(value)
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                onChange={type === 'file' ? handleChangeImage : handleChangeState}
                id="outlined-basic"
                error={error}
                label={label}
                variant="outlined"
                type={type}
                value={state}
                multiline={multiline}
                inputProps={type === 'file' ? { accept: '.jpg, .jpeg, .png'} : {}}
                disabled={disabled}
            />
            <div>
                {errorImage && <span className={classes.error}> Размер не должен привышать 1 МБ</span>}
            </div>
        </div>
    );
}
