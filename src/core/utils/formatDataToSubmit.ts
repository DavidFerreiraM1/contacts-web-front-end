export function formatePhone(value?: string) {
  let newValue = '';
  if (value !== undefined) {
    newValue = value.substring(0, 2)
    + value.substring(3, 4)
    + value.substring(5, 9) + value.substring(10, 14);
  }
  return newValue;
}
