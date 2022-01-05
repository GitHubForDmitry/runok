import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MultipleSelect from "../components/SelectMutiple";
import BasicTextField from "../components/Input";
import MaterialUIPickers from "../components/Datepicker";
import firebase from '../firebase'
import {CircularProgress} from "@material-ui/core";
import SimpleSelect from "../components/Select";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '5px auto',
            textAlign: 'center'
        },
    },
    container: {
        background: '#f5f6f9',
        borderRadius: '5px',
        padding: '24px'
    },
    button: {
        display: 'block',
        margin: '0 auto'
    },
    progress: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function EditPost(props) {

    const classes = useStyles();
    const [category, setCategory] = useState([]);
    const [buy, setBuy] = useState(2);
    const [place, setPlace] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [errorImage, setErrorImage] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [disableDate, setDisableDate] = useState(true);
    const [error, setError] = useState({
        category: false,
        place: false,
        amount: false,
        price: false,
        dateFrom: false,
        dateTo: false,
        name: false
    })
    let history = useHistory();

    const onCreate = (e) => {
        e.preventDefault();
        const db = firebase.firestore();
        if (category.length === 0) {
            setError({category: true});
            return false;
        }

        if (place === '') {
            setError({place: true});
            return false;
        }

        if (amount === '') {
            setError({amount: true});
            return false;
        }

        if (price === '') {
            setError({price: true});
            return false;
        }

        if (dateFrom === '') {
            setError({dateFrom: true});
            return false;
        }

        if (dateTo === '') {
            setError({dateTo: true});
            return false;
        }

        if (name === '') {
            setError({name: true});
            return false;
        }


        db.collection("posts").add(
            {
                buy,
                category,
                place,
                amount,
                price,
                dateFrom,
                dateTo,
                name,
                phoneNumber,
                description,
                urlImage,
                date: new Date().toLocaleString('ru', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }
        );
        setCategory([]);
        setBuy(2);
        setPlace('');
        setPhoneNumber('');
        setAmount('');
        setPrice('');
        setDateFrom('');
        setDateTo('');
        setName('');
        setDescription('');
        setUrlImage('');
        history.push('/')
    };

    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ]


    function validFileType(file) {
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }

        return false;
    }
    const handleChangeImage = async (e) => {
        setDisableButton(true);
        let file = e.target.files[0];
        if (file) {
            validFileType(file)
            if (file.size > 1000000) {
                setErrorImage(true);
                return false;
            } else {
                setErrorImage(false);
            }
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);
            await fileRef.getDownloadURL().then((data) => {
                setUrlImage(data);
                setDisableButton(false);

            })
        }
    }



    return (
        <div>
            <Header>
                <Container className={classes.container} component="main" maxWidth="xl">
                    <div className={classes.root} noValidate autoComplete="off" >
                        <SimpleSelect setState={setBuy} state={buy} />
                        <MultipleSelect setState={setCategory} error={error.category} setError={setError} />
                        {
                            buy === 2 &&
                            <BasicTextField
                                setState={setPlace}
                                label="Место продажи"
                                type="text"
                                state={place}
                                stateName="place"
                                setError={setError}
                                error={error.place}
                            />
                        }
                        <BasicTextField
                            setState={setAmount}
                            label="Обьем в кг"
                            type="text"
                            stateName="amount"
                            state={amount}
                            setError={setError}
                            error={error.amount}
                            inputProps={{
                                min: 1
                            }}
                        />
                        <BasicTextField
                            setState={setPrice}
                            label="Цена за кг"
                            type="text"
                            stateName="price"
                            inputProps={{
                                min: 1
                            }}
                            state={price}
                            setError={setError}
                            error={error.price}
                        />
                        {buy === 2 && <MaterialUIPickers
                            setState={setDateFrom}
                            dateFrom={dateFrom}
                            label="Дата с"
                            setDisableDate={setDisableDate}
                            setError={setError}
                            error={error.dateFrom}
                        />}
                        {buy === 2 && <MaterialUIPickers
                            setDisableDate={setDisableDate}
                            setState={setDateTo}
                            dateFrom={dateTo}
                            label="Дата по"
                            disableDate={disableDate}
                            setError={setError}
                            error={error.dateTo}
                        />}
                        <BasicTextField
                            setState={setName}
                            label="Имя"
                            type="text"
                            state={name}
                            stateName="name"
                            setError={setError}
                            error={error.name}
                        />
                        <BasicTextField
                            label={phoneNumber}
                            type="number"
                            inputProps={{
                                min: 1
                            }}
                            disabled={true}
                        />
                        <BasicTextField setState={setDescription} label="Описание" type="text" multiline={true}  />
                        {buy === 2 && <BasicTextField
                            setState={setDescription}
                            type="file"
                            errorImage={errorImage}
                            handleChangeImage={handleChangeImage}
                        />}

                        {disableButton ? <div className={classes.progress}><CircularProgress/></div> : (
                            <Button
                                onClick={onCreate}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disabled={errorImage}
                            >
                                Создать
                            </Button>
                        )}

                    </div>
                </Container>
            </Header>
        </div>
    )
}
