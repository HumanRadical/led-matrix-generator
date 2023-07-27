import { useContext, useEffect, useState } from 'react'
import { FramesContext } from '../context/FramesContext'
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration)

const CodeBox = () => {
    const {
        frames,
        setFrames,
        cols,
        rows,
        currentFrameIndex
    } = useContext(FramesContext)

    const [prompt, setPrompt] = useState('')

    const generateImage = async () => {
        try {
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            })
            const imageURL = response.data.data[0].url
            console.log(imageURL)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='grid imageUpload'>
            <div className='fileUploadContainer'>
                <h3>Enter AI prompt:</h3>
                <input type='text' onChange={e => setPrompt(e.target.value)} />
                <button onClick={generateImage}>Submit</button>
            </div>
        </div>
    )
}

export default CodeBox