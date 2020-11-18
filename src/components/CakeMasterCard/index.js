import React, { useState } from 'react';
// import {  } from '@material-ui/core';
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

export default function CakeMasterCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <span className="material-icons">more_vert</span>
                    </IconButton>
                }
                title="Bakery1"
                subheader="Something"
            />
            <CardMedia
                className={classes.media}
                image="http://placekitten.com/200/100"
                title="Bakery1"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Address: 123 Street, Seattle, WA 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Phone: 123-456-7890
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <span className="material-icons">favorite</span>
                </IconButton>
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
                    <Typography paragraph>
                        More info: 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed cursus felis, et molestie dui. Maecenas ultricies egestas ipsum, quis dictum ligula volutpat quis. Proin tristique, dui quis malesuada volutpat, est urna iaculis turpis, et imperdiet felis nunc quis mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus fermentum dui ac dolor interdum, id laoreet quam convallis. Sed placerat nulla nec metus aliquet pellentesque. Maecenas maximus sed est nec dapibus. Nam mollis iaculis nisi, in malesuada velit lobortis at.
                    </Typography>
                    
                </CardContent>
            </Collapse>
        </Card>
    );
}
