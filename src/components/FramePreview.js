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
                    key={pixelIndex}
                ></div>
            }
            return <img 
                src={errorIcon}
                style={{ width: 150 / cols, height: 150 / rows}} 
                alt='Invalid Pixel'
                key={pixelIndex}
            />
        })
    }
    
    let pixels = updatePixelColors()

    useEffect(() => {
        setGrid(convertColorStringToArray(type === 'last' ? frames[currentFrameIndex - 1] : frames[currentFrameIndex + 1], snaked))
        pixels = updatePixelColors()
    }, [frames, currentFrameIndex, snaked])

    return (
        <section className="previewArea">
            <h3 className="previewTitle">{type === 'last' ? 'Last' : 'Next'} Frame</h3>
            <div className="grid preview">
                {pixels}
            </div>
        </section>
    )
}

export default FramePreview