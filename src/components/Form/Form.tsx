import { useState } from "react";
import "./Form.css";
import Input from "../common/Input/Input";
import Checkbox from "../common/Checkbox/Checkbox";
import Button from "../common/Button/Button";

interface FormProps {
  title: string;
  onSuccessSubmit: () => void;
}

interface FormData {
  username: string;
  password: string;
}

function Form({ title, onSuccessSubmit }: FormProps) {
  const rememberedUser = localStorage.getItem("user");

  const [user, setUser] = useState<FormData>(
    rememberedUser ? JSON.parse(rememberedUser) : { username: "", password: "" }
  );
  const [rememberMe, setRememberMe] = useState(
    rememberedUser ? JSON.parse(rememberedUser)?.rememberMe : false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => ({ ...prev, [e?.target?.id]: e?.target?.value }));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRememberMe(e.target.checked);

  const rememberCurrentUser = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, rememberMe }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    if (response.ok) {
      onSuccessSubmit();
      rememberMe ? rememberCurrentUser() : localStorage.removeItem("user");
      return;
    }
    alert("Wrong email or password");
  };

  return (
    <>
      <div className="wrapper">
        <h2>{title}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <Input
            id="username"
            value={user.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            value={user.password}
            placeholder="Password"
            type="password"
            onChange={handleChange}
            pattern="^(?=.*[A-Za-z])(?=.*\d).{6,}$"
            title="Must contain at least one number and one letter, and at least 6 or more characters"
            required
          />
          <Checkbox
            id="rememberMe"
            label="Remember me"
            checked={rememberMe}
            onChange={handleCheckboxChange}
          />
          <div className="buttonWrapper">
            <Button title="Login Now" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
