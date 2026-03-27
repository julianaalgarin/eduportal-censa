function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;