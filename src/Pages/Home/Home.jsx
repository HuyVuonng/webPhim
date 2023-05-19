import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChartLine, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '../../httpRequest/httprequest';
import { useDispatch, useSelector } from 'react-redux';
import ListMovie from '../../redux/reducer/ListMovie';

const cx = classNames.bind(styles);

function Home() {
    const isFirst = useRef(true);
    const dispatch = useDispatch();

    let ListMovieShowRecomment = useSelector((state) => state.ListMovie);

    const [ShowRecomment, setShowRecomment] = useState(ListMovieShowRecomment.MovieHomeListRecomment);

    const handleClickaddClassActive = (e) => {
        const tagBtnList = document.querySelectorAll(`.${cx('Home-tag-btn')}`);
        for (let i = 0; i < tagBtnList.length; i++) {
            tagBtnList[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);

        console.log(e.target.innerText);
        switch (e.target.innerText) {
            case ' Movies':
                setShowRecomment(ListMovieShowRecomment.MovieHomeListRecomment);
                break;
            case ' TV Shows':
                setShowRecomment();
                break;
            case ' Trending':
                setShowRecomment(ListMovieShowRecomment.MovieHomeListTrending);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Home';
        const width = document.body.clientWidth;
        const soItem = Math.floor(width / 200);
        const box = document.querySelectorAll(`.${cx('Home-content-list-movie')}`);
        for (let i = 0; i < box.length; i++) {
            box[i].style.gridTemplateColumns = `repeat(${soItem}, 1fr)`;
        }
    }, []);

    const getData = async () => {
        await httpRequest.get('/movie/popular', { params: { api_key: import.meta.env.VITE_API_Key } }).then((res) => {
            setShowRecomment(res.data.results);
            dispatch(ListMovie.actions.ADD_MovieHomeListRecoment(res.data.results));
        });
        await httpRequest
            .get('/discover/tv', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
            .then((res) => dispatch(ListMovie.actions.ADD_TVHomeList(res.data.results)));
        await httpRequest
            .get('/trending/movie/day', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
            .then((res) => dispatch(ListMovie.actions.ADD_MovieHomeListTrending(res.data.results)));
        await httpRequest
            .get('/movie/now_playing', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
            .then((res) => dispatch(ListMovie.actions.ADD_MovieHomeList(res.data.results)));
    };

    useEffect(() => {
        if (isFirst.current) {
            getData();
            isFirst.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            {/* <button className={cx('Home-tag-btn')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faList} /> TV Shows
                            </button> */}
                            <button className={cx('Home-tag-btn')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faChartLine} /> Trending
                            </button>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        {ShowRecomment.map((item) => (
                            <MovieItem key={item.id} data={item} />
                        ))}
                    </div>
                </div>

                {/* Movie */}

                <div className={cx('Home-content-block')}>
                    <div className={cx('Home-lable-wrapper', 'haveViewAll')}>
                        <h2 className={cx('Home-title')}>Movies</h2>
                        <div className={cx('Home-tag-btn-wrapper')}>
                            <Link to={'/movie?page=1'} className={cx('ViewAll')}>
                                View All
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        {ListMovieShowRecomment.MovieHomeList.map((item) => (
                            <MovieItem key={item.id} data={item} />
                        ))}
                    </div>
                </div>

                {/* TV
                 */}
                <div className={cx('Home-content-block')}>
                    <div className={cx('Home-lable-wrapper', 'haveViewAll')}>
                        <h2 className={cx('Home-title')}>TVs</h2>
                        <div className={cx('Home-tag-btn-wrapper')}>
                            <Link to={'/'} className={cx('ViewAll')}>
                                View All
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        {ListMovieShowRecomment.TVHomeList.map((item) => (
                            <MovieItem key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
