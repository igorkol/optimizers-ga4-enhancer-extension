import addCellPercentages from './features/addCellPercentages';
import removeCellPercentages from './helpers/removeCellPercentages';

console.log('usao u content');
// we want to clean up first before adding new ones
removeCellPercentages();
addCellPercentages();
