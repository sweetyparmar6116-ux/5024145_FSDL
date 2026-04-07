function Rules({ hasLength, hasNumber, hasSymbol }) {
    return (
        <div>
            <p className={hasLength ? "valid" : "invalid"}>
                ✔ 8 characters
            </p>
            <p className={hasNumber ? "valid" : "invalid"}>
                ✔ Number
            </p>
            <p className={hasSymbol ? "valid" : "invalid"}>
                ✔ Symbol
            </p>
        </div>
    );
}