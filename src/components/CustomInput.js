const CustomInput = ({ setState, value, type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        setState(event.target.value);
      }}
      value={value}
    />
  );
};
export default CustomInput;
