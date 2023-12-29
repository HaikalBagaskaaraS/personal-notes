import React from 'react';
import ToggleTheme from './ToggleTheme';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { FaGlobe } from 'react-icons/fa';

const Navigation = () => {
    return (
        <LocaleConsumer>
            {
                ({ locale, toggleLocale }) => {
                    return (
                        <nav>
                            <ul>
                                <button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'} <FaGlobe /></button>
                                <ToggleTheme />
                            </ul>
                        </nav>
                    )
                }
            }
        </LocaleConsumer>
    );
}


export default Navigation;
