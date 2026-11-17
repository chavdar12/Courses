import { Route, Routes } from 'react-router';
import Header from './components/Header';
import {
    StreamCreate,
    StreamDelete,
    StreamEdit,
    StreamList,
    StreamShow,
} from './components/Streams';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<StreamList />} />
                <Route path="/streams/new" element={<StreamCreate />} />
                <Route path="/streams/edit/:id" element={<StreamEdit />} />
                <Route path="/streams/delete/:id" element={<StreamDelete />} />
                <Route path="/streams/:id" element={<StreamShow />} />
            </Routes>
        </>
    );
}
