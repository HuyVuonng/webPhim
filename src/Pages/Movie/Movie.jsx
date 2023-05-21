import classNames from 'classnames/bind';
import styles from './Movie.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '../../httpRequest/httprequest';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Movie() {
    const [movieItem, setMovieItem] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const isfirst = useRef(true);
    let currentPage = searchParams.get('page');

    const getData = async () => {
        await httpRequest
            .get('/discover/movie', { params: { api_key: import.meta.env.VITE_API_Key, page: currentPage } })
            .then((res) => {
                setMovieItem(res.data.results);
            });
    };

    useEffect(() => {
        document.title = 'Movies';
        const width = document.body.clientWidth;
        const soItem = Math.floor(width / 172);
        const box = document.querySelectorAll(`.${cx('Movie-content')}`);
        for (let i = 0; i < box.length; i++) {
            box[i].style.gridTemplateColumns = `repeat(${soItem}, 1fr)`;
        }
    }, []);

    useEffect(() => {
        if (isfirst.current) {
            getData();
            window.scrollTo(0, 0);

            isfirst.current = false;

            setTimeout(() => {
                isfirst.current = true;
            }, 1000);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        setSearchParams({ page });
    };
    return (
        <div className={cx('Movie-wrapper')}>
            <span className={cx('Movie-title')}>Movies</span>
            <div className={cx('Movie-content')}>
                {movieItem.map((item) => (
                    <MovieItem key={item.id} data={item} />
                ))}
            </div>

            <ReactPaginate
                className={cx('phantrang')}
                pageClassName={cx('phantrang-page')}
                activeClassName={cx('phantrang-PageActive')}
                pageLinkClassName={cx('phantrang-PageLink')}
                marginPagesDisplayed={1}
                forcePage={+currentPage - 1}
                breakLabel="..."
                nextLabel={currentPage < 500 && '>'}
                onPageChange={handlePageClick}
                pageCount={500}
                pageRangeDisplayed={2}
                previousLabel={currentPage > 1 && '<'}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default Movie;
