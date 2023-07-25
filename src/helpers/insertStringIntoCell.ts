export default (cell: HTMLElement, val: string) => {
  const span = document.createElement('span');
  span.setAttribute('style', 'font-size:10px; font-style:italic');
  span.innerText = `(${val}%)`;
  cell.insertBefore(span, cell.firstChild);
};
