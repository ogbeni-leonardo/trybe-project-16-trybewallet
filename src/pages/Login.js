import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { setEmail } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      emailInput: '',
      passwordInput: '',
      loginButtonIsDisabled: true,
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  handleClick() {
    const { emailInput } = this.state;
    const { dispatch } = this.props;

    dispatch(setEmail(emailInput));

    this.setState({ redirect: true });
  }

  validateForm() {
    const { emailInput, passwordInput } = this.state;

    const hasValidEmail = /\S+@\S+\.\S+/.test(emailInput);
    const MIN_PASSWORD_SIZE = 6;
    const hasValidPassword = passwordInput.length >= MIN_PASSWORD_SIZE;

    this.setState({
      loginButtonIsDisabled: !(hasValidEmail && hasValidPassword),
    });
  }

  render() {
    const {
      emailInput,
      passwordInput,
      loginButtonIsDisabled,
      redirect,
    } = this.state;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <div>
        <label htmlFor="name">
          E-mail:
          <input
            id="name"
            type="text"
            name="emailInput"
            value={ emailInput }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            name="passwordInput"
            value={ passwordInput }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ loginButtonIsDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Login);
