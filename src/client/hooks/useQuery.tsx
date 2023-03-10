import { useState, useEffect } from "react";

export function useQuery(query: string, initialState = false) {
  const [state, setState] = useState(initialState);

  if(!window.matchMedia){
    return initialState;
  }

  useEffect(() => {
    let mounted = true;

    const changeHandler = () => {
      if (!mounted) return;

      setState(mql.matches);
    };

    const mql = window.matchMedia(query);
    mql.addEventListener("change", changeHandler);
    setState(mql.matches);

    return () => {
      mql.removeEventListener("change", changeHandler);
      mounted = false;
    };
  }, [query]);

  return state;
}
