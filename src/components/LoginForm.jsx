function LoginForm() {
  return (
    <section className="profile-section flex items-center flex-col justify-center">
      <h1 className="text-red-400 text-left w-full">
        Do you have an account? Log in!
      </h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input rounded-full outline-none border-none focus:border-2 focus:border-emerald-500"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input rounded-full border-none outline-none"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4 rounded-full">Login</button>
      </fieldset>
    </section>
  );
}

export default LoginForm;

// Do you have an account? Log in! Create an account.
