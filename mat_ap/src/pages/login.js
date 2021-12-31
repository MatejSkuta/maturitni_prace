import React from "react";
import Input from "../components/Input";

const Login = () => {
  return (
    <div>
      <h1>Registrace</h1>
      <form>
        <div class="form-group">
          <Input type="email" id="exampleInputEmail1" placeholder="email" />
        </div>
        <div class="form-group">
          <Input
            type="text"
            id="exampleInputPassword1"
            placeholder="uživatelské jméno"
          />
        </div>
        <div class="form-group">
          <Input
            type="password"
            id="exampleInputPassword2"
            placeholder="heslo"
          />
        </div>
        <div class="form-group">
          <Input
            type="password"
            id="exampleInputPassword1"
            placeholder="ověření hesla"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Registrovat se
        </button>
      </form>
    </div>
  );
};

export default Login;
