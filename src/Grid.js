import { useState, useEffect } from 'react';

const rows = 16;
const cols = 16;

const Grid = () => {
    const [grid, setGrid] = useState([]);

    useEffect(()=> {
        const defaultValue = 0;

        // const newGrid = Array.from({length: rows}, () => Array(cols).fill(defaultValue));
        const newGrid = Array(rows * cols).fill(defaultValue);
        setGrid(newGrid);
    },[]);

    return (
        <div className='grid'>
            {
                grid.map((pixel, pixelIndex) =>
                    <div className='pixel' style={{ width: 550 / cols - 2, height: 550 / rows - 2}} key={`${pixelIndex}`}></div>
                )
            }
        </div>
    );
}

export default Grid;