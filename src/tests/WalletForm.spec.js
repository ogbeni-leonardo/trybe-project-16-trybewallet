import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';

describe('Teste do componente WalletForm', () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  it('Verifica se todos os campos esperados estão sendo renderizados '
    + 'na tela', () => {
    renderWithRedux(<WalletForm />);
    [
      screen.getByLabelText(/valor/i),
      screen.getByLabelText(/descrição/i),
      screen.getByLabelText(/moeda/i),
      screen.getByLabelText(/pagamento/i),
      screen.getByLabelText(/categoria/i),
      screen.getByRole('button', { name: /adicionar despesa/i }),
    ].forEach((element) => expect(element).toBeInTheDocument());
  });

  it('Verifica se o fetch é chamado ao renderizar o componente', () => {
    renderWithRedux(<WalletForm />);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/all');
  });

  it('Verifica se o estado é atualizado ao renderizar o '
    + 'componente', async () => {
    const { store } = renderWithRedux(<WalletForm />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(store.getState().wallet.currencies).toHaveLength(15);
  });

  it('Verifica se ao clicar no botão de adicionar despesa o estado é '
    + 'atualizado com as informações correspondentes e os inputs '
    + 'são limpos', async () => {
    const { store } = renderWithRedux(<WalletForm />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const valueInput = screen.getByLabelText(/valor/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);
    const currencySelect = screen.getByLabelText(/moeda/i);
    const methodSelect = screen.getByLabelText(/pagamento/i);
    const tagSelect = screen.getByLabelText(/categoria/i);
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(store.getState().wallet.expenses).toHaveLength(0);

    userEvent.type(valueInput, '938');
    userEvent.type(descriptionInput, 'Playstation 5');
    userEvent.selectOptions(currencySelect, ['EUR']);
    userEvent.selectOptions(methodSelect, ['Cartão de crédito']);
    userEvent.selectOptions(tagSelect, ['Lazer']);
    userEvent.click(addExpense);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    userEvent.type(valueInput, '10.38');
    userEvent.type(descriptionInput, 'Paçoca');
    userEvent.selectOptions(currencySelect, ['USD']);
    userEvent.selectOptions(methodSelect, ['Cartão de débito']);
    userEvent.selectOptions(tagSelect, ['Alimentação']);
    userEvent.click(addExpense);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(store.getState().wallet.expenses).toHaveLength(2);

    const expenses = store.getState().wallet.expenses;

    expect(expenses[0].value).toBe('938');
    expect(expenses[0].description).toBe('Playstation 5');
    expect(expenses[0].currency).toBe('EUR');
    expect(expenses[0].method).toBe('Cartão de crédito');
    expect(expenses[0].tag).toBe('Lazer');

    expect(expenses[1].value).toBe('10.38');
    expect(expenses[1].description).toBe('Paçoca');
    expect(expenses[1].currency).toBe('USD');
    expect(expenses[1].method).toBe('Cartão de débito');
    expect(expenses[1].tag).toBe('Alimentação');

    expect(valueInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  /* it('Verifica se, ao digitar no input value um valor inválido o '
    + 'valor retornado é 1', async () => {
      const { store } = renderWithRedux(<WalletForm />);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      userEvent.type(screen.getByLabelText(/valor/i), 'pipoco');
      const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
      userEvent.click(addExpense);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      expect(store.getState().wallet.expenses[0].value).toBe('1');
    }); */

  it('Verifica se o modo de edição é habilitado quando a propriedade '
    + 'editor do estado é true', async () => {
      const { store } = renderWithRedux(<Wallet />);

      store.dispatch({ type: 'EDIT_EXPENSE', payload: 0 });
      expect(screen.getByRole('button', { name: /editar despesa/i })).toBeInTheDocument()
    });
});
