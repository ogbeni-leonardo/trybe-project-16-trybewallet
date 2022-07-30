import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  & th {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.light};
    font-size: 0.9rem;
    min-width: 100px;
    padding-block: 12px;
    text-transform: uppercase;
  }

  & th, td {
    padding-inline: 12px;
  }

  & td {
    border: 1px solid ${({ theme }) => theme.primary};
    max-width: 200px;
    padding-block: 6px;
    text-align: center;
  }

  & tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.secondary};
  }

  & tr:nth-child(even) {
    background-color: ${({ theme }) => theme.defaultBackground};
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  column-gap: 5px;
  justify-content: center;
`;

export const StyledTableButton = styled.button`
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.theme};
  border-radius: 5px;
  color:  ${({ theme }) => theme.light};
  font-size: 0.8rem;
  font-weight: 600;
  height: 30px;
  text-transform: uppercase;
  width: 60px;
`;

export default StyledTable;
