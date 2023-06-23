import CodeBox from "./CodeBox"
import DrawGrid from "./DrawGrid"
import PhotoUpload from "./PhotoUpload"

const CurrentModeDisplay = ({currentMode}) => {
    if (currentMode === 'draw') {
        return <DrawGrid />
    } else if (currentMode === 'code') {
        return <CodeBox />
    }
    return <PhotoUpload />
} 

export default CurrentModeDisplay