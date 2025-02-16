"use client";

import { useState } from "react";

export default function Register() {
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPin, setLoginPin] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        name="phone number"
        placeholder="phone number"
        onChange={(e) => setLoginPhone(e.target.value)}
      ></input>
      <input
        type="password"
        name="pin"
        placeholder="pin"
        onChange={(e) => setLoginPin(e.target.value)}
      ></input>
      <button>Login</button>
    </div>
  );
}
