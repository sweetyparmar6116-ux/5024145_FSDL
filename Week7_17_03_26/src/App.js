function App() {

    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [dark, setDark] = React.useState(false);

    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    const isMatch = password && confirm && password === confirm;

    return (
        <div className={dark ? "container dark" : "container"}>

            <h2>Password Checker 🔐</h2>

            <button onClick={() => setDark(!dark)}>
                {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <PasswordInput 
                password={password}
                setPassword={setPassword}
                show={show}
                setShow={setShow}
            />

            <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />

            {confirm && (
                <p style={{color: isMatch ? "lightgreen" : "red"}}>
                    {isMatch ? "Match ✔" : "Not Match ❌"}
                </p>
            )}

            <StrengthBar 
                hasLength={hasLength}
                hasNumber={hasNumber}
                hasSymbol={hasSymbol}
            />

            <Rules 
                hasLength={hasLength}
                hasNumber={hasNumber}
                hasSymbol={hasSymbol}
            />

            <Suggestions 
                hasLength={hasLength}
                hasNumber={hasNumber}
                hasSymbol={hasSymbol}
            />

        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);