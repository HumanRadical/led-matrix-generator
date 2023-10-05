import { useContext, useState } from 'react'
import { FramesContext } from '../context/FramesContext'

const ImageUpload = () => {
    const {
        setFrames,
        currentFrameIndex,
        setCurrentMode,
        cols,
        rows,
        snaked,
        snakeColors
    } = useContext(FramesContext)

    const [antiAliasing, setAntiAliasing] = useState(false)

    const renderImage = event => {
        const imageUrl = URL.createObjectURL(event.target.files[0])
        const image = new Image()
        image.src = imageUrl

        image.onload = event => {
            const canvas = document.createElement('canvas')
            canvas.width = cols
            canvas.height = rows

            const context = canvas.getContext('2d')
            context.imageSmoothingEnabled = antiAliasing
            context.drawImage(event.target, 0, 0, canvas.width, canvas.height)
            
            const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data
            let newColorArray = []
            for (let i = 0; i < pixelData.length; i += 4) {
                let hexString = '0x' + 
                ('0' + parseInt(pixelData[i], 10).toString(16)).slice(-2) +
                ('0' + parseInt(pixelData[i + 1], 10).toString(16)).slice(-2) +
                ('0' + parseInt(pixelData[i + 2], 10).toString(16)).slice(-2)
                newColorArray.push(hexString)
            }

            if (snaked) {
                newColorArray = snakeColors(newColorArray)
            }
            const newColorFrame = newColorArray.join()
            
            setFrames(prevFrames => {
                const newFrames = [...prevFrames]
                newFrames[currentFrameIndex] = newColorFrame
                return newFrames
            })
            setCurrentMode('draw')
        }
    }

    return (
        <div className='grid imageUpload'>
            <div className='fileUploadContainer'>
                <h3>Upload image:</h3>
                <label className='chooseImage'>
                    Choose image
                    <input type='file' onChange={renderImage} accept='image/jpeg, image/png, image/jpg' />
                </label>
                <div>
                    <label className='antiAliasing'>
                        <input type='checkbox' checked={antiAliasing} onChange={() => setAntiAliasing(prevAliasing => !prevAliasing)} />
                        Anti-aliasing
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ImageUpload