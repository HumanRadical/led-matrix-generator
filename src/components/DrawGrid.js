import { useState, useContext, useEffect } from 'react'
import { FramesContext } from '../context/FramesContext'
import errorIcon from '../images/error.svg'

const DrawGrid = () => {
    const {
        convertColorStringToArray,
        convertColorArrayToString,
        frames,
        setFrames,
        currentFrameIndex,
        mouseDown,
        cols,
        rows,
        snaked,
        currentDrawColor,
        customColor,
    } = useContext(FramesContext)
    
    const [grid, setGrid] = useState([])
    
    const updatePixelColors = () => {
        return grid.map((pixel, pixelIndex) => {
            if (CSS.supports('color', pixel)) {
                return <div 
                    className='pixel' 
                    onMouseDown={e => colorInPixel(e, pixelIndex)}
                    onMouseMove={e => colorInPixelIfMouseDown(e, pixelIndex)}
                    style={{ width: 550 / cols - 2, height: 550 / rows - 2, backgroundColor: pixel}} 
                    key={pixelIndex}
                ></div>
            }
            return <img 
                src={errorIcon} 
                className='pixel'
                style={{ width: 550 / cols - 2, height: 550 / rows - 2}} 
                alt='Invalid Pixel'
                key={pixelIndex}
            />
        })
    }
    
    let pixels = updatePixelColors()

    //NEED TO FIGURE OUT HOW TO RUN THIS WHEN FRAME IS ADDED WITHOUT CHANGING CURRENTFRAMEINDEX
    useEffect(() => {
        setGrid(convertColorStringToArray(frames[currentFrameIndex], snaked))
        pixels = updatePixelColors()
    }, [frames, currentFrameIndex, snaked])

    const colorInPixel = (event, index) => {
        const pixelColor = currentDrawColor === 'custom' ? customColor : currentDrawColor
        
        event.target.style.backgroundColor = pixelColor

        setGrid(prevGrid => {
            const newGrid = prevGrid
            newGrid[index] = pixelColor
            return newGrid
        })
        
        setFrames(prevFrames => {
            const newFrames = prevFrames
            newFrames[currentFrameIndex] = convertColorArrayToString(grid, snaked)
            return newFrames
        })
    }

    const colorInPixelIfMouseDown = (event, index) => {
        if (mouseDown) {
            colorInPixel(event, index)
        }
    }

    return (
        <>
            <div className='grid'>
                {pixels}
            </div>
        </>
    );
}

export default DrawGrid