/**
 * Renders a formatted date string.
 *
 * @param {string} dateString - The date string to render.
 * @returns {string} The formatted date string in the 'dd/mm/yyyy' format.
 *
 * @example
 * renderDate('2023-05-27');
 * // Returns '27/05/2023'
 *
 * renderDate('2022-12-31');
 * // Returns '31/12/2022'
 */

export function renderDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}
