const CodeBox = ({currentFrame}) => {
    return (
        <div className="codeBoxContainer">
            <textarea className="codeBox" value={currentFrame} />
        </div>
    )
}

export default CodeBox