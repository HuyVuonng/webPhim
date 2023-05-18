import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChartLine, faList, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const handleClickaddClassActive = (e) => {
        const tagBtnList = document.querySelectorAll(`.${cx('Home-tag-btn')}`);
        for (let i = 0; i < tagBtnList.length; i++) {
            tagBtnList[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);
    };
    return (
        <div className={cx('Home-wrapper')}>
            <div className={cx('Home-content')}>
                <div className={cx('Home-content-block')}>
                    <div className={cx('Home-lable-wrapper')}>
                        <h2 className={cx('Home-title')}>Recommended</h2>
                        <div className={cx('Home-tag-btn-wrapper')}>
                            <button className={cx('Home-tag-btn', 'active')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faPlayCircle} /> Movies
                            </button>
                            <button className={cx('Home-tag-btn')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faList} /> TV Shows
                            </button>
                            <button className={cx('Home-tag-btn')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faChartLine} /> Trending
                            </button>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                    </div>
                </div>

                {/* Latest Movies
                 */}
                <div className={cx('Home-content-block')}>
                    <div className={cx('Home-lable-wrapper', 'haveViewAll')}>
                        <h2 className={cx('Home-title')}>Latest Movies</h2>
                        <div className={cx('Home-tag-btn-wrapper')}>
                            <Link to={'/'} className={cx('ViewAll')}>
                                View All
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                    </div>
                </div>

                {/* Latest TV-Series */}

                <div className={cx('Home-content-block')}>
                    <div className={cx('Home-lable-wrapper', 'haveViewAll')}>
                        <h2 className={cx('Home-title')}>Latest TV-Series </h2>
                        <div className={cx('Home-tag-btn-wrapper')}>
                            <Link to={'/'} className={cx('ViewAll')}>
                                View All
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                        <MovieItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
