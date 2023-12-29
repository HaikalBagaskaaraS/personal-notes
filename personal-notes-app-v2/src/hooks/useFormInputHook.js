import { useState } from 'react';

const useFormInput = (initialState) => {
    const [value, setValue] = useState(initialState);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange,
        reset: () => setValue(initialState),
    };
};

export default useFormInput;
