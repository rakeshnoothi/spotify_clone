const Fallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center ">
            <span>{error}</span>
            <button onClick={resetErrorBoundary}>Reload</button>
        </div>
    );
};

export default Fallback;
