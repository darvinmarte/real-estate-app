import { useState } from "react";
import searchCity from "../utils/API";

const Listings = () => {
    const [listings, setListings] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleFetchListings = async (searchThis) => {
        try {

            const data = await searchCity(searchThis);
            setListings(data);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <main>
            
                <div>
                    <input
                        type="text"
                        placeholder="search location"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                <button onClick={() => handleFetchListings(searchQuery)}>Search</button>
                </div>


                <div className="Cards listings"> 
                    
                </div>
        </main>
    );
};



export default Listings;
