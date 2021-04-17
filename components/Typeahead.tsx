import classNames from "classnames";
import Downshift from "downshift";
import React, { useEffect, forwardRef, useRef, RefObject } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import css from "styled-jsx/css";
import stringToColor from "string-to-color";

const InputStyles = css.resolve`
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 300;
  background: transparent;

  &:focus,
  &:active {
    outline: none;
  }
`;

interface Item {
  id: number | string;
  color: string;
}

interface Props<T extends Item> extends UseFormRegisterReturn {
  elements: T[];
  itemToString: (item?: T) => string | undefined;
  getItemValue: (item?: T) => string | undefined;
  getDefaultValue: (items: T[]) => T;
  makeNewItem: (value: string, color: string) => T;
}

export function Typeahead<T extends Item>(
  props: Props<T>,
  ref: RefObject<HTMLInputElement>
) {
  const dsRef = useRef<Downshift<T>>();

  useEffect(() => {
    if (dsRef.current != null) {
      const defaultItem = props.getDefaultValue(props.elements);

      // @ts-ignore - some weird stuff here with Downshift + TS 🤷🏻‍♂️
      if (dsRef.current.state.selectedItem == null && defaultItem != null) {
        // @ts-ignore - same here
        dsRef.current.selectItem(defaultItem);
        props.onChange({
          target: {
            name: props.name,
            value: props.getItemValue(defaultItem),
          },
        });
      }
    }
  }, [props.elements, props.getDefaultValue]);

  return (
    <>
      <Downshift<T>
        ref={dsRef}
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
          <div className="typeahead-container">
            <div
              className="search-container"
              // @ts-ignore
              {...getRootProps({}, { suppressRefError: true })}
            >
              <div
                className="item-dot"
                style={{
                  backgroundColor:
                    selectedItem?.color ?? stringToColor(inputValue),
                }}
              />
              <input
                {...getInputProps({ ref })}
                className={InputStyles.className}
              />
            </div>
            <ul {...getMenuProps()} className="search-results">
              {isOpen
                ? [
                    ...props.elements.filter(
                      (item) =>
                        !inputValue ||
                        props.itemToString(item).includes(inputValue)
                    ),
                    props.makeNewItem(inputValue, stringToColor(inputValue)),
                  ]
                    .filter(Boolean)
                    .map((item, index) => (
                      <li
                        className={classNames("search-item", {
                          selected: selectedItem === item,
                          highlight: highlightedIndex === index,
                        })}
                        {...getItemProps({
                          key: props.getItemValue(item),
                          index,
                          item,
                        })}
                      >
                        <div
                          className="item-dot"
                          style={{
                            backgroundColor: item.color,
                            marginRight: "0.5rem",
                          }}
                        />{" "}
                        {item?.id.toString().includes("new:")
                          ? `Create cateogry: "${props.itemToString(item)}"`
                          : props.itemToString(item)}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
      <style jsx>{`
        .typeahead-container {
          position: relative;
        }

        .item-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .search-results {
          position: absolute;
          top: 5rem;
          overflow: hidden;
          border-radius: 0.25rem;
          width: 100%;
        }

        .search-item {
          height: 3rem;
          font-weight: 300;
          background: var(--white);
          width: 100%;
        }

        .search-item.highlight {
          opacity: 0.8;
        }

        .search-container,
        .search-item {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
        }
      `}</style>
      {InputStyles.styles}
    </>
  );
}

export default forwardRef(Typeahead) as typeof Typeahead;
