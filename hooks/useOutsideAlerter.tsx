import {
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";

type RefType<T> = RefObject<T> | MutableRefObject<T>;

const useOutsideAlerter = <T extends HTMLElement>(
  ref: RefType<T>,
  setX: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    //  Alert if clicked on outside of element
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setX(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
};

export default useOutsideAlerter;
