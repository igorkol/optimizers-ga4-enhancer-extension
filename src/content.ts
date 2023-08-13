import { addCellPercentages } from './features/addCellPercentages';
import { removeCellPercentages } from './helpers/removeCellPercentages';
import { TABLE_TYPE } from './helpers/constants';
import { getReportingTable } from './helpers/getReportingTable';

const { type, element } = getReportingTable();

export const handlePercentages = () => {
	//const { type, element } = getReportingTable();
	if (!element) return;
	try {
		const removeResult = removeCellPercentages(element);
		const addResult = addCellPercentages(element, type);

		if (!removeResult && type !== TABLE_TYPE.CUSTOM_EXPLORATION) {
			console.error('removeCellPercentages returned unexpected result:', removeResult);
			// handle unexpected result from removeCellPercentages
		}

		if (!addResult) {
			console.error('addCellPercentages returned unexpected result:', addResult);
			// handle unexpected result from addCellPercentages
		}
	} catch (error) {
		console.error('An error occurred while handling percentages:', error);
		// or display a user-friendly error message
		// showError('An error occurred while handling percentages. Please try again later.');
	}
};

// Start observing the document with the configured parameters.
export const startObserving = () => {
	//const { type, element } = getReportingTable();
	if (element === null || type === TABLE_TYPE.STANDARD_REPORTING) return;

	if (typeof MutationObserver !== 'undefined') {
		const observer = new MutationObserver((mutationsList, observer) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					handlePercentages();
					observer.disconnect();
					setTimeout(startObserving, 500);	// TODO: fine tune this value
					break;
				}
			}
		});
		observer.observe(element, { childList: true, subtree: true });
	}
};

handlePercentages();
startObserving();
