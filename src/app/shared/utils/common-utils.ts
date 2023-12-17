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

  /**
   * Transform date without hour
   *
   * @static
   * @param {Date} date Date
   * @returns {Date} Date transformed
   */
  static transformDateWithoutHour(date: Date, addDay = false): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      addDay ? date.getDate() + 1 : date.getDate()
    );
  }
  /**
   * Add year to date
   *
   * @static
   * @param {Date} date Date
   * @param {number} [years=1] Years
   * @returns {Date} Date
   */
  static addYearsToDate(date: Date, years = 1): Date {
    if (!isNaN(date?.getTime())) {
      date?.setFullYear(date.getFullYear() + years);
      date?.setDate(date.getDate() + 1);
    }
    return date;
  }
}
