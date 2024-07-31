import React from 'react'

const NewCourtLocation = () => {
  return (
    <div className="xl:h-full lg:h-1/2 xl:w-1/2 w-full max-lg:pb-4 dark:bg-gray-800 bg-gray-300 py-3 px-4 lg:rounded">
      <h4 className="underline text-lg font-semibold xl:mb-2 mb-1">Court Location</h4>

      <div className="w-full xl:h-1/2 lg:h-[90%] h-64 border rounded border-white grid place-items-center text-xl bg-teal-700 relative">
        <div title="Use current location" className="absolute h-10 w-28 shadow bg-teal-500 hover:text-gray-600 rounded-bl hover:bg-teal-400 text-xs duration-150 flex items-center justify-center top-0 right-0 z-10">
          Use My Location
        </div>
        Map here
      </div>
    </div>
  )
}

export default NewCourtLocation