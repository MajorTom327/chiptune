import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import { propOr } from "ramda";
import React from "react";

export type TabType = {
  label: string;
  to: string;
  end?: boolean;
};

type Props = {
  tabs: TabType[];
};

export const Tabs: React.FC<Props> = ({ tabs }) => {
  return (
    <>
      <div className="tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to + tab.label}
            end={propOr(false, "end", tab)}
            to={tab.to}
            className={({ isActive }) =>
              classNames("tab tab-lg tab-bordered", { "tab-active": isActive })
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

Tabs.defaultProps = {};

export default Tabs;
