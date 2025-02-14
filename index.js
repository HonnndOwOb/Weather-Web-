async function fetchData(){

    try{

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2492d7138e5940bd91183342251302&q=London&aqi=no`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        } 

        const data = await response.json();

        console.log(data.current);

    }
    catch(error){
        console.error(error);
    }
}

