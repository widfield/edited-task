import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Button from "./components/common/Button/Button";

interface User {
  username: string;
  isLoggedIn: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () =>
    fetch("/user")
      .then((res) => res.json())
      .then((res) => setUser(res));

  const onLogout = () => {
    setUser(null);
    fetch("/logout");
  };

  return user?.isLoggedIn ? (
    <div className="loggedIn-bar">
      <div>Hi {user?.username}</div>
      <Button onClick={onLogout} title="Logout" />
    </div>
  ) : (
    <Form title="SIGN IN TO YOUR ACCOUNT" onSuccessSubmit={fetchUser} />
  );
}

export default App;
