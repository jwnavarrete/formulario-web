import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

const Index = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <Controller
        control={control}
        name={props.name}
        defaultValue={props.defaultValue || ""}
        shouldUnregister={props.disabled} // Unregister if disabled
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            inputRef={ref}
            {...field}
            fullWidth
            {...props}
            size="small"            
            onChange={(e) => {
              onChange(e);
              if (props.onChange) {
                props.onChange(e);
              }
            }}
            error={!!errors[props.name]}
            disabled={props.disabled} // Pass the disabled prop
          />
        )}
      />
      <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
    </>
  );
};

export default Index;