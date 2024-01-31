import "./index.css";

const TAB_KEY_CODE = 9;
const CLASS_NAME = "focus-disabled";

/**
 * A nifty little class that maintains event handlers to add a class
 * to the container element when entering "mouse mode" (on a `mousedown` event)
 * and remove it when entering "keyboard mode" (on a `tab` key `keydown` event)
 */
export function disableOutlinesForClick() {
  const container = document.documentElement;
  container.addEventListener("mousedown", handleMouseDown);

  return reset;

  function handleMouseDown() {
    reset();
    container.classList.add(CLASS_NAME);
    container.addEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(evt: KeyboardEvent) {
    if (evt.which === TAB_KEY_CODE) {
      reset();
      container.addEventListener("mousedown", handleMouseDown);
    }
  }

  function reset() {
    container.classList.remove(CLASS_NAME);
    container.removeEventListener("keydown", handleKeyDown);
    container.removeEventListener("mousedown", handleMouseDown);
  }
}
