import CodeBox from "./CodeBox"
import DrawGrid from "./DrawGrid"
import ImageUpload from "./ImageUpload"

const CurrentModeDisplay = ({currentMode}) => {
    if (currentMode === 'draw') {
        return <DrawGrid />
    } else if (currentMode === 'code') {
        return <CodeBox />
    }
    return <ImageUpload />
} 

export default CurrentModeDisplay