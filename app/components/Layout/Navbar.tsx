import { Link, useFetcher } from "@remix-run/react";
import { isNotNil, isNotNilOrEmpty } from "ramda-adjunct";
import React from "react";
import { RoleEnum } from "~/enums/RoleEnum";
import useAuthorize from "~/hooks/roles/useAuthorize";
import { useOptionalUser } from "~/hooks/user/useOptionalUser";
import Button from "../Button";

type Props = {};

export const Navbar: React.FC<Props> = ({}) => {
  const user = useOptionalUser();
  const fetcher = useFetcher();
  const { hasRole } = useAuthorize();

  return (
    <>
      <div className="navbar bg-base-200 border-b border-base-300">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Bellz
          </Link>
        </div>
        {isNotNilOrEmpty(user) && (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <button
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
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
