import { useContext, useEffect, useState } from 'react'
import { FramesContext } from '../context/FramesContext'

const CodeBox = () => {
    const {
        frames,
        setFrames,
        cols,
        rows,
        currentFrameIndex
    } = useContext(FramesContext)

    const [prompt, setPrompt] = useState('')

    return (
        <>
            <textarea className='codeBox' />
        </>
    )
}

export default CodeBox