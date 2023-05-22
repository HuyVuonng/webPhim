import classNames from 'classnames/bind';
import styles from './SmallHeader.module.scss/';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import httpRequest from '../../../httpRequest/httprequest';
import SmallSearch from '../SmallSearch/SmallSearch';

const cx = classNames.bind(styles);

function SmallHeader() {
    const [genre, setGenre] = useState([]);

    const getnav = async () => {
        // await httpRequest
        //     .get('/configuration/countries', { params: { api_key: import.meta.env.VITE_API_Key } })
        //     .then((res) => setCountries(res.data));

        let movieGenres = await httpRequest.get('/genre/movie/list', {
            params: { api_key: import.meta.env.VITE_API_Key },
        });
        let tvGenres = await httpRequest.get('/genre/tv/list', { params: { api_key: import.meta.env.VITE_API_Key } });

        setGenre([...movieGenres.data.genres, ...tvGenres.data.genres]);
    };

    const countries = [
        'Argentina',
        'Australia',
        'Austria',
        'Belgium',
        'Brazil',
        'Canada',
        'China',
        'Czech Republic',
        'Denmark',
        'Finland',
        'France',
        'Germany',
        'Hong Kong',
        'Hungary',
        'India',
        'International',
        'Ireland',
        'Israel',
        'Italy',
        'Japan',
        'Luxembourg',
        'Mexico',
        'Netherlands',
        'New Zealand',
        'Norway',
        'Philippines',
        'Poland',
        'Romania',
        'Russia',
        'South Africa',
        'South Korea',
        'Spain',
        'Sweden',
        'Switzerland',
        'Thailand',
        'Turkey',
        'United Kingdom',
        'United States',
    ];
    useEffect(() => {
        getnav();
    }, []);

    return (
        <div className={cx('Header-Wrapper')}>
            <nav className={cx('Header-nav')}>
                <Link to="/" className={cx('Header-logo-link')}>
                    <div className={cx('Header-logo')}>
                        <img src="https://s1.bunnycdn.ru/assets/sites/flixtor/logo.png" alt="" />
                        <h1 className={cx('Header-logo-title')}>FlixTor.video</h1>
                    </div>
                </Link>
                <ul className={cx('Header-nav-list')}>
                    <Link to={'/'}>
                        <li className={cx('Header-nav-list-item')}>Home</li>
                    </Link>
                    <div>
                        <HeadlessTippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <ul className={cx('genre-child')} tabIndex="-1" {...attrs}>
                                    {genre.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={`/genre/${item.name}?page=1`}
                                            className={cx('genre-child-link')}
                                        >
                                            <li className={cx('genre-child-item')}>{item.name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        >
                            <li className={cx('Header-nav-list-item')}>genre</li>
                        </HeadlessTippy>
                    </div>

                    <div>
                        <HeadlessTippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <ul className={cx('country-child')} tabIndex="-1" {...attrs}>
                                    {countries.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={`/country/${item}?page=1`}
                                            className={cx('country-child-link')}
                                        >
                                            <li className={cx('country-child-item')}>{item}</li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        >
                            <li className={cx('Header-nav-list-item')}>country</li>
                        </HeadlessTippy>
                    </div>
                    <Link to={'/movie?page=1'}>
                        <li className={cx('Header-nav-list-item')}>movies</li>
                    </Link>
                    <Link to="/tv?page=1">
                        <li className={cx('Header-nav-list-item')}>tv shows</li>
                    </Link>
                    <Link to="/">
                        <li className={cx('Header-nav-list-item')}>top imdb</li>
                    </Link>
                </ul>
                <SmallSearch />
                <div className={cx('Header-login-register')}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login/ </span>
                    <span>Register</span>
                </div>
            </nav>
        </div>
    );
}

export default SmallHeader;
