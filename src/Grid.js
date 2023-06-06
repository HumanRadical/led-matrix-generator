import { useState, useEffect } from 'react';

const Grid = () => {
    const [grid, setGrid] = useState([]);

    useEffect(()=> {
        const rows = 16;
        const cols = 16;
        const defaultValue = 0;

        const newGrid = Array.from({length: rows}, () => Array(cols).fill(defaultValue));
        setGrid(newGrid);
    },[]);

    return (
        <div>
            {
                grid.map((row, rowIdx) =>
                    <div key={rowIdx}>
                        {
                            row.map((col, colIdx) =>
                                <div className='drawPixel' key={`${rowIdx}-${colIdx}`}>{col}</div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Grid;