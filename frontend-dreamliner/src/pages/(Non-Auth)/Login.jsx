import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

export default function Login() {
  // Dispatch
  const dispatch = useDispatch();
  // Selector
  const { loading, error, data, isLogin } = useSelector((state) => state.auth);

  // State untuk form login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Variable untuk check apakah form login valid
  const isFormValid = formData.email && formData.password;
  // State untuk toggle password
  const [showPassword, setShowPassword] = useState(false);

  // Function change handler untuk form login
  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Async function untuk handle submit form login
  async function submitHandler(e) {
    e.preventDefault();

    // Lakukan validasi form login
    if (!formData.email || !formData.password) {
      toast.error("Email dan password harus diisi");
      return;
    }
    // Lakukan request ke backend untuk login
    dispatch(login(formData));
  }

  // Function untuk toggle password
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-12 gap-10">
      {/* Awal Login Form */}
      <div className="w-full h-fit flex flex-col gap-4 justify-start items-start">
        {/* Awal Login Ke Instagram */}
        <div className="font-semibold">Login Ke Instagram</div>
        {/* Akhir Login Ke Instagram */}

        {/* Awal Form Login */}
        <form
          onSubmit={submitHandler}
          className="w-full h-fit flex flex-col gap-4 justify-start items-start"
        >
          {/* Awal Form */}
          <div className="w-full h-fit flex flex-col gap-3 justify-start items-start">
            {/* Awal Nomor ponsel, nama pengguna, atau email */}

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Nomor ponsel, nama pengguna, atau email"
              className="w-full h-fit px-2 py-3 outline-none border border-gray-300 rounded-lg   focus:ring-2 focus:ring-gray-500 transition-all duration-1000 ease-in-out text-sm "
              onChange={changeHandler}
              value={formData.email}
            />

            {/* Akhir Nomor ponsel, nama pengguna, atau email */}

            {/* Awal Kata Sandi */}
            <div className="w-full h-fit relative group">
              {/* Awal Input Password */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Kata Sandi"
                className="w-full h-fit px-2 py-3 rounded-lg outline-none border border-gray-300  focus:ring-2 focus:ring-gray-500 transition-all duration-1000 ease-in-out text-sm"
                onChange={changeHandler}
                value={formData.password}
              />
              {/* Akhir Input Password */}

              {/* Awal Toggle Password */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:opacity-100 opacity-0 transition-opacity duration-1000 ease-in-out"
                onClick={togglePassword}
              >
                {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
              </button>
              {/* Akhir Toggle Password */}
            </div>
            {/* Akhir Kata Sandi */}
          </div>
          {/* Akhir Form */}

          {/* Awal Button */}
          <button
            type="submit"
            className={`bg-blue-800 hover:bg-blue-600 w-full h-fit text-center py-2 rounded-2xl  ${isFormValid ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"} transition-all duration-300 ease-in-out text-sm font-semibold text-white `}
            disabled={!isFormValid || loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {/* Akhir Button */}
        </form>
        {/* Akhir Form Login */}

        {/* Awal Lupa Kata Sandi */}
        <Link
          to={"/accounts/password/reset"}
          className="hover:bg-gray-300 w-full h-fit text-center py-2 rounded-2xl cursor-pointer "
        >
          Lupa Kata Sandi?
        </Link>
        {/* Akhir Lupa Kata Sandi */}
      </div>
      {/* Akhir Login Form */}

      {/* Awal Login Auth */}
      <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
        {/* Awal Login Facebook */}
        <Link className="w-full h-fit flex justify-center items-center gap-2 py-2 rounded-2xl border border-gray-300 hover:bg-gray-300 transition-all duration-300 ease-in-out text-sm font-semibold ">
          {/* Awal Icon Facebook */}
          <FaFacebook className="text-blue-600" />
          {/* Akhir Icon Facebook */}

          {/* Awal Login Dengan Facebook */}
          <span>Login Dengan Facebook</span>
          {/* Akhir Login Dengan Facebook */}
        </Link>
        {/* Akhir Login Facebook */}

        {/* Awal Buat Akun Baru */}
        <Link
          to={"/auth/register"}
          className="text-blue-500 w-full h-fit text-center rounded-2xl border border-blue-500 hover:bg-gray-300 transition-all duration-300 ease-in-out py-2 text-sm font-semibold "
        >
          Buat Akun Baru
        </Link>
        {/* Akhir Buat Akun Baru */}

        {/* Awal Logo Meta */}
        <div className="w-full h-fit flex justify-center items-center gap-1">
          {/* Awal Icon Meta */}
          <FaMeta className="text-blue-700" size={20} />
          {/* Akhir Icon Meta */}

          {/* Awal Teks Meta */}
          <span className="font-semibold">Meta</span>
          {/* Akhir Teks Meta */}
        </div>
        {/* Akhir Logo Meta */}
      </div>
      {/* Akhir Login Auth */}
    </div>
  );
}
