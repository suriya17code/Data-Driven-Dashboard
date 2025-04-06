import React, { useState } from "react";

export default function Extra() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⛔ Prevents page reload
    console.log("Form submitted with value:", value);
    // dispatch(TaskUpdate(...)) if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type and press Enter"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
