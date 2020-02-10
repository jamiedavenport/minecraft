import React, { useState } from "react";

type Props = {
  onSubmit: (key: string) => void;
};

const KeyForm: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();

    if (v !== "") {
      onSubmit(value);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>API Key</label>
      <input type="password" value={value} onChange={handleChange} />
      <button type="submit">Go</button>
    </form>
  );
};

export default KeyForm;
