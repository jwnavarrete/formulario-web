import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
        <IMaskInput
            {...other}
            // mask="(#00) 000-0000"
            mask="{{XXXX}} {{XXXX}} {{XXXX}} {{0000}}"
            // mask={mask}
            // definitions={{
            //   '#': /[1-9]/,
            // }}
            inputRef={ref}
            // onAccept={(value) => onChange({ target: { name: props.name, value } })}
            onAccept={(value) => {
                console.log("Valor recibido: ", value); // Esto te mostrará el valor que se está pasando
                onChange({ target: { name: props.name, value } });
            }}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

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
                render={({ field:{ ref, ...field }}) => (
                    <TextField
                        inputRef={ref}
                        {...field}
                        fullWidth
                        {...props}
                        size="small"
                        InputProps={{
                            inputComponent: TextMaskCustom,
                        }}
                        error={errors[props.name] ? true : false}
                    />
                )}
            />
            <FormHelperText error>{errors[props.name]?.message}</FormHelperText>
        </>
    );
};

export default index;
