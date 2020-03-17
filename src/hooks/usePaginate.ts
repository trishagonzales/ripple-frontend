import { useState } from 'react';
import _ from 'lodash';

const usePaginate = <T>(items: T[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsCount = items.length;
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems: T[] = _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  return {
    pages,
    paginatedItems,
    currentPage,
    setCurrentPage
  };
};

export default usePaginate;
