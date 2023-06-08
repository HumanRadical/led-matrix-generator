import { useContext } from "react"
import { SettingsContext } from "../context/SettingsContext"

const Settings = () => {
    const { cols, rows, updateCols, updateRows } = useContext(SettingsContext)

    return (
        <div className="settings">
            <label className="sizeSettings">
                Size:
                <input className="sizeBox" onChange={updateCols} value={cols} type="number" min="1" max="99" /> 
                <span className="sizeBy">x</span>
                <input className="sizeBox" onChange={updateRows} value={rows} type="number" min="1" max="99" />
            </label>
        </div>
    )
}

export default Settings