import styles from "./TabButton.module.css";

export default function TabButton(props) {
  return (
    <div
      className={`${styles.tabButton} ${
        props.isSelected ? styles.selected : styles.unselected
      }`}
      onClick={props.onSelect}
    >
      {props.children}
    </div>
  );
}
