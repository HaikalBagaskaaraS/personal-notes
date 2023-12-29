import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import useFormInput from '../hooks/useFormInputHook';

const LoginInput = ({ login }) => {
    const email = useFormInput('');
    const password = useFormInput('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({
            email: email.value,
            password: password.value,
        });
    };

    return (
        <LocaleConsumer>
            {({ locale }) => (
                <form onSubmit={onSubmitHandler} className='login-input'>
                    <input
                        type="email"
                        placeholder={locale === 'id' ? 'Alamat Surel' : 'Email Address'}
                        value={email.value}
                        onChange={email.onChange}
                    />
                    <input
                        type="password"
                        placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'}
                        value={password.value}
                        onChange={password.onChange}
                    />
                    <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
                </form>
            )}
        </LocaleConsumer>
    );
};

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginInput;
