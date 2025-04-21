import React, { useRef } from 'react'
import Grid from '@mui/material/Grid'
import HorizontalSteep from './HorizontalSteep'
import VerticalSteep from './VerticalSteep'
import { useContainerDimensions } from '@utils/useContainerDimensions'

const ShowSteeps = ({ steeps, context }) => {
  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  return (
    <Grid ref={componentRef}>
      {width > 650 ? (
        <HorizontalSteep context={context} />
      ) : (
        <VerticalSteep context={context} />
      )}
    </Grid>
  )
}

export default ShowSteeps
