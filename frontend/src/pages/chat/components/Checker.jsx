import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loaderSelector, toDefault } from '../../../redux/slices/loaderSlice.js';
import Loader from './Loader.jsx';
import { useAuthContext } from '../../../context/index.js';
import fetchAuthorizationData from '../../../redux/thunk.js';
import Chat from '../Chat';
import routes from '../../../routes.js';

const Checker = () => {
  const navigate = useNavigate();
  const loaderState = useSelector(loaderSelector);
  const { data } = useAuthContext();
  const useAuth = useAuthContext();
  const dispatch = useDispatch();

  const disconnect = useCallback(() => {
    localStorage.clear();
    useAuth.setUserData(null);
    dispatch(toDefault());
    navigate(routes.loginPagePath());
  }, [useAuth, dispatch, navigate]);

  useEffect(() => {
    const { token } = data;
    dispatch(fetchAuthorizationData(token));
    if (loaderState === 401) {
      disconnect();
    }
  }, [loaderState, data, dispatch, disconnect]);

  return (
    <>
      {loaderState === 'AWAIT' && <Loader />}
      <Chat />
    </>
  );
};

export default Checker;
