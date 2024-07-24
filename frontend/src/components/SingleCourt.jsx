import React from 'react'
import { HashLoader } from 'react-spinners'

const SingleCourt = ({courtDetailInfo, courtDetailLoading, isCourtDetailError, courtDetailError}) => {

  return (
    <div className='' id='singleCourtDiv'>
        <h3 className='font-medium underline text-xl'>Court Detail</h3>
        {courtDetailInfo == null && <p>No court selected</p>}
        {courtDetailLoading && <HashLoader color='#d05722' />}
        {isCourtDetailError && <p>{JSON.stringify(courtDetailError.message)}</p>}
        {courtDetailInfo && <p className='p-1'>{JSON.stringify(courtDetailInfo)}</p>}

        <hr className='my-4' />
    </div>
  )
}

export default SingleCourt