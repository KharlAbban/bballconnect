import {IoAdd} from "react-icons/io5"
import { MdDeleteForever } from "react-icons/md";

const NewCourtImages = ({images, setImages, currImageId, setCurrImageId}) => {


  const handleCourtImagePreview = (Event) => {
    Event.preventDefault();
    const uploadedFiles = Array.from(Event.target.files);
    const rawURLS = [];
    uploadedFiles.forEach((uploadedFile) => {
      rawURLS.push(URL.createObjectURL(uploadedFile));
      return null;
    });
    const cachedURLS = rawURLS.filter((_, index) => index < (5 - images.length));
    setImages((prevImages) => [...prevImages, ...cachedURLS]);
    if (images.length < 1) setCurrImageId(0);


  }

  const handlePrevImageChange = (imageId) => {
    setCurrImageId(oldId => imageId);
  }

  const handleRemoveImage = (imageId) => {
    setCurrImageId(images.length - 2);
    const filteredImages = images.filter((_, index) => index!== imageId);
    setImages(oldImages => filteredImages);
  }

  return (
    <div className="xl:h-full lg:h-1/2 xl:w-1/2 w-full max-lg:pb-4 dark:bg-gray-800 bg-gray-300 py-3 px-4 lg:rounded">
      <h4 className="underline text-lg font-semibold xl:mb-2 mb-1">Court Images</h4>

      {/* No image selected */}
      {images.length < 1 ? 
        <div className="flex lg:w-full sm:w-1/2 sm:mx-auto w-full max-lg:mb-4">
          <input multiple max={5} onChange={handleCourtImagePreview} type="file" accept="image/*" id="picture" className="peer hidden" />
          <label htmlFor="picture" className="w-full select-none cursor-pointer rounded border-2 duration-150 ease-in-out flex flex-col gap-2 py-6 hover:bg-gray-400 dark:hover:bg-gray-700 items-center justify-center">
            <p className="text-center">Click to add up to <br /> 5 new court pictures</p>
            <IoAdd size={28} />
          </label>
        </div> :
        
        // Images selected
        <div className="w-full flex xl:flex-col max-sm:flex-col gap-2">
          <div className="lg:w-full md:w-1/2 sm:w-2/3 w-full xl:mb-3 h-60 relative overflow-hidden rounded border border-white">
            <div title="Click to remove image" onClick={() => {handleRemoveImage(currImageId)}} className="absolute h-12 w-12 shadow bg-red-500 hover:text-gray-600 rounded-bl hover:bg-red-700 duration-150 grid place-items-center top-0 right-0 z-10">
            <MdDeleteForever size={25} />
            </div>
            <img src={images[currImageId]} alt="court-image" className='absolute top-0 left-0 w-full h-full object-cover' />
          </div>
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => {
              if (index > 5) return;

              return <div key={index} className={`w-20 relative rounded overflow-hidden h-20 p-0 border border-white`}>
                <img onClick={() => handlePrevImageChange(index)} src={images[index]} alt="court-image" className='absolute top-0 left-0 h-full w-full' />
              </div>
            })}

            {images.length < 5 && <div className="flex">
              <input multiple max={5 - images.length} onChange={handleCourtImagePreview} type="file" accept="image/*" id="picture" className="peer hidden" />
              <label htmlFor="picture" className="hover:bg-gray-400 dark:hover:bg-gray-700 w-20 h-20 select-none cursor-pointer rounded border-2 duration-150 grid place-items-center">
                <IoAdd size={35} />
              </label>
            </div>}
          </div>
        </div>
      }
    </div>
  )
}

export default NewCourtImages