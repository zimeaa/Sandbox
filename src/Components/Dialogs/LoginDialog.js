import React, { useState } from "react";
import DynamicDialog from "./DynamicDialog";
import { Button } from "@mui/material";

const LoginDialog = () => {
  const [open, setOpen] = useState(false);

  const fields = [
    { name: "username", label: "Username", placeholder: "Enter username" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
    { name: "gender", label: "Gender", type: "radio", options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ]},
    { name: "subscribe", label: "Subscribe to newsletter", type: "checkbox" },
    { name: "age", label: "Age", type: "number", placeholder: "Enter your age" },
    { name: "country", label: "Country", type: "select", options: [
      { label: "USA", value: "usa" },
      { label: "Canada", value: "canada" },
      { label: "UK", value: "uk" }
    ]},
    { name: "bio", label: "Short Bio", type: "textarea", placeholder: "Write something about yourself" }
  ];

  const handleSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>Open Form</Button>
      <DynamicDialog isOpen={open} onClose={() => setOpen(false)} fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginDialog;
