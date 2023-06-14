import { useContext, useEffect, useState } from 'react'
import { FramesContext } from '../context/FramesContext'

const CodeBox = () => {
    const {
        frames,
        setFrames,
        currentFrameIndex
    } = useContext(FramesContext)

    const [boxValue, setBoxValue] = useState(frames[currentFrameIndex])

    const updateCurrentFrame = event => {
        setBoxValue(event.target.value)
        setFrames(prevFrames => {
            const newFrames = prevFrames
            newFrames[currentFrameIndex] = event.target.value
            return newFrames
        })
    } 

    useEffect(() => {
        setBoxValue(frames[currentFrameIndex])
    }, [currentFrameIndex])

    return (
        <>
            <textarea className='codeBox' value={boxValue} onChange={updateCurrentFrame} />
        </>
    )
}

export default CodeBox