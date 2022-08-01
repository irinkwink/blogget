import style from './Post.module.css';
import PropTypes from 'prop-types';
import Image from './Image';
import Title from './Title';
import Author from './Author';
import Rating from './Rating';
import Date from './Date';
import DeleteBtn from './DeleteBtn';


export const Post = ({postData}) => {
  const {
    thumbnail,
    title,
    author,
    ups,
    selftext: markdown,
    created_utc: date,
  } = postData;
  const thumb = (thumbnail === 'default' || thumbnail === 'self') ?
    '' : thumbnail;

  return (
    <li className={style.post}>
      <Image link={thumb} alt={title} />

      <div className={style.content}>
        <Title title={title} author={author} markdown={markdown} />
        <Author author={author} link='#author' />
      </div>

      <Rating ups={ups} />
      <Date date={date} />
      <DeleteBtn />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
