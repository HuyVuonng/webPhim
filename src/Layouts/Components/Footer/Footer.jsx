import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    const navItem = [
        'Movies',
        'TV-Shows',
        'Most Watched',
        'Top IMDb',
        'Action',
        'Horror',
        'Sci-fi',
        'Thriller',
        'zoro anime',
        'Contact',
        'Request',
        'Sitemap',
    ];
    return (
        <>
            <div className={cx('footer-wrapper')}>
                <div className={cx('footer-content')}>
                    <div className={cx('footer-content-nav')}>
                        <h4 className={cx('footer-title')}>Links</h4>
                        <ul className={cx('footer-nav-list')}>
                            {navItem.map((item, index) => (
                                <Link to="/" key={index} className={cx('footer-nav-list-item-link')}>
                                    <li className={cx('footer-nav-list-item')}>{item}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('footer-aboutUS')}>
                        <h4 className={cx('footer-title')}>About Us</h4>
                        <p className={cx('footer-aboutUS-content')}>
                            <Link to="/" className={cx('footer-aboutUS-content-link')}>
                                FlixTor
                            </Link>{' '}
                            is a free movies streaming website with a big database, lots of great features and
                            beautifuly layout. With FlixTor, you can easily find and watch movies, tv shows for free in
                            high qualty without registration. FlixTor movies online, watch FlixTor free, free movies
                            FlixTor, FlixTor online
                        </p>
                        <i className={cx('footer-aboutUS-note')}>
                            This site does not store any files on our server, we only linked to the media which is
                            hosted on 3rd party services.
                        </i>
                    </div>
                </div>
            </div>
            <div className={cx('footer-nav')}>
                <Link to="/" className={cx('footer-nav-link')}>
                    Sitemap
                </Link>
                <Link to="/" className={cx('footer-nav-link')}>
                    Contact
                </Link>
                <Link to="/" className={cx('footer-nav-link')}>
                    About Us
                </Link>
                <Link to="/" className={cx('footer-nav-link')}>
                    DMCA
                </Link>
            </div>
        </>
    );
}

export default Footer;
