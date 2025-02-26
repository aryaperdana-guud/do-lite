import { TextField } from "@mui/material";

const CustomTextField = ({ name, value, onChange, ...props }) => {
  return (
    <TextField
      name={name}
      fullWidth
      margin="normal"
      variant="filled"
      value={value}
      onChange={onChange}
      className="LoginField"
      {...props}
    />
  );
};

export default CustomTextField;
