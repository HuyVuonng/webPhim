import classNames from 'classnames/bind';
import styles from './Watching.module.scss';
import { useParams } from 'react-router-dom';
import httpRequest from '../../httpRequest/httprequest';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import no_img from './no_img.png';
import MovieItem from '../../../Components/MovieItem/MovieItem';

const cx = classNames.bind(styles);

function Watch() {
    const params = useParams();
    const [movie, setMovie] = useState([]);
    const [movieRecomment, setMovieRecomment] = useState([]);
    const isfirst = useRef(true);

    const getData = () => {
        setMovie([]);
        Promise.all([
            httpRequest.get(`/movie/${params.idfilm}`, { params: { api_key: import.meta.env.VITE_API_Key } }),
            httpRequest.get(`/movie/${params.idfilm}/videos`, {
                params: { api_key: import.meta.env.VITE_API_Key },
            }),
            httpRequest.get(`/movie/${params.idfilm}/credits`, {
                params: { api_key: import.meta.env.VITE_API_Key },
            }),
            httpRequest.get(`/movie/${params.idfilm}/keywords`, {
                params: { api_key: import.meta.env.VITE_API_Key },
            }),
            httpRequest.get(`/movie/${params.idfilm}/similar`, {
                params: { api_key: import.meta.env.VITE_API_Key },
            }),
        ]).then(([filmdetail, idYT, cast, keywords, recommend]) => {
            const newData = { ...filmdetail.data };
            const id = idYT.data.results.find((item) => item.type === 'Trailer');
            id ? (newData.idYT = id.key) : (newData.idYT = '');
            cast.data.cast ? (newData.cast = cast.data.cast) : (newData.cast = '');
            keywords.data.keywords ? (newData.keywords = keywords.data.keywords) : (newData.keywords = '');
            document.title = newData.original_title;
            setMovieRecomment(recommend.data.results);
            setMovie(newData);
        });
    };

    useEffect(() => {
        if (isfirst.current) {
            getData();
            document.getElementById('watch-video-img-id').classList.remove(`${cx('remove')}`);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.idfilm]);

    const handleShowVieo = (e) => {
        e.target.parentElement.classList.add(`${cx('remove')}`);
        // e.target.parentElement.remove();
        const iframe = document.getElementById('Watch-iframe');
        iframe.src += '?rel=0&autoplay=1';
    };
    return (
        <div className={cx('Watch-wrapper')}>
            <h3>{movie.original_title}</h3>
            <div className={cx('Watch-video-Wrapper')}>
                <iframe
                    id="Watch-iframe"
                    className={cx('Watch-iframe')}
                    src={`https://www.youtube.com/embed/${movie.idYT}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen=""
                ></iframe>
                <div className={cx('Watch-video-img')} id="watch-video-img-id">
                    <img
                        src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : no_img}
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
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : no_img}
                            alt=""
                        />
                    </div>
                    <div className={cx('Watch-video-infor')}>
                        <h1 className={cx('Watch-video-infor-name')}>{movie.original_title}</h1>
                        <div className={cx('Watch-video-infor-start-duration')}>
                            <FontAwesomeIcon icon={faStar} /> {movie.vote_average}
                            <span className={cx('Watch-video-infor-duration')}>{movie.runtime}min</span>
                        </div>
                        <p className={cx('Watch-video-infor-overview')}>{movie.overview}</p>

                        <div className={cx('Watch-video-more-infor')}>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Released:</span>
                                <span className={cx('Watch-video-more-infor-content')}>{movie.release_date}</span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Genres:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.genres &&
                                        movie.genres.map(
                                            (item, index) =>
                                                `${item.name}${index < movie.genres.length - 1 ? ', ' : ''}`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Countries:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.production_countries &&
                                        movie.production_countries.map(
                                            (item, index) =>
                                                `${item.name}${
                                                    index < movie.production_countries.length - 1 ? ', ' : ''
                                                }`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Production:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.production_companies &&
                                        movie.production_companies.map(
                                            (item, index) =>
                                                `${item.name}${
                                                    index < movie.production_companies.length - 1 ? ', ' : ''
                                                }`,
                                        )}
                                </span>
                            </div>
                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Cast:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.cast &&
                                        movie.cast.map(
                                            (item, index) => `${item.name}${index < movie.cast.length - 1 ? ', ' : ''}`,
                                        )}
                                </span>
                            </div>

                            <div className={cx('Watch-video-more-infor-item')}>
                                <span className={cx('Watch-video-more-infor-title')}>Keywords:</span>
                                <span className={cx('Watch-video-more-infor-content')}>
                                    {movie.keywords &&
                                        movie.keywords.map(
                                            (item, index) =>
                                                `${item.name}${index < movie.keywords.length - 1 ? ', ' : ''}`,
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
                    {movieRecomment.map((item) => (
                        <MovieItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Watch;
