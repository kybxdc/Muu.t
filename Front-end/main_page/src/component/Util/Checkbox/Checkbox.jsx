import classes from './Checkbox.module.css'

export default function Checkbox({labelText, id, isChecked, setIsChecked}) {

  return (
    <div className={classes.control_container}>
      <input type="checkbox" id={id} className={classes.screen_reader} checked={isChecked} onChange={(e)=>{
        setIsChecked(e.target.checked);
      }}/>
      <div className={classes.label_box}>
        <span className={classes.check_icon} aria-hidden="true"></span>
        <label htmlFor={id}>{labelText}</label>
      </div>
    </div>
  );
}
