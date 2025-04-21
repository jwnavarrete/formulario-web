import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

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
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        shouldUnregister={props.disabled} // Unregister if disabled
        render={({ field: { ref, ...field } }) => (
          <FormControl fullWidth>
            <InputLabel id={props.name}>{props.label}</InputLabel>
            <Select
              inputRef={ref}
              {...field}
              fullWidth
              size="small"
              onChange={(e) => {
                field.onChange(e);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              label={props.label}
              error={!!errors[props.name]}
              disabled={props.disabled} // Pass the disabled prop
            >
              {props.children}
            </Select>
          </FormControl>
        )}
      />
      <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
    </>
  );
};

export default Index;