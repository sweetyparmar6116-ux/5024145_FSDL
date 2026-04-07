function PasswordInput({ password, setPassword, show, setShow }) {
    return (
        <div style={{position: "relative"}}>
            <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span 
                onClick={() => setShow(!show)}
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "12px",
                    cursor: "pointer"
                }}
            >
                {show ? "🙈" : "👁"}
            </span>
        </div>
    );
}