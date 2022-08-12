import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {
  postsDataClear,
  postsDataRequestAsync
} from '../../../store/postsData/postsDataAction';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const token = useSelector(state => state.token.token);
  const postsData = useSelector(state => state.postsData.posts);
  const loading = useSelector(state => state.postsData.loading);
  const after = useSelector(state => state.postsData.after);
  const pageNumber = useSelector(state => state.postsData.pageNumber);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();


  const firstLoading = after ? false : loading;

  const isShowButton = pageNumber >= 2;

  const handleClick = (e) => {
    e.target.blur();
    dispatch(postsDataRequestAsync());
  };

  useEffect(() => {
    dispatch(postsDataClear(page));
    if (page) {
      dispatch(postsDataRequestAsync(page));
    }
  }, [token]);

  useEffect(() => {
    dispatch(postsDataRequestAsync(page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsDataRequestAsync());
      }
    }, {
      rootMargin: '200px',
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
            {postsData.map(postData =>
              <Post key={generateRandomId()} postData={postData.data} />)}
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
