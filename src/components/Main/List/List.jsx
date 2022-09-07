import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {postsSlice} from '../../../store/posts/postsSlice';
import {searchClear} from '../../../store/search/searchAction';
import Preloader from '../../../UI/Preloader';
import {generateRandomId} from '../../../utils/generateRandomId';
import style from './List.module.css';
import Post from './Post';
import {Text} from '../../../UI/Text';
import {searchRequest} from '../../../store/search/searchAction.js';
import {useNavigate} from 'react-router-dom';


export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const statePage = useSelector(state => state.posts.page);
  const {page} = useParams();
  const search = useSelector(state => state.search.search);
  const navigate = useNavigate();


  let type = 'search';

  if (page) {
    type = 'posts';
  }

  useEffect(() => {
    if (page) {
      dispatch(postsSlice.actions.postsClear());
      if (statePage) {
        dispatch(postsRequestAsync());
      }
    }
  }, [token]);

  useEffect(() => {
    if (page) {
      if (page !== statePage) {
        dispatch(postsSlice.actions.changePage(page));
      }
    } else {
      dispatch(postsSlice.actions.postsClear());
      dispatch(postsSlice.actions.changePage(page));
      if (!search) {
        navigate(`/`);
      }
    }
  });

  const posts = useSelector(state => state[type].posts);
  const loading = useSelector(state => state[type].loading);
  const after = useSelector(state => state[type].after);
  const pageNumber = useSelector(state => state[type].pageNumber);
  const endList = useRef(null);

  const firstLoading = after ? false : loading;

  const isShowButton = pageNumber >= 2;

  const handleClick = (e) => {
    e.target.blur();
    if (page) {
      dispatch(postsRequestAsync());
    } else {
      dispatch(searchRequest());
    }
  };

  useEffect(() => {
    if (page) {
      dispatch(postsRequestAsync());
      dispatch(searchClear());
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page) {
          dispatch(postsRequestAsync());
        } else {
          dispatch(searchRequest());
        }
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
          posts.length > 0 ? (
            <>
              {posts.map(post =>
                <Post key={generateRandomId()} postData={post.data} />)}
            </>
          ) : (
            <div className={style.wrapper}>
              <Text As='p' color='orange' size={22} tsize={26} center>
                Нет постов по данному запросу!
              </Text>
              <Text As='p' size={20} tsize={24} center>
                Попробуйте изменить текст поиска.
              </Text>
            </div>
          )
        )}
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
