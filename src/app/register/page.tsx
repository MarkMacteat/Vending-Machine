"use client";
import { FC, useState } from "react";
import axios from "axios";

export default function Register() {
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPin, setRegisterPin] = useState("");

  const newUser = {
    phone: registerPhone,
    pin: registerPin,
  };

  const submit = async () => {
    if (registerPhone !== "" && registerPin !== "") {
      const response = await axios.post(
        "http://localhost:3000/api/user_register",
        JSON.stringify(newUser),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else if (registerPhone.length !== 10) {
      alert("Phone number is not correct");
    } else if (registerPin.length !== 6) {
      alert("Your pin is not correct");
    } else {
      alert("nothing");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        name="phone number"
        placeholder="phone number"
        onChange={(e) => setRegisterPhone(e.target.value)}
      ></input>
      <input
        type="password"
        name="pin"
        placeholder="pin"
        onChange={(e) => setRegisterPin(e.target.value)}
      ></input>
      <button onClick={submit}>Register</button>
      <button
        onClick={() => console.log("resgister" + registerPhone + registerPin)}
      >
        Register2
      </button>
    </div>
  );
}
