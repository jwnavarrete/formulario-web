import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepButton from "@mui/material/StepButton";
import { useSelector } from "react-redux";

const VerticalSteep = ({ steeps }) => {
  const { activeStep, completed } = useSelector(
    (state) => state.formNatural
  );

  const getCurrentSteep = () => {
    return completedSteps() === steeps.length ? activeStep - 1 : activeStep
  }

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  //
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={getCurrentSteep()} orientation="vertical">
        {steeps.map((step, index) => (
          <Step key={step.id} completed={completed[index]}>
            <StepButton color="inherit">{step.label}</StepButton>
            <StepContent>
              {steeps[getCurrentSteep()].component}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default VerticalSteep;