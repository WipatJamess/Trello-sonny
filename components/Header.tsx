"use client"

import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore'
import fetchSuggestion from '@/lib/fetchSuggestion'

const Header = () => {

  const [board , searchString , setSearchString] = useBoardStore((state)=>[
    state.board,
    state.searchString,
    state.setSearchString
  ])

  const [loading , setLoading] = useState<boolean>(false)
  const [suggestion , setSuggestion] = useState<string>("")

    useEffect(()=>{
        if(board.columns.size === 0) return;
        setLoading(true)

        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board)
            setSuggestion(suggestion)
            setLoading(false)
        }

        fetchSuggestionFunc();
    },[board])

  return (
    <header>
      <div className='flex flex-col md:flex-row items-center justify-between
      bg-gray-500/10 rounded-b-2xl'>

        <div className='absolute top-0 left-0 w-full h-96
                bg-gradient-to-br from-pink-400 to-[#0055D1]
                rounded-md filter blur-3xl opacity-50  -z-50'></div>
                
        <h1 className='text-blue-500 text-2xl font-bold'>Trello</h1>

        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <form action="" className='flex items-center space-x-5
              rounded-md p-2 shadow-md flex-1 md:flex-initial bg-white'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
            <input type="text" 
            placeholder='search'
            value={searchString}
            onChange={(e)=> setSearchString(e.target.value)} 
            className='flex-1 outline-none p-2' />
            <button type='submit'>Search</button>
          </form>
          <Avatar name='james' round color='blue' size='50' />
        </div>
      </div>

      <div className='flex items-center justify-center px-5 py-3'>
        <p className='flex items-center text-sm font-light shadow-xl rounded-lg
        p-3 bg-white w-fit text-blue-500 max-w-3xl italic'>
          <UserCircleIcon className={`inline-block h-10 w-10 text-blue-500
          ${loading && "animate-spin"}`} />

          {suggestion && !loading
          ? suggestion
          : "GPT is summarising blaaaaaaaaaaaaaaaaaaaaaablaaaaaaaa"}
        </p>
      </div>

    </header>
  )
}

export default Header