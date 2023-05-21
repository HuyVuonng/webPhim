import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Watch() {
    const params = useParams();

    return <div className={cx('Watch-wrapper')}>Watch page {params.idfilm}</div>;
}

export default Watch;
