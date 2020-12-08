import React from 'react';

import {
    Typography,
    Card,
    CardContent
  } from "@material-ui/core";

function InfoBox({title, cases, total}){
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>
                <h2 class="infoBox_cases">{cases}</h2>
                <Typography class="infoBox_total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;