import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import useFormInput from '../hooks/useFormInputHook';

const RegisterInput = ({ register }) => {
    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        register({
            name: name.value,
            email: email.value,
            password: password.value,
        });

    };

    return (
        <LocaleConsumer>
            {({ locale }) => (
                <form onSubmit={onSubmitHandler} className='register-input'>
                    <input
                        type="text"
                        placeholder={locale === 'id' ? 'Nama' : 'Name'}
                        value={name.value}
                        onChange={name.onChange}
                    />
                    <input
                        type="email"
                        placeholder={locale === 'id' ? 'Alamat Surel' : 'Email Address'}
                        value={email.value}
                        onChange={email.onChange}
                    />
                    <input
                        type="password"
                        placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'}
                        autoComplete='current-password'
                        value={password.value}
                        onChange={password.onChange}
                    />
                    <button>{locale === 'id' ? 'Daftar' : 'Register'}</button>
                </form>
            )}
        </LocaleConsumer>
    );
};

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;
