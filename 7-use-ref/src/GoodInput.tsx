import React, {useRef} from "react";

export const GoodInput = () => {
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        inputRef.current.focus();
        console.log(inputRef.current);
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
}