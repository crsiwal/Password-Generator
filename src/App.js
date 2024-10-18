import PasswordGenerator from "./partial/PasswordGenerator";
import passwordImage from "./assets/icons/password.svg";
import Faq from "./partial/FAQ";

const App = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4 fw-bold">Random Password Generator</h1>
            <p className="text-center text-muted">Create strong and secure passwords to keep your account safe online.</p>
          </div>
          <div className="col-12 col-md-5">
            <img src={passwordImage} className="img-fluid" alt="Random Password Generator" />
          </div>
          <div className="col-12 col-md-7">
            <PasswordGenerator />
          </div>
          <div className="col-12 my-5">
            <Faq />
          </div>
        </div>
      </div>
      <footer className="py-3 border-top ps-3 bg-light">
        <span className="text-muted">© {new Date().getFullYear()} RSIWAL</span>
      </footer>
    </>
  );
};

export default App;
