import style from './Comments.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text';
import Date from '../../Main/List/Post/Date';

export const Comments = ({comments}) => {
  if (comments.length === 0) {
    return (
      <Text As='p' className={style.nocomment} size={14} tsize={18}>
        Нет комментариев
      </Text>
    );
  }

  const currentComments = comments[comments.length - 1].kind === 'more' ?
    comments.slice(0, -1) :
    comments;

  return (
    <ul className={style.list}>
      {currentComments.map((item) => (
        <li key={item.data.id} className={style.item}>
          <Text As='h3' className={style.author} size={18} tsize={22}>
            {item.data.author}
          </Text>
          <Text As='p' className={style.comment} size={14} tsize={18}>
            {item.data.body}
          </Text>
          <Date date={item.data.created} />
        </li>
      ))}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
