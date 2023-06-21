import { useContext, useRef, useState } from 'react'
import { FramesContext } from '../context/FramesContext'
import errorIcon from '../images/error.svg'

const SubmitAndOutput = () => {
    const {
        frames,
        rows,
        cols,
        convertColorStringToArray,
        snaked,
        interval,
    } = useContext(FramesContext)

    const [arduinoCode, setArduinoCode] = useState('')
    const [clipboardMessage, setClipboardMessage] = useState(false)
    const [grid, setGrid] = useState([])

    const currentFrames = useRef()
    const currentCols = useRef()
    const currentRows = useRef()

    const handleSubmit = () => {
        startAnimation()
        updateArduinoCode()
    }
    
    const updatePixelColors = () => {
        return grid.map((pixel, pixelIndex) => {
            if (CSS.supports('color', pixel)) {
                return <div
                    style={{ width: 450 / currentCols.current, height: 450 / currentRows.current, backgroundColor: pixel}} 
                    key={`Animation Preview Pixel ${pixelIndex}`}
                ></div>
            }
            return <img 
                src={errorIcon}
                style={{ width: 450 / currentCols.current, height: 450 / currentRows.current}} 
                alt='Invalid Pixel'
                key={`Animation Preview Pixel ${pixelIndex}`}
            />
        })
    }
    
    let pixels = updatePixelColors()
    const animationInterval = useRef()

    const startAnimation = () => {
        clearInterval(animationInterval.current)
        animationInterval.current = null

        let frameIndex = 0
        currentFrames.current = [...frames]
        currentCols.current = cols
        currentRows.current = rows

        setGrid(convertColorStringToArray(currentFrames.current[frameIndex], snaked))
        pixels = updatePixelColors()
        
        if (currentFrames.current.length > 1) {
            frameIndex++
            animationInterval.current = setInterval(() => {
                setGrid(convertColorStringToArray(currentFrames.current[frameIndex], snaked))
                pixels = updatePixelColors()
                currentFrames.current[frameIndex + 1] ? frameIndex++ : frameIndex = 0
            }, interval)
        }
    }

    const updateArduinoCode = () => {
        const setupDisplay = () => {
            let setupString = ''
            frames.forEach((frame, frameIndex) => {
             setupString += 
`const long Frame${frameIndex + 1}[] PROGMEM = 
{ 
${frame} 
};\n`
            })
            return setupString
        }
    
        const showDisplay = () => {
            let showString = ''
            frames.forEach((frame, frameIndex) => {
                showString += 
`    FastLED.clear();

    for(int i = 0; i < NUM_LEDS; i++) {
        leds[i] = pgm_read_dword(&(Frame${frameIndex + 1}[NUM_LEDS - i - 1]));
    } 
    FastLED.show();
    ${(interval ? `delay(${interval});\n` : '')}`
            })
            return showString
        }
    
        const arduinoCodeOutput = 
`#include <avr/pgmspace.h>
#include 'FastLED.h'  
    
#define NUM_LEDS ${rows * cols}
#define DATA_PIN 7 
CRGB leds[NUM_LEDS];
    
${setupDisplay()}
void setup() { 
    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
}
    
void loop() { 
${showDisplay()}
}`

        setArduinoCode(arduinoCodeOutput)
        navigator.clipboard.writeText(arduinoCodeOutput)
        setClipboardMessage(true)
        window.scrollTo(0, document.body.scrollHeight)
    }

    return (
        <>
            <button className='submit' onClick={handleSubmit}>SUBMIT</button>
            <section className='outputSection'>
                <section>
                    <h3 className='animationPreviewTitle'>Preview</h3>
                    <div className='grid animationPreview'>
                        {pixels}
                    </div>
                </section>
                <div>
                    <p className='clipboardMessage'>{clipboardMessage && 'Copied to clipboard.'}</p>
                    <textarea className='arduinoCodeBox' value={arduinoCode} readOnly />
                </div>
            </section>
        </>
    )
}

export default SubmitAndOutput