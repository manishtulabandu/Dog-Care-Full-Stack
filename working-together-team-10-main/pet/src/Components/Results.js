import React from "react";

function Results({ results = [], reset }) {
    const handleReset = () => {
        reset();
        window.location.href = "/detection";
    };

    return (
        <div>
            {results && results.length > 0 ? (
                <ul className="detect-list">
                    {results.map(({ className, probability }) => (
                        <li key={className}>{`${className}: %${(probability * 100).toFixed(2)}`}</li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
            <button className="detect-button" onClick={handleReset}>
                Reset
            </button>
        </div>
    );
}

export default Results;
