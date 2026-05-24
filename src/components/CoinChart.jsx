import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoinDetails, fetchCoinHistory } from '../Redux/slice/cryptoSlice'

import { IoIosStarOutline } from 'react-icons/io'
import { MdShare, MdOutlineFileDownload } from 'react-icons/md'

import { Line } from 'react-chartjs-2'

import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
}
    from 'chart.js'


Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


function CoinChart() {

    const days = 10

    const { id } = useParams()

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(
            fetchCoinHistory({
                id,
                days
            })
        )

        dispatch(
            fetchCoinDetails(id)
        )

    }, [dispatch, id])


    const { coinHistory, selectedCoin }
        =
        useSelector(
            (state) => state.crypto
        )


    const data = {

        labels:
            coinHistory?.prices?.map(
                (item) =>
                    new Date(item[0]).toLocaleDateString()
            ) || [],

        datasets: [
            {
                label: "Price (USD)",

                data:
                    coinHistory?.prices?.map(
                        (item) => item[1]
                    ) || [],

                borderColor: "#66fcf1",

                backgroundColor:
                    "rgba(102,252,241,0.2)",

                tension: 0.4
            }
        ]

    }

    const formatNumber = (num) => {

        if (!num) return "N/A"

        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + "T"
        }

        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + "B"
        }

        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + "M"
        }

        if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + "K"
        }

        return num.toLocaleString()

    }



    if (!selectedCoin) {

        return (

            <div className='min-h-screen bg-slate-950 text-white flex justify-center items-center'>

                Loading...

            </div>

        )

    }


    return (
        <div className='min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-8 py-6'>

            <div className='max-w-7xl mx-auto'>

                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8'>

                    <div className='flex items-center gap-4'>

                        <img
                            src={selectedCoin?.image?.small}
                            alt=""
                            className='w-12 h-12 sm:w-14 sm:h-14'
                        />

                        <div>
                            <h1 className='text-2xl sm:text-3xl font-bold'>
                                {selectedCoin?.name}

                                <span className='text-sm sm:text-lg text-gray-400 ml-2 uppercase'>
                                    {selectedCoin?.symbol}
                                </span>

                            </h1>
                        </div>

                    </div>

                    <div className='flex flex-wrap gap-3 w-full lg:w-auto'>

                        <button className='flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-800 px-4 py-3 rounded-xl hover:bg-slate-700'>
                            <IoIosStarOutline />
                            Watchlist
                        </button>

                        <button className='flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-800 px-4 py-3 rounded-xl hover:bg-slate-700'>
                            <MdShare />
                            Share
                        </button>

                        <button className='flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-800 px-4 py-3 rounded-xl hover:bg-slate-700'>
                            <MdOutlineFileDownload />
                            Download
                        </button>

                    </div>

                </div>

                <div className='bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden'>

                    <h2 className='text-xl sm:text-2xl font-bold mb-6'>
                        Price History
                    </h2>

                    <div className='h-[300px] sm:h-[400px] md:h-[500px]'>

                        <Line
                            data={data}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,

                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "white"
                                        }
                                    }
                                },

                                scales: {
                                    x: {
                                        ticks: {
                                            color: "gray",
                                            maxTicksLimit: 5
                                        }
                                    },

                                    y: {
                                        ticks: {
                                            color: "gray"
                                        }
                                    }
                                }
                            }}
                        />

                    </div>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>

                        <div className='bg-slate-800 rounded-2xl p-5 shadow-md hover:scale-105 transition'>

                            <p className='text-gray-400 text-sm mb-2'>
                                Price
                            </p>

                            <h3 className='text-xl font-bold text-green-400'>
                                $
                                {formatNumber(
                                    selectedCoin?.market_data?.current_price?.usd
                                )}
                            </h3>

                        </div>


                        <div className='bg-slate-800 rounded-2xl p-5 shadow-md hover:scale-105 transition'>

                            <p className='text-gray-400 text-sm mb-2'>
                                Volume
                            </p>

                            <h3 className='text-xl font-bold text-blue-400'>
                                $
                                {formatNumber(
                                    selectedCoin?.market_data?.total_volume?.usd
                                )}
                            </h3>

                        </div>


                        <div className='bg-slate-800 rounded-2xl p-5 shadow-md hover:scale-105 transition'>

                            <p className='text-gray-400 text-sm mb-2'>
                                Market Cap
                            </p>

                            <h3 className='text-xl font-bold text-purple-400'>
                                $
                                {formatNumber(
                                    selectedCoin?.market_data?.market_cap?.usd
                                )}
                            </h3>

                        </div>


                        <div className='bg-slate-800 rounded-2xl p-5 shadow-md hover:scale-105 transition'>

                            <p className='text-gray-400 text-sm mb-2'>
                                Total Supply
                            </p>

                            <h3 className='text-xl font-bold text-yellow-400'>
                                {formatNumber(
                                    selectedCoin?.market_data?.total_supply
                                )}
                            </h3>

                        </div>

                    </div>

                </div>



            </div>

        </div>
    )

}

export default CoinChart