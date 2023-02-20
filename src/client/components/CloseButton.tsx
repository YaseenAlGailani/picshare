interface Props {
  clicked: () => void;
  className?: string;
  color?:string;
}

export default function CloseButton({ clicked, className, color='white' }: Props) {
  return (
    <button
      className={`w-5 h-5 flex items-center justify-center rounded-full p-0.5 ${className}`}
      onClick={clicked}
    >
      <span className="sr-only">Close</span>
      <span aria-hidden={true}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.92473 5.99919L11.6122 0.411694C11.6908 0.318836 11.6247 0.177765 11.5033 0.177765H10.0783C9.99438 0.177765 9.91402 0.215265 9.85866 0.279551L5.99259 4.88848L2.12652 0.279551C2.07295 0.215265 1.99259 0.177765 1.90688 0.177765H0.481875C0.360447 0.177765 0.294375 0.318836 0.372946 0.411694L5.06045 5.99919L0.372946 11.5867C0.355346 11.6074 0.344054 11.6327 0.340412 11.6596C0.33677 11.6866 0.34093 11.714 0.352399 11.7386C0.363868 11.7632 0.382164 11.784 0.405114 11.7986C0.428065 11.8131 0.454706 11.8208 0.481875 11.8206H1.90688C1.9908 11.8206 2.07116 11.7831 2.12652 11.7188L5.99259 7.10991L9.85866 11.7188C9.91223 11.7831 9.99259 11.8206 10.0783 11.8206H11.5033C11.6247 11.8206 11.6908 11.6796 11.6122 11.5867L6.92473 5.99919Z" />
        </svg>
      </span>
    </button>
  );
}
