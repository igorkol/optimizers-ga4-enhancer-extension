// main

export const CLASS_NAME_ALL_EXTENSION_CHANGES = 'optimizers-extension';
export const GOOGLE_ANALYTICS_URL = 'https://analytics.google.com/*';
export const PATH_TO_CONTENT_SCRIPT = 'js/content.js';

// percentages feature

export const COLUMNS_FOR_PERCENTAGES = '% of total';

/// standard reports
export enum TABLE_TYPE {
	STANDARD_REPORTING = 'standard',
	CUSTOM_EXPLORATION = 'custom',
}

export const STANDARD_REPORTING_TABLE = 'ga-reporting-table';
export const STANDARD_REPORT_ROWS = 'tbody tr';
export const STANDARD_REPORT_HEADER_NUMBERS = 'thead tr[class*="summary-totals"] th';
export const STANDARD_REPORT_HEADER_TITLES = 'thead tr[class*="table-header-row"] th';
export const STANDARD_REPORT_SUMMARY_TOTALS = 'div[class*="summary-text"]';

/// custom reports
export const CUSTOM_EXPLORATION_TABLE = 'analysis-canvas';
export const CUSTOM_REPORT_ROWS = 'svg g.cell:not([row-index="0"])';
export const CUSTOM_REPORT_HEADERS = 'svg g.cell[row-index="0"]';
export const CUSTOM_REPORT_SUMMARY_TOTALS = 'text[class*="percent-of-total"]';
