/**
 * This file provides:
 * number and currency formatters to use globally troughout the app
 */

// Format number to currency, defaults to USD
export function formatCurrency(number: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(number);
}

// Format number to a readable string
export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
}
