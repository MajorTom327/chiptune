import React, { RefAttributes, useEffect, useRef } from "react";
import classNames from "classnames";
import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { useHasSubmit } from "~/hooks/useHasSubmit";

type Props = {
  children: React.ReactNode;
  className?: string;
  action?: string;
  method?: "post" | "get";
  fetcher: FetcherWithComponents<any>;
  resetOnSubmit?: boolean;
};

export const BaseForm: React.FC<Props> = ({
  children,
  className,
  method,
  action,
  fetcher,
  resetOnSubmit,
}) => {
  const classes = classNames("flex flex-col gap-2", className);
  const ref = useRef<any>();
  const hasSubmitted = useHasSubmit(fetcher);

  useEffect(() => {
    if (hasSubmitted && resetOnSubmit) {
      ref.current?.reset();
    }
  }, [hasSubmitted, resetOnSubmit]);

  return (
    <>
      <fetcher.Form
        ref={ref}
        method={method}
        action={action}
        className={classes}
      >
        {children}
      </fetcher.Form>
    </>
  );
};

BaseForm.defaultProps = {
  method: "post",
};

export default BaseForm;
