import type { MouseEventHandler } from "react";
import Button from "../button/Button";
import styles from "./FormControls.module.css";

interface FormControlsProps {
  onClear: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean | undefined;
}

export default function FormControls({ onClear, disabled }: FormControlsProps) {
  return (
    <div className={styles.container}>
      <Button onClick={onClear} disabled={disabled}>
        Clear
      </Button>
      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </div>
  );
}
