import { useContext } from 'react'
import CodeBox from './CodeBox'
import DrawGrid from './DrawGrid'
import ImageUpload from './ImageUpload'
import { FramesContext } from '../context/FramesContext'

const CurrentModeDisplay = () => {
    const {
        currentMode,
    } = useContext(FramesContext)

    if (currentMode === 'draw') {
        return <DrawGrid />
    } else if (currentMode === 'code') {
        return <CodeBox />
    }
    return <ImageUpload />
} 

export default CurrentModeDisplay