const CodeBox = ({currentFrame}) => {
    return (
        <div className="codeBoxContainer">
            <textarea className="codeBox">
                {currentFrame}
            </textarea>
        </div>
    )
}

export default CodeBox