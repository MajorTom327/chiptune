import { DateTime } from "luxon";
import React from "react";

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const date = DateTime.local().toFormat("yyyy");

  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content justify-center flex-none border-t border-base-300">
        <div className="footer-title">Bellz &copy; {date}</div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
