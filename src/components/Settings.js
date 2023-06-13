import { useContext } from "react"
import { SettingsContext } from "../context/SettingsContext"

const Settings = () => {
    const { cols, rows, setCols, setRows, snaked, setSnaked } = useContext(SettingsContext)

    return (
        <div className="settings">
            <label className="sizeSettings">
                Size:
                <input 
                    className="sizeBox" 
                    onChange={e => setCols(e.target.value)} 
                    value={cols} 
                    type="number" 
                    min="1" 
                    max="99" 
                /> 
                x
                <input 
                    className="sizeBox" 
                    onChange={e => setRows(e.target.value)} 
                    value={rows} 
                    type="number" 
                    min="1" 
                    max="99" 
                />
            </label>
            <label className="snakeSetting">
                Snake mode:
                <input 
                    className="snakeBox" 
                    type="checkbox" 
                    onClick={() => setSnaked(prevSnaked => !prevSnaked)} 
                    checked={snaked} 
                />
            </label>
        </div>
    )
}

export default Settings