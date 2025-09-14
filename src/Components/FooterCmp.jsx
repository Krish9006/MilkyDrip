import { Link } from "react-router-dom";
import { useState } from "react";
import PopUpComponent from "./PopUpComponent";

function FooterCmp() {
  const [email, setEmail] = useState("");
  const [msg,setMsg] = useState("");

  function loadPage(URL) {
    window.open(URL, "_blank");
  }

  function handleSubmit() {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      setMsg("Please Enter valid Mail id");
    } else {
      setMsg("Thank You! We will keep you updated ... ");
    }
    
    setEmail(""); 
    setTimeout(() => setMsg(""), 2100);
  
  }

  return (
    <>
      {msg && <PopUpComponent msg={msg} />}
      <footer className="bg-black text-white p-6 flex flex-row justify-between flex-wrap relative mt-3">
      {/* Col 1 */}
      <section>
        <h3 className="font-bold text-2xl styledFont">SignUp For Latest Update</h3>
        <div className="mt-3">
          <input type="text" className="border p-2 rounded min-w-[250px] text-black bg-white" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <button
            className="bg-[#D71313] p-2 ml-2 rounded hover:cursor-pointer" onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <h3 className="mt-3 font-bold" style={{textTransform:'uppercase'}}>Connect with us </h3>
        <div className="mt-2">
          <i
            className="min-w-[30px] text-center mr-2 border rounded-full p-2 fa-brands fa-facebook-f hover:text-blue-800 hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => loadPage("https://www.linkedin.com/in/imawadh/")}
          ></i>
          <i
            className="min-w-[30px] text-center mr-2 border rounded-full p-2 fa-brands fa-instagram hover:text-red-900 hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => loadPage("https://www.instagram.com/im_awadh_/")}
          ></i>
          <i
            className="min-w-[30px] text-center mr-2 border rounded-full p-2 fa-brands fa-twitter hover:text-black hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => loadPage("https://x.com/im_awadh_")}
          ></i>
          <i
            className="min-w-[30px] text-center mr-2 border rounded-full p-2 fa-brands fa-linkedin hover:text-blue-900 hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => loadPage("https://www.linkedin.com/in/imawadh/")}
          ></i>
        </div>
      </section>

      {/* Col 2 */}
      <section>
        <h3 className="font-bold text-2xl styledFont">Customer Service</h3>
        <nav className="mt-1 flex flex-col">
          <Link to="/collections" className="hover:text-yellow-400">
            Collections
          </Link>
          <Link to="/about" className="hover:text-yellow-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-yellow-400">
            FAQ
          </Link>
          <Link to="/return-policy" className="hover:text-yellow-400">
            Return Policy
          </Link>
          <Link to="/wholesale" className="hover:text-yellow-400">
            WholeSale
          </Link>
        </nav>
      </section>

      {/* Col 3 */}
      <section>
        <h3 className="font-bold text-2xl styledFont">Community</h3>
        <nav className="mt-1 flex flex-col">
          <Link className="hover:text-yellow-400" to="/affliates">
            Affliates
          </Link>
          <Link className="hover:text-yellow-400" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="hover:text-yellow-400" to="/terms-and-consitions">
            Terms and Conditions
          </Link>
          <Link className="hover:text-yellow-400" to="/artist-Login">
            Artist Login
          </Link>
        </nav>
      </section>
      </footer>
    </>
  );
}

export default FooterCmp;
