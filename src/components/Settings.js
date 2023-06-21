import { useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const Settings = () => {
    const {
        frames,
        setFrames,
        cols,
        rows,
        setCols,
        setRows,
        snaked,
        setSnaked,
        interval,
        setInterval
    } = useContext(FramesContext)

    const resizeFrames = (event, type) => {
        const oldSize = rows * cols
        let newSize
        if (type === 'cols') {
            newSize = rows * event.target.value
            setCols(event.target.value)
        } else {
            newSize = cols * event.target.value
            setRows(event.target.value)
        }

        if (oldSize > newSize) {
            const newFrames = []
            for (let frame of frames) {
                const newFrame = frame.split(',').splice(0, newSize).join()
                newFrames.push(newFrame)
            }
            setFrames(newFrames)
        } else if (oldSize < newSize) {
            const newPixels = ',0x000000'.repeat(newSize - oldSize)
            const newFrames = []
            for (let frame of frames) {
                const newFrame = frame + newPixels
                newFrames.push(newFrame)
            }
            setFrames(newFrames)
        }
    }

    return (
        <form className='settings'>
            <label className='sizeSettings'>
                Size:
                <input 
                    className='settingsNumBox' 
                    onChange={e => resizeFrames(e, 'cols')} 
                    value={cols} 
                    type='number' 
                    min='1' 
                    max='99' 
                /> 
                x
                <input 
                    className='settingsNumBox' 
                    onChange={e => resizeFrames(e, 'rows')} 
                    value={rows} 
                    type='number' 
                    min='1' 
                    max='99' 
                />
            </label>
            <label className='snakeSettings'>
                Snake mode:
                <input 
                    className='snakeBox' 
                    type='checkbox' 
                    onChange={() => setSnaked(prevSnaked => !prevSnaked)} 
                    checked={snaked} 
                />
            </label>
            <label className='intervalSettings'>
                Interval (ms):
                <input 
                    className='settingsNumBox' 
                    onChange={e => setInterval(e.target.value)} 
                    min={1}
                    step={50}
                    value={interval} 
                    type='number'
                />
            </label>
        </form>
    )
}

export default Settings