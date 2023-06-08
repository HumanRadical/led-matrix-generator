import { useContext, useState } from "react"

const Settings = () => {
    const [cols, setCols] = useState(16)
    const [rows, setRows] = useState(16)

    const updateCols = event => {
        setCols(event.target.value)
        console.log(cols)
    }
    const updateRows = event => {
        setRows(event.target.value)
    }

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