import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChartLine, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMovieHomeList,
    fetchMovieHomeListRecomment,
    fetchMovieHomeListTrending,
    fetchTVHomeList,
} from '../../redux/reducer/ListMovie';

const cx = classNames.bind(styles);

function Home() {
    const isFirst = useRef(true);
    const dispatch = useDispatch();
    const previousBTN = useRef(0);
    const tagBtnList = useRef();

    let ListMovieShowRecomment = useSelector((state) => state.ListMovie);

    const [ShowRecomment, setShowRecomment] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Home';
        tagBtnList.current = document.querySelectorAll(`.${cx('Home-tag-btn')}`);
        //number of item movie show in device
        const width = document.body.clientWidth;
        const soItem = Math.floor(width / 172);
        const box = document.querySelectorAll(`.${cx('Home-content-list-movie')}`);
        for (let i = 0; i < box.length; i++) {
            box[i].style.gridTemplateColumns = `repeat(${soItem}, 1fr)`;
        }
    }, []);

    const handleClickaddClassActive = (e) => {
        // for (let i = 0; i < tagBtnList.current.length; i++) {
        //     tagBtnList.current[i].classList.remove(`${cx('active')}`);
        // }
        // e.target.classList.add(`${cx('active')}`);

        // console.log(e.target.innerText);
        tagBtnList.current[previousBTN.current].classList.remove(`${cx('active')}`);
        e.target.classList.add(`${cx('active')}`);
        previousBTN.current = e.target.dataset.index;
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

    const getData = async () => {
        // await httpRequest.get('/movie/popular', { params: { api_key: import.meta.env.VITE_API_Key } }).then((res) => {
        //     setShowRecomment(res.data.results);
        //     dispatch(ListMovie.actions.ADD_MovieHomeListRecoment(res.data.results));
        // });
        // await httpRequest
        //     .get('/discover/tv', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
        //     .then((res) => dispatch(ListMovie.actions.ADD_TVHomeList(res.data.results)));
        // await httpRequest
        //     .get('/trending/movie/day', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
        //     .then((res) => dispatch(ListMovie.actions.ADD_MovieHomeListTrending(res.data.results)));
        // await httpRequest
        //     .get('/movie/now_playing', { params: { api_key: '7e4b5abe1ead162fa4cdab607fce59c0' } })
        //     .then((res) => dispatch(ListMovie.actions.ADD_MovieHomeList(res.data.results)));
        dispatch(fetchMovieHomeListRecomment());
        dispatch(fetchTVHomeList());
        dispatch(fetchMovieHomeListTrending());
        dispatch(fetchMovieHomeList());
    };

    useEffect(() => {
        if (isFirst.current) {
            if (ListMovieShowRecomment.MovieHomeListRecomment.length < 1) {
                getData();
            }
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
                            <button
                                className={cx('Home-tag-btn', 'active')}
                                data-index={0}
                                onClick={handleClickaddClassActive}
                            >
                                <FontAwesomeIcon icon={faPlayCircle} style={{ pointerEvents: 'none' }} /> Movies
                            </button>
                            {/* <button className={cx('Home-tag-btn')} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faList} /> TV Shows
                            </button> */}
                            <button className={cx('Home-tag-btn')} data-index={1} onClick={handleClickaddClassActive}>
                                <FontAwesomeIcon icon={faChartLine} style={{ pointerEvents: 'none' }} /> Trending
                            </button>
                        </div>
                    </div>

                    <div className={cx('Home-content-list-movie')}>
                        {ShowRecomment.length > 0
                            ? ShowRecomment.map((item) => <MovieItem key={item.id} data={item} />)
                            : ListMovieShowRecomment.MovieHomeListRecomment.map((item) => (
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
                            <Link to={'/tv?page=1'} className={cx('ViewAll')}>
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
