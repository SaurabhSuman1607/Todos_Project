import style from "./alert.module.css";

export function Alert({ children, onClear }) {
  return (
    <div className={style.Alert}>
      {children}

      <span onClick={onClear}> X </span>
    </div>
  );
}
