import { useContext, useState } from "react"
import { FramesContext } from "../context/FramesContext"

const ArduinoCodeBox = () => {
    const {
        frames,
        rows,
        cols,
        interval
    } = useContext(FramesContext)

    const [arduinoCode, setArduinoCode] = useState('')
    const [clipboardMessage, setClipboardMessage] = useState(false)

    const updateArduinoCode = () => {
        const setupDisplay = () => {
            let setupString = ""
            frames.forEach((frame, frameIndex) => {
             setupString += `\nconst long Frame${frameIndex + 1}[] PROGMEM = 
                { 
                    ${frame} 
                };\n`
            })
            return setupString
        }
    
        const showDisplay = () => {
            let showString = ""
            frames.forEach((frame, frameIndex) => {
                showString += `\nFastLED.clear();
                for(int i = 0; i < NUM_LEDS; i++) {
                    leds[i] = pgm_read_dword(&(Frame${frameIndex + 1}[NUM_LEDS - i - 1]));
                } 
    
                FastLED.show();
                ${(interval ? `delay(${interval});\n` : "")}`
            })
            return showString
        }
    
        const arduinoCodeOutput = 
            `#include <avr/pgmspace.h>
            #include "FastLED.h"  
    
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
            <button className='submit' onClick={updateArduinoCode}>SUBMIT</button>
            <p className='clipboardMessage'>{clipboardMessage && 'Copied to clipboard.'}</p>
            <textarea className='codeBox arduinoCodeBox' value={arduinoCode} readOnly />
        </>
    )
}

export default ArduinoCodeBox