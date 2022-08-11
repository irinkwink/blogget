import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes} from 'react-router-dom';
import Modal from '../Modal';
import {Text} from '../../UI/Text';

export const Main = (props) => {
  console.log();
  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <Routes>
          <Route path='/' element={
            <div className={style.mainPage}>
              <Text As='h1' color='orange' size={22} tsize={26} center>
                Стартовая страница
              </Text>
              <Text As='p' size={20} tsize={24} center>
                Добро пожаловать!
              </Text>
              <Text As='p' size={16} tsize={18} center>
                Выберите категорию
              </Text>
            </div>
          }/>
          <Route path='/auth' element={
            <div className={style.mainPage}>
              <Text As='p' color='orange' size={22} tsize={26} center>
                Поздравляю, вы успешно авторизовались!
              </Text>
              <Text As='p' size={20} tsize={24} center>
                Теперь лента постов будет строиться
                в соответствии с вашими интересами.
              </Text>
              <Text As='p' size={20} tsize={24} center>
                И вы можете писать комментарии.
              </Text>
              <Text As='p' size={16} tsize={18} center>
                Выберите категорию
              </Text>
            </div>
          }/>
          <Route path='*' element={
            <div className={style.mainPage}>
              <Text As='p' color='orange' size={20} tsize={24} center>
                Oшибка 404
              </Text>
              <Text As='p' size={16} tsize={18} center>
                Страницы с таким адресом не существует!
              </Text>
            </div>
          }/>
          <Route path='category/:page' element={
            <List />
          }>
            <Route path='post/:id' element={
              <Modal />
            }></Route>
          </Route>
        </Routes>
      </Layout>
    </main>
  );
};

