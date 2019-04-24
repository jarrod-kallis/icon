import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { login } from '../../actions/authActions';
import { get as getEnvironments } from '../../actions/environmentActions';
import validateInput from '../../validations/login';
import TextFieldGroup from '../common/TextFieldGroup';
import Select from '../common/Select';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      environment: '',
      errors: {},
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.props.getEnvironments();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (isValid === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors
        }
      });
    }

    return isValid;
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.isValid() === true) {
      this.setState({
        errors: {},
        isLoading: true
      });

      this.props.login(this.state).then(
        () => {
          toastr.success('You have logged in successfully. Welcome!');
        },
        (error) => {
          toastr.error(error.response ? error.response.data.errors.form : error.message);
          this.setState({
            isLoading: false
          });
        }
      );
    }
  }

  render() {
    const { username, password, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        <TextFieldGroup
          label='Username'
          name='username'
          value={username}
          onChange={this.onChange}
          error={errors.username}
        />

        <TextFieldGroup
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={this.onChange}
          error={errors.password}
        />

        <Select label='Environment' name='environment' onChange={this.onChange} error={errors.environment} options={this.props.environments} />

        <div className='form-group'>
          <button type='submit' disabled={isLoading} className='btn btn-primary btn-lg'>
            Login
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  environments: state.environments.environments
});

export default connect(mapStateToProps, { login, getEnvironments })(LoginForm);
