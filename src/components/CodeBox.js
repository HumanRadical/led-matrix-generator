import { useContext } from "react"
import { FramesContext } from "../context/FramesContext"

const CodeBox = () => {
    const {
        frames,
        setFrames,
        currentFrameIndex
    } = useContext(FramesContext)

    const updateCurrentFrame = event => {
        setFrames(prevFrames => {
            const newFrames = prevFrames
            newFrames[currentFrameIndex] = event.target.value
            return newFrames
        })
    }

    return (
        <>
            <textarea className="codeBox" defaultValue={frames[currentFrameIndex]} onChange={updateCurrentFrame} />
        </>
    )
}

export default CodeBox