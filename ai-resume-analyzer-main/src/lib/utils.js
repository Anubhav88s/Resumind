import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes.
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts.
 *
 * @param {...ClassValue[]} inputs - Class values to merge.
 * @returns {string} The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a file size in bytes to a human-readable string.
 *
 * @param {number} bytes - The size in bytes.
 * @returns {string} The formatted size string (e.g., "1.5 MB").
 */
export function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generates a random UUID.
 *
 * @returns {string} A random UUID string.
 */
export const generateUUID = () => crypto.randomUUID();

