export const getDirection = offsetX => (offsetX > 0 ? "right" : "left");
export const getOffset = (start, end) => -((start - end) * 0.75);
export const getEvent = e => (e.touches ? e.touches[0] : e);
export const withXY = fn => e => fn(getEvent(e).pageX, getEvent(e).pageY);
export const withX = fn => e => fn(getEvent(e).pageX);
export const withY = fn => e => fn(getEvent(e).pageY);
export const getLimitOffset = (limit, direction) =>
  direction === "right" ? limit : -limit;
export const getOpacity = (offsetX, limit, min) =>
  1 -
  (Math.abs(offsetX) < min
    ? 0
    : (Math.abs(offsetX) - min) / Math.abs(limit - min));
