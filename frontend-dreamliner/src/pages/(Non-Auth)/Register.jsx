import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaMeta } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.auth);

  // State untuk form register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    bio: "",
    avatar: "",
  });

  //   State untuk toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  console.log(passwordsMatch, "pass");

  // useEffect untuk check apakah password dan confirm password match
  useEffect(() => {
    const timer = setTimeout(() => {
      checkPasswordsMatch(formData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.password, formData.confirmPassword]);

  // Function change handler
  function changeHandler(e) {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
  }

  // Async function untuk handle submit form register
  async function submitHandler(e) {
    e.preventDefault();

    // Validasi form data
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error(
        "Username, email, password, dan confirm password harus diisi",
      );
      return;
    }

    if (!passwordsMatch) {
      toast.error("Password dan confirm password harus match");
      return;
    }

    const { confirmPassword, ...dataToSubmit } = formData;

    const result = await dispatch(register(dataToSubmit));

    if (result && result.success) {
      toast.success(
        result.message ||
          "Register berhasil! Silakan cek email untuk verifikasi.",
      );

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    }
  }

  // Function check apakah password dan confirm password match
  function checkPasswordsMatch(data) {
    if (!data.confirmPassword) {
      setPasswordsMatch(true);
      return;
    }

    if (data.password && data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
  }

  //   Function untuk toggle password
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  //   Function untuk toggle confirm password
  function toggleConfirmPassword() {
    setShowConfirmPassword((prevState) => !prevState);
  }

  // Function navigate back
  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className=" w-full min-h-screen py-8 flex justify-center items-center">
      <div className="w-130 h-500 flex flex-col gap-2 justify-start items-start">
        {/* Awal Arrow Back */}
        <button
          onClick={navigateBack}
          className="w-fit h-fit p-2 hover:bg-gray-300 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
        >
          <IoIosArrowBack size={20} />
        </button>
        {/* Akhir Arrow Back */}

        {/* Awal Logo Meta */}
        <div className="w-full h-fit flex justify-start items-center gap-1">
          {/* Awal Icon Meta */}
          <FaMeta className="text-blue-700" size={20} />
          {/* Akhir Icon Meta */}
          {/* Awal Teks Meta */}
          <span className="font-semibold">Meta</span>
          {/* Akhir Teks Meta */}
        </div>
        {/* Akhir Logo Meta */}

        {/* Awal Mulai di Instagram */}
        <div className="w-full h-fit flex flex-col justify-start items-start">
          {/* Awal Teks Mulai di Instagram */}
          <span className="text-2xl font-semibold">Mulai di Instagram</span>
          {/* Akhir Teks Mulai di Instagram */}
          {/* Awal Teks Buat akun untuk melihat */}
          <span className="text-sm">
            Buat akun untuk melihat foto dan video dari teman Anda.
          </span>
          {/* Akhir Teks Buat akun untuk melihat */}
        </div>
        {/* Akhir Mulai di Instagram */}

        {/* Awal Form Register */}
        <form
          onSubmit={submitHandler}
          className="w-full h-fit flex flex-col gap-2 justify-start items-start"
        >
          {/* Awal Username */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Username */}
            <label className="font-semibold">Username</label>
            {/* Akhir Label Username */}

            {/* Awal Input Username */}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={changeHandler}
              value={formData.username}
              className="p-2 w-full h-fit border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold"
            />
            {/* Akhir Input Username */}
          </div>
          {/* Akhir Username */}

          {/* Awal Email */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Email */}
            <label className="font-semibold">Email</label>
            {/* Akhir Label Email */}

            {/* Awal Input Email */}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={formData.email}
              className="p-2 w-full h-fit border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold"
            />
            {/* Akhir Input Email */}

            {/* Awal Info */}
            <span className="text-sm">
              Anda mungkin menerima notifikasi dari kami.{" "}
              <Link
                to={"/info-account"}
                className="text-blue-700 hover:underline font-semibold"
              >
                Pelajari cara kami menanyakan informasi kontak anda
              </Link>
            </span>
            {/* Akhir Info */}
          </div>
          {/* Akhir Email */}

          {/* Awal Password */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Password */}
            <label className="font-semibold">Password</label>
            {/* Akhir Label Password */}

            {/* Awal Input Password */}
            <div className="w-full h-fit relative">
              {/* Awal Input Password */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={changeHandler}
                value={formData.password}
                className="p-2 w-full h-fit border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold"
              />
              {/* Akhir Input Password */}

              {/* Awal Toggle Password */}
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
              </button>
              {/* Akhir Toggle Password */}
            </div>
            {/* Akhir Input Password */}
          </div>
          {/* Akhir Password */}

          {/* Awal Confirm Password */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Confirm Password */}
            <div className="w-full h-fit flex justify-between items-center gap-1">
              {/* Awal Label */}
              <label className="font-semibold">Confirm Password</label>
              {/* Akhir Label */}
              {/* Awal message password not match */}
              {!passwordsMatch && (
                <span className="text-sm text-red-600 font-semibold">
                  Password didn't match
                </span>
              )}
              {/* Akhir message password not match */}
            </div>
            {/* Akhir Label Confirm Password */}

            {/* Awal Input Confirm Password */}
            <div className="w-full h-fit relative">
              {/* Awal Input Confirm Password */}
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                value={formData.confirmPassword}
                className={`p-2 w-full h-fit  outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold ${!passwordsMatch ? "bg-red-600 border border-transparent focus:ring-red-600 animate-pulse" : "border border-black"}`}
              />
              {/* Akhir Input Confirm Password */}

              {/* Awal Toggle Show Confirm Password */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <LuEyeClosed size={20} />
                ) : (
                  <LuEye size={20} />
                )}
              </button>
              {/* Akhir Toggle Show Confirm Password */}
            </div>
            {/* Akhir Input Confirm Password */}
          </div>
          {/* Akhir Confirm Password */}

          {/* Awal Full Name */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Full Name */}
            <label className="font-semibold">Full Name</label>
            {/* Akhir Label Full Name */}

            {/* Awal Input Full Name */}
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              onChange={changeHandler}
              value={formData.fullName}
              className="p-2 w-full h-fit border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent translate-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold"
            />
            {/* Akhir Input Full Name */}
          </div>
          {/* Akhir Full Name */}

          {/* Awal Bio */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Bio */}
            <label className="font-semibold">Bio</label>
            {/* Akhir Label Bio */}

            {/* Awal Input Bio */}
            <textarea
              name="bio"
              id="bio"
              placeholder="Bio"
              onChange={changeHandler}
              value={formData.bio}
              className="p-2 w-full h-30 border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent translate-all duration-300 ease-in-out resize-none placeholder:text-gray-400 placeholder:text-sm font-semibold"
            />
            {/* Akhir Input Bio */}
          </div>
          {/* Akhir Bio */}

          {/* Awal Avatar */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Label Avatar */}
            <label className="font-semibold">Avatar</label>
            {/* Akhir Label Avatar */}

            {/* Awal Input Avatar */}
            <input
              type="text"
              name="avatar"
              id="avatar"
              placeholder="Avatar"
              onChange={changeHandler}
              value={formData.avatar}
              className="p-2 w-full h-fit border border-black outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:text-sm font-semibold"
            />
            {/* Akhir Input Avatar */}
          </div>
          {/* Akhir Avatar */}

          {/* Awal Info Orang yang menggunakan */}
          <span className="text-sm">
            Orang yang menggunakan layanan kami mungkin telah mengunggah
            informasi kontak Anda ke Instagram.{" "}
            <Link
              to={"/somewhere1"}
              className="text-blue-700 hover:underline font-semibold"
            >
              Pelajari selengkapnya.
            </Link>
          </span>
          {/* Akhir Info Orang yang menggunakan */}

          {/* Awal Dengan mengutuk */}
          <span className="text-sm">
            Dengan mengetuk Kirim, Anda menyetujui pembuatan akun serta{" "}
            <Link
              to={"/somewhere2"}
              className="text-blue-700 hover:underline font-semibold"
            >
              Ketentuan
            </Link>
            ,{" "}
            <Link
              to={"/somewhere3"}
              className="text-blue-700 hover:underline font-semibold"
            >
              Kebijakan Privasi
            </Link>
            , dan{" "}
            <Link
              to={"/somewhere4"}
              className="text-blue-700 hover:underline font-semibold"
            >
              Kebijakan Cookie
            </Link>{" "}
            Instagram.
          </span>
          {/* Akhir Dengan mengutuk */}

          {/* Awal Kebijakan Privasi */}
          <span className="text-sm">
            <Link
              to={"/somewhere5"}
              className="text-blue-700 hover:underline font-semibold"
            >
              Kebijakan Privasi
            </Link>{" "}
            menjelaskan cara kami dapat menggunakan informasi yang kami
            kumpulkan saat Anda membuat akun. Misalnya, kami menggunakan
            informasi ini untuk menyediakan, mempersonalisasi, dan meningkatkan
            produk kami, termasuk iklan.
          </span>
          {/* Akhir Kebijakan Privasi */}

          {/* Awal Button Submit */}
          <button
            type="submit"
            disabled={!passwordsMatch || loading}
            className={`mt-2 bg-blue-700 hover:bg-blue-900 w-full h-fit py-2 text-center font-semibold  rounded-xl transition-all duration-300 ease-in-out text-sm text-white ${!passwordsMatch ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}  `}
          >
            {loading ? "Loading..." : "Kirim"}
          </button>
          {/* Akhir Button Submit */}

          {/* Awal Button Sudah Punya Akun */}
          <Link
            to={"/auth/login"}
            className="py-2 w-full h-fit text-center font-semibold border border-gray-300 text-sm rounded-xl transition-all duration-300 ease-in-out hover:bg-gray-200 hover:border-transparent"
          >
            Saya sudah punya akun
          </Link>
          {/* Akhir Button Sudah Punya Akun */}
        </form>
        {/* Akhir Form Register */}
      </div>
    </div>
  );
}
