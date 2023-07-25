export const getCirclePositionWithinChart = (circle: Element) => {
  const getParentOfCircle = circle.parentNode as SVGElement;
  // Get the circle's center and radius
  const parentsTransformAttrValue = getParentOfCircle.getAttribute('transform');
  const cx = parentsTransformAttrValue.split(',')[0].split('(').pop();
  const cy = parentsTransformAttrValue.split(',')[1].split(')').shift();

  // Check if the click coordinates are within the circle
  if (typeof cx == 'string' || typeof cy == 'string') {
    const cxNumber = parseFloat(cx);
    const cyNumber = parseFloat(cy);
    const r = parseFloat(circle.getAttribute('r'));

    return { cxNumber, cyNumber, r };
  }

  return;
};
