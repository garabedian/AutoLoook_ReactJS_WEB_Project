import './App.css'
import MainContent from "./components/maincontent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './components/custom.css';
import FileUpload from "./components/fileupload.jsx";

const isAuthenticated = () => {
    // Implement your authentication logic here
    return false;
};

const Header = () => {
    // Implement your header component here
    return <header style={{color: "pink", fontWeight: "bold"}}>Header</header>;
};

const Footer = () => {
    // Implement your footer component here
    return <footer style={{color: "pink", fontWeight: "bold"}}>Footer</footer>;
};

function App() {
    return (
      <>
          <Header/>
          <MainContent isAuthenticated={isAuthenticated}/>
          <FileUpload/>
          <Footer/>
      </>
    );
}

export default App
