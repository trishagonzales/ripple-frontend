import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

export interface PaginationProps {
  pages: number[];
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pages, currentPage }) => {
  return (
    <Pages>
      {pages.map(page => (
        <Page key={page} active={currentPage === page ? true : false}>
          {page}
        </Page>
      ))}
    </Pages>
  );
};

export default Pagination;

const Pages = styled.ul``;

interface PageProps {
  active: boolean;
}

const Page = styled.li<PageProps>`
  padding: 0.5em;
  margin: 0.5em;
  background: ${p => (p.active ? p.theme.color.main : '#eee')};

  :hover {
    background: #ddd;
  }
`;
