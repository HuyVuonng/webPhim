// import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import classNames from 'classnames/bind';
import styles from './LayoutWithSmallHeader.module.scss';
import SmallHeader from '../Components/SmallHeader/SmallHeader';
import { useRef } from 'react';

const cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function LayoutWithSmallHeader({ children }) {
    const widthDevice = useRef(window.matchMedia('(max-width: 63.9375em)'));

    return (
        <div className="wrapper">
            {widthDevice.current.matches ? <Header /> : <SmallHeader />}

            <main className={cx('container')}>
                <aside className={cx('content')}>{children}</aside>
            </main>
            <Footer />
        </div>
    );
}

export default LayoutWithSmallHeader;
