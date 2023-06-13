import { useState, useEffect, useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const DrawGrid = () => {
    const {
        convertColorStringToArray,
        cols,
        rows,
        snaked,
        frames,
        currentFrameIndex
    } = useContext(FramesContext)

    const [grid, setGrid] = useState([])
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        setGrid(convertColorStringToArray(frames[currentFrameIndex], snaked))
        
        document.addEventListener('mousedown', () => setMouseDown(true))
        document.addEventListener('mouseup', () => setMouseDown(false))
    }, [])

    const colorInPixel = event => {
        event.target.style.backgroundColor = "red"
    }

    const colorInPixelIfMouseDown = event => {
        if (mouseDown) {
            colorInPixel(event)
        }
    }

    const pixels = grid.map((pixel, pixelIndex) =>
        <div 
            className='pixel' 
            onMouseDown={colorInPixel}
            onMouseMove={colorInPixelIfMouseDown}
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