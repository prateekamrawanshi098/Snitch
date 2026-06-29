import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from "../components/continueWithGoogle";


const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: formData.email,
      password: formData.password,
    });
    navigate("/");
  };

  const inputStyle = {
    color: "#1b1c1a",
    borderBottom: "1px solid #d0c5b5",
    fontFamily: "'Inter', sans-serif",
  };

  const handleFocus = (e) => {
    e.target.style.borderBottomColor = "#C9A96E";
  };
  const handleBlur = (e) => {
    e.target.style.borderBottomColor = "#d0c5b5";
  };

  return (
    <>
      {/* Google Fonts and Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── LEFT: Editorial Image Panel ── */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ backgroundColor: "#f5f3f0" }}
        >
          <img
            src="/snitch_editorial_clear.png"
            alt="Snitch Fashion Editorial"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.97)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 p-14 flex flex-col justify-between z-10">
            <span
              className="text-sm font-medium tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A96E",
              }}
            >
              Snitch.
            </span>
            <div>
              <p
                className="text-5xl xl:text-6xl font-light leading-[1.08] text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Define your
                <br />
                <em>aesthetic.</em>
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form Panel ── */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16 overflow-y-auto"
          style={{ backgroundColor: "#fbf9f6" }}
        >
          <div className="w-full max-w-sm">
            {/* Mobile brand mark */}
            <div className="lg:hidden mb-14">
              <span
                className="text-sm tracking-[0.35em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#C9A96E",
                }}
              >
                Snitch.
              </span>
            </div>

            {/* Header */}
            <div className="mb-12">
              <p
                className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
                style={{ color: "#C9A96E" }}
              >
                Welcome back to Snitch
              </p>
              <h1
                className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                Sign In
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-email"
                  className="text-[10px] uppercase tracking-[0.18em] font-medium"
                  style={{ color: "#7A6E63" }}
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@example.com"
                  className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="login-password"
                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                    style={{ color: "#7A6E63" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
                    style={{ color: "#7A6E63" }}
                    onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
                    onMouseLeave={(e) => (e.target.style.color = "#7A6E63")}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none py-3 pr-10 text-sm transition-colors duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
                    style={{ color: "#7A6E63" }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember me — minimal checkbox */}
              <label
                htmlFor="login-rememberMe"
                className="flex items-center gap-4 cursor-pointer group"
              >
                <div className="relative flex-shrink-0">
                  <input
                    id="login-rememberMe"
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  {/* Custom checkbox */}
                  <div
                    className="w-4 h-4 border transition-all duration-200 flex items-center justify-center peer-checked:border-[#C9A96E]"
                    style={{
                      borderColor: formData.rememberMe ? "#C9A96E" : "#d0c5b5",
                      backgroundColor: formData.rememberMe
                        ? "#C9A96E"
                        : "transparent",
                    }}
                  >
                    {formData.rememberMe && (
                      <svg
                        className="w-2.5 h-2.5"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#fbf9f6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className="text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
                  style={{ color: formData.rememberMe ? "#C9A96E" : "#7A6E63" }}
                >
                  Remember me
                </span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-2"
                style={{
                  backgroundColor: "#1b1c1a",
                  color: "#fbf9f6",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C9A96E";
                  e.currentTarget.style.color = "#1b1c1a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1b1c1a";
                  e.currentTarget.style.color = "#fbf9f6";
                }}
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#e4e2df" }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: "#B5ADA3" }}
                >
                  or
                </span>


                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#e4e2df" }}
                />
              </div>

              <ContinueWithGoogle />


              {/* Footer Link */}
              <p
                className="text-center text-[11px]"
                style={{ color: "#B5ADA3" }}
              >
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="transition-colors duration-200"
                  style={{
                    color: "#7A6E63",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
                  onMouseLeave={(e) => (e.target.style.color = "#7A6E63")}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;