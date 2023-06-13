import { useState, useEffect, useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const DrawGrid = () => {
    const {
        convertColorStringToArray,
        convertColorArrayToString,
        cols,
        rows,
        snaked,
        frames,
        setFrames,
        currentFrameIndex
    } = useContext(FramesContext)

    const [grid, setGrid] = useState(convertColorStringToArray(frames[currentFrameIndex], snaked))
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        document.addEventListener('mousedown', () => setMouseDown(true))
        document.addEventListener('mouseup', () => setMouseDown(false))
    }, [])

    const colorInPixel = (event, index) => {
        event.target.style.backgroundColor = "#ff0000"

        setGrid(prevGrid => {
            const newGrid = prevGrid
            newGrid[index] = "#ff0000"
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

    const pixels = grid.map((pixel, pixelIndex) =>
        <div 
            className='pixel' 
            onMouseDown={e => colorInPixel(e, pixelIndex)}
            onMouseMove={e => colorInPixelIfMouseDown(e, pixelIndex)}
            style={{ width: 550 / cols - 2, height: 550 / rows - 2, backgroundColor: pixel}} 
            key={`${pixelIndex}`}
        ></div>
    )


    return (
        <>
            <div className='grid'>
                {pixels}
            </div>
        </>
    );
}

export default DrawGrid