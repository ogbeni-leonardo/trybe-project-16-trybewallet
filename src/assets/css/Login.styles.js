import styled from 'styled-components';

const LoginPage = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: max(500px, 100vh);
`;

export const LoginForm = styled.form`
  align-items: center;
  background-color: ${({ theme }) => theme.defaultBackground};
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 30px;
  row-gap: 20px;
`;

export const LoginFormTitle = styled.h1`
  align-items: center;
  align-self: stretch;
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  display: flex;
  font-size: 1.9rem;
  margin-bottom: 15px;
  padding-block: 45px;
  padding-left: 25px;

  & span {
    font-size: 1.9rem;
    color: ${({ theme }) => theme.theme};
  }
`;

export const LoginFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  padding-inline: 25px;
  row-gap: 8px;
`;

export const LoginFormInput = styled.input`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.fontColor};
  padding: 10px 15px;
  width: 270px;
`;

export const LoginFormButton = styled.button`
  background-color: ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.light};
  margin-top: 15px;
  padding: 10px 30px;
`;

export default LoginPage;
