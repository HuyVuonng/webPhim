import classNames from 'classnames/bind';
import styles from './SmallSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { memo, useEffect, useRef, useState } from 'react';
import httpRequest from '../../../httpRequest/httprequest';
import no_img from './no_img.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SmallSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [searchValue, setSearchValue] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [searchDebount, setSearchDebount] = useState();
    const idTimeOut = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();
    const isFirst = useRef(true);

    const debount = (value, timeout) => {
        clearTimeout(idTimeOut.current);
        idTimeOut.current = setTimeout(() => {
            setSearchDebount(value);
        }, timeout);
        return searchDebount;
    };

    let debountValue = debount(searchInput, 800);
    const getSearchValue = async () => {
        await httpRequest
            .get('/search/movie', {
                params: { api_key: import.meta.env.VITE_API_Key, page: 1, query: searchInput },
            })
            .then((res) => {
                setSearchValue(res.data.results);
            });
    };
    useEffect(() => {
        if (isFirst.current) {
            getSearchValue();
            isFirst.current = false;
            setTimeout(() => {
                isFirst.current = true;
            }, 150);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debountValue]);

    const handleSearchType = (e) => {
        // deny type space first in input search
        if (!e.target.value.startsWith(' ') || e.target.value.trim()) {
            setSearchInput(e.target.value);
            isFirst.current = true;
        }
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleEnterPress = (e) => {
        if (e.keyCode === 13) {
            if (searchInput) {
                inputRef.current.blur();
                setShowResults(false);
                navigate(`/search/${searchInput}?page=1`);
                setSearchInput('');
            }
        }
    };
    const hideWhenClickIteminSearch = () => {
        setSearchInput('');
        setShowResults(false);
    };
    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResults && searchValue.length > 0}
                placement="bottom"
                render={(attrs) => (
                    <ul className={cx('search-value-list')} tabIndex="-1" {...attrs}>
                        {searchValue.map(
                            (item, index) =>
                                index < 5 && (
                                    <Link
                                        to={`/watch/${item.id}`}
                                        key={index}
                                        className={cx('search-value-list-item-link')}
                                    >
                                        <li
                                            key={index}
                                            onClick={hideWhenClickIteminSearch}
                                            className={cx('search-value-list-item')}
                                        >
                                            <div className={cx('search-value-list-item-img-wrapper')}>
                                                <img
                                                    className={cx('search-value-list-item-img')}
                                                    src={
                                                        item.poster_path
                                                            ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                                                            : no_img
                                                    }
                                                />
                                            </div>
                                            <div className={cx('search-value-list-item-description')}>
                                                <span className={cx('search-value-list-item-name')}>{item.title}</span>
                                                <div className={cx('search-value-list-item-infor')}>
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <span className={cx('search-value-list-item-infor-rate')}>
                                                        {item.vote_average}
                                                    </span>
                                                    <div className={cx('search-value-list-item-dot')}></div>
                                                    <span className={cx('search-value-list-item-infor-year')}>
                                                        {(() => {
                                                            if (item.release_date) {
                                                                return item.release_date.split('-')[0];
                                                            } else if (item.first_air_date) {
                                                                return item.first_air_date.split('-')[0];
                                                            } else {
                                                                return '';
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ),
                        )}
                    </ul>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx('search-wrapper')}>
                    <div className={cx('search-box')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('searchIcon')} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchInput}
                            onFocus={() => setShowResults(true)}
                            onChange={handleSearchType}
                            className={cx('search-input')}
                            placeholder="Enter your keywords..."
                            onKeyUp={handleEnterPress}
                        />
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(SmallSearch);
