import { useState, useRef } from 'react'
import { useOnClickOutside } from '../../../utils/useOnClickOutside'

import { ReactComponent as ArrowDown } from '../../../icons/arrowDown.svg'

import styles from './InputWithSelect.module.scss'

export const InputWithSelect = ({ onChange, value, allRates, rate, setRate }) => {
  const ref = useRef()

  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredRates = allRates
    ? allRates.filter(item => item.cc.includes(searchValue.trim().toUpperCase()))
    : []

  const handleCloseDropdown = () => {
    setSearchValue('')
    setIsOpen(false)
  }

  useOnClickOutside(ref, handleCloseDropdown)

  return (
    <div className={styles.inputSelectWrapper}>
      <input
        placeholder="Enter a number"
        type="number"
        min="0"
        value={value}
        onChange={e => {
          onChange(e.target.value)
        }}
      />
      <div ref={ref} className={styles.select}>
        <div className={styles.mainOption} onClick={() => setIsOpen(!isOpen)}>
          {rate}
          <ArrowDown
            style={{ transform: isOpen ? ' rotate(180deg)' : 'rotate(0deg)', transition: ' 0.4s' }}
          />
        </div>
        {isOpen && (
          <div className={styles.opttionsContainer}>
            <input
              type="search"
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search.."
            />
            <div className={styles.optionsWrapper}>
              {filteredRates.length ? (
                filteredRates.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={styles.singleOption}
                      onClick={() => {
                        handleCloseDropdown()
                        setRate(item.cc)
                      }}
                    >
                      {item.cc}
                    </div>
                  )
                })
              ) : (
                <span>There are no rates</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
