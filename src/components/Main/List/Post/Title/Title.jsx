import style from './Title.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';
import {Link, useParams} from 'react-router-dom';

export const Title = ({id, title, author, markdown}) => {
  const {page} = useParams();

  return (
    <>
      <Text As='h2' className={style.title}>
        <Link
          className={style.linkPost}
          to={`/category/${page}/post/${id}`}
        >
          <Text
            size={14}
            tsize={22}
          >
            {title}
          </Text>
        </Link>
      </Text>
    </>
  );
};

Title.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string
};
