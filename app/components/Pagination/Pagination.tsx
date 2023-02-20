import React from "react";
import RCPagination from "rc-pagination";
import usePage from "~/hooks/usePage";
import Button from "../Button";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { pageSize as constPageSize } from "~/refs/constant";

type Props = {
  total: number;
  pageSize?: number;
};

export const Pagination: React.FC<Props> = ({ total, pageSize }) => {
  const [currentPage, setPage] = usePage();

  if (total <= pageSize!) return null;

  return (
    <>
      <div className="flex justify-center py-2">
        <RCPagination
          className="flex gap-1"
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={setPage}
          hideOnSinglePage
          itemRender={(page, type, element) => {
            if (type === "page") {
              return (
                <Button
                  sm
                  variant={page === currentPage ? "primary" : undefined}
                >
                  {page}
                </Button>
              );
            }
            if (type === "prev") {
              return (
                <Button sm>
                  <FaChevronCircleLeft />
                </Button>
              );
            }
            if (type === "next") {
              return (
                <Button sm>
                  <FaChevronCircleRight />
                </Button>
              );
            }
            return element;
          }}
        />
      </div>
    </>
  );
};

Pagination.defaultProps = {
  pageSize: constPageSize,
};

export default Pagination;
