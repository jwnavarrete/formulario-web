import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useSelector } from "react-redux";

const HorizontalSteep = ({ steeps }) => {
  const { activeStep, completed } = useSelector((state) => state.formNatural);

  const getCurrentSteep = () => {
    return completedSteps() === steeps.length ? activeStep - 1 : activeStep
  }

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={getCurrentSteep()}>
        {steeps.map((step, index) => (
          <Step key={step.id} completed={completed[index]}>
            <StepButton color="inherit">{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={2} mt={2}>
        {steeps[getCurrentSteep()].component}
      </Grid>
    </Box>
  );
};



export default HorizontalSteep;