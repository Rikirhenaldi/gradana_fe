"use client";

import { Provider } from 'react-redux';
import store from '@/store/store';
import { useEffect } from 'react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
