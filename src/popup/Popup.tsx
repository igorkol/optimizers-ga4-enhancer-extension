import React, { useEffect } from 'react';
import './Popup.scss';

export default function Popup() {
	useEffect(() => {
		// Example of how to send a message to background.ts.
		chrome.runtime.sendMessage({ popupMounted: true });
	}, []);

	return <div className='popupContainer'>Percentages have been added!</div>;
}
