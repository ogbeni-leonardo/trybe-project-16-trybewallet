import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRedux } from './helpers/renderWith';

import Header from '../components/Header';

describe('Teste do componente Header', () => {
  it('A logo da aplicação está sendo exibida', () => {
    renderWithRedux(<Header />);
    expect(screen.getByText(/trybe/i)).toBeInTheDocument();
    expect(screen.getByText(/wallet/i)).toBeInTheDocument();
  });

  it('Verifique se as informações armazenadas no estado são mostradas no cabeçalho', () => {
    const INITIAL_STATE = {
      user: { email: 'zecapagdinho@test.com', theme: 'light' },
      wallet: { totalField: 189.73 },
    };

    renderWithRedux(<Header />, { initialState: INITIAL_STATE });
    expect(screen.getByText(/zecapagdinho@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/189.73/i)).toBeInTheDocument();
  });

  it('Verifica se a moeda padrão do usuário é exibida na tela', () => {
    renderWithRedux(<Header />);
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
  });

  it('Verifica se o fetch não está sendo chamado ao  renderizar o componente', () => {
    global.fetch = jest.fn();

    renderWithRedux(<Header />);
    expect(fetch).not.toHaveBeenCalled();
  });
});
