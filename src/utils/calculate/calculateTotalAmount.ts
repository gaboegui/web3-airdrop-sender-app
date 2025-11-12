/**
 * Calculates the total sum of numbers provided in a string.
 * Numbers can be separated by commas (,) or newlines (\n).
 * Invalid or empty values are ignored.
 *
 * @param amountsString - The input string from a textarea, e.g., "10, 5\n2.5, 7"
 * @returns The total sum as a number.
 */
export const calculateTotalAmount = (amountsString: string): number => {
  if (!amountsString) {
    return 0;
  }

  // 1. Split the string by one or more commas (,) or newline characters (\n or \r\n).
  // The regex /[\n,]+/g handles both separators and treats multiple in a row as one.
  const amountStrings = amountsString.split(/[\n,]+/g);

  // 2. Process the array of strings
  const total = amountStrings.reduce((sum: number, currentAmountString: string) => {
    // Remove leading/trailing whitespace and convert to a number.
    const numericValue = parseFloat(currentAmountString.trim());

    // 3. Add to sum only if it's a valid, finite number (not NaN, Infinity, etc.)
    if (!isNaN(numericValue) && isFinite(numericValue)) {
      return sum + numericValue;
    }
    // 4. If not a valid number, return the current sum unchanged.
    return sum;
  }, 0); // Initialize the sum to 0
  return total;
}

export function calculateTotal(amounts: string): number {
    const amountArray = amounts
        .split(/[,\n]+/)
        .map(amt => amt.trim())
        .filter(amt => amt !== "")
        .map(amt => parseFloat(amt))
    if (amountArray.some(isNaN)) {
        return 0
    }
    return amountArray.reduce((acc, curr) => acc + curr, 0)
}