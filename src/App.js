import { useEffect, useState } from 'react'
import './App.css';
import presets from './presets.json'
import arrowLeft from './images/arrow-left.svg'
import arrowRight from './images/arrow-right.svg'
import { FramesContext } from './context/FramesContext'
import Settings from './components/Settings'
import ColorPresets from './components/ColorPresets'
import CurrentModeDisplay from './components/CurrentModeDisplay';

const App = () => {
	const [frames, setFrames] = useState([presets.qbert1, presets.qbert2])
	const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
	const [currentMode, setCurrentMode] = useState('draw')
	const [mouseDown, setMouseDown] = useState(false)
	const [currentDrawColor, setCurrentDrawColor] = useState('#ff0000')
	const [customColor, setCustomColor] = useState('#000000')
	const [cols, setCols] = useState(16)
	const [rows, setRows] = useState(16)
	const [snaked, setSnaked] = useState(true)

    useEffect(() => {
        document.addEventListener('mousedown', () => setMouseDown(true))
        document.addEventListener('mouseup', () => setMouseDown(false))

		return () => {
			document.removeEventListener('mousedown', () => setMouseDown(true))
        	document.removeEventListener('mouseup', () => setMouseDown(false))
		}
    }, [])

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

	const convertColorStringToArray = (colorString, snaked, prefix = '#') => {
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

	const convertColorArrayToString = (colorArray, snaked, prefix = '0x') => {
		if (snaked) {
			colorArray = snakeColors(colorArray)
		}

		const colorString = colorArray
			.join()
			.replaceAll('#', prefix)

		return colorString
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
	
	return (
		<>
			<h1 className='title'>LED Matrix Generator</h1>
			<h2 className='frameTitle'>Frame {currentFrameIndex + 1}</h2>
			<form className='modeButtons'>
				<button className='drawButton' onClick={setDrawMode}>Draw</button>
				<button className='codeButton' onClick={setCodeMode}>Code</button>
			</form>
			<FramesContext.Provider 
				value={{
					convertColorStringToArray,
					convertColorArrayToString,
					frames,
					setFrames,
					currentFrameIndex,
					setCurrentFrameIndex,
					mouseDown,
					cols,
					setCols,
					rows,
					setRows,
					snaked,
					setSnaked,
					currentDrawColor,
					setCurrentDrawColor,
					customColor,
					setCustomColor
				}}
			>
				<section className='gridArea'>
					<img alt='' src={arrowLeft} className='arrowLeft' onClick={decreaseCurrentFrameIndex} />
					<CurrentModeDisplay currentMode={currentMode} />
					<img alt='' src={arrowRight} className='arrowRight' onClick={increaseCurrentFrameIndex} />
				</section>
				{
					currentMode === 'draw' && <ColorPresets />
				}
				<Settings />
			</FramesContext.Provider>
		</>
	)
}

export default App;
