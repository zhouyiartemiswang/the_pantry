import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@material-ui/core';

function PlacedOrderList(props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={
                    <span className="material-icons">expand_more</span>
                }
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={props.classes.heading}>
                    <span className="material-icons profile-icon">shopping_basket</span>
                    {props.data.description} : {props.data.status}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography style={{whiteSpace: 'pre-line'}}>
                    {`Sale : $${props.data.sale} \n From: ${props.data.User.username} \n At: ${props.data.User.address}`}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default PlacedOrderList;