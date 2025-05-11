import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Checkbox, FormControlLabel, RadioGroup, Radio
} from "@mui/material";

const DynamicDialog = ({ isOpen, onClose, fields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }), {}));
    }
  }, [isOpen, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleClose = () => {
    setFormData({}); 
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const renderInput = (field) => {
    switch (field.type) {
      case "select":
        return (
          <FormControl fullWidth key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select name={field.name} value={formData[field.name] || ""} onChange={handleChange}>
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={<Checkbox name={field.name} checked={formData[field.name] || false} onChange={handleChange} />}
            label={field.label}
          />
        );

      case "radio":
        return (
          <FormControl key={field.name} component="fieldset">
            <RadioGroup name={field.name} value={formData[field.name] || ""} onChange={handleChange}>
              {field.options.map((option) => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "textarea":
        return (
          <TextField
            key={field.name}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
          />
        );

      default:
        return (
          <TextField
            key={field.name}
            fullWidth
            variant="outlined"
            margin="dense"
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Dynamic Form</DialogTitle>
      <DialogContent dividers>
        {fields.map(renderInput)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicDialog;
