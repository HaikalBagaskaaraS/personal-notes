import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ToggleTheme from './ToggleTheme';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { FaGlobe } from 'react-icons/fa';

function Header({ logout, name }) {
    return (
        <LocaleConsumer>
            {({ locale, toggleLocale }) => {
                return (
                    <header>
                        <h1>{locale === 'id' ? 'Catatan Pribadi' : 'Personal Notes'}</h1>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/" exact activeClassName="active">
                                        {locale === 'id' ? 'Beranda' : 'Home'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/notes/new" activeClassName="active">
                                        {locale === 'id' ? 'Tambah Catatan' : 'Add Note'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/archive" activeClassName="active">
                                        {locale === 'id' ? 'Arsip' : 'Archive'}
                                    </NavLink>
                                </li><button onClick={toggleLocale}>{locale === 'id' ? 'en ' : 'id '} <FaGlobe /></button>
                                <ToggleTheme />
                                <button onClick={logout} title="Logout">
                                    <FiLogOut /> {name}
                                </button>
                            </ul>
                        </nav>
                    </header>
                );
            }}
        </LocaleConsumer>
    );
}


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Header;
