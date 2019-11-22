import React, { useContext, useReducer} from 'react';
import './App.css';
import Context from './contexts/Context';
import reducer from './reducers/reducer';
import AppRouter from './routers/AppRouter';

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <AppRouter />
      </Context.Provider>
    </div>
  );
}

export default App;
