import { useContext, useEffect, useState } from "react"
import { FramesContext } from "../context/FramesContext"
import errorIcon from '../images/error.svg'

const AnimationPreview = () => {
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
                    style={{ width: 450 / cols, height: 450 / rows, backgroundColor: pixel}} 
                    key={`Animation Preview Pixel ${pixelIndex}`}
                ></div>
            }
            return <img 
                src={errorIcon}
                style={{ width: 450 / cols, height: 450 / rows}} 
                alt='Invalid Pixel'
                key={`Animation Preview Pixel ${pixelIndex}`}
            />
        })
    }
    
    let pixels = updatePixelColors()

    useEffect(() => {
        setGrid(convertColorStringToArray(frames[currentFrameIndex], snaked))
        pixels = updatePixelColors()
    }, [frames, currentFrameIndex, snaked])

    return (
        <section>
            <h3 className="animationPreviewTitle">Preview:</h3>
            <div className="grid animationPreview">
                {pixels}
            </div>
        </section>
    )
}

export default AnimationPreview