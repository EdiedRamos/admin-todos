"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4, 5],
}: Props) => {
  const [selected, setSelected] = useState<number>(() => {
    if (currentTab < 1 || currentTab > tabOptions.length) return 1;
    return currentTab;
  });

  const handleTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={`${tab}`}
            checked={selected === tab}
            onChange={() => {}}
            className="peer hidden"
          />
          <label
            onClick={() => handleTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-gray-300 transition-all"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
