import { useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const Settings = () => {
    const {
        cols,
        rows,
        setCols,
        setRows,
        snaked,
        setSnaked,
        interval,
        setInterval
    } = useContext(FramesContext)

    return (
        <form className='settings'>
            <label className='sizeSettings'>
                Size:
                <input 
                    className='settingsNumBox' 
                    onChange={e => setCols(e.target.value)} 
                    value={cols} 
                    type='number' 
                    min='1' 
                    max='99' 
                /> 
                x
                <input 
                    className='settingsNumBox' 
                    onChange={e => setRows(e.target.value)} 
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
                Interval:
                <input 
                    className='settingsNumBox' 
                    onChange={e => setInterval(e.target.value)} 
                    step={50}
                    value={interval} 
                    type='number'
                />
            </label>
        </form>
    )
}

export default Settings