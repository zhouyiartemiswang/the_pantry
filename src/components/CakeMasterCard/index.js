import React, { useState } from 'react';
// import {} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
}));

export default function CakeMasterCard({ cake }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        // console.log(event.target.id);
        // Add to card
    }

    return (
        <Card className={classes.root}>

            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} alt={cake.bakeryName}>
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleButtonClick}>
                        <span
                            id={cake.id}
                            className="material-icons"
                        >
                            add_shopping_cart
                        </span>
                    </IconButton>
                }
                title={cake.name}
                subheader={"By " + cake.bakeryName}
            />

            <CardMedia
                className={classes.media}
                image={cake.img}
                title={cake.name}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Address: {cake.bakeryAddress}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Phone: {cake.bakeryPhone}
                </Typography>
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
                    <span className="material-icons">expand_more</span>
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: ${cake.price}
                    </Typography>
                    <Typography paragraph>
                        Description: {cake.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
