import { useEffect, useState } from 'react';
import './App.css';
import presets from './presets.json'
import arrowLeft from './images/arrow-left.svg'
import arrowRight from './images/arrow-right.svg'
import DrawGrid from './components/DrawGrid'
import Settings from './components/Settings'
import CodeBox from './components/CodeBox';
import { SettingsContext } from './context/SettingsContext';

const App = () => {
	const [cols, setCols] = useState(16)
	const [rows, setRows] = useState(16)
	const [currentMode, setCurrentMode] = useState('draw')
	const [frames, setFrames] = useState([presets.digdug1, presets.digdug2])
	const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

	const convertColorStringToArray = (colorString, prefix = '#') => {
		return colorString
			.replaceAll(' ', '')
			.split(',')
			.map(color => {
				const hexColorRegEx = /0x([\da-f]+)/ig
				if (!hexColorRegEx.test(color)) {
					return '<Error>';
				}
				return color.replaceAll(hexColorRegEx, `${prefix}$1`);
			})
	}

	const updateCols = event => {
		setCols(event.target.value)
	}
	const updateRows = event => {
		setRows(event.target.value)
	}

	const setDrawMode = event => {
		event.preventDefault()
		setCurrentMode('draw')
	}
	const setCodeMode = event => {
		event.preventDefault()
		setCurrentMode('code')
	}

	const decreaseCurrentFrameIndex = () => {
		if (frames[currentFrameIndex - 1]) {
			setCurrentFrameIndex(prevFrameIndex => prevFrameIndex - 1)
			console.log(currentFrameIndex)
		}
	}
	const increaseCurrentFrameIndex = () => {
		if (frames[currentFrameIndex + 1]) {
			setCurrentFrameIndex(prevFrameIndex => prevFrameIndex + 1)
			console.log(currentFrameIndex)
		}
	}

	const CurrentModeDisplay = () => {
		if (currentMode === 'draw') {
			return <DrawGrid currentFrame={frames[currentFrameIndex]} />
		}
		return <CodeBox currentFrame={frames[currentFrameIndex]} />
	}
	
	return (
		<div className='App'>
			<form className='modeButtons'>
				<button className='drawButton' onClick={setDrawMode}>Draw</button>
				<button className='codeButton' onClick={setCodeMode}>Code</button>
			</form>
				<SettingsContext.Provider value={{ cols, rows, updateCols, updateRows, convertColorStringToArray }}>
					<section className='gridArea'>
						<img alt='' src={arrowLeft} className='arrowLeft' onClick={decreaseCurrentFrameIndex} />
						<CurrentModeDisplay />
						<img alt='' src={arrowRight} className='arrowRight' onClick={increaseCurrentFrameIndex} />
					</section>
					<Settings />
				</SettingsContext.Provider>
		</div>
	)
}

export default App;
