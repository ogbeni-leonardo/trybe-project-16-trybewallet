import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

import Wallet from '../pages/Wallet';

describe('Teste da página Wallet', () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  it('Ao renderizar a página teste se os componentes estão sendo '
    + 'renderizados', () => {
    renderWithRedux(<Wallet />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-form')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('Verifica se na primeira renderização o fetch é chamado', () => {
    renderWithRedux(<Wallet />);
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao preencher o componente WalletForm e adicionar '
    + 'a despesa ela é renderizada', async () => {
    renderWithRedux(<Wallet />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    userEvent.type(screen.getByLabelText(/valor/i), '938');
    userEvent.type(screen.getByLabelText(/descrição/i), 'Playstation 5');
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), ['EUR']);
    userEvent.selectOptions(screen
      .getByLabelText(/pagamento/i), ['Cartão de crédito']);
    userEvent.selectOptions(screen
      .getByLabelText(/categoria/i), ['Lazer']);
    userEvent.click(screen
      .getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(screen.getByRole('cell', { name: '938.00' }))
      .toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Playstation 5' }))
      .toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Euro/Real Brasileiro' }))
      .toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Cartão de crédito' }))
      .toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Lazer' })).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de remover despesa ela deixa de '
    + 'ser renderizada', async () => {
    renderWithRedux(<Wallet />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    userEvent.type(screen.getByLabelText(/valor/i), '938');
    userEvent.type(screen.getByLabelText(/descrição/i), 'Playstation 5');
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), ['EUR']);
    userEvent.selectOptions(screen
      .getByLabelText(/pagamento/i), ['Cartão de crédito']);
    userEvent.selectOptions(screen
      .getByLabelText(/categoria/i), ['Lazer']);
    userEvent.click(screen
      .getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    userEvent.click(screen.getByTestId('delete-btn'));

    expect(screen.queryByRole('cell', { name: '938.00' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Playstation 5' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Euro/Real Brasileiro' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Cartão de crédito' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Lazer' }))
      .not.toBeInTheDocument();
  });

  it(
    'Verifica se ao pressionar o botão de editar os valores '
    + 'são enviados ao WalletForm e, quando atualizados, os valores '
    + 'são renderizados na tabela', async () => {
      renderWithRedux(<Wallet />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      userEvent.type(screen.getByLabelText(/valor/i), '938');
      userEvent.type(screen.getByLabelText(/descrição/i), 'Playstation 5');
      userEvent.selectOptions(screen.getByLabelText(/moeda/i), ['EUR']);
      userEvent.selectOptions(screen
        .getByLabelText(/pagamento/i), ['Cartão de crédito']);
      userEvent.selectOptions(screen
        .getByLabelText(/categoria/i), ['Lazer']);
      userEvent.click(screen
        .getByRole('button', { name: /adicionar despesa/i }));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      userEvent.type(screen.getByLabelText(/valor/i), '15');
      userEvent.type(screen.getByLabelText(/descrição/i), 'Paçoca');
      userEvent.selectOptions(screen.getByLabelText(/moeda/i), ['USD']);
      userEvent.selectOptions(screen
        .getByLabelText(/pagamento/i), ['Cartão de débito']);
      userEvent.selectOptions(screen
        .getByLabelText(/categoria/i), ['Alimentação']);
      userEvent.click(screen
        .getByRole('button', { name: /adicionar despesa/i }));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      userEvent.click(screen.getAllByTestId('edit-btn')[0]);

      const valueInput = screen.getByLabelText(/valor/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);
      const currencySelect = screen.getByLabelText(/moeda/i);
      const methodSelect = screen.getByLabelText(/pagamento/i);
      const tagSelect = screen.getByLabelText(/categoria/i);
      const addExpense = screen.getByRole('button', {
        name: /editar despesa/i,
      });

      expect(valueInput.value).toMatch('938');
      expect(descriptionInput.value).toMatch(/playstation 5/i);
      expect(currencySelect.value).toMatch(/eur/i);
      expect(methodSelect.value).toMatch(/cartão de crédito/i);
      expect(tagSelect.value).toMatch(/lazer/i);
      expect(addExpense).toBeInTheDocument();

      userEvent.type(valueInput, '600');
      userEvent.type(descriptionInput, 'Playstation 6');
      userEvent.click(addExpense);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      expect(screen
        .queryByRole('cell', { name: '600.00' })).toBeInTheDocument();
      expect(screen
        .queryByRole('cell', { name: 'Playstation 6' })).toBeInTheDocument();
    }
  );
});
