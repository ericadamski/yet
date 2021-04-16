// taken from https://usehooks.com/useOnClickOutside/#:~:text=useHooks(%F0%9F%90%A0)&text=Hooks%20are%20a%20new%20addition,them%20in%20your%20next%20project.
import { RefObject, useEffect } from "react";

export default function useOnClickOutside<T extends Node>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
