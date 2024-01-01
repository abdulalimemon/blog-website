import React, { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className=" relative mb-4 w-[100%]">
      <input
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type == "password" ? (
        <i
          className={`fi ${passwordVisible ? 'fi-rs-eye' : "fi-rr-eye-crossed"}  input-icon left-[auto] right-4 cursor-pointer`}
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
