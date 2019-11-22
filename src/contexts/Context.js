import { createContext } from 'react';

const Context = createContext({
    images: [],
    loaded: false,
    count: 0,
    files: []
});

export default Context;