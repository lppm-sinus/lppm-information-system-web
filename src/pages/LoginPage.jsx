import axios from "axios";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import ImageSinus from "@/assets/sinus.jpg";
import LogoTSU from "@/assets/LOGO TSU.png";
import ModalLogin from "@/components/molecules/ModalLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data.role);

        localStorage.getItem(
          "token",
          (window.location.href = "/admin/dashboard")
        );
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lppm_premier font-pop h-screen w-full flex justify-center items-center">
      <div className="flex gap-10 py-10 pl-10  w-[800px] h-[500px] bg-white rounded-2xl">
        <div className="w-1/2 h-full">
          <div className="h-full rounded-lg overflow-hidden relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <img
              src={ImageSinus}
              alt="STMIK Sinar Nusantara Surakarta"
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center">
          <div className="h-full flex flex-col justify-between">
            <div className="mb-5 flex justify-start relative">
              {!logoLoaded && (
                <div className="w-40 h-12 bg-gray-200 animate-pulse rounded" />
              )}
              <img
                src={LogoTSU}
                alt="TSU"
                className="w-40"
                onLoad={() => setLogoLoaded(true)}
                style={{
                  opacity: logoLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Login</h1>
              <p className="text-sm text-slate-400">
                Login to access your admin account
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="my-5 relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-3/4 py-2 px-4 outline-none border border-slate-400 rounded hover:border-slate-600 duration-200 peer focus:border-lppm_premier bg-inherit"
                  required
                />
                <span className="absolute left-0 top-2 px-1 tracking-wide peer-focus:text-lppm_premier pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                  Email
                </span>
              </div>
              <div className="mb-10 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-3/4 py-2 px-4 outline-none border border-slate-400 rounded hover:border-slate-600 duration-200 peer focus:border-lppm_premier bg-inherit"
                  required
                />
                <span className="absolute left-0 top-2 px-1 tracking-wide peer-focus:text-lppm_premier pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                  Password
                </span>
              </div>
              <div
                className="w-3/4 text-end my-2 text-xs cursor-pointer hover:text-lppm_sekunder"
                onClick={() => setShowModal(true)}
              >
                <p>Forget Password?</p>
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-2 text-white text-center bg-lppm_premier rounded-md flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
                {error && (
                  <div className="flex items-center gap-1 mt-2 text-red-500">
                    <FaCircleExclamation />
                    <p className="text-xs">{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalLogin isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LoginPage;
