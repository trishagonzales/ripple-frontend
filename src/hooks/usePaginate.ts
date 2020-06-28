import { useState } from 'react';
import _ from 'lodash';

const usePaginate = <T>(items: T | T[], pageSize = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  let itemsCount;
  let pageCount;
  let pages;
  let paginatedItems;

  if (items instanceof Array) {
    itemsCount = items.length;
    pageCount = Math.ceil(itemsCount / pageSize);
    pages = _.range(1, pageCount + 1);

    const startIndex = (currentPage - 1) * pageSize;
    paginatedItems = _(items).slice(startIndex).take(pageSize).value();
  }

  return {
    paginatedItems,
    props: {
      pages,
      currentPage,
      setCurrentPage,
    },
  };
};

export default usePaginate;
