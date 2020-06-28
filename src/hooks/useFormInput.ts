import { useState } from 'react';

const useFormInput = () => {
  const [value, setValue] = useState('');

  return {
    value,
    setValue,
    props: { value, onChange: (e: any) => setValue(e.target.value) },
  };
};

export default useFormInput;
