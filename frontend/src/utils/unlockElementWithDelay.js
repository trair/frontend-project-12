const unlockElementWithDelay = (setFunction, delay) => (bool) => setTimeout(() => setFunction(bool), delay);
export default unlockElementWithDelay;