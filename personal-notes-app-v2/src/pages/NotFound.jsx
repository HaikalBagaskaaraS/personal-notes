import React from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';

const NotFound = () => {
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className='not-found'>
                            <h2>404 - {locale === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}</h2>
                            <p>{locale === 'id' ? 'Maaf, halaman yang Anda cari tidak ditemukan.' : 'Sorry, the page you were looking for was not found.'}</p>
                        </div>
                    )
                }
            }
        </LocaleConsumer>
    );
};

export default NotFound;