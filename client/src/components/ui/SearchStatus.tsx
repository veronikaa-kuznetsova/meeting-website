const SearchStatus = ({ length }: string) => {
  const renderPhrase = (number: number) => {
    const lastOne = Number(number.toString().slice(-1))
    if (number > 4 && number < 15) {
      return `Найдено ${number} пользователей`
    }
    if (lastOne === 1) return `Найден ${lastOne} пользователь`
    if ([2, 3, 4].indexOf(lastOne) >= 0) return `Найдено ${number} пользователя`
    return `Найдено ${number} пользователей`
  }
  return (
    <h4>
      <span
        className={'badge p-3 ' + (length > 0 ? 'bg-dark' : 'bg-secondary')}
      >
        {length > 0 ? `${renderPhrase(length)}` : 'Пользователей не найдено'}
      </span>
    </h4>
  )
}

export default SearchStatus
