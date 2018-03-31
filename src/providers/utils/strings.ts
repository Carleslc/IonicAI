export class StringUtils {

  static capitalize(s: string) {
    s = s.trim();
    return s ? s[0].toUpperCase() + s.slice(1) : ''
  }

}
