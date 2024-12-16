export const NeoBox = ({children, addClass}) => {
    return(
        <div className={`neo-box ${addClass ?? ''}`}>
            <div className="neo-box-item">
                {children}
            </div>
        </div>
    )
}