import axios from 'axios';


export const searchCity = async (query, filter) =>  {


    //Zillow 
    const options = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/search',
        params: {
            location: query,
            status : filter
        },
        headers: {
            'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
            'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);

        return response.data;
    } catch (error) {
        console.error(error);
    }
   

}
//by id 
export const searchbyID = async(id) =>{

    const options = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/property',
        params: { zpid: id },
        headers: {
            'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
            'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}


