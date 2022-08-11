import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import Comments from './Comments';
import FormComment from './FormComment';
import {Text} from '../../UI/Text';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const [post, comments, status, error] = useCommentsData(id);
  const token = useSelector(state => state.token.token);

  const overlayRef = useRef(null);

  const handleClick = (e) => {
    if (e.target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Escape') {
      navigate(`/category/${page}`); // navigate(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (
          <Text As='p' size={18} tsize={24}>
            Загрузка...
          </Text>)}
        {status === 'error' && (
          <Text As='p' size={18} tsize={24}>
            Ошибка: {error}
          </Text>)}
        {status === 'loaded' && (
          <>
            <Text As='h2' className={style.title} size={18} tsize={24}>
              {post.title}
            </Text>

            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>
                {post.selftext}
              </Markdown>
            </div>

            <Text As='p' className={style.author} size={14} tsize={16}>
              {post.author}
            </Text>

            {token ?
              <FormComment /> :
              <Text As='p' color='orange' size={16} tsize={20} bold>
                Авторизуйтесь, чтобы оставлять комментарии
              </Text>
            }

            <Comments comments={comments}/>
          </>
        )}

        <button
          className={style.close}
          onClick={() => {
            navigate(`/category/${page}`);
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

