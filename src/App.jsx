import { useEffect, useState } from 'react'
import axios from 'axios'

import { Header } from './components/Header/Header'
import { MainSection } from './components/MainSection/MainSection'

function App() {
  const [allRates, setAllRates] = useState(null)

  useEffect(() => {
    axios
      .get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
      .then(({ data }) =>
        setAllRates([
          ...data,
          {
            r030: 980,
            txt: 'Українська гривня',
            rate: 1,
            cc: 'UAH',
            exchangedate: new Date().toLocaleDateString(),
          },
        ])
      )
  }, [])

  return (
    <>
      <Header
        headerData={allRates && allRates.filter(item => item.cc === 'USD' || item.cc === 'EUR')}
      />
      <MainSection allRates={allRates} />
    </>
  )
}

export default App
