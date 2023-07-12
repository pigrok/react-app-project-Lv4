import React, { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const handler = (value) => setValue(value);

  const reset = () => setValue("");

  return [value, handler, reset];
};

export default useInput;
