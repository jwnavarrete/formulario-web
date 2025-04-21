import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext, Controller } from 'react-hook-form'
import { Autocomplete, TextField, FormHelperText } from '@mui/material'

const index = props => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        {...props}
        render={({ field }) => (
          <Autocomplete
            {...props}
            {...field}
            value={props.value || null}
            closeonselect="true" // Agrega la prop closeOnSelect para que el Autocomplete se cierre después de seleccionar un valor
            onChange={(e, newValue) => {
              field.onChange(e, newValue) && props.onChange(e, newValue)
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={props?.label}
                variant='outlined'
                error={!!errors[props.name]}
              />
            )}
            fullWidth
            size='small'
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={props.name}
        render={({ message }) => (
          <FormHelperText error>{message}</FormHelperText>
        )}
      />
    </>
  )
}

export default index