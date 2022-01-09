import React, { useEffect, useState} from 'react';
import firebase from "../firebase";
import ProductCard from "../components/Card";
import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        maxWidth: 1440,
        width: '100%',
        margin: '0 auto'
    }
}));

function Catalog(props) {
    let history = useHistory();
    const [posts, setPosts] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("posts").get();
            const getData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPosts(getData);
        };
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Grid container spacing={3}>
                    {posts.length > 0 ? posts.map(post => (
                        <Grid item lg={3} xs={12} sm={6} key={post.id} >
                            <ProductCard post={post} />
                        </Grid>)
                    ) : <div>there is no posts</div>}
                        {
                            }
                </Grid>
            </div>
        </div>
    );
}

export default Catalog;
