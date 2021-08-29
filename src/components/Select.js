import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        maxWidth: 500
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect({setState, state}) {
    const classes = useStyles();

    const handleChange = (event) => {
        setState(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined"  className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Купить</MenuItem>
                    <MenuItem value={2}>Продать</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
