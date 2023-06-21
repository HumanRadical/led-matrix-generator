import { useContext, useEffect, useState } from "react"
import { FramesContext } from "../context/FramesContext"
import errorIcon from '../images/error.svg'

const FramePreview = ({type}) => {
    const {
        convertColorStringToArray,
        frames,
        currentFrameIndex,
        cols,
        rows,
        snaked,
    } = useContext(FramesContext)

    const [grid, setGrid] = useState([])
    
    const updatePixelColors = () => {
        return grid.map((pixel, pixelIndex) => {
            if (CSS.supports('color', pixel)) {
                return <div
                    style={{ width: 150 / cols, height: 150 / rows, backgroundColor: pixel}} 
                    key={type === 'last' ? `Last Frame Pixel ${pixelIndex}` : `Next Frame Pixel ${pixelIndex}`}
                ></div>
            }
            return <img 
                src={errorIcon}
                style={{ width: 150 / cols, height: 150 / rows}} 
                alt='Invalid Pixel'
                key={type === 'last' ? `Last Frame Pixel ${pixelIndex}` : `Next Frame Pixel ${pixelIndex}`}
            />
        })
    }
    
    let pixels = updatePixelColors()

    useEffect(() => {
        setGrid(convertColorStringToArray(type === 'last' ? frames[currentFrameIndex - 1] : frames[currentFrameIndex + 1], snaked))
        pixels = updatePixelColors()
    }, [frames, currentFrameIndex, snaked])

    return (
        <section className="framePreviewArea">
            <h3 className="framePreviewTitle">{type === 'last' ? 'Last' : 'Next'} Frame</h3>
            <div className="grid framePreview">
                {pixels}
            </div>
        </section>
    )
}

export default FramePreview