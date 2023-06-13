const CodeBox = ({currentFrame}) => {
    return (
        <>
            <textarea className="codeBox" value={currentFrame} />
        </>
    )
}

export default CodeBox