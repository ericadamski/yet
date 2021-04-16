import Downshift from "downshift";
import React, { useEffect, forwardRef, useRef, RefObject } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props<T> extends UseFormRegisterReturn {
  elements: T[];
  itemToString: (item?: T) => string | undefined;
  getItemValue: (item?: T) => string | undefined;
  getDefaultValue: (items: T[]) => T;
}

export function Typeahead<T>(
  props: Props<T>,
  ref: RefObject<HTMLInputElement>
) {
  const dsRef = useRef<Downshift<T>>();

  useEffect(() => {
    if (dsRef.current != null) {
      const defaultItem = props.getDefaultValue(props.elements);

      // @ts-ignore - some weird stuff here with Downshift 🤷🏻‍♂️
      if (dsRef.current.state.selectedItem == null && defaultItem != null) {
        // @ts-ignore - same here
        dsRef.current.selectItem(defaultItem);
      }
    }
  }, [props.elements, props.getDefaultValue]);

  return (
    <Downshift<T>
      ref={dsRef}
      initialSelectedItem={props.getDefaultValue(props.elements)}
      onChange={(selectedItem) => {
        props.onChange({
          target: {
            name: props.name,
            value: props.getItemValue(selectedItem),
          },
        });
      }}
      itemToString={props.itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <div
            style={{ display: "inline-block" }}
            // @ts-ignore
            {...getRootProps({}, { suppressRefError: true })}
          >
            <input {...getInputProps({ ref })} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? props.elements
                  .filter(
                    (item) =>
                      !inputValue ||
                      props.itemToString(item).includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: props.getItemValue(item),
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      {props.itemToString(item)}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default forwardRef(Typeahead) as typeof Typeahead;
