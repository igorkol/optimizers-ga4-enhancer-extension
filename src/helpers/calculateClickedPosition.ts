export const calculateClickedPosition = (event: MouseEvent) => {
	const eventTarget = event.target as SVGElement;
	const boundingRect = eventTarget.getBoundingClientRect();
	const x = event.clientX - boundingRect.left;
	const y = event.clientY - boundingRect.top;
	return { x, y };
};
