import classNames from 'classnames/bind';
import styles from './WatchingFilms.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import no_img from './no_img.png';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCast,
    fetchCastTVSHow,
    fetchIdYT,
    fetchIdYTTVShow,
    fetchKeyWords,
    fetchKeyWordsTVSHow,
    fetchMovieInfor,
    fetchRecommend,
    fetchRecommendTVShow,
    fetchTVInfor,
} from '../../redux/reducer/Watching';
import httpRequest from '../../httpRequest/httprequest';
import YTEmbed from './YTEmbed/YTEmbed';

const cx = classNames.bind(styles);

function WatchingFilms() {
    const params = useParams();
    // const [movie, setMovie] = useState([]);
    const isfirst = useRef(true);
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.Watching);
    const [mount, setMount] = useState(false);
    // const getData = async () => {
    //     setMovie([]);
    //     let check;
    //     try {
    //         await httpRequest.get(`/movie/${params.idfilm}`, {
    //             params: { api_key: import.meta.env.VITE_API_Key },
    //         });
    //     } catch (error) {
    //         check = error.response.status;
    //     }
    //     if (check !== 404) {
    //         Promise.all([
    //             httpRequest.get(`/movie/${params.idfilm}`, { params: { api_key: import.meta.env.VITE_API_Key } }),
    //             httpRequest.get(`/movie/${params.idfilm}/videos`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/movie/${params.idfilm}/credits`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/movie/${params.idfilm}/keywords`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/movie/${params.idfilm}/similar`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //         ]).then(([filmdetail, idYT, cast, keywords, recommend]) => {
    //             const newData = { ...filmdetail.data };
    //             const id = idYT.data.results.find((item) => item.type === 'Trailer');
    //             id ? (newData.idYT = id.key) : (newData.idYT = '');
    //             cast.data.cast ? (newData.cast = cast.data.cast) : (newData.cast = '');
    //             keywords.data.keywords ? (newData.keywords = keywords.data.keywords) : (newData.keywords = '');
    //             document.title = newData.original_title;
    //             setMovieRecomment(recommend.data.results);
    //             setMovie(newData);
    //         });
    //     } else {
    //         Promise.all([
    //             httpRequest.get(`/tv/${params.idfilm}`, { params: { api_key: import.meta.env.VITE_API_Key } }),
    //             httpRequest.get(`/tv/${params.idfilm}/videos`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/tv/${params.idfilm}/credits`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/tv/${params.idfilm}/keywords`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //             httpRequest.get(`/tv/${params.idfilm}/similar`, {
    //                 params: { api_key: import.meta.env.VITE_API_Key },
    //             }),
    //         ]).then(([tvdetail, idYTTV, cast, keywords, recommend]) => {
    //             const newData = { ...tvdetail.data };
    //             console.log(newData);
    //             const id = idYTTV.data.results.find((item) => item.type === 'Trailer');
    //             id ? (newData.idYT = id.key) : (newData.idYT = '');
    //             cast.data.cast ? (newData.cast = cast.data.cast) : (newData.cast = '');
    //             keywords.data.results ? (newData.keywords = keywords.data.results) : (newData.keywords = '');
    //             document.title = newData.original_name;
    //             setMovieRecomment(recommend.data.results);
    //             setMovie(newData);
    //         });
    //     }
    // };

    const getData = async () => {
        let check;
        try {
            await httpRequest.get(`/movie/${params.idfilm}`, {
                params: { api_key: import.meta.env.VITE_API_Key },
            });
        } catch (error) {
            check = error.response.status;
        }
        if (check !== 404) {
            await dispatch(fetchMovieInfor(params.idfilm));
            dispatch(fetchIdYT(params.idfilm));
            dispatch(fetchCast(params.idfilm));
            dispatch(fetchKeyWords(params.idfilm));
            dispatch(fetchRecommend(params.idfilm));
        } else {
            dispatch(fetchTVInfor(params.idfilm));
            dispatch(fetchIdYTTVShow(params.idfilm));
            dispatch(fetchCastTVSHow(params.idfilm));
            dispatch(fetchKeyWordsTVSHow(params.idfilm));
            dispatch(fetchRecommendTVShow(params.idfilm));
        }
    };
    useEffect(() => {
        if (isfirst.current) {
            document.getElementById('watch-video-img-id').classList.remove(`${cx('remove')}`);
            setMount(false);
            getData();
            window.scrollTo(0, 0);
            isfirst.current = false;
            const width = document.body.clientWidth;
            const soItem = Math.floor(width / 172);
            const box = document.querySelectorAll(`.${cx('Watch-video-recomment-item')}`);
            for (let i = 0; i < box.length; i++) {
                box[i].style.gridTemplateColumns = `repeat(${soItem}, 1fr)`;
            }

            setTimeout(() => {
                isfirst.current = true;
            }, 500);
        }
    }, [params]);

    const handleShowVieo = (e) => {
        e.target.parentElement.classList.add(`${cx('remove')}`);
        setMount(true);
        // e.target.parentElement.remove();
        const iframe = document.getElementById('Watch-iframe');
        iframe.src += '?rel=0&autoplay=1';
    };
    return (
        <div className={cx('Watch-wrapper')}>
            <h3>{movie.MovieInfor.original_title || movie.MovieInfor.original_name}</h3>
            <div className={cx('Watch-video-Wrapper')}>
                {mount && <YTEmbed idvideo={movie.IdYT.key} id="Watch-iframe" />}
                <div className={cx('Watch-video-img')} id="watch-video-img-id">
                    <img
                        src={
                            movie.MovieInfor.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movie.MovieInfor.backdrop_path}`
                                : no_img
                        }
                        alt=""
                    />
                    <div className={cx('Watch-video-img-hover')} onClick={handleShowVieo}>
                        <FontAwesomeIcon icon={faPlayCircle} className={cx('Watch-video-img-Play-iconHover')} />
                    </div>
                </div>
            </div>
            <div className={cx('Watch-video-infor-wrapper')}>
                <div className={cx('Watch-video-infor-content')}>
                    <div className={cx('Watch-video-infor-img-wraper')}>
                        {/* <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : no_img}
                            alt=""
                        /> */}
                        <img
                            src={
                                movie.MovieInfor.poster_path
                                    ? `https://image.tmdb.org/t/p/original${movie.MovieInfor.poster_path}`
                                    : no_img
                            }
                            alt=""
                        />
                    </div>
                    <div className={cx('Watch-video-infor')}>
                        <h1 className={cx('Watch-video-infor-name')}>
                            {movie.MovieInfor.original_title || movie.MovieInfor.original_name}
                        </h1>
                        <div className={cx('Watch-video-infor-start-duration')}>
                            <FontAwesomeIcon icon={faStar} /> {movie.MovieInfor.vote_average}
                            <span className={cx('Watch-video-infor-duration')}>
                                {movie.MovieInfor.runtime ? movie.MovieInfor.runtime + ' min' : ''}
                            </span>
                        </div>
                        <p className={cx('Watch-video-infor-overview')}>{movie.MovieInfor.overview}</p>

                        <div className={cx('Watch-video-more-infor')}>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Released:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.MovieInfor.release_date || movie.MovieInfor.first_air_date}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Genres:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.MovieInfor.genres &&
                                        movie.MovieInfor.genres.map(
                                            (item, index) =>
                                                `${item.name}${index < movie.MovieInfor.genres.length - 1 ? ', ' : ''}`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Countries:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.MovieInfor.production_countries &&
                                        movie.MovieInfor.production_countries.map(
                                            (item, index) =>
                                                `${item.name}${
                                                    index < movie.MovieInfor.production_countries.length - 1 ? ', ' : ''
                                                }`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Production:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.MovieInfor.production_companies &&
                                        movie.MovieInfor.production_companies.map(
                                            (item, index) =>
                                                `${item.name}${
                                                    index < movie.MovieInfor.production_companies.length - 1 ? ', ' : ''
                                                }`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Cast:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.Cast &&
                                        movie.Cast.map(
                                            (item, index) => `${item.name}${index < movie.Cast.length - 1 ? ', ' : ''}`,
                                        )}
                                </span>
                            </div>

                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Keywords:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.KeyWords &&
                                        movie.KeyWords.map(
                                            (item, index) =>
                                                `${item.name}${index < movie.KeyWords.length - 1 ? ', ' : ''}`,
                                        )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('Watch-video-recomment')}>
                <h3 className={cx('Watch-video-recomment-title')}>You may also like</h3>
                <div className={cx('Watch-video-recomment-item')}>
                    {movie.Recommend.map((item) => (
                        <MovieItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WatchingFilms;
