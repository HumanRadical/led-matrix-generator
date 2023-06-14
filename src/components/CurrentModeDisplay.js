import CodeBox from "./CodeBox"
import DrawGrid from "./DrawGrid"

const CurrentModeDisplay = ({currentMode}) => {
    if (currentMode === 'draw') {
        return <DrawGrid />
    }
    return <CodeBox />
} 

export default CurrentModeDisplay