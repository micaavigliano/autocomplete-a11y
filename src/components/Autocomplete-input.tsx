import { useCallback, useEffect, useRef, useState } from "react";

interface AutocompleteProps<T> {
  options: T[];
  labelKey: string;
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
    (e: Event) => {
      if (
        inputRef &&
        optionRef.current?.children &&
        e instanceof KeyboardEvent
      ) {
        const keyboardEvent = e;
        if (
          keyboardEvent.key === "ArrowDown" &&
          (keyboardEvent.metaKey || keyboardEvent.ctrlKey)
        ) {
          setActiveIndex(list.length);
        } else if (
          keyboardEvent.key === "ArrowUp" &&
          (keyboardEvent.metaKey || keyboardEvent.ctrlKey)
        ) {
          setActiveIndex(1);
        } else if (keyboardEvent.key === "ArrowDown") {
          setActiveIndex((prev) => {
            if (prev < list.length) {
              return prev + 1;
            } else {
              return 1;
            }
          });
        } else if (keyboardEvent.key === "ArrowUp") {
          setActiveIndex((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              return list.length;
            }
          });
        } else if (
          keyboardEvent.key === "Escape" ||
          keyboardEvent.key === "Enter"
        ) {
          setList([]);
        }
      }
    },
    [list]
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
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleFocus);

    return () => {
      document.removeEventListener("keydown", handleFocus);
    };
  }, [handleFocus]);

  useEffect(() => {
    if (optionRef.current?.children) {
      const currentIdx = activeIndex;
      const childElement = optionRef.current?.children[currentIdx - 1];
      if (childElement instanceof HTMLElement) {
        const textContent = childElement.textContent;
        if (textContent !== null) {
          setInputValue(textContent);
          const container = optionRef.current;
          const itemHeight = childElement.offsetHeight;
          const scrollTop = container.scrollTop;
          const offsetTop = childElement.offsetTop;
          const containerHeight = container.clientHeight;

          if (offsetTop < scrollTop) {
            container.scrollTop = offsetTop;
          } else if (offsetTop + itemHeight > scrollTop + containerHeight) {
            container.scrollTop = offsetTop + itemHeight - containerHeight;
          }
        }
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        aria-controls="autocomplete-input"
        aria-expanded={list.length > 0 ? true : false}
      />
      <ul
        role="listbox"
        className={`absolute w-full h-64 overflow-auto outline border-blue-500 ${list.length === 0 ? 'hidden' : ''}`}
        ref={optionRef}
      >
        {list.length > 0 &&
          list.map((item, index) => (
            <li
              key={index}
              role="option"
              tabIndex={index + 1 === activeIndex ? 0 : -1}
              onClick={() => handleListItemClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleKeyDown(e, index);
                }
              }}
              className={`${
                index + 1 === activeIndex
                  ? "bg-blue-500 text-white outline outline-2"
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
