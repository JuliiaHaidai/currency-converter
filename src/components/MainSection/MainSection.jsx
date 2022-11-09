import { memo, useState, useMemo, useEffect } from 'react'

import { calculateRate } from '../../utils/utils'

import { InputWithSelect } from './components/InputWithSelect'
import { ReactComponent as ExchangeIcon } from '../../icons/exchangeIcon.svg'

import styles from './MainSection.module.scss'

export const MainSection = memo(function MainSection({ allRates }) {
  const [fromRate, setFromRate] = useState('USD')
  const [toRate, setToRate] = useState('UAH')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  const currentRate = useMemo(
    () =>
      allRates &&
      calculateRate(
        allRates.find(item => item.cc === fromRate).rate,
        allRates.find(item => item.cc === toRate).rate
      ),
    [fromRate, toRate, allRates]
  )

  useEffect(() => {
    fromValue && setToValue(parseFloat((fromValue * currentRate).toFixed(4)).toString())
  }, [fromRate, toRate])

  const onChangeFrom = value => {
    setFromValue(value)
    if (currentRate && value) {
      setToValue(parseFloat((value * currentRate).toFixed(4)).toString())
    } else {
      setToValue('')
    }
  }

  const onChangeTo = value => {
    setToValue(value)
    if (currentRate && value) {
      setFromValue(parseFloat((value / currentRate).toFixed(4)).toString())
    } else {
      setToValue('')
    }
  }

  const handleExchange = () => {
    setFromRate(toRate)
    setToRate(fromRate)
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Currency converter</h1>
      <div className={styles.inputsWrapper}>
        <InputWithSelect
          onChange={onChangeFrom}
          value={fromValue}
          allRates={allRates}
          rate={fromRate}
          setRate={setFromRate}
        />
        <button onClick={handleExchange}>
          <ExchangeIcon />
        </button>
        <InputWithSelect
          onChange={onChangeTo}
          value={toValue}
          allRates={allRates}
          rate={toRate}
          setRate={setToRate}
        />
      </div>
    </main>
  )
})
