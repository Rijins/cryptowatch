import React from 'react'

function Pagination({ totalPages, currentPage, setCurrentPage }) {


    const handlePagechange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

        }
    }

    return (
        <>
            <div className='flex justify-center items-center gap-3 mt-10 flex-wrap'>

                <button
                    className='bg-slate-800 px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition'
                    onClick={() => handlePagechange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {

                    const pageNumber = index + 1

                    return (

                        <button
                            key={pageNumber}
                            onClick={() => handlePagechange(pageNumber)}

                            className={`
            w-10
            h-10
            rounded-lg
            transition
            ${currentPage === pageNumber
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-800 hover:bg-slate-700"
                                }
            `}
                        >

                            {pageNumber}

                        </button>

                    )

                })}

                <button
                    className='bg-slate-800 px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition'
                    onClick={() => handlePagechange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default Pagination
