import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleTheme = () => {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => {
                return <button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
            }}
        </ThemeConsumer>
    );
}

export default ToggleTheme;