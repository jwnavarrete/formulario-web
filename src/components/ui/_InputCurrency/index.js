import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import CurrencyFormat from "react-currency-format";

const index = (props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        {...props}
        control={control}
        defaultValue=""
        inputRef={register()}
        render={({ field }) => (
          <CurrencyFormat
            {...props}
            size="small"
            {...field}
            onChange={(e) => {
              field.onChange(e);
              {
                props.onChange && props.onChange(e);
              }
            }}
            customInput={TextField}
            error={errors[props.name] ? true : false}
          />
        )}
      />
      <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
    </>
  );
};

export default index;
