import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const findCountry = (country) => {
    return (
        axios.get(`${baseUrl}${country}`)
    )
}

export default { findCountry }