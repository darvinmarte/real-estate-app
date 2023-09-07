import axios from 'axios';


const searchCity = async (query) =>  {


    //Zillow 
    const options = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/search',
        params: {
            location: query
        },
        headers: {
            'X-RapidAPI-Key': '5932463005msha3ed8e2f210665ep1e2f5cjsne6bc7cc14e2c',
            'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
   

}




export default searchCity;