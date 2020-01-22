/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field } from 'formik';
import { TextField, InputAdornment } from '@material-ui/core';
import InputMask from 'react-input-mask';

type Variant = 'filled' | 'outlined' | 'standard'

interface OwnProps {
  id?: string
  variant?: Variant
  name: string
  mask?: string
  maskChar?: string
  className?: any
  placeholder?: string
  label?: string
  setStartAdornment?: string
  adornmentText?: any
}

/**
 * CustomInput deve ser chamado como filho do Form - Formik
 */
type Props = OwnProps;

export default function MyInputText(props: Props) {
  const {
    id, name, label, mask, maskChar, className, placeholder, setStartAdornment, adornmentText, variant, ...otherProps
  } = props;
  return (
    <Field
      {...otherProps}
      name={name}
    >
      {
        ({ field }: any) => (
          <InputMask
            {...field}
            mask={mask}
            maskChar={maskChar}
          >
            {
              () => (
                <TextField
                  {...field}
                  variant={variant}
                  style={{ width: '100%' }}
                  size="small"
                  id={id}
                  className={className}
                  placeholder={placeholder}
                  label={label}
                  InputProps={
                  { startAdornment: <InputAdornment position="start">{adornmentText}</InputAdornment> }
                  }
                />
              )
            }
          </InputMask>
        )
      }
    </Field>
  );
}
