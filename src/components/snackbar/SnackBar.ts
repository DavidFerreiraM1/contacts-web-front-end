/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ISnackbar {
  enqueueSnackbar: (message: any, options?: any) => any | null;
  closeSnackbar: (key?: any) => void;
}

export function variantSnackbar(variant: 'default' | 'success' | 'error' | 'info') {
  return ({
    variant,
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  });
}
