function InputWithLabel({ label, type, className, value, onChange, required }) {
  return (
    <div className={`grid grid-cols-2 ${className} w-64 sm:w-80 md:w-full`}>
      <label htmlFor="username" className="self-start md:text-xl">
        {label}
      </label>
      <input
        required={required}
        onChange={onChange}
        ref={value}
        id={label}
        type={type}
        className="px-1 font-light rounded text-slate-800 border border-slate-300 bg-slate-200 outline-blue-400 sm:w-36 md:w-48"
      ></input>
    </div>
  );
}

export default InputWithLabel;
