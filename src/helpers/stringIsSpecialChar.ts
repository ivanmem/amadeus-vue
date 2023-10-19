const pattern = /\W/;

export function stringIsSpecialChar(value: string) {
  return pattern.test(value);
}
