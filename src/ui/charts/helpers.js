import { extent } from 'd3';

export const getDomain = (domainData, xField, yField) => {
  const xExtent = extent(domainData, d => d[xField]);
  const yExtent = extent(domainData, d => d[yField]);

  return {
    x: [
      Math.floor(xExtent[0] * 1000) / 1000,
      Math.ceil(xExtent[1] * 1000) / 1000,
    ],
    y: [
      Math.floor(yExtent[0] * 1000) / 1000,
      Math.ceil(yExtent[1] * 1000) / 1000,
    ],
  };
};

/**
 * Calculates the number of axis ticks up to a given maximum
 * @param {array} domain
 * @param {number} maxCount
 * @returns {number}
 */
export const getTicks = (domain, maxCount = 10) =>
  Math.min(domain[1] * 1000 - domain[0] * 1000, maxCount);

/**
 * Returns a percentage representation of a given number
 * @param {number} value
 * @returns {string}
 */
export const percentage = value => `${(value * 100).toFixed(2)}%`;
