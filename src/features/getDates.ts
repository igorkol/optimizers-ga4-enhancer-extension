// this module returns the date of the clicked circle node
// TODO: write correct documentation

import { getCirclePositionWithinChart } from '../helpers/getCirclePositionWithinChart';
import { calculateClickedPosition } from '../helpers/calculateClickedPosition';

export const getDates = () => {
	const timeSeriesChart: HTMLElement = document.querySelector(
		'.time-series-chart svg',
	);

	timeSeriesChart?.addEventListener('mousedown', event => {
		const circles = document.querySelectorAll(
			'.time-series-chart svg .chart-root circle',
		);

		circles.forEach(circle => {
			const selectedCircle = circle.getAttribute('class') == 'selected';

			if (selectedCircle) {
				const { cxNumber, cyNumber, r } = getCirclePositionWithinChart(circle);
				const { x, y } = calculateClickedPosition(event);
				const dx = x - cxNumber;
				const dy = y - cyNumber;
				const calc = dx * dx + dy * dy;
				const toleratedOffset = 5; // TODO: needs to be tuned to depend on the space between sibling circles
				if (calc <= r * r + toleratedOffset) {
					//const circleData = circle.__data__; // TODO: figure out a better way to fetch __data__
					// If you have data attributes on your circles, you can access them like this:
					//console.log('Data attribute:', circleData);
					// alert(`date picked: ${circleData.Cb.date}`);
				}
			}
		});
	});
};
