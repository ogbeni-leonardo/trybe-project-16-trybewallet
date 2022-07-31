import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRedux } from './helpers/renderWith';

import Table from '../components/Table';

describe('Teste do componente Table', () => {
  it('Verifique se o cabeçalho está sendo renderizado com as informações esperadas', () => {
    renderWithRedux(<Table />);

    [
      /descrição/i,
      /tag/i,
      /método de pagamento/i,
      /valor/i,
      /moeda/i,
      /câmbio utilizado/i,
      /valor convertido/i,
      /moeda de conversão/i,
      /editar\/excluir/i,
    ].forEach((text) =>
      expect(screen.getAllByText(text).length).toBeGreaterThanOrEqual(1)
    );
  });
});
