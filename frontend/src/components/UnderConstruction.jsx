import React, { useRef } from 'react'
import { IoMdClose } from 'react-icons/io';

const UnderConstruction = () => {
    const dialogRef = useRef();

  return (
    <dialog ref={dialogRef} id="constructionModal" tabIndex="-1" aria-hidden="true" className="dark:bg-gray-600 bg-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center max-w-2xl">
        {/* {* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-orange-400">
                Under Construction
            </h3>
            <button onClick={() => dialogRef.current.close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                <IoMdClose size={26} />
                <span className="sr-only">Close modal</span>
            </button>
        </div>
        {/* // {* Modal body */}
        <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
                Please note that this app is still under construction. Please report any complaints to this email: <a title="Click to mail me!" className='underline text-blue-500' href="mailto:khvngkharl123@gmail.com">khvngkharl123@gmail.com</a>
            </p>
        </div>
    </dialog>
  )
}

export default UnderConstruction