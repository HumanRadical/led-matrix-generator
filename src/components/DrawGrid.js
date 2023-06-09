import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'

const DrawGrid = () => {
    const { cols, rows } = useContext(SettingsContext)

    const [grid, setGrid] = useState([])
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        const defaultValue = 0

        // const newGrid = Array.from({length: rows}, () => Array(cols).fill(defaultValue));
        const newGrid = Array(cols * rows).fill(defaultValue);
        setGrid(newGrid)

        document.addEventListener('mousedown', () => setMouseDown(true))
        document.addEventListener('mouseup', () => setMouseDown(false))
    }, [cols, rows])

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
            style={{ width: 550 / cols - 2, height: 550 / rows - 2}} 
            key={`${pixelIndex}`}
        ></div>
    )


    return (
        <div className='grid'>
            {pixels}
        </div>
    );
}

export default DrawGrid