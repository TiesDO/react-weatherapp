import React, { useState, useEffect } from "react";

export function useDebounce(value, debounceMs) {
    const [dbValue, setDbValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDbValue(value);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [value, debounceMs]);

    return dbValue;
}
