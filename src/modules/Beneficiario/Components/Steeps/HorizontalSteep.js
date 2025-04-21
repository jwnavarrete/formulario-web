import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'

const HorizontalSteep = ({ context }) => {
  const { _steeps, _completed, getCurrentSteep } = useContext(context)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={getCurrentSteep()}>
        {_steeps.map((step, index) => (
          <Step key={step.id} completed={_completed[index]}>
            <StepButton color="inherit">{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      
      <Grid container spacing={2} mt={2}>
        {_steeps[getCurrentSteep()].component}
      </Grid>
    </Box>
  )
}

export default HorizontalSteep
