import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail, verifyEmailError } from "../../store/authSlice";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const token = query.get("token");

  const { loading, data, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      dispatch(verifyEmailError("Token is missing"));
      return;
    }
    dispatch(verifyEmail(token));
  }, [token]);

  // if (!loading && !data && !error && token) {
  //   <span>Preparing verification...</span>;
  // }

  return (
    <div className="bg-linear-to-br from-[#3d0563]  to-[#d37f0b] w-full min-h-screen flex justify-center items-center py-10">
      {/* Awal Verify */}
      <div className=" text-white w-96 h-120 rounded-4xl flex flex-col justify-center items-center py-2 px-6 gap-6">
        {/* Awal Icon Success/Time */}
        <div className="w-36 h-36 relative">
          <img
            src={`/assets/images/${loading ? "process" : error ? "error" : "success"}.png`}
            alt="Icon"
            className="absolute w-full h-full object-cover"
          />
        </div>
        {/* Akhir Icon Success/Time */}

        {/* Awal Teks Verifying/Success */}
        <span className="text-2xl font-bold">
          {loading
            ? "Verifying ..."
            : error
              ? "ERROR !!!"
              : "Successfully Verified!"}
        </span>
        {/* Akhir Teks Verifying/Success */}

        {/* Awal Info Verification/Success */}
        <span className="text-center font-semibold text-sm">
          {/* Awal Loading */}
          {loading &&
            "Almost there! We’re validating your information to complete the verification process."}
          {/* Akhir Loading */}

          {/* Awal Success */}
          {data && (
            <div className="w-full h-fit flex flex-col gap-4 justify-center items-center">
              {/* Awal Message Success */}
              <span className="text-center">
                Your account has been successfully verified. You're now ready to
                get started.
              </span>
              {/* Akhir Message Success */}

              {/* Awal Button to login */}
              <Link
                to={"/auth/login"}
                className="bg-green-800 py-2 px-4 rounded-xl cursor-pointer hover:bg-green-950 text-sm font-bold"
              >
                Go to Login
              </Link>
              {/* Akhir Button to login */}
            </div>
          )}
          {/* Akhir Success */}

          {/* Awal Error */}
          {error && (
            <div className="w-full h-fit flex flex-col gap-4 justify-center items-center">
              {/* Awal Message Error */}
              <span className="text-center">
                Sorry, We couldn’t verify your account due to{" "}
                <span className="font-bold text-2xl">{error}</span>
              </span>
              {/* Akhir Message Error */}

              {/* Awal Retry Button */}
              <button
                onClick={() => token && dispatch(verifyEmail(token))}
                disabled={loading}
                className="bg-blue-500 py-2 px-4 rounded-xl cursor-pointer hover:bg-blue-900 text-sm font-bold"
              >
                Retry Verification
              </button>
              {/* Akhir Retry Button */}

              {/* Awal Back */}
              <div className="w-fit h-fit flex justify-start items-center gap-4">
                {/* Awal Register */}
                <Link
                  className="hover:underline text-green-500"
                  to={"/auth/register"}
                >
                  Register again
                </Link>
                {/* Akhir Register */}

                {/* Awal Back Login */}
                <Link
                  className="hover:underline text-red-900"
                  to={"/auth/login"}
                >
                  Back to login
                </Link>
                {/* Akhir Back Login */}
              </div>
              {/* Akhir Back */}
            </div>
          )}
          {/* Akhir Error */}
        </span>
        {/* Awal Info Verification/Success */}
      </div>
      {/* Akhir Verify */}
    </div>
  );
}

// Your account has been successfully verified. You're now ready to get started.
// Almost there! We’re validating your information to complete the verification process.
