import { Link, NavLink, useFetcher } from "@remix-run/react";
import classNames from "classnames";
import React from "react";
import RoleEnum from "~/enums/RoleEnum";
import useAuthorize from "~/hooks/roles/useAuthorize";
import useRoles from "~/hooks/roles/useRoles";
import Button from "../Button";

type Props = {};

const getClasses = ({ isActive }: { isActive: booleanve }) => {
  return classNames({ "bg-primary text-primary-content": isActive });
};

export const Drawer: React.FC<Props> = ({}) => {
  const { hasRole } = useAuthorize();
  const fetcher = useFetcher();

  return (
    <>
      <div
        className="flex h-full w-96 bg-base-200"
        style={{ minHeight: "calc(100vh - 4.5rem)" }}
      >
        <div className="flex flex-col justify-between w-full">
          <ul className="menu w-full p-4">
            <li>
              <NavLink className={getClasses} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={getClasses} to="/subscriptions">
                Subscriptions
              </NavLink>
            </li>
            <li>
              <NavLink className={getClasses} to="/accounts">
                Accounts
              </NavLink>
            </li>
            {hasRole(RoleEnum.admin) && (
              <li>
                <NavLink className={getClasses} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          <div className="p-4">
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => {
                fetcher.submit(
                  {},
                  {
                    action: "/logout",
                    method: "post",
                  }
                );
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Drawer.defaultProps = {};

export default Drawer;
