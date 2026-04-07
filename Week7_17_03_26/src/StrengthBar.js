function StrengthBar({ hasLength, hasNumber, hasSymbol }) {

    let strength = "Weak";
    let color = "red";
    let width = "30%";

    if (hasLength && hasNumber) {
        strength = "Medium";
        color = "orange";
        width = "60%";
    }

    if (hasLength && hasNumber && hasSymbol) {
        strength = "Strong";
        color = "limegreen";
        width = "100%";
    }

    return (
        <>
            <h3 style={{color: color}}>Strength: {strength}</h3>
            <div className="strength-bar" style={{background: color, width: width}}></div>
        </>
    );
}