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
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === '#ff0000'}/>
                <span className='redPreset' onClick={() => setCurrentDrawColor('#ff0000')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === '#0000ff'}/>
                <span className='bluePreset' onClick={() => setCurrentDrawColor('#0000ff')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === '#ffff00'}/>
                <span className='yellowPreset' onClick={() => setCurrentDrawColor('#ffff00')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor ==='#00ff00'}/>
                <span className='limePreset' onClick={() => setCurrentDrawColor('#00ff00')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === '#ffffff'}/>
                <span className='whitePreset' onClick={() => setCurrentDrawColor('#ffffff')}></span>
            </label>
            <label className='colorPresets'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === '#000000'}/>
                <span className='blackPreset' onClick={() => setCurrentDrawColor('#000000')}></span>
            </label>
            <label className='colorPresets customPreset'>
                <input type='radio' name='colorPresets' defaultChecked={currentDrawColor === 'custom'}/>
                <span onClick={() => setCurrentDrawColor('custom')}>Custom</span>
                <input type='color' className='colorPicker' value={customColor} onChange={e => setCustomColor(e.target.value)} />
            </label>
        </form>
    )
}

export default ColorPresets