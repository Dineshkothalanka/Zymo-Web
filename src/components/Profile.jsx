import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import { appAuth } from "../utils/firebase";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";


function UserNavigation(label) {
  ReactGA.event({
    category: 'User Interaction',
    action: 'Link Clicked',
    label: label, 
  });
}

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const user = appAuth.currentUser;
    if (user) {
      appAuth.signOut().then(() => {
        toast.success("Logged Out...", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      }).catch((error) => {
        console.error(error);
        toast.error(error.message || "Something went wrong...", {
          position: "top-center",
          autoClose: 5000
        })
      })
      
      UserNavigation("Account Logout");
    } else {
      toast.error("Not signed in..", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-white m-5 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="min-h-screen bg-[#212121] p-4">
        <div className="max-w-md mx-auto bg-[#424242] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Profile</h2>

          {/* Your Details Section */}
          <Link to="/details" onClick={()=>UserNavigation("Your Details")}>
            <div className="bg-gray-50 p-3 rounded-lg mb-3 flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-700 text-lg" />
                <span className="text-gray-800 font-medium">Your Details</span>
              </div>
            </div>
          </Link>

          {/* Your Bookings Section */}
          <Link to="/my-bookings" onClick={()=>UserNavigation("Your Bookings")}>
            <div className="bg-gray-50 p-3 rounded-lg mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaCar className="text-gray-700 text-lg" />
                <span className="text-gray-800 font-medium">Your Bookings</span>
              </div>
            </div>
          </Link>

          {/* Horizontal Line */}
          <hr className="border-gray-600 my-3" />

          {/* Logout Section */}
          <div className="bg-red-100 p-3 rounded-lg flex items-center text-red-600 cursor-pointer" onClick={handleLogout}>
            <FaSignOutAlt className="text-lg mr-3" />
            <span className="font-medium">Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
