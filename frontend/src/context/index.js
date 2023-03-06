import { createContext, useContext } from 'react';

const Context = createContext({});
export const ApiProvider = createContext(null);
export const useAuthContext = () => useContext(Context);
export const useSocketContext = () => useContext(ApiProvider);
export default Context;
