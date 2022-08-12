import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {postsSlice} from '../../../store/posts/postsSlice';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Post from './Post';


export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const statePage = useSelector(state => state.posts.page);
  const {page} = useParams();

  useEffect(() => {
    dispatch(postsSlice.actions.postsClear());
    if (statePage) {
      dispatch(postsRequestAsync());
    }
  }, [token]);

  useEffect(() => {
    if (page !== statePage) {
      dispatch(postsSlice.actions.changePage(page));
    }
  });

  const posts = useSelector(state => state.posts.posts);
  const loading = useSelector(state => state.posts.loading);
  const after = useSelector(state => state.posts.after);
  const pageNumber = useSelector(state => state.posts.pageNumber);
  const endList = useRef(null);

  const firstLoading = after ? false : loading;

  const isShowButton = pageNumber >= 2;

  const handleClick = (e) => {
    e.target.blur();
    dispatch(postsRequestAsync());
  };


  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '50px',
    });

    if (endList.current) {
      observer.observe(endList.current);
    }
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [after]);

  return (
    <>
      <ul className={style.list}>
        {firstLoading ? (
        <Preloader size={100} />
        ) : (
        <>
          {console.log('render')}
          {posts.map(post =>
            <Post key={generateRandomId()} postData={post.data} />)}
        </>
        )
        }
        {loading && !firstLoading ? (
          <Preloader size={45} />
        ) : (
        after && (
          isShowButton ? (
            <button
              className={style.btn}
              onClick={handleClick}
            >
              загрузить ещё
            </button>
          ) : (
            <li className={style.end} ref={endList}/>
          )
        ))}
      </ul>
      <Outlet />
    </>
  );
};
