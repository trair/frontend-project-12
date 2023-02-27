const unlockElement = (setFunction, delay) => (bool) => setTimeout(() => setFunction(bool), delay);
export default unlockElement;
