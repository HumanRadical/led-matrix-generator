import { useState, useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const DrawGrid = () => {
    const {
        convertColorStringToArray,
        convertColorArrayToString,
        frames,
        mouseDown,
        cols,
        rows,
        snaked,
        setFrames,
        currentFrameIndex,
        currentDrawColor,
        customColor
    } = useContext(FramesContext)

    const [grid, setGrid] = useState(convertColorStringToArray(frames[currentFrameIndex], snaked))

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

    const pixels = grid.map((pixel, pixelIndex) => {
        if (pixel === '<Error>') {
            return <img src='../images/error_icon.svg' className='errorPixel' alt='' />
        }
        return <div 
            className='pixel' 
            onMouseDown={e => colorInPixel(e, pixelIndex)}
            onMouseMove={e => colorInPixelIfMouseDown(e, pixelIndex)}
            style={{ width: 550 / cols - 2, height: 550 / rows - 2, backgroundColor: pixel}} 
            key={`${pixelIndex}`}
        ></div>
    })


    return (
        <>
            <div className='grid'>
                {pixels}
            </div>
        </>
    );
}

export default DrawGrid