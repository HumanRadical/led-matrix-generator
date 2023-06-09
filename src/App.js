import { useState } from 'react';
import './App.css';
import DrawGrid from './components/DrawGrid'
import Settings from './components/Settings'
import { SettingsContext } from './context/SettingsContext';
import CodeBox from './components/CodeBox';

const App = () => {
	const [cols, setCols] = useState(16)
	const [rows, setRows] = useState(16)
	const [currentMode, setCurrentMode] = useState('draw')

	const updateCols = event => {
		setCols(event.target.value)
	}
	const updateRows = event => {
		setRows(event.target.value)
	}

	return (
		<div className='App'>
			<form className='modeButtons'>
				<button onClick={e => {e.preventDefault(); setCurrentMode('draw')}}>Draw</button>
				<button onClick={e => {e.preventDefault(); setCurrentMode('code')}}>Code</button>
			</form>
			<SettingsContext.Provider value={{ cols, rows, updateCols, updateRows }}>
				{
					currentMode === 'draw' ? <DrawGrid /> : <CodeBox />
				}
				<Settings />
			</SettingsContext.Provider>
		</div>
	)
}

export default App;
