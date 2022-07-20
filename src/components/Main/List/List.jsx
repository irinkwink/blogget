/* eslint-disable react/jsx-key */
import style from './List.module.css';
import Post from './Post';

export const List = props => {
  const postsData = [
    {
      thubmnail: '',
      title: 'Title1',
      author: 'Nickname1',
      ups: 24,
      date: '2022-02-24T00:45:00.000Z',
      id: '456'
    },
    {
      thubmnail: '',
      title: 'Title2',
      author: 'Nickname2',
      ups: 77,
      date: '2022-01-04T12:45:00.000Z',
      id: '324'
    },
    {
      thubmnail: '',
      title: 'Title3',
      author: 'Nickname3',
      ups: 56,
      date: '2022-03-10T15:08:00.000Z',
      id: '287'
    },
    {
      thubmnail: '',
      title: 'Title4',
      author: 'Nickname4',
      ups: 22,
      date: '2022-04-03T16:10:00.000Z',
      id: '459'
    },
  ];

  return (
    <ul className={style.list}>
      {postsData.map(postData => <Post key={postData.id} postData={postData} />)
      }
    </ul>
  );
};
