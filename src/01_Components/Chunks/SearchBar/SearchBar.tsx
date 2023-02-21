import React, {FC, FormEvent, useState} from 'react'
import s from './searchBar.module.scss'
import {Button} from "../Button/Button";

type SearchBarProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, value: string) => void
}
export const SearchBar: FC<SearchBarProps> = ({handleSubmit}) => {
  const [value, setValue] = useState('')
  return (
      <form className={s.searchBar} onSubmit={(e) => handleSubmit(e, value)}>
        <input className='commonInput' onChange={(e) => setValue(e.target.value)} type="text"
               placeholder='Search' value={value}/>
        <Button type='submit' title='Search' color='success'/>

      </form>
  )
}
