// import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import classNames from 'classnames/bind';
import styles from './DefaulLayout.module.scss';

const cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <main className={cx('container')}>
                <aside className="content">{children}</aside>
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
