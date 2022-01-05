import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
}));

export default function DatePickers({label, setState, disableDate, setDisableDate, error, setError}) {
    const classes = useStyles();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const changeDate = e => {
        setDisableDate(false)
        setError(false)
        setState(e.target.value.toLocaleString('ru', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    }

    return (
        <form className={classes.container} >
                <TextField
                    id="date"
                    label={label}
                    type="date"
                    inputProps={{
                        min: today
                    }}
                    onChange={changeDate}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={error}
                    disabled={disableDate}
                />

        </form>
    );
}
