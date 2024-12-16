export const NeoBox = ({ children, addClass, addClassItem }) => {
    return (
        <div className={`neo-box ${addClass ?? ''}`} >
            <div className={`neo-box-item ${addClassItem ?? ''}`} >
                {children}
            </div>
        </div>
    )
}