import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, value, onValueChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            format="### %"
            // format={v => Number(v) * 100 + "%"}
            // decimalSeparator=","
            getInputRef={ref}
            onValueChange={values => {
                // let valor = values?.floatValue > 100 ? 100 : values.value;
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                })
                // values?.floatValue > 100
                //     ? onValueChange({ floatValue: 100, formattedValue: '100,00', value: '100' })
                //     : onValueChange(values);
            }}
            // onValueChange={(values) => {
            //     onChange({
            //         target: {
            //             name: props.name,
            //             value: values.value,
            //         },
            //     });
            // }}
            maxLength={value >= 100 ? 3 : null}
            thousandSeparator
            isNumericString
        // prefix="$ "
        />
    );
});

NumberFormatCustom.propTypes = {
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
                render={({ field }) => (
                    <TextField
                        {...field}
                        {...props}
                        size="small"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
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
