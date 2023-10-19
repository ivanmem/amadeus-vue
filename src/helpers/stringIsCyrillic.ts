const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

export function stringIsCyrillic(value: string) {
  return cyrillicPattern.test(value);
}
