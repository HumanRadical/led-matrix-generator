import { useContext } from 'react'
import CodeBox from './CodeBox'
import DrawGrid from './DrawGrid'
import ImageUpload from './ImageUpload'
import AIPrompt from './AIPrompt'
import { FramesContext } from '../context/FramesContext'

const CurrentModeDisplay = () => {
    const {
        currentMode,
    } = useContext(FramesContext)

    if (currentMode === 'draw') {
        return <DrawGrid />
    } else if (currentMode === 'code') {
        return <CodeBox />
    } else if (currentMode === 'image') {
        return <ImageUpload />
    }
    return <AIPrompt />
} 

export default CurrentModeDisplay