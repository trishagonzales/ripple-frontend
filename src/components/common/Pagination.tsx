import React from 'react';
import styled from 'styled-components';

export interface PaginationProps {
  pages?: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ pages, currentPage, setCurrentPage }) => {
  if (pages && pages.length < 2) return null;

  return (
    <Pages>
      {pages?.map(page => (
        <p
          key={page}
          className={currentPage === page ? 'active page-item' : 'page-item'}
          onClick={() => setCurrentPage(page)}>
          {page}
        </p>
      ))}
    </Pages>
  );
};

export default Pagination;

const Pages = styled.ul`
  margin: auto;
  margin-top: 4rem;
  text-align: center;

  .page-item {
    width: 30px;
    height: 30px;
    margin: 0.3em;
    padding: 0.6em;
    display: inline-block;
    text-align: center;
    line-height: 12px;
    border: 1px solid white;
    border-radius: 50%;
    font-size: 14px;
    color: var(--fg);
    cursor: pointer;
    :not(.active):hover {
      border-color: grey;
    }
  }

  .active {
    color: white;
    background: var(--main);
  }
`;
