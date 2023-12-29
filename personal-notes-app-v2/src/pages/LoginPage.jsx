import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

const LoginPage = ({ loginSuccess }) => {
    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <section className='content'>
                            <h2>{locale === 'id' ? 'Halaman Login' : 'Login Page'}</h2>
                            <i>{locale === 'id' ? '"Selamat datang di halaman login. Masukkan informasi akun Anda di sini."' : '"Welcome to the login page. Enter your account information here."'}</i>
                            <LoginInput login={onLogin} />
                            <p className='tanya'>{locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account yet?'} <Link to="/register">{locale === 'id' ? 'Daftar Disini ...' : 'Register Here ...'}</Link></p>
                        </section>
                    )
                }
            }
        </LocaleConsumer>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;