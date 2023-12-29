import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DetailCatatan from './pages/DetailCatatan';
import TambahCatatan from './pages/TambahCatatan';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import Navigation from './components/Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className='app-container'>
              <header>
                <h1>{this.state.localeContext.locale === 'id' ? 'Catatan Pribadi' : 'Personal Notes'}</h1>
                <Navigation />
              </header>
              <main>
                <Routes>
                  <Route path="/*" element={<Login loginSuccess={this.onLoginSuccess} />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      )
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <Header logout={this.onLogout} name={this.state.authedUser.name} />
            <main>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/notes/new" element={<TambahCatatan />} />
                <Route path="/notes/:id" element={<DetailCatatan />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/notes/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }

}

export default App;
