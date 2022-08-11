import {usePostsData} from '../../../hooks/usePostsData';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Post from './Post';

export const List = props => {
  const [postsData, loading] = usePostsData();

  return (
    <ul className={style.list}>
      {loading ? (
        <Preloader size={100} />
      ) : (
        <>
          {postsData.map(postData =>
            <Post key={generateRandomId()} postData={postData.data} />)}
        </>
      )
      }
    </ul>
  );
};
