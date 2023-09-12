import { useEffect, useState } from 'react'
import CountryForm from './components/countryForm'
import countryApi from './service/countryApi'

function App() {

  const [country, setCountry] = useState('')
  const [countryData, setCountryData] = useState(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    if (isFormSubmitted) {
      countryApi
        .findCountry(country)
        .then((response) => {
          setCountryData(response.data)
          setIsFormSubmitted(false)
        })
        .catch((error) => {
          setCountryData(null);
          setIsFormSubmitted(false)
          console.log('bad')
        });
    }
  }, [isFormSubmitted, country])

  useEffect(() => {
    console.log(countryData);
  }, [countryData]);

  const newSearch = (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
  }

  const handleCountry = (e) => {
    setCountry(e.target.value)
  }

  return (
    <>
      <CountryForm handleCountry={handleCountry} newSearch={newSearch} />
    </>
  )
}

export default App
