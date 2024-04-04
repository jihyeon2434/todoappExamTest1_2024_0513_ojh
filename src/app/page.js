'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import {
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  Tab,
  Tabs,
  Typography,
  Box,
  CssBaseline,
  TextField,
  Chip,
} from '@mui/material';
import RootTheme from './theme';
import { FaBars, FaCheck, FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';
import dateToStr from './dateUtil';
import classNames from 'classnames';

function useTodoStatus() {
  console.log('실행 1');
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };
    // setTodos((todos) => [...todos, newTodo]);
    setTodos((todos) => [newTodo, ...todos]); //리스트 역순으로 출력
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const modifyTodo = (id, content) => {
    const newTodos = todos.map((todo) => (todo.id != id ? todo : { ...todo, content }));
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
}

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) return;
    const title = newTodoTitle.trim();
    todoStatusaddTodo(title);
    setNewTodoTitle('');
  };

  return (
    <>
      <div className="flex items-center gap-x-3">
        <input
          className="input input-bordered"
          type="text"
          placeholder="새 할일 입력해"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          할 일 추가
        </button>
      </div>
    </>
  );
};

const TodoListItem = ({ todo, todoStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const readMode = !editMode;

  const enableEditMode = () => {
    setEditMode(true);
  };

  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };

  const cancleEdit = () => {
    setEditMode(false);
    setNewTodoTitle(todo.title);
  };
  const commitEdit = () => {
    if (newTodoTitle.trim().length == 0) return;

    todoStatus.modifyTodo(todo.id, newTodoTitle.trim());

    setEditMode(false);
  };

  return (
    <li className="flex items-center gap-x-3 mb-3">
      <span className="badge badge-accent badge-outline">{todo.id}</span>
      {readMode ? (
        <>
          <span>{todo.title}</span>
          <button className="btn btn-outline btn-accent" onClick={enableEditMode}>
            수정
          </button>
          <button className="btn btn-accent" onClick={removeTodo}>
            삭제
          </button>
        </>
      ) : (
        <>
          <input
            className="input input-bordered"
            type="text"
            placeholder="할 일 써"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button className="btn btn-accent" onClick={commitEdit}>
            수정완료
          </button>
          <button className="btn btn-accent" onClick={cancleEdit}>
            수정취소
          </button>
        </>
      )}
    </li>
  );
};

const TodoList = ({ todoStatus }) => {
  return (
    <>
      {todoStatus.todos.length == 0 ? (
        <h4>할 일 없음</h4>
      ) : (
        <>
          <h4>할 일 목록</h4>
          <ul>
            {todoStatus.todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

//사이드바 관련
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
let AppCallCount = 0;
function App() {
  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  // const todoState = useTodoStatus(); // 리액트 커스텀 훅, 할일관련 use
  const todosState = useTodoStatus(); // 리액트 커스텀 훅
  React.useEffect(() => {
    todosState.addTodo('스쿼트\n런지');
    todosState.addTodo('벤치');
    todosState.addTodo('데드');
    // todosState.addTodo('벤치');
    // todosState.addTodo('데드');
  }, []);
  //할일 관련
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert('할 일 써');
      form.content.focus();
      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = '';
    form.content.focus();
  };

  //사이드바
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="tw-flex-1">
            <FaBars onClick={() => setOpen(true)} className="tw-cursor-pointer" />
          </div>
          <div className="logo-box">
            <a href="/" className="tw-font-bold">
              NOTE!
            </a>
          </div>
          <div className="tw-flex-1 tw-flex tw-justify-end">
            <a href="/write">글쓰기</a>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ width: '100%' }} className="tw-justify-center">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      <section className="tw-h-1 tw-flex tw-items-center tw-justify-center tw-text-[2rem]">
        section
      </section>
      <Button onClick={() => setOpen(true)}>show drawer</Button>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemButton>
            <Link href="/write">글 쓰기</Link>
          </ListItemButton>
          <ListItemButton>사과</ListItemButton>
          <ListItemButton>바나나</ListItemButton>
        </List>
      </Drawer>
      <AppBar position="fixed">
        <Toolbar>
          <div className="tw-flex-1">
            <FaBars onClick={() => setOpen(true)} className="tw-cursor-pointer" />
            rounded
          </div>
          <div className="logo-box">
            <a href="/" className="tw-font-bold">
              TODO!
            </a>
          </div>
          <div className="tw-flex-1 tw-flex tw-justify-end">
            <a href="/write">글쓰기</a>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <form className="tw-flex tw-flex-col tw-p-4 tw-gap-2" onSubmit={onSubmit}>
        <TextField
          multiline
          minRows={3}
          maxRows={10}
          name="content"
          autoComplete="off"
          label="할 일을 입력해"
          variant="outlined"
        />
        <Button className="tw-font-bold" variant="contained" type="submit">
          추가
        </Button>
      </form>
      할 일 갯수 : {todosState.todos.length}
      <nav>
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={todo.id}>
              <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-3">
                <div className="tw-flex tw-gap-x-2 tw-font-bold">
                  <Chip className="tw-pt-[3px]" label={`번호 : ${todo.id}`} variant="outlined" />
                  <Chip
                    className="tw-pt-[3px]"
                    label={`날짜 : ${todo.regDate}`}
                    variant="outlined"
                    color="primary"
                  />
                </div>
                <div className="tw-rounded-[10px] tw-shadow tw-flex tw-text-[14px]">
                  <Button
                    className="tw-flex-shrink-0 tw-rounded-[10px_0_0_10px] hover:tw-bg-red-300 tw-items-start"
                    color="inherit">
                    <FaCheck
                      className={classNames(
                        'tw-text-3xl',
                        {
                          'tw-text-[--mui-color-primary-main]': index % 2 == 0,
                        },
                        { 'tw-text-[#dcdcdc]': index % 2 != 0 },
                      )}
                    />
                  </Button>
                  <div className="tw-bg-blue-500 tw-flex-grow hover:tw-text-[--mui-color-primary-main] tw-whitespace-pre-wrap tw-leading-relaxed tw-break-words">
                    {todo.content}
                  </div>
                  {/* <div className="tw-bg-green-500 tw-w-[150px] tw-flex-shrink-0">후</div> */}
                  <Button className="tw-flex-shrink-0 tw-rounded-[0_10px_10px_0]" color="inherit">
                    <FaEllipsisV className="tw-text-[#dcdcdc] tw-text-2xl" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default function themeApp() {
  console.log('실행 2');
  const theme = RootTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
