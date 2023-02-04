import React from "react";
export function LabeledInputElement({
    labelText, placeHolder, value, onChange
})
{
    return <div className="glass-input-wrapper">
        <input type="text" 
            placeholder={placeHolder} 
            value={value}
            onChange={onChange}/>
        <label>{labelText}</label>
    </div>
}