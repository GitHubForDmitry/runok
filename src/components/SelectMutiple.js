/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function Tags({setState, error, setError}) {
    const classes = useStyles();

    const handleChangeMultiple = (event, value) => {
        if (value.length) {
            setError({category: false})
        }
        setState(value)
    };
    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={name}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={handleChangeMultiple}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={error}
                        variant="outlined"
                        label="Выберете категорию"
                        placeholder="Категория"

                    />
                )}
            />

        </div>
    );
}

const name = [
    {id: 0, title:'Картофель'},
    {id: 1, title:'Томат'},
    {id: 2, title:'Лук'},
    {id: 3, title:'Огурец'},
    {id: 4, title:'Арбуз'},
    {id: 5, title:'Капуста'},
    {id: 6, title:'Баклажан'},
    {id: 7, title:'Морковь'},
    {id: 8, title:'Сладкий перец(болгарский)'},
    {id: 9, title:'Красный перец'},
    {id: 10, title:'Чеснок'},
    {id: 11, title:'Зелень'},
    {id: 12, title:'Другое'},
];
