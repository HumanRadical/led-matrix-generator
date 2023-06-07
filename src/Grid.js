import { useState, useEffect } from 'react';

const Grid = ({cols, rows}) => {
    const [grid, setGrid] = useState([]);

    useEffect(()=> {
        const defaultValue = 0;

        // const newGrid = Array.from({length: rows}, () => Array(cols).fill(defaultValue));
        const newGrid = Array(cols * rows).fill(defaultValue);
        setGrid(newGrid);
    },[])

    const colorInPixel = event => {
        event.target.style.backgroundColor = "red"
    }

    const pixels = grid.map((pixel, pixelIndex) =>
        <div 
            className='pixel' 
            onClick={colorInPixel}
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

export default Grid;