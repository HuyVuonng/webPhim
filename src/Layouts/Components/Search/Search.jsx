import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Search() {
    return (
        <div className={cx('search-wrapper')}>
            <div className={cx('search-box')}>
                <FontAwesomeIcon icon={faSearch} className={cx('searchIcon')} />

                <input type="text" className={cx('search-input')} placeholder="Enter your keywords..." />
            </div>

            <button className={cx('search-btn')}>
                <FontAwesomeIcon icon={faArrowRight} className={cx('searchIcon-btn')} />
            </button>
        </div>
    );
}

export default Search;
