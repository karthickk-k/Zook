"use client";

const Error = ({ reset }: { reset: () => void }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="text-3xl font-bold text-red-500">
                    Something went wrong!
                </div>
                <button onClick={() => reset()} className="mt-5 px-4 py-2 bg-blue-600 text-white rounded">
                    Try Again
                </button>
            </div>
        </div>
    );
}
export default Error
