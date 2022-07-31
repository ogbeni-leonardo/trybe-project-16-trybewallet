import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { setEmail } from '../redux/actions/user.action';

import LoginPage, {
  LoginForm,
  LoginFormTitle,
  LoginFormLabel,
  LoginFormInput,
  LoginFormButton,
} from '../assets/css/Login.styles';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      email: '',
      password: '',
      submitIsDisabled: true,
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  handleClick(event) {
    event.preventDefault();

    const { email } = this.state;
    const { dispatch } = this.props;

    dispatch(setEmail(email));

    this.setState({ redirect: true });
  }

  validateForm() {
    const { email, password } = this.state;

    const MIN_PASSWORD_SIZE = 6;
    const isAValidEmail = /\S+@\S+\.\S+/.test(email);
    const isAValidPassword = password.length >= MIN_PASSWORD_SIZE;

    this.setState({ submitIsDisabled: !(isAValidEmail && isAValidPassword) });
  }

  render() {
    const { email, password, submitIsDisabled, redirect } = this.state;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <LoginPage>
        <LoginForm>
          <LoginFormTitle>
            Trybe
            <span>Wallet</span>
          </LoginFormTitle>

          <LoginFormLabel htmlFor="name">
            E-mail
            <LoginFormInput
              data-testid="email-input"
              id="name"
              name="email"
              onChange={ this.handleChange }
              placeholder="Digite seu e-mail"
              type="text"
              value={ email }
            />
          </LoginFormLabel>

          <LoginFormLabel htmlFor="password">
            Senha
            <LoginFormInput
              data-testid="password-input"
              id="password"
              name="password"
              onChange={ this.handleChange }
              placeholder="Digite sua senha"
              type="password"
              value={ password }
            />
          </LoginFormLabel>

          <LoginFormButton
            disabled={ submitIsDisabled }
            onClick={ this.handleClick }
            type="submit"
          >
            Entrar
          </LoginFormButton>
        </LoginForm>
      </LoginPage>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Login);
