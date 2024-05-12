import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';

  const HandleRoute = (page) => {
    const navigate=useNavigate();
  navigate(page);
}
export default HandleRoute;