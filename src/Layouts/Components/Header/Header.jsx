import classNames from 'classnames/bind';
import styles from './Header.module.scss/';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faTimes, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search/Search';
import { useEffect, useState } from 'react';
import httpRequest from '../../../httpRequest/httprequest';

const cx = classNames.bind(styles);
function Header() {
    // const [countries, setCountries] = useState([]);
    const [genre, setGenre] = useState([]);

    const getnav = async () => {
        // await httpRequest
        //     .get('/configuration/countries', { params: { api_key: import.meta.env.VITE_API_Key } })
        //     .then((res) => setCountries(res.data));

        let movieGenres = await httpRequest.get('/genre/movie/list', {
            params: { api_key: import.meta.env.VITE_API_Key },
        });
        let tvGenres = await httpRequest.get('/genre/tv/list', { params: { api_key: import.meta.env.VITE_API_Key } });

        console.log(movieGenres.data.genres);
        setGenre([...movieGenres.data.genres, ...tvGenres.data.genres]);
    };
    useEffect(() => {
        getnav();
    }, []);

    // const genre = [
    //     'Action',
    //     'Adventure',
    //     'Animation',
    //     'Biography',
    //     'Costume',
    //     'Comedy',
    //     'Crime',
    //     'Documentar,y',
    //     'Drama',
    //     'Family',
    //     'Fantasy',
    //     'Game-Show',
    //     'History',
    //     'Horror',
    //     'Kungfu',
    //     'Music',
    //     'Mystery',
    //     'Reality-TV,',
    //     'Romance',
    //     'Sci-Fi',
    //     'Sport',
    //     'Thriller',
    //     'TV Show',
    //     'War',
    //     'Wester',
    // ];

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
    const show = () => {
        const modalMobile = document.getElementById('modal-mobile');
        modalMobile.classList.add(`${cx('open')}`);
    };
    function close() {
        const modalMobile = document.getElementById('modal-mobile');
        modalMobile.classList.remove(`${cx('open')}`);
    }

    const showSubnav = (e) => {
        e.target.childNodes[1].classList.toggle(`${cx('rotate')}`);
        // e.target.pa.classList.toggle(`${cx('show')}`);
        e.target.parentElement.childNodes[1].classList.toggle(`${cx('show')}`);
    };
    return (
        <>
            {/* pc */}
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

                    <div className={cx('Header-login-register')}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Login/ </span>
                        <span>Register</span>
                    </div>
                </nav>

                <div className={cx('Header-big-title-wrapper')}>
                    <h1 className={cx('Header-big-title')}>Find Movies, TV shows and more</h1>
                </div>
                <Search />
            </div>

            {/* mobile */}
            <div className={cx('Header-Wrapper-mobile')}>
                <nav className={cx('Header-mobile-nav')}>
                    <FontAwesomeIcon icon={faBars} className={cx('Header-mobile-bars')} onClick={show} />
                    <Link to={'/'} className={cx('Header-mobile-logo-link')}>
                        <div className={cx('Header-mobile-logo')}>
                            <img
                                className={cx('header-mobile-logo-img')}
                                src="https://s1.bunnycdn.ru/assets/sites/flixtor/logo.png"
                                alt=""
                            />
                            <h1 className={cx('Header-mobile-logo-title')}>FlixTor.video</h1>
                        </div>
                    </Link>
                    <FontAwesomeIcon icon={faUserCircle} className={cx('Header-mobile-user')} />
                </nav>
                <Search />
            </div>

            {/* modal mobile */}
            <div className={cx('modal-mobile')} id="modal-mobile">
                <div className={cx('modal-overlay')} id="modal-overlay" onClick={close}></div>
                <div className={cx('modal-body')}>
                    <FontAwesomeIcon icon={faTimes} className={cx('close-icon')} id="close-icon" onClick={close} />
                    <ul className={cx('nav2-list-mobile')}>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">HOME</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile', 'no-link')}>
                            <span className={cx('nav2-list-item-mobile-title')} onClick={showSubnav}>
                                GENRE
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className={cx('nav2-list-item-mobile-AngleRight-icon')}
                                />
                            </span>

                            <ul className={cx('subnav2-list-item-mobile-wrapper')}>
                                {genre.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/genre/${item.name}?page=1`}
                                        className={cx('sub-child-link')}
                                    >
                                        <li className={cx('sub-child-item')} onClick={close}>
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>

                        <li className={cx('nav2-list-item-mobile', 'no-link')}>
                            <span className={cx('nav2-list-item-mobile-title')} onClick={showSubnav}>
                                COUNTRY
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className={cx('nav2-list-item-mobile-AngleRight-icon')}
                                />
                            </span>
                            <ul className={cx('subnav2-list-item-mobile-wrapper')}>
                                {countries.map((item, index) => (
                                    <Link key={index} to={`/country/${item}?page=1`} className={cx('sub-child-link')}>
                                        <li className={cx('sub-child-item')} onClick={close}>
                                            {item}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>

                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/movie?page=1">MOVIES</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/tv?page=1">TV SHOWS</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">TOP IMDB</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header;
