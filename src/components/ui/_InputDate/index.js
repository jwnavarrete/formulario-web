import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const index = (props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          {...props}
          control={control}
          defaultValue=""
          inputRef={register(props.name)}
          render={({ field, disabled }) => (
            <DesktopDatePicker
              label={props.label}
              {...props}
              {...field}
              {...register(props.name)}
              inputFormat="DD/MM/YYYY"
              value={props?.value}
              onChange={props?.onChange}
              renderInput={(params) => <TextField size="small" {...params} error={errors[props.name] ? true : false} />}
              error={errors[props.name] ? true : false}
            />
          )}
        />
      </LocalizationProvider>

      <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
    </>
  );
};

export default index;

