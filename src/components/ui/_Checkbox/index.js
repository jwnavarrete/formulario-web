import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";


const index = (props) => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext(); // retrieve all hook methods

    const [val, setVal] = useState(props.marcardo);

    return (
        <>
            <FormControlLabel
                {...props}
                control={
                    <Controller
                        {...props}
                        control={control}
                        name="acceptTerms"
                        // defaultValue="true"
                        inputRef={register()}
                        render={({ field }) => (
                            <Checkbox
                                type="checkbox"
                                {...field}
                                // fullWidth
                                defaultValue={props.marcardo}
                                color="primary"
                                onChange={(e) => {
                                    field.onChange(e.target.checked)
                                    setVal(!val);
                                }}
                                {...props}
                            // error={errors[props.name] ? true : false}
                            />
                        )}
                    />
                }
                label={
                    <Typography color={errors.acceptTerms ? "error" : "inherit"}>
                        {props.label}
                    </Typography>
                }
            />

            {/* <Controller
                {...props}
                control={control}
                defaultValue=""
                inputRef={register()}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        {...props}
                        size="small"
                        error={errors[props.name] ? true : false}
                    />
                )}
            /> */}

            <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
        </>
    );
};

export default index;
