import React, { useRef } from 'react'
import Grid from "@mui/material/Grid";
import HorizontalSteep from "./HorizontalSteep";
import VerticalSteep from "./VerticalSteep";
import { useContainerDimensions } from "@utils/useContainerDimensions";

const ShowSteeps = ({ steeps }) => {
    const componentRef = useRef();
    const { width, height } = useContainerDimensions(componentRef);

    return (
        <Grid ref={componentRef}>
            {width > 650 ? (
                <HorizontalSteep steeps={steeps} />
            ) : (
                <VerticalSteep steeps={steeps} />
            )}
        </Grid>
    )
}

export default ShowSteeps