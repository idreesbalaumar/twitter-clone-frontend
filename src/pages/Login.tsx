import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/x-by-bt.png";
import googleLogo from "../assets/images/icons8-google.svg";
import appleLogo from "../assets/images/icons8-apple.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Clear errors and success messages on component mount
    setErrors({});
    setSuccessMessage(null);
  }, []);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    };

  const handleLogin = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        setSuccessMessage("Login successful!");
        setErrors({});
        setTimeout(() => {
          navigate("/tweets");
        }, 2000);
      })
      .catch((error) => {
        setErrors((prevErrors) => ({ ...prevErrors, server: error.message }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pt-8 flex flex-col items-center justify-center">
      <div className="text-center">
        <img src={logo} alt="Logo" className="w-[70px] md:w-[90px]" />
      </div>
      <div className="flex flex-col shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-left text-xl sm:text-3xl text-white">
          Sign in to X
        </div>
        <div className="mt-10 grid space-y-5">
          <button className="group h-10 px-6 rounded-full transition duration-300 hover:bg-zinc-300 bg-white active:bg-blue-100">
            <div className="relative flex items-center justify-center">
              <img
                src={googleLogo}
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="roboto-font block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 sm:text-base">
                Sign in with Google
              </span>
            </div>
          </button>
          <button className="group h-10 px-6 rounded-full transition duration-300 hover:bg-zinc-300 bg-white active:bg-blue-100">
            <div className="relative flex items-center justify-center">
              <img
                src={appleLogo}
                className="absolute left-0 w-5"
                alt="apple logo"
              />
              <span className="roboto-font block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 sm:text-base">
                Sign in with Apple
              </span>
            </div>
          </button>
        </div>
        <div className="flex items-center space-x-4 my-3">
          <hr className="w-full border-1 border-zinc-700" />
          <div className="text-white">Or</div>
          <hr className="w-full border-1 border-zinc-700" />
        </div>
        {errors.server && (
          <div className="text-center bg-red-500 text-white py-2 px-4 mb-5 rounded-md flex items-center justify-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            <small className="font-source-code-pro">
              {errors.server}
            </small>
          </div>
        )}
        {successMessage && (
          <div className="text-center bg-green-500 text-white py-2 px-4 mb-5 rounded-md flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <small className="font-source-code-pro">
              {successMessage}
            </small>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <input
            className={`w-full roboto-font px-5 py-3 rounded-lg font-medium bg-black border font-semibold ${
              errors.email ? "border-red-500" : "border-zinc-700"
            } placeholder-zinc-700 text-sm focus:outline-none ${
              errors.email ? "focus:border-red-500" : "focus:border-blue-400"
            } text-gray-100`}
            type="email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            placeholder="Enter your email"
          />
          {errors.email && (
            <small className="text-red-500 mt-[-15px] font-source-code-pro">
              {errors.email}
            </small>
          )}
          <div className="relative w-full">
            <input
              className={`w-full roboto-font px-5 py-3 rounded-lg font-medium bg-black border font-semibold ${
                errors.password ? "border-red-500" : "border-zinc-700"
              } placeholder-zinc-700 text-sm focus:outline-none ${
                errors.password
                  ? "focus:border-red-500"
                  : "focus:border-blue-400"
              } text-gray-100`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword, "password")}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <small className="text-red-500 mt-[-15px] font-source-code-pro">
              {errors.password}
            </small>
          )}
          <button
            onClick={handleLogin}
            className="roboto-font tracking-wide font-semibold bg-white text-black w-full py-2 rounded-full hover:bg-zinc-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-black"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12A10 10 0 0012 22v-4a6 6 0 01-6-6H2z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              <span className="ml-3">Sign in</span>
            )}
          </button>
          <button className="roboto-font tracking-wide font-semibold bg-black border-zinc-700 border text-white w-full py-2 rounded-full hover:bg-zinc-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <span className="ml-3">Forgot password?</span>
          </button>
          <p className="text-1xl text-zinc-700 font-semibold text-left roboto-font">
            Don't have an account?{" "}
            <span className="text-blue-400">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
