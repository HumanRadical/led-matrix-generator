const PhotoUpload = () => {
    return (
        <div className='grid photoUpload'>
            <div className="fileUploadContainer">
                <h3>Upload photo:</h3>
                <label for='fileUpload'>Choose photo</label>
                <input type='file' id='fileUpload' />
            </div>
        </div>
    )
}

export default PhotoUpload