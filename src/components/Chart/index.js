import React from 'react';
import { useTheme, makeStyles, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 10,
        textAlign: "center",
    },
}));

export default function Chart(props) {
    const theme = useTheme();
    const classes = useStyles();
    const data = props.data;

    return (
        <>
            <Typography className={classes.title} component="h2" variant="h6" color="default" gutterBottom>
                Monthly Earnings
            </Typography>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="month" stroke={theme.palette.text.default} />
                    <YAxis stroke={theme.palette.text.default}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.default }}
                        >
                            Earning ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="earnings" stroke={theme.palette.primary.main} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}