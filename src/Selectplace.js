import React,{useRef, useState, useEffect} from 'react';
import axios from 'axios';

const Selectplace = (place) => {
    //define states needed
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [state, setState] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");


    //fetch data from API
    useEffect(() => {
        axios.get(' https://crio-location-selector.onrender.com/countries').
        then((response)=>{setCountry(response.data)}).
        catch((error)=>{console.error("Error fetching countries:",error);});
    },[]);

    useEffect(() => {
        if(selectedCountry){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).
            then((response)=>{setState(response.data)})
            .catch((error)=>{console.error("Error fetching states:",error);});
        }
    },[selectedCountry]);

    useEffect(() => {
        if(selectedState){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).
            then((response)=>{setCity(response.data)})
            .catch((error)=>{console.error("Error fetching cities:",error);});
        }
    },[selectedState]);

    
    //define UI
    return(
        <div style={{
            display:"flex",
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <h2>Select Location</h2>
            <div>
                <select value={selectedCountry}
                onChange={(e)=>{
                    setSelectedCountry(e.target.value);
                    setSelectedState("");
                    setSelectedCity("");
                }}>
                    <option value="" disabled>Select Country</option>
                    {country.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
                <select value={selectedState}
                onChange={(e)=>{
                    setSelectedState(e.target.value);
                    setSelectedCity("");
                }}
                disabled ={!selectedCountry}>
                    <option value="" disabled>Select State</option>
                    {state.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
                <select value={selectedCity}
                onChange={(e)=>setSelectedCity(e.target.value)}
                disabled ={!selectedState}>
                    <option value="" disabled>Select City</option>
                    {city.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            {selectedCity && 
            <h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>}
        </div>
    )
}
export default Selectplace;