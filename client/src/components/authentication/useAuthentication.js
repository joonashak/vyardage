import React, {
  useContext, createContext, useState, useEffect,
} from 'react';
import { checkSession } from '../../services/loginService';


const defaultState = { loggedIn: false };

const AuthenticationContext = createContext([[], () => {}]);

export const AuthenticationProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  // Update login status when the application loads.
  useEffect(() => {
    (async () => {
      const res = await checkSession();
      setState({ loggedIn: !res.error });
    })();
  }, []);

  return (
    <AuthenticationContext.Provider value={[state, setState]}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default () => {
  const [state, setState] = useContext(AuthenticationContext);

  const setLoggedIn = (loggedIn) => setState((prev) => ({ ...prev, loggedIn }));

  const { loggedIn } = state;

  return { loggedIn, setLoggedIn };
};
