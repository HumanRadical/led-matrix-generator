import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'

const DrawGrid = ({currentFrame}) => {
    const { cols, rows, snaked, convertColorStringToArray } = useContext(SettingsContext)

    const [grid, setGrid] = useState([])
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        setGrid(convertColorStringToArray(currentFrame, snaked))

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