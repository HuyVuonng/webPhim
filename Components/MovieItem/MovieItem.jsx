/* eslint-disable react/prop-types */
import classNames from 'classnames/bind';
import styles from './MovieItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function MovieItem({ data }) {
    return (
        <div className={cx('movie-item-block')}>
            <HeadlessTippy
                interactive
                placement="right"
                offset={[50, 5]}
                render={(attrs) => (
                    <div className={cx('MovieItem-hover-description')} tabIndex="-1" {...attrs}>
                        <span className={cx('MovieItem-hover-description-name')}>{data.title || data.name}</span>
                        <div className={cx('MovieItem-hover-description-infor')}>
                            <span className={cx('MovieItem-hover-description-year')}>
                                {/* {data.release_date
                                    ? data.release_date.split('-')[0]
                                    : data.first_air_date.split('-')[0]} */}
                                {(() => {
                                    if (data.release_date) {
                                        return data.release_date.split('-')[0];
                                    } else if (data.first_air_date) {
                                        return data.first_air_date.split('-')[0];
                                    } else {
                                        return '';
                                    }
                                })()}
                            </span>
                            <span className={cx('MovieItem-hover-description-language')}>{data.original_language}</span>
                            <span className={cx('MovieItem-hover-description-quality')}>HD</span>
                        </div>
                        <p className={cx('MovieItem-hover-description-summary')}>{data.overview}</p>

                        <Link to="/" className={cx('watch')}>
                            Watch now
                        </Link>
                    </div>
                )}
            >
                <Link className={cx('link')} to="/">
                    <div className={cx('MovieItem-wrapper')}>
                        <div className={cx('MovieItem-img-wrapper')}>
                            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="" />
                            <span className={cx('MovieItem-quality')}>HD</span>
                            <div className={cx('MovieItem-hover')}>
                                <FontAwesomeIcon icon={faPlayCircle} className={cx('MovieItem-Play-iconHover')} />
                            </div>
                        </div>
                        <div className={cx('MovieItem-description')}>
                            <h2 className={cx('MovieItem-name')}>{data.title || data.name}</h2>

                            <div className={cx('MovieItem-infor')}>
                                <div className={cx('MovieItem-infor-time')}>
                                    <span className={cx('MovieItem-movie-year')}>
                                        {/* {data.release_date
                                            ? data.release_date.split('-')[0]
                                            : data.first_air_date.split('-')[0]} */}
                                        {(() => {
                                            if (data.release_date) {
                                                return data.release_date.split('-')[0];
                                            } else if (data.first_air_date) {
                                                return data.first_air_date.split('-')[0];
                                            } else {
                                                return '';
                                            }
                                        })()}
                                    </span>
                                    <span className={cx('MovieItem-movie-dot')}></span>
                                    <span className={cx('MovieItem-movie-language')}>{data.original_language}</span>
                                </div>
                                <span className={cx('MovieItem-infor-type')}>Movie</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </HeadlessTippy>
        </div>
    );
}

export default MovieItem;
