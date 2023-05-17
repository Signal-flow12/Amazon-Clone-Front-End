import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import BooksIndex from './pages/BooksIndex';
import BookShow from './pages/BookShow';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <h1>Amazon Clone</h1>
      <Header />
      <Routes>
       < Route path='/' element={<Home /> } />
       < Route path='/books'>
        <Route path='' element={<BooksIndex />} />
        <Route path=':bookId' element={<BookShow />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
