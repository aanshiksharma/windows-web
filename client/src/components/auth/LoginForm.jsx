import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Person, PersonCircle } from "react-bootstrap-icons";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../state/slices/usersSlice";

function Form({ user }) {
  const [password, setPassword] = useState("");
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    gsap.to(".wrapper", {
      opacity: 1,
      duration: 1,
    });
  }, []);

  const handlePasswordChange = (event) => {
    if (event.target.value.length === 4) handleLogin(event.target.value);

    let numbers = "0123456789";
    let add = false;

    if (event.target.value === "") add = true;

    event.target.value.split("").forEach((letter) => {
      if (numbers.includes(letter)) add = true;
      else {
        add = false;
        return;
      }
    });

    add && setPassword(event.target.value);
  };

  const handleLogin = (password) => {
    if (password === user.password) {
      gsap.to(".wrapper", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
          dispatch(loginUser(user.username));
          navigate("/desktop");
        },
      });
    } else {
      setPassword("");
      setIsWrongPassword(true);
    }
  };

  return (
    <div className="wrapper opacity-0">
      <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-md">
        <div className="user-icon grid place-items-center">
          <div className="icon-container rounded-full p-2">
            <Person size={96} />
          </div>
          <h1 className="font-semibold text-2xl text-white my-4">
            {user.name}
          </h1>
        </div>

        {isWrongPassword ? (
          <div className=" wrong-password flex flex-col items-center gap-8">
            <p className="opacity-80">The PIN is incorrect. Try Again.</p>
            <button
              type="button"
              className="btn py-1 px-12 rounded-md outline-0"
              autoFocus
              onClick={() => setIsWrongPassword(false)}
            >
              OK
            </button>
          </div>
        ) : (
          <div className="input-form-container">
            <form
              className="flex flex-col items-center justify-center gap-3 my-1"
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin(password);
              }}
            >
              <input
                type="password"
                maxLength={4}
                minLength={4}
                value={password}
                onChange={handlePasswordChange}
                name="signup-password"
                id="signup-password"
                placeholder="PIN"
                required
                className="rounded-sm w-3xs outline-0 px-2 py-1"
                autoFocus
              />
            </form>

            <p className="text-center my-6">I forgot my PIN</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginForm() {
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const users = useSelector((state) => state.users.allUsers);

  const handleLoginForm = (user) => {
    gsap.to(".wrapper", {
      opacity: 0,
      duration: 0.2,
      onComplete: () => setSelectedUser(user),
    });
  };

  useEffect(() => {
    gsap.to(".wrapper", {
      opacity: 1,
      duration: 1,
    });
  }, [selectedUser]);

  return (
    <div
      id="login-page"
      className="wrapper opacity-0 flex flex-col items-center pt-[30vh] gap-8 h-screen"
    >
      {selectedUser ? (
        <Form user={selectedUser} />
      ) : (
        <>
          {users.length > 1 && (
            <p className="font-semibold text-2xl">Choose an Account.</p>
          )}

          <div className="wrapper opacity-0">
            {users.length === 0 ? (
              <div className="no-accounts flex flex-col gap-12">
                <p className="font-semibold text-2xl">No accounts found.</p>
                <button
                  type="button"
                  className="btn self-center px-4 py-1 rounded-md font-semibold outline-0"
                  autoFocus
                  onClick={() => {
                    gsap.to(".wrapper", {
                      opacity: 0,
                      duration: 0.2,
                      onComplete: () => navigate("/auth/signup"),
                    });
                  }}
                >
                  Create one now
                </button>
              </div>
            ) : users.length === 1 ? (
              <Form user={users[0]} />
            ) : (
              <div className="user-profile-container flex items-center gap-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    className="user-profile flex flex-col items-center min-w-25 rounded-md gap-2 px-2 py-3"
                    onClick={() => handleLoginForm(user)}
                  >
                    <PersonCircle size={48} />

                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-semibold">
                        {user.name.split(" ")[0]}
                      </p>
                      <p className="text-xs">{user.username}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
