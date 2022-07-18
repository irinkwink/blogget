import style from './List.module.css';
import Post from './Post';

export const List = props => {
  const postData = {
    thubmnail: '',
    // eslint-disable-next-line max-len
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos alias accusamus, et ut error doloremque.',
    author: 'Nickname',
    ups: 24,
    date: '2022-02-24T00:45:00.000Z',
  };

  return (
    <ul className={style.list}>
      <Post postData={postData} />
    </ul>
  );
};
