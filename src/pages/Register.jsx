import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

const Register = () => {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <section className='content'>
                            <h2>{locale === 'id' ? 'Daftar Akun' : 'Register Account'}</h2>
                            <i>{locale === 'id' ? '"Ayo memulai! Isi formulir pendaftaran untuk membuat akun baru."' : '"Let\'s get started! Fill out the registration form to create a new account."'}</i>
                            <RegisterInput register={onRegisterHandler} />
                            <p className='tanya'>{locale === 'id' ? 'Sudah Punya Akun? Kembali ke ' : 'Already Have an Account? Back to '}<Link to="/">{locale === 'id' ? 'Halaman Login' : 'Login Page'}</Link></p>
                        </section>
                    )
                }
            }
        </LocaleConsumer>
    )
}

export default Register;