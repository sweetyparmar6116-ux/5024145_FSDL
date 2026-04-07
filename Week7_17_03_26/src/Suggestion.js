function Suggestions({ hasLength, hasNumber, hasSymbol }) {

    if (hasLength && hasNumber && hasSymbol) return null;

    return (
        <div>
            <h4>Suggestions:</h4>
            <ul>
                {!hasLength && <li>Add more characters</li>}
                {!hasNumber && <li>Include numbers</li>}
                {!hasSymbol && <li>Add symbols</li>}
            </ul>
        </div>
    );
}