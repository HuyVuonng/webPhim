import classNames from 'classnames/bind';
import styles from './Genre.module.scss';
import { useEffect, useState } from 'react';
import httpRequest from '../../httpRequest/httprequest';
import MovieItem from '../../../Components/MovieItem/MovieItem';
import ReactPaginate from 'react-paginate';
import { useParams, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Genre() {
    const [GenreItem, setGenreItem] = useState([]);
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams({});
    let currentPage = searchParams.get('page');
    window.scrollTo(0, 0);

    const getData = async () => {
        await httpRequest
            .get('/search/movie', {
                params: { api_key: import.meta.env.VITE_API_Key, page: currentPage, query: params.slug },
            })
            .then((res) => {
                setGenreItem(res.data.results);
            });
    };

    useEffect(() => {
        document.title = 'Genres';
        const width = document.body.clientWidth;
        const soItem = Math.floor(width / 200);
        const box = document.querySelectorAll(`.${cx('Genre-content')}`);
        for (let i = 0; i < box.length; i++) {
            box[i].style.gridTemplateColumns = `repeat(${soItem}, 1fr)`;
        }
    }, []);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, params]);

    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        setSearchParams({ page });
    };
    return (
        <div className={cx('Genre-wrapper')}>
            <span className={cx('Genre-title')}>Genres {params.slug}</span>
            <div className={cx('Genre-content')}>
                {GenreItem.map((item) => (
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

// eslint-disable-next-line react-refresh/only-export-components
export default Genre;