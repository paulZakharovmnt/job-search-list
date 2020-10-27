import React from "react";

const LoginPage = ({
  email,
  setEmail,
  setUserName,
  userName,
  password,
  setPassword,
  handleLogin,
  handleSignUp,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
}) => {
  return (
    <div className="loginContainer">
      <div className="input-login">
        {!hasAccount && (
          <label className="login-label">
            <input
              className="login-input"
              type="text"
              autoFocus
              required
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <div className="label-text">Your Name</div>
          </label>
        )}

        <label className="login-label">
          <input
            className="login-input"
            type="text"
            autoFocus
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="label-text">Your Email</div>
        </label>

        <p className="errorMsg">{emailError}</p>
        <label className="login-label">
          <input
            className="login-input"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="label-text">Password</div>
        </label>

        <p className="errorMsg">{passwordError}</p>
      </div>

      <div className="btnContainer">
        {hasAccount ? (
          <>
            <div
              data-back="Sing In"
              data-front="Log In"
              className="btn"
              onClick={handleLogin}
            >
              {/* Sing In */}
            </div>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <div
              data-back="Register"
              data-front="Sign Up"
              className="btn"
              onClick={handleSignUp}
            >
              {/* Sign Up */}
            </div>
            <p>
              Have an Account?{" "}
              <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
