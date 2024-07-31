import React, { useState } from 'react'

const NewCourtDetails = () => {
  const [disableEntryType, setDisableEntryType] = useState(true);
  const [disableFee, setDisableFee] = useState(true);

  const handleAccessTypeChange = (Event) => {
    console.log(document.querySelector("#accessType").value);
    if (Event.target.value == "private") {
      setDisableEntryType(false);
    } else {
      setDisableEntryType(true);
      setDisableFee(true);
    }

    (document.querySelector("#entryType").value == "fee" && document.querySelector("#accessType").value == "private") ? setDisableFee(false) : setDisableFee(true);

  }
  const handleFeeChange = (Event) => {
    Event.target.value == "fee" ? setDisableFee(false) : setDisableFee(true)
  }

  return (
    <div className="xl:w-1/3 lg:w-1/2 w-full lg:h-full dark:bg-gray-800 bg-gray-300 p-2 lg:rounded lg:overflow-x-hidden lg:overflow-y-scroll lg:no-scrollbar">
        <h4 className="underline text-lg font-semibold mb-2">General Information</h4>
        <div className='mb-4'>
            <p className='text-sm'>Name</p>
            <input required name='courtName' type="text" placeholder='Court name' className="w-full p-2 rounded" />
        </div>
        <div className='mb-4'>
            <p className='text-sm'>Short description</p>
            <textarea required name='courtDesc' placeholder='Short info about court' rows={2} className="w-full p-2 rounded resize-none" />
        </div>
        <div className='mb-4 flex gap-2'>
          <div className="w-1/2">
            <p className='text-sm'>Access Type</p>
            <select required onChange={handleAccessTypeChange} name="accessType" defaultValue="Public" id="accessType" className='w-full p-2 rounded'>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="w-1/2">
            <p className='text-sm'>Court Type</p>
            <select required name="courtType" id="" defaultValue="Outdoor" className='w-full p-2 rounded'>
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>
        </div>
        <div className='mb-4 flex gap-2'>
          <div className="w-1/2">
            <p className='text-sm'>Enter By:</p>
            <select onChange={handleFeeChange} disabled={disableEntryType} name="entryType" defaultValue="Paying a Fee" id="entryType" className='w-full p-2 rounded'>
              <option value="invitation">Invitation</option>
              <option value="fee">Paying a Fee</option>
            </select>
          </div>
          <div className="w-1/2">
            <p className='text-sm'>Entry Fee:</p>
            <input name='entryFee' disabled={disableFee} type="number" min={1} className="w-full p-2 rounded" />
          </div>
        </div>
        <div className='mb-4 flex gap-2'>
          <div className="w-1/2">
            <p className='text-sm'>Court Floor</p>
            <select required name="floorType" id="" defaultValue="Concrete" className='w-full p-2 rounded'>
              <option value="concrete">Concrete</option>
              <option value="hardwood">Hardwood</option>
              <option value="tiles">Sports Tiles</option>
              <option value="asphalt">Asphalt</option>
              <option value="rubber">Plastic / Rubber</option>
            </select>
          </div>
          <div className="w-1/2">
            <p className='text-sm'>Num of Hoops</p>
            <select required name="numOfHoops" id="" defaultValue={2} className='w-full p-2 rounded'>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
        </div>
        <p className='underline'>Extra Features</p>
        <p className="text-sm mb-3 font-light">Select from the list below:</p>
        <div className='mb-4 flex flex-wrap gap-2'>
          <div className="flex">
            <input name='lighting' type="checkbox" id="lighting" className="peer hidden" />
            <label htmlFor="lighting" className="select-none cursor-pointer rounded border-2 py-2 px-5 duration-150 ease-in-out peer-checked:bg-gray-700 peer-checked:text-gray-200 dark:peer-checked:bg-gray-200 dark:peer-checked:text-gray-900 peer-checked:border-gray-200">
              Lighting
            </label>
          </div>
          <div className="flex">
            <input name='seating' type="checkbox" id="seating" className="peer hidden" />
            <label htmlFor="seating" className="select-none cursor-pointer rounded border-2 py-2 px-5 duration-150 ease-in-out peer-checked:bg-gray-700 peer-checked:text-gray-200 dark:peer-checked:bg-gray-200 dark:peer-checked:text-gray-900 peer-checked:border-gray-200">
              Seating
            </label>
          </div>
          <div className="flex">
            <input name='restrooms' type="checkbox" id="restrooms" className="peer hidden" />
            <label htmlFor="restrooms" className="select-none cursor-pointer rounded border-2 py-2 px-5 duration-150 ease-in-out peer-checked:bg-gray-700 peer-checked:text-gray-200 dark:peer-checked:bg-gray-200 dark:peer-checked:text-gray-900 peer-checked:border-gray-200">
              Restrooms
            </label>
          </div>
          <div className="flex">
            <input name='gym' type="checkbox" id="gym" className="peer hidden" />
            <label htmlFor="gym" className="select-none cursor-pointer rounded border-2 py-2 px-5 duration-150 ease-in-out peer-checked:bg-gray-700 peer-checked:text-gray-200 dark:peer-checked:bg-gray-200 dark:peer-checked:text-gray-900 peer-checked:border-gray-200">
              Gym Available
            </label>
          </div>
          <div className="flex">
            <input name='shops' type="checkbox" id="shops" className="peer hidden" />
            <label htmlFor="shops" className="select-none cursor-pointer rounded border-2 py-2 px-5 duration-150 ease-in-out peer-checked:bg-gray-700 peer-checked:text-gray-200 dark:peer-checked:bg-gray-200 dark:peer-checked:text-gray-900 peer-checked:border-gray-200">
              Shops nearby / inside
            </label>
          </div>
        </div>
    </div>
  )
}

export default NewCourtDetails