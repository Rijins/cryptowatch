import React from 'react'
import CoinChart from '../components/CoinChart'
import CoinConvert from '../components/CoinConvert'

function Coin() {

  return (

    <div className='min-h-screen bg-slate-950 p-4 sm:p-6'>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6'>

        {/* Left Side - 70% */}

        <div className='lg:col-span-7'>

          <CoinChart/>

        </div>


        {/* Right Side - 30% */}

        <div className='lg:col-span-3'>

          <CoinConvert/>

        </div>

      </div>

    </div>

  )

}

export default Coin