import styled from 'styled-components';

const HeaderContainer = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.defaultBackground};
  border-bottom: 2px solid ${({ theme }) => theme.theme};
  column-gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px;
  row-gap: 10px;

  @media screen and (max-width: 440px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const AppName = styled.h1`
  font-size: 1.8rem;

  & span {
    color: ${({ theme }) => theme.theme};
    font-size: 1.8rem;
  }
`;

export const UserInfos = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  @media screen and (max-width: 440px) {
    align-items: center;
  }
`;

export const UserEmail = styled.p`
  &:before {
    content: 'Olá, ';
  }

  & span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const TotalField = styled.div`
  display: flex;
  column-gap: 5px;
  font-weight: 600;
  text-align: right;

  & p {
    color: ${({ theme }) => theme.theme};
  }

  &:before {
    content: 'Total das despesas: ';
  }
`;

export default HeaderContainer;
