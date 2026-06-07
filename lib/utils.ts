/**
 * Utility functions for the Learning Dashboard.
 */

/**
 * Conditionally join class names together.
 * A lightweight alternative to clsx/classnames.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
