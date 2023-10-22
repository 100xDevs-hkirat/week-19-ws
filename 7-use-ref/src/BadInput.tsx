import React, {useRef} from "react";

export const BadInput = () => {
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        document.getElementById("input").focus();
    };

    return (
        <div>
            <input id={"input"} type="text" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
}