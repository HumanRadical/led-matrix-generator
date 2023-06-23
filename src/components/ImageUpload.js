import { useState } from 'react'

const ImageUpload = () => {
    const [isUploaded, setIsUploaded] = useState(false)
    const [uploadedImage, setUploadedImage] = useState()

    const renderimage = event => {
        const image = event.target.files[0]
        setUploadedImage(URL.createObjectURL(image))
        setIsUploaded(true)
    }

    return (
        <div className='grid imageUpload'>
            {
                isUploaded 
                ? <img src={uploadedImage} className='uploadedImage' alt=''/>
                : <div className='fileUploadContainer'>
                    <h3>Upload image:</h3>
                    <label htmlFor='fileUpload'>Choose image</label>
                    <input type='file' onChange={renderimage} accept='image/jpeg, image/png, image/jpg' id='fileUpload' />
                </div>
            }
        </div>
    )
}

export default ImageUpload