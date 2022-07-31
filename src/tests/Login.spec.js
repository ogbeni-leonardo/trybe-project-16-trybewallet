import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import Login from '../pages/Login';

describe('Teste da página de Login', () => {
  it('Verifique se a página é renderizada com os componentes esperados', () => {
    renderWithRedux(<Login />);

    expect(screen.getByText('Trybe')).toBeInTheDocument();
    expect(screen.getByText('Wallet')).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifique se os dados inseridos no Login estão alterando a store', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'anônimo@test.com');
    userEvent.type(passwordInput, '123456')
    userEvent.click(submitButton);

    expect(store.getState().user.email).toBe('anônimo@test.com');
  });

  it('Verifique se ao clicar no botão de Entrar a página é redirecionada para a Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'alguem@test.com');
    userEvent.type(passwordInput, '123456')
    userEvent.click(submitButton);

    expect(history.location.pathname).toBe('/carteira');
  });

  it('É esperado que a função fetch não seja chamada ao redirecionar à página de Wallet', () => {
    global.fetch = jest.fn();

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'anônimo@test.com');
    userEvent.type(passwordInput, '123456')
    userEvent.click(submitButton);

    expect(fetch).not.toHaveBeenCalled();
  });
})
