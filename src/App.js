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
	const [snaked, setSnaked] = useState(true)
	const [currentMode, setCurrentMode] = useState('draw')
	const [frames, setFrames] = useState([presets.digdug1, presets.digdug2])
	const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

	const snakeColors = (colorArray) => {
		const newArray = []
		let row = []
		colorArray.forEach((color, index) => {
			if (index !== 0 && index % cols === 0) {
				if (newArray.length % 2 === 1) {
					row.reverse()
				}
				newArray.push(row)
				row = []
			}
			row.push(color)
		})
		if (newArray.length % 2 === 1) {
			row.reverse()
		}
		newArray.push(row)
	
		const finalArray = [].concat(...newArray)
		return finalArray
	}

	const convertColorStringToArray = (colorString, snaked = false, prefix = '#') => {
		const colorArray = colorString
			.replaceAll(' ', '')
			.split(',')
			.map(color => {
				const hexColorRegEx = /0x([\da-f]+)/ig
				if (!hexColorRegEx.test(color)) {
					return '<Error>';
				}
				return color.replaceAll(hexColorRegEx, `${prefix}$1`);
			})
		
		if (snaked) {
			return snakeColors(colorArray)
		}
		return colorArray
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
		}
	}
	const increaseCurrentFrameIndex = () => {
		if (frames[currentFrameIndex + 1]) {
			setCurrentFrameIndex(prevFrameIndex => prevFrameIndex + 1)
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
				<SettingsContext.Provider value={{ cols, setCols, rows, setRows, snaked, setSnaked, convertColorStringToArray }}>
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
