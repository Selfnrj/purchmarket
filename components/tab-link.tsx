import { Tab } from "@headlessui/react";
import { Fragment } from "react";

export default function TabLink({ tablinks }) {
  return (
    <Tab.List>
      {tablinks.map((item, index) => (
        <Tab key={index} as={Fragment}>
          {({ selected }) => (
            <button
              className={`p-4 font-semibold uppercase outline-0 ${
                selected ? "border-b-4 border-b-gray-900" : ""
              }`}
            >
              {item}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
}
