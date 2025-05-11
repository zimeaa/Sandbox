import React, { useState } from "react";
import DynamicDialog from "./DynamicDialog";
import { Button } from "@mui/material";

const UserDialog = () => {
  const [open, setOpen] = useState(false);

  const fields = [
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" }
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

export default UserDialog;
