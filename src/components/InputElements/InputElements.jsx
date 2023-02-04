import React from "react";
export function LabeledInputElement({
    labelText, placeHolder, value, onChange
})
{
    return <>
        <input type="text" className="glass-input" 
            placeholder={placeHolder} 
            value={value}
            onChange={onChange}/>
        <span className="glass-text-label">{labelText}</span>
    </>
}