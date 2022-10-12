import React, {useState} from 'react';

const AppContext = React.createContext();

export function AppProvider({children}) {
  const baseUrl =
    'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';

  const [url, setUrl] = useState('');

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        url,
        setUrl,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
