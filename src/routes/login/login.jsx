import { Link, useNavigate } from "react-router-dom";
import { useState, } from "react";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { username, password } = Object.fromEntries(new FormData(e.target))
    if (!username || !password) {
      setError("All fields are required!")
      setIsLoading(false)
      return
    }
    try {
      const res = await apiRequest.post("/auth/login", {
        username, password
      })
      console.log(res.data);
      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          {error && <span>{error}</span>}
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
