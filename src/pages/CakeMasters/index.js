import React, { useState, useEffect } from 'react';
import CakeMasterCard from '../../components/CakeMasterCard';
import { Container, TextField, Grid, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function CakeMasters(props) {
    const classes = useStyles();
    const [cakeList, setCakeList] = useState([]);
    const [inputValue, setInputValue] = useState(""); // input displayed/entered in the search box 
    const [bakeryList, setBakeryList] = useState({});
    const [errorState, setErrorState] = useState({
        message: ""
    });

    useEffect( function() {
        if(!props.profile.isLoggedIn){
            setErrorState({message: "You need to log in before you can place an order"});
        }
        if(props.profile.isLoggedIn){
            setErrorState({message: ""});
        }
        let bakerArray = [];
        let premadeArray = [];
        if(props.bakers.allBakers){
            for(let i = 0; i < props.bakers.allBakers.length; i++){
                bakerArray.push(props.bakers.allBakers[i]);
            }
        }
        if(props.cakes.allCakes){
            for(let i = 0; i < props.cakes.allCakes.length; i++){
                premadeArray.push(props.cakes.allCakes[i]);
            }
        }

        setBakeryList({all: bakerArray, filtered: bakerArray });
        setCakeList({all: premadeArray, filtered: premadeArray });

            
    }, [props.bakers, props.premade]);

    const handleInputChange = (event, data) => {
        if(data){
            filterCakes(data.id);
        }
        else{
            filterCakes(0);
        }
    }

    function filterCakes(id){
        let premadeArray = [];
        if(id === 0){
            for(let i = 0; i < props.cakes.allCakes.length; i++){
                premadeArray.push(props.cakes.allCakes[i]);
            }
        }
        else{
            for(let i = 0; i < cakeList.all.length; i++){
                if(cakeList.all[i].baker_id === id){
                    premadeArray.push(cakeList.all[i]);
                }
            }
        }
        
        setCakeList({ ...cakeList, filtered: premadeArray });
    }

    return (
        <Container className={classes.container}>
            <div className={classes.appBarSpacer} />
            {errorState.message
                        ? <h2 style={{ textAlign: "center", color: "red" }}> {errorState.message}</h2>
                        : null
                    }

            {bakeryList
                ? <Autocomplete
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        onChange={handleInputChange}
                        id="search-box"
                        options={bakeryList.all}
                        getOptionLabel={(option) => {
                            return `${option.username}, ${option.address}`
                        }}
                        style={{ width: 500 }}
                        renderInput={(params) => <TextField {...params} label="Search a bakery" variant="outlined" />}
                    />
                : null
            }

            <Grid container spacing={3}>
                {cakeList.filtered
                    ? cakeList.filtered.map(cake =>
                        <Grid item xs={12} md={4} lg={4}>
                            <CakeMasterCard key={cake.id} cake={cake} baker={bakeryList.filtered} profile={props.profile} errorState={errorState} setErrorState={setErrorState} fillProfile={props.fillProfile}/>
                        </Grid>
                    )
                    : null
                }
            </Grid>

        </Container>
    )
}
