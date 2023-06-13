import { useContext } from 'react'
import { FramesContext } from '../context/FramesContext'

const ColorPresets = () => {
    const {
        currentDrawColor,
        setCurrentDrawColor,
        customColor,
        setCustomColor
    } = useContext(FramesContext)

    return (
        <form className='colorPresetForm' action='#'>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === '#ff0000'} readOnly/>
                <span className='redPreset' onClick={() => setCurrentDrawColor('#ff0000')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === '#0000ff'} readOnly/>
                <span className='bluePreset' onClick={() => setCurrentDrawColor('#0000ff')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === '#ffff00'} readOnly/>
                <span className='yellowPreset' onClick={() => setCurrentDrawColor('#ffff00')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor ==='#00ff00'} readOnly/>
                <span className='limePreset' onClick={() => setCurrentDrawColor('#00ff00')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === '#ffffff'} readOnly/>
                <span className='whitePreset' onClick={() => setCurrentDrawColor('#ffffff')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === '#000000'} readOnly/>
                <span className='blackPreset' onClick={() => setCurrentDrawColor('#000000')}></span>
            </label>
            <label className='colorPresets customPreset'>
                <input type='radio' name='colorPresets' checked={currentDrawColor === 'custom'} readOnly/>
                <span onClick={() => setCurrentDrawColor('custom')}>Custom</span>
                <input type='color' className='colorPicker' value={customColor} onChange={e => setCustomColor(e.target.value)} onClick={() => setCurrentDrawColor('custom')} />
            </label>
        </form>
    )
}

export default ColorPresets