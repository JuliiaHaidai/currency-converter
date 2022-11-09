import styles from './Header.module.scss'

export const Header = ({ headerData }) => {
  return (
    <header className={styles.header}>
      {headerData &&
        headerData.map((item, i) => {
          return <div key={i}>{`1 ${item.cc} = ${item.rate} UAH`}</div>
        })}
    </header>
  )
}
