const ImageUpload = () => {

    const renderimage = event => {
        const imageUrl = URL.createObjectURL(event.target.files[0])
        const image = new Image()
        image.src = imageUrl

        image.onload = event => {
            const canvas = document.createElement('canvas')
            canvas.width = 16
            canvas.height = 16

            const context = canvas.getContext('2d')
            context.drawImage(event.target, 0, 0, canvas.width, canvas.height)
            
            const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data
            const newColorArray = []
            for (let i = 0; i < pixelData.length; i += 4) {
                const r = parseInt(pixelData[i], 10).toString(16)
                const g = parseInt(pixelData[i + 1], 10).toString(16)
                const b = parseInt(pixelData[i + 2], 10).toString(16)
                const hexString = '0x' + r + g + b
                newColorArray.push(hexString)
            }
            console.log(newColorArray);
        }
    }

    return (
        <div className='grid imageUpload'>
            <div className='fileUploadContainer'>
                <h3>Upload image:</h3>
                <label htmlFor='fileUpload'>Choose image</label>
                <input type='file' onChange={renderimage} accept='image/jpeg, image/png, image/jpg' id='fileUpload' />
            </div>
        </div>
    )
}

export default ImageUpload