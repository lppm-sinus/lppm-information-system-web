import React from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export const Pagination = (props) => {
  const handleLinks = (label) => {
    if (label == "&laquo; Previous") {
      return (
        <span className="flex justify-between items-center gap-1">
          <FaAnglesLeft />
          <p>prev</p>
        </span>
      );
    } else if (label == "Next &raquo;") {
      return (
        <span className="flex justify-between items-center gap-1">
          <p>next</p>
          <FaAnglesRight />
        </span>
      );
    } else {
      return label;
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex justify-center">
        {props.data.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (!item.url) return;

              try {
                const url = new URL(item.url);
                const pathWithQuery = url.pathname + url.search;
                props.onClick(pathWithQuery);
              } catch {
                // If URL is already in the correct format (path only), use it directly
                props.onClick(item.url);
              }
            }}
            className={`${
              !item.url ? "cursor-not-allowed" : "cursor-pointer"
            } ${item.active ? "bg-gray-400" : "bg-white"}`}
          >
            <a className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
              {handleLinks(item.label)}
            </a>
          </li>
        ))}
      </ul>{" "}
    </nav>
  );
};
