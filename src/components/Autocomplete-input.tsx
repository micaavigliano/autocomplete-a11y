import { useCallback, useEffect, useRef, useState } from "react";

interface AutocompleteProps<T> {
  options: T[];
  labelKey: keyof T;
}

interface KeyboardEvent {
  key: string;
}

// eslint-disable-next-line
const Autocomplete = <T extends Record<string, any>>({
  options,
  labelKey,
}: AutocompleteProps<T>) => {
  const [list, setList] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLUListElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    const filter = options?.filter((elem) =>
      String(elem[labelKey]).toLowerCase().includes(inputValue)
    );

    setList(inputValue.length > 0 ? filter : []);
    setInputValue(e.target.value);
  };

  const handleFocus = useCallback(
    (e: KeyboardEvent) => {
      if (inputRef && optionRef.current?.children) {
        if (e.key === "ArrowDown") {
          setActiveIndex((prev) => {
            if (prev < list.length) {
              return prev + 1;
            } else {
              return 1;
            }
          });
          const childElement = optionRef.current?.children[activeIndex];
          if (childElement instanceof HTMLElement) {
            const textContent = childElement.textContent;
            if (textContent !== null) {
              setInputValue(textContent);
            }
          }
        } else if (e.key === "ArrowUp") {
          setActiveIndex((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              return list.length;
            }
          });
          const childElement = optionRef.current?.children[activeIndex];
          if (childElement instanceof HTMLElement) {
            const textContent = childElement.textContent;
            if (textContent !== null) {
              setInputValue(textContent);
            }
          }
        }
      }
    },
    [activeIndex, list]
  );

  const handleListItemClick = (index: number) => {
    const selectedValue = String(list[index][labelKey]);

    setInputValue(selectedValue);
    setList([]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      handleListItemClick(index);
      setList([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleFocus);

    return () => {
      document.removeEventListener("keydown", handleFocus);
    };
  }, [handleFocus]);

  return (
    <div className="relative">
      <input
        type="text"
        ref={inputRef}
        placeholder="search"
        className="box-border text-base border-solid border-2 border-indigo-600 py-3 px-3 outline-none"
        aria-autocomplete="list"
        value={inputValue!}
        onChange={handleInput}
      />
      <ul role="listbox" className="bg-red-200 absolute w-full" ref={optionRef}>
        {list.length > 0 &&
          list.map((item, index) => (
            <li
              key={index}
              role="option"
              tabIndex={index + 1 === activeIndex ? 0 : -1}
              onClick={() => handleListItemClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${
                index + 1 === activeIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              } hover:bg-gray-200 focus:outline-none p-0`}
            >
              {String(item[labelKey])}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
