export class CommonUtils {
  /**
   * Track by id
   *
   * @static
   * @param {unknown} id Id
   * @returns {unknown} Id
   */
  static trackById(id: unknown) {
    return id;
  }
  /**
   * Transform text
   *
   * @static
   * @param {string} text Text
   * @returns {string} Text transformed
   */
  static tranformText(text: string): string {
    return text.toLocaleLowerCase().trim();
  }
}
