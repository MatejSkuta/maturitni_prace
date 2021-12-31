import React from "react";
import Input from "../components/Input";

const Signup = () => {
  return (
    <div>
      <h1>Přihlášení:</h1>
      <form>
        <div class="form-group">
          <Input type="email" id="exampleInputEmail1" placeholder="email" />
        </div>
        <div class="form-group">
          <Input
            type="password"
            id="exampleInputPassword1"
            placeholder="heslo"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Přihlásit se
        </button>
      </form>
    </div>
  );
};

export default Signup;
