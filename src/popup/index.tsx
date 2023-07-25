import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Popup';

const root = ReactDOM.createRoot(document.getElementById('root'));

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  root.render(<Popup />);
});
