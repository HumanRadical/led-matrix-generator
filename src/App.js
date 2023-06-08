import { useState } from 'react';
import './App.css';
import Grid from './components/Grid'
import Settings from './components/Settings'
import { SettingsContext } from './context/SettingsContext';

const App = () => {
	const [cols, setCols] = useState(16)
	const [rows, setRows] = useState(16)

	const updateCols = event => {
		setCols(event.target.value)
	}
	const updateRows = event => {
		setRows(event.target.value)
	}

	return (
		<div className="App">
			<SettingsContext.Provider value={{ cols, rows, updateCols, updateRows }}>
				<Grid />
				<Settings />
			</SettingsContext.Provider>
		</div>
	)
}

export default App;
