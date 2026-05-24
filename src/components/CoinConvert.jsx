import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoinDetails } from '../Redux/slice/cryptoSlice'
import { useParams } from 'react-router-dom'
import { TbArrowsDownUp } from 'react-icons/tb'

function CoinConvert() {

    const [amount, setAmount] = useState(1)

    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(fetchCoinDetails(id))
    }, [dispatch, id])

    const { selectedCoin } = useSelector((state) => state.crypto)


 return (

<div className='flex justify-center mt-8 px-4'>

<div className='w-full max-w-xl bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl'>

    <div className='mb-5'>

        <h2 className='text-xl sm:text-2xl font-bold text-white'>
            Currency Converter
        </h2>

        <p className='text-gray-400 text-sm'>
            Convert {selectedCoin?.name} to USD
        </p>

    </div>


    {/* From */}

    <div className='bg-slate-800 rounded-2xl p-4'>

        <p className='text-gray-400 text-sm mb-2'>
            From
        </p>

        <div className='flex justify-between items-center gap-3'>

            <div className='flex items-center gap-3 min-w-0'>

                <img
                src={selectedCoin?.image?.small}
                alt=""
                className='w-8 h-8 sm:w-10 sm:h-10'
                />

                <div className='min-w-0'>

                    <h3 className='font-medium truncate'>
                        {selectedCoin?.name}
                    </h3>

                    <p className='text-gray-400 text-xs uppercase'>
                        {selectedCoin?.symbol}
                    </p>

                </div>

            </div>

            <input
            type='number'
            value={amount}
            min={0}
            onChange={(e)=>setAmount(e.target.value)}

            className='bg-transparent outline-none text-right text-lg sm:text-xl font-bold w-20 sm:w-28'
            />

        </div>

    </div>


    {/* Arrow */}

    <div className='flex justify-center my-4'>

        <div className='bg-cyan-500 rounded-full p-2'>

            <TbArrowsDownUp
            size={18}
            className='text-black'
            />

        </div>

    </div>


    {/* To */}

    <div className='bg-slate-800 rounded-2xl p-4'>

        <p className='text-gray-400 text-sm mb-2'>
            To
        </p>

        <div className='flex justify-between items-center'>

            <div>

                <h3 className='font-medium'>
                    US Dollar
                </h3>

                <p className='text-gray-400 text-xs'>
                    USD
                </p>

            </div>

            <div className='text-right'>

                <h2 className='text-lg sm:text-2xl font-bold text-green-400'>

                    $

                    {(
                        amount *
                        (selectedCoin?.market_data?.current_price?.usd || 0)
                    ).toLocaleString(
                        undefined,
                        {
                            maximumFractionDigits:2
                        }
                    )}

                </h2>

            </div>

        </div>

    </div>


    {/* Rate */}

    <div className='mt-5 text-center text-gray-400 text-sm'>

        1 {selectedCoin?.symbol?.toUpperCase()}
        {" = $"}
        {selectedCoin?.market_data?.current_price?.usd?.toLocaleString()}

    </div>

</div>

</div>

)
}

export default CoinConvert
