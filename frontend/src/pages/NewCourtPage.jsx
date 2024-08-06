import { IoClose } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import { NewCourtDetails, NewCourtImages, NewCourtLocation } from "../components";
import { Form, useNavigate, useSubmit } from "react-router-dom";
import { useState } from "react";

const NewCourtPage = () => {
  const [images, setImages] = useState([]);
  const [currImageId, setCurrImageId] = useState(0);
  const submitThis = useSubmit();

  const handleNewCourtSubmit = (Event) => {
    Event.preventDefault();
    const FormInfo = new FormData(Event.target);

    if (images.length < 3) {
      alert("Please add at least 3 court images.");
      return;
    }

    // add all images to the formData
    FormInfo.append("images",Array.from(images));

    alert("Thank you! Your submission is made and will be reviewed!")

    // Redirect to the Court Details page with the new court's ID
    useNavigate().push(`/courts`);

  }

  return (
    <Form encType="multipart/form-data" method="post" onSubmit={handleNewCourtSubmit} className='text-pageDarkColor dark:text-gray-100 h-full w-full lg:p-2'>
      <header className="my-2 flex gap-4 px-2 justify-between items-center">
        <h4 className='md:text-2xl text-lg'>Add A New Court</h4>
        <div className="flex gap-4">
          <button className="py-2 max-md:text-sm flex items-center gap-3 px-5 rounded text-gray-800 dark:text-gray-300 hover:text-pageLightColor hover:bg-gray-500 duration-150 border border-gray-500">
            <IoClose size={25} />
            Discard
          </button>
          <button className="py-2 max-md:text-sm flex items-center gap-3 px-5 rounded bg-pageLightColor hover:bg-orange-800 duration-150">
            Submit
            <IoCheckmarkDone size={25} />
          </button>
        </div>
      </header>
      <div className="lg:rounded w-full h-[90vh] relative flex max-lg:flex-col lg:p-2 gap-1 overflow-x-hidden overflow-y-scroll no-scrollbar">
        <NewCourtDetails />
        <div className="xl:w-2/3 lg:w-1/2 w-full flex max-xl:flex-col gap-1">
          <NewCourtLocation />
          <NewCourtImages images={images} setImages={setImages} currImageId={currImageId} setCurrImageId={setCurrImageId} />
        </div>
      </div>
    </Form>
  )
}

export default NewCourtPage