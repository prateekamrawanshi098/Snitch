import React from 'react';

const ContinueWithGoogle = () => {
  return (
    <div>
      <a
        className="flex items-center justify-center gap-3 w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium border transition-all duration-300 rounded-none cursor-pointer"
        href="/api/auth/google"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e4e2df",
          color: "#1b1c1a",
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f3efe9";
          e.currentTarget.style.borderColor = "#d0c5b5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#e4e2df";
        }}
      >
        {/* Official Google G Logo SVG */}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-4.5 h-4.5 flex-shrink-0"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.53 2.87-2.13 5.31-4.5 6.91l7.02 5.44C43.38 35.75 46.5 30.3 46.5 24z"
          />
          <path
            fill="#FBBC05"
            d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.02-5.44c-2.19 1.47-5 2.38-8.87 2.38-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
        <span>continue with google</span>
      </a>
    </div>
  );
};

export default ContinueWithGoogle;