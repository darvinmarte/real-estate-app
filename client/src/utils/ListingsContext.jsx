import { createContext, useContext, useState } from 'react';

// Create a context
const ListingsContext = createContext();

export const useListings =()=> 
useContext(ListingsContext);

export function ListingsProvider({ children }) {
    const [listings, setListings] = useState(null);

    const updateListings = (newListings) => {
        setListings(newListings);
    };

    return (
        <ListingsContext.Provider value={{ listings, updateListings }}>
            {children}
        </ListingsContext.Provider>
    );
}


