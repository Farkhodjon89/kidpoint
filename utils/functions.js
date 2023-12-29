export const formatPrice = (
    number,
    floatingDigits = 0,
    splitBy = 3,
    splitter = ' ',
    floatingSplitter = '.',
) => {
  const re = `\\d(?=(\\d{${splitBy}})+${floatingDigits > 0 ? '\\D' : '$'})`;
  const num = (typeof number === 'number' ? number : parseInt(number)).toFixed(
      Math.max(0, ~~floatingDigits),
  );

  return (floatingSplitter ? num.replace('.', floatingSplitter) : num).replace(
      new RegExp(re, 'g'),
      `$&${splitter}`,
  );
};