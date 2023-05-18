import classNames from 'classnames/bind';
import styles from './MovieItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MovieItem() {
    return (
        <div className={cx('movie-item-block')}>
            <Link to="/">
                <div className={cx('MovieItem-wrapper')}>
                    <div className={cx('MovieItem-img-wrapper')}>
                        <img src="https://image.tmdb.org/t/p/original//A7SobaUTvb6d5Z3dpOhFxPG0RQf.jpg" alt="" />
                        <span className={cx('MovieItem-quality')}>HD</span>
                        <div className={cx('MovieItem-hover')}>
                            <FontAwesomeIcon icon={faPlayCircle} className={cx('MovieItem-Play-iconHover')} />
                        </div>
                    </div>
                    <div className={cx('MovieItem-description')}>
                        <h2 className={cx('MovieItem-name')}>Ant-Man and the Wasp: Quantumania</h2>

                        <div className={cx('MovieItem-infor')}>
                            <div className={cx('MovieItem-infor-time')}>
                                <span className={cx('MovieItem-movie-year')}>2023</span>
                                <span className={cx('MovieItem-movie-dot')}></span>
                                <span className={cx('MovieItem-movie-duration')}>124min</span>
                            </div>
                            <span className={cx('MovieItem-infor-type')}>Movie</span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={cx('MovieItem-hover-description')}>
                <span className={cx('MovieItem-hover-description-name')}>Ant-Man and the Wasp: Quantumania</span>
                <div className={cx('MovieItem-hover-description-infor')}>
                    <span className={cx('MovieItem-hover-description-year')}>2023</span>
                    <span className={cx('MovieItem-hover-description-duration')}>124min</span>
                    <span className={cx('MovieItem-hover-description-quality')}>HD</span>
                </div>
                <p className={cx('MovieItem-hover-description-summary')}>
                    Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope&apos;s parents and
                    Scott&apos;s daughter Cassie. Together they must find a way to escape, but what...
                </p>
                <p className={cx('MovieItem-hover-description-country')}>Country: United States</p>
                <p className={cx('MovieItem-hover-description-Genre')}>Genre: Comedy, Adventure, Action</p>
                <Link to="/" className={cx('watch')}>
                    Watch now
                </Link>
            </div>
        </div>
    );
}

export default MovieItem;
