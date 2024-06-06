import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, resetAuthState } from "../features/auth/authSlice";
import { RootState, AppDispatch } from "../store/store";
import { SignUpArgs } from "../features/auth/authSlice";
import logo from "../assets/images/x-by-bt.png";
import googleLogo from "../assets/images/icons8-google.svg";
import appleLogo from "../assets/images/icons8-apple.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.error) {
      const errorMessage = typeof authState.error === 'string' ? authState.error : authState.error?.message;
      setErrors((prevErrors) => ({ ...prevErrors, server: errorMessage }));
      setSuccessMessage(null);
      setLoading(false);
    } else if (authState.success) {
      setSuccessMessage("Sign up successful!");
      setErrors({});
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      dispatch(resetAuthState());
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/login");
      }, 1000);
    }
  }, [authState, dispatch, navigate]);

  useEffect(() => {
    // Clear errors and success messages on component mount
    setErrors({});
    setSuccessMessage(null);
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) newErrors.name = "Name is required";
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
      setSuccessMessage(null);
    };

  const handleSignUp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const signUpData: SignUpArgs = { name, email, password };
    setLoading(true);
    try {
      await dispatch(signUp(signUpData)).unwrap();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen">
      <div className="w-full lg:w-1/2 flex justify-center items-center py-4 lg:py-0">
        <img src={logo} alt="Twitter by Barnksforte" className="w-20 lg:w-[400px]" />
      </div>
      <div className="lg:pr-36 md:pr-52 sm:20 p-8 pt-0 w-full lg:w-1/2 h-full flex items-center justify-center">
        <div className="w-full">
          <div className="text-left">
            <h1 className="text-3xl xl:text-6xl lg:text-6xl md:text-6xl font-extrabold text-white mb-0">
              Happening now
            </h1>
            <p className="text-[20px] md:text-[30px] xl:text-[30px] lg:text-[30px] text-white md:mt-[30px] lg:mt-[30px] xl:mt-[30px] mt-4">
              Join today.
            </p>
          </div>
          <div className="w-full mt-5 grid space-y-2">
            <button className="group h-10 px-6 rounded-full transition duration-300 hover:bg-zinc-200 bg-white active:bg-blue-100 md:w-[310px] lg:w-[310px] xl:w-[310px]">
              <div className="relative flex items-center justify-center">
                <img
                  src={googleLogo}
                  className="absolute left-0 w-5"
                  alt="google logo"
                />
                <span className="roboto-font block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 sm:text-base">
                  Sign up with Google
                </span>
              </div>
            </button>
            <button className="group h-10 px-6 rounded-full transition duration-300 hover:bg-zinc-200 bg-white active:bg-blue-100 md:w-[310px] lg:w-[310px] xl:w-[310px]">
              <div className="relative flex items-center justify-center">
                <img
                  src={appleLogo}
                  className="absolute left-0 w-5"
                  alt="apple logo"
                />
                <span className="roboto-font block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 sm:text-base">
                  Sign up with Apple
                </span>
              </div>
            </button>
          </div>
          <div className="flex items-center space-x-4 my-2 md:w-[310px] lg:w-[310px] xl:w-[310px]">
            <hr className="w-full border-1 border-zinc-700" />
            <div className="text-white">Or</div>
            <hr className="w-full border-1 border-zinc-700" />
          </div>
          <div className="mx-auto flex flex-col gap-4">
            {errors.server && (
              <div className="text-center bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center md:w-[310px] lg:w-[310px] xl:w-[310px]">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                <small className="font-source-code-pro">{errors.server}</small>
              </div>
            )}
            {successMessage && (
              <div className="text-center bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center md:w-[310px] lg:w-[310px] xl:w-[310px]">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                <small className="font-source-code-pro">{successMessage}</small>
              </div>
            )}
            <input
              className={`w-full roboto-font px-5 py-3 rounded-lg font-medium bg-black border md:w-[310px] lg:w-[310px] xl:w-[310px] font-semibold ${
                errors.name ? "border-red-500" : "border-zinc-700"
              } placeholder-zinc-700 text-sm focus:outline-none ${
                errors.name ? "focus:border-red-500" : "focus:border-blue-400"
              } text-gray-100`}
              type="text"
              value={name}
              onChange={handleInputChange(setName, "name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <small className="text-red-500 mt-[-15px] font-source-code-pro">
                {errors.name}
              </small>
            )}
            <input
              className={`w-full roboto-font px-5 py-3 rounded-lg md:w-[310px] lg:w-[310px] xl:w-[310px] font-medium bg-black border font-semibold ${
                errors.email ? "border-red-500" : "border-zinc-700"
              } placeholder-zinc-700 text-sm focus:outline-none ${
                errors.email ? "focus:border-red-500" : "focus:border-blue-400"
              } text-gray-100`}
              type="email"
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              placeholder="Email"
            />
            {errors.email && (
              <small className="text-red-500 mt-[-15px] font-source-code-pro">
                {errors.email}
              </small>
            )}
            <div className="relative w-full md:w-[310px] lg:w-[310px] xl:w-[310px]">
              <input
                className={`w-full roboto-font px-5 py-3 rounded-lg font-medium bg-black border font-semibold ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                } placeholder-zinc-700 text-sm focus:outline-none ${
                  errors.password ? "focus:border-red-500" : "focus:border-blue-400"
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
              onClick={handleSignUp}
              className="roboto-font tracking-wide font-semibold bg-blue-400 text-gray-100 md:w-[310px] lg:w-[310px] xl:w-[310px] w-full py-2 rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                  Signing up...
                </>
              ) : (
                <span className="ml-3">Sign Up</span>
              )}
            </button>
            <p className="text-1xl text-zinc-700 font-semibold text-left roboto-font">
              Already have an account?{" "}
              <span className="text-blue-400">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
