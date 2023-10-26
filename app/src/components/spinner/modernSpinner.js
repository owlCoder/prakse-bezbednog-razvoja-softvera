export const ModernSpinner =
    `
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <svg
        className={"animate-spin h-16 w-16 text-blue-500"}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
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
          d="M4 12a8 8 0 018-8V2.83a1 1 0 011.41 0l6 6a1 1 0 010 1.41l-6 6a1 1 0 01-1.41 0V12a8 8 0 01-8-8z"
        ></path>
      </svg>
    </div>`;