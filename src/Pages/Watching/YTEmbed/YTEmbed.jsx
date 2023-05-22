import classNames from 'classnames/bind';
import styles from './YTEmbed.module.scss';

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function YTEmbed({ idvideo, id }) {
    return (
        // id="Watch-iframe"
        // className={cx('Watch-iframe')}

        <iframe
            id={id}
            className={cx('Watch-iframe')}
            src={`https://www.youtube-nocookie.com/embed/${idvideo}?rel=0&autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
    );
}

export default YTEmbed;
