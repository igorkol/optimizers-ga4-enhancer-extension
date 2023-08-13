export const cleanupStringToNumber = (str: string) => {
	return Number(str.replace(/[,£$<>!-]/g, '')); // TODO: add support for other currencies
};
