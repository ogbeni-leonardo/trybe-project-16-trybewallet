import styled from 'styled-components';

const WalletFormContainer = styled.form`
  align-items: center;
  column-gap: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 10px;
`;

export const WalletFormLabel = styled.label`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 600;
  row-gap: 5px;
  text-transform: uppercase;
`;

export const WalletFormInput = styled.input`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  height: 35px;
  padding-inline: 10px;
  text-align: center;
  width: ${({ width }) => width || '120px'};
`;

export const WalletFormSelect = styled.select`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  height: 35px;
  padding-inline: 10px;
`;

export const WalletFormButton = styled.button`
align-self: flex-end;
  background-color: ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.light};
  font-size: 0.9rem;
  height: 35px;
  margin-left: 5px;
  padding-inline: 10px;
  text-transform: uppercase;
`;

export default WalletFormContainer;
