import React, { useState, useEffect } from 'react';
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
import API from '../../utils/API'
import './style.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
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

export default function CakeMasterCard(props) {
    const classes = useStyles();
    let history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [bakerState, setBakerState] = useState({});

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function getDeadline(change){
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth();
        let day = newDate.getDate();
        month = month + 1;
        day = day + change;
        let changed = false;
        do{
            if(day > 28){
                if(month === 2){
                    day = day - 28;
                    month = month + 1;
                    changed = true;
                }
                else if((month === 1) || (month === 3) || (month === 5) || (month === 7) || (month === 8) || (month === 10) || (month === 12)){
                    if(day > 31){
                        day = day - 31;
                        month = month + 1;
                        changed = true;
                        if(month === 13){
                            month = 1;
                            year = year + 1;
                        }
                    }
                    else{
                        changed = false;
                    }
                }
                else{
                    if(day > 30){
                        day = day - 30;
                        month = month + 1;
                        changed = true;
                    }
                    else{
                        changed = false;
                    }
                }
            }
            else{
                changed = false;
            }
        }while(changed);
        return (`${year}-${month}-${day}`);
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        console.log(props.cake);
        let newDate = getDeadline(7);
        const orderObj = { sale: props.cake.price, ingredients: props.cake.ingredients, status: "Pending", description: `${props.cake.name} : ${props.cake.description}`, baker_id: props.cake.baker_id, deadline: newDate};
        submitOrder(orderObj);
    }

    function submitOrder(data){
        if(!props.profile.isLoggedIn){
            props.setErrorState({message: "You need to log in before you can place an order"});
        }
        else{
            const token = localStorage.getItem("token");
            API.createOrder(token, data).then(function (res) {
                if (res) {
                    props.setErrorState({message: ""});
                    props.fillProfile();
                    return history.push("/");
                }
                else {
                    props.setErrorState({message: "something went wrong" });
                }
            });
        }
    }
    useEffect( function(){
        for(let i = 0; i < props.baker.length; i++){
            if(props.baker[i].id === props.cake.baker_id){
                setBakerState({ name: props.baker[i].username, address: props.baker[i].address, phone: props.baker[i].phone});
            }
        }
    }, [props.baker]);

    return (
        <Card className={classes.root}>

            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} alt={bakerState.name}>
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleButtonClick}>
                        <span
                            id={props.cake.id}
                            className="material-icons"
                        >
                            add_shopping_cart
                        </span>
                    </IconButton>
                }
                title={props.cake.name}
                subheader={"By " + bakerState.name}
            />

            <CardMedia
                className={classes.media}
                image={props.cake.img}
                title={props.cake.name}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Address: {bakerState.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Phone: {bakerState.phone}
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
                        Price: ${props.cake.price}
                    </Typography>
                    <Typography paragraph>
                        Description: {props.cake.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
