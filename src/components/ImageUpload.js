import { useContext } from "react"
import { FramesContext } from "../context/FramesContext"

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

    const renderimage = event => {

        const imageUrl = URL.createObjectURL(event.target.files[0])
        const image = new Image()
        image.src = imageUrl

        image.onload = event => {
            const canvas = document.createElement('canvas')
            canvas.width = cols
            canvas.height = rows

            const context = canvas.getContext('2d')
            context.drawImage(event.target, 0, 0, canvas.width, canvas.height)
            
            const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data
            let newColorArray = []
            for (let i = 0; i < pixelData.length; i += 4) {
                const hexString = "0x" + 
                (parseInt(pixelData[i],10).toString(16)) +
                ("0" + parseInt(pixelData[i + 1],10).toString(16)).slice(-2) +
                ("0" + parseInt(pixelData[i + 2],10).toString(16)).slice(-2)
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
                <label htmlFor='fileUpload'>Choose image</label>
                <input type='file' onChange={renderimage} accept='image/jpeg, image/png, image/jpg' id='fileUpload' />
            </div>
        </div>
    )
}

export default ImageUpload