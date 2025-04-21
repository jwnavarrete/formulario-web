import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            decimalScale={2}
            thousandSeparator
            isNumericString
            prefix="$ "
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Index = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

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
                        {...props}
                        size="small"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
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