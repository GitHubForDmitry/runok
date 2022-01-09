import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '0 auto',
    },
    media: {
        height: 0,
        paddingTop: '126.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    marginB: {
        marginBottom: 20
    },
    description: {
        minHeight: 120
    }
}));

export default function ProductCard({post}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let history = useHistory();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = (post) => {
        history.push('/posts/' + post.id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.category.length && post.category[0].title[0].toUpperCase()}
                    </Avatar>
                }
                title={post.category.map(product => product.title ).join(', ')}
                subheader={post.date}
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                       <MoreVertIcon />
                    </IconButton>
                }
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleEdit(post)}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
            <CardMedia
                className={classes.media}
                image={post.urlImage ? post.urlImage : 'https://firebasestorage.googleapis.com/v0/b/runok-9db98.appspot.com/o/images%2Fno-photo.png?alt=media&token=a07bae63-29b7-4f12-8228-690d6d95ef3b'}
                title={post.category.title}
            />
            <CardContent  className={classes.description}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.place}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.buy === 2 &&
                        (<Typography variant="body2" color="textSecondary" component="span">c {post.dateFrom} по {post.dateTo}</Typography>)
                    }
                </Typography>
                {post.buy === 2 ?
                    ( <Typography  color="primary" variant="subtitle1">
                        Продаю
                    </Typography>
                    ) :
                    (
                        <Typography variant="subtitle1" color="secondary">
                            Покупаю
                        </Typography>
                    )
                }
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent >
                    <Typography paragraph>
                        <Link href={'tel:' + post.phoneNumber} >
                            {post.phoneNumber}
                        </Link>
                        </Typography>
                    <Typography paragraph>{post.name}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
