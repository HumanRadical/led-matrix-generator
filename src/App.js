import { useEffect, useState } from 'react'
import './App.css';
import presets from './presets.json'
import arrowLeft from './images/arrow-left.svg'
import arrowRight from './images/arrow-right.svg'
import plusIcon from './images/plus.svg'
import xButton from './images/x-button.svg'
import { FramesContext } from './context/FramesContext'
import Settings from './components/Settings'
import ColorPresets from './components/ColorPresets'
import CurrentModeDisplay from './components/CurrentModeDisplay';
import SubmitAndOutput from './components/SubmitAndOutput';
import FramePreview from './components/FramePreview';

const App = () => {
	const [frames, setFrames] = useState([presets.digdug1, presets.digdug2, presets.qbert1, presets.qbert2])
	const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
	const [currentMode, setCurrentMode] = useState('draw')
	const [mouseDown, setMouseDown] = useState(false)
	const [currentDrawColor, setCurrentDrawColor] = useState('#ff0000')
	const [customColor, setCustomColor] = useState('#000000')
	const [cols, setCols] = useState(16)
	const [rows, setRows] = useState(16)
	const [snaked, setSnaked] = useState(true)
	const [interval, setInterval] = useState(500)

	const emptyFrame = '0x000000' + ',0x000000'.repeat(rows * cols - 1)

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
	
	const convertColorStringToArray = (colorString, snaked) => {
		const colorArray = colorString
			.replaceAll(' ', '')
			.replaceAll('0x', '#')
			.split(',')
		
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

	const deleteCurrentFrame = () => {
		if (frames.length > 1) {
			setFrames(prevFrames => {
				const newFrames = [...prevFrames]
				newFrames.splice(currentFrameIndex, 1)
				return newFrames
			})
			if (currentFrameIndex === frames.length - 1) {
				setCurrentFrameIndex(prevFrameIndex => prevFrameIndex - 1)
			}
			return
		}
		setFrames([emptyFrame])
	}

	const setDrawMode = event => {
		event.preventDefault()
		setCurrentMode('draw')
	}
	const setCodeMode = event => {
		event.preventDefault()
		setCurrentMode('code')
	}
	const setImageMode = event => {
		event.preventDefault()
		setCurrentMode('image')
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

	const addNewFrameRight = () => {
		setFrames(prevFrames => {
			const newFrames = [...prevFrames]
			newFrames.splice(currentFrameIndex + 1, 0, emptyFrame)
			return newFrames
		})
		setCurrentFrameIndex(prevFrameIndex => prevFrameIndex + 1)
	}
	const addNewFrameLeft = () => {
		setFrames(prevFrames => {
			const newFrames = [...prevFrames]
			newFrames.splice(currentFrameIndex, 0, emptyFrame)
			return newFrames
		})
	}
	
	return (
		<>
			<h1 className='title'>LED Matrix Generator</h1>
			<h2 className='frameTitle'>
				<img className='xButton' src={xButton} onClick={deleteCurrentFrame} alt='Delete Current Frame' />
				<span>Frame {currentFrameIndex + 1}</span>
			</h2>
			<form className='modeButtons'>
				<button onClick={setDrawMode}>Draw</button>
				<button onClick={setCodeMode}>Code</button>
				<button onClick={setImageMode}>Image</button>
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
					interval,
					setInterval,
					currentDrawColor,
					setCurrentDrawColor,
					customColor,
					setCustomColor,
				}}
			>
				<section className='gridArea'>
					{
						frames[currentFrameIndex - 1] 
						? <FramePreview type='last' />
						: <div className='framePreviewArea'></div>
					}
					<div className='arrowContainer'>
						<img alt='New Frame' src={plusIcon} className='newFrameButton' onClick={addNewFrameLeft} />
						{
							frames[currentFrameIndex - 1] 
							&& <img alt='Previous Frame' src={arrowLeft} className='arrowButton' onClick={decreaseCurrentFrameIndex} />
						}
					</div>
					<CurrentModeDisplay currentMode={currentMode} />
					<div className='arrowContainer'>
						<img alt='New Frame' src={plusIcon} className='newFrameButton' onClick={addNewFrameRight} />
						{
							frames[currentFrameIndex + 1] 
							&& <img alt='Next Frame' src={arrowRight} className='arrowButton' onClick={increaseCurrentFrameIndex} />
						}
					</div>
					{
						frames[currentFrameIndex + 1] 
						? <FramePreview type='next' />
						: <div className='framePreviewArea'></div>
					}
				</section>
				{
					currentMode === 'draw' && <ColorPresets />
				}
				<Settings />
				<SubmitAndOutput />
			</FramesContext.Provider>
		</>
	)
}

export default App;
