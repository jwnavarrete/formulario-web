import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepButton from '@mui/material/StepButton'

const VerticalSteep = ({ context }) => {
  const { _steeps, _completed, getCurrentSteep } = useContext(context)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={getCurrentSteep()} orientation="vertical">
        {_steeps.map((step, index) => (
          <Step key={step.id} completed={_completed[index]}>
            <StepButton color="inherit">{step.label}</StepButton>
            <StepContent>{_steeps[getCurrentSteep()].component}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default VerticalSteep
