import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCoins } from '../Redux/slice/cryptoSlice'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'

function Home() {

    const [currentPage,setCurrentPage]=useState(1)
    const [search,setSearch]=useState("")

    const totalPages=5
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(fetchAllCoins(currentPage))
    },[dispatch,currentPage])

    const {allCoins}=useSelector(
        (state)=>state.crypto
    )

    const filteredCoins = allCoins.filter((coin)=>
        coin.name.toLowerCase().includes(
            search.toLowerCase()
        )
    )

    return (

<div className='min-h-screen bg-slate-950 text-white px-6 py-8'>

    <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>

        <h1 className='text-3xl font-bold'>
            Market Overview
        </h1>

        <input
        type="text"
        placeholder='Search coin...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none w-full sm:w-80 focus:border-blue-500'
        />

    </div>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

    {filteredCoins.map((coin,index)=>(

        <Link
        key={index}
        to={`/coin/${coin.id}`}
        >

        <div className='bg-slate-900 rounded-2xl p-5 shadow-lg hover:scale-105 transition duration-300 border border-slate-800'>

            <div className='flex items-center gap-3 mb-4'>

                <img
                src={coin.image}
                alt=""
                className='w-12 h-12'
                />

                <div>

                    <h3 className='font-bold text-lg'>
                        {coin.name}
                    </h3>

                    <p className='text-gray-400 uppercase text-sm'>
                        {coin.symbol}
                    </p>

                </div>

            </div>

            <p className='text-2xl font-bold text-green-400'>
                ${coin.current_price}
            </p>

        </div>

        </Link>

    ))}

</div>

<Pagination
totalPages={totalPages}
currentPage={currentPage}
setCurrentPage={setCurrentPage}
/>

</div>

    )
}

export default Home