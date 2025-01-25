import React, { useState } from "react";

const PasswordStrength = ({ password, setIsValid }) => {
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const criteriaList = [
    { id: "minLength", label: "At least 8 characters" },
    { id: "upperCase", label: "At least one uppercase letter" },
    { id: "lowerCase", label: "At least one lowercase letter" },
    { id: "number", label: "At least one number" },
    { id: "specialChar", label: "At least one special character (!@#$%^&*)" },
  ];

  const validatePassword = (password) => {
    const criteria = {
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    }

    setPasswordCriteria(criteria);
    setIsValid(Object.values(criteria).every((value) => value));
  };

  React.useEffect(() => {
    validatePassword(password);
  }, [password]);

  if (!password) return null;
  return (
    <ul className="prose text-xs">
      {criteriaList.map((criteria) => (
        <li
          key={criteria.id}
          style={{
            color: passwordCriteria[criteria.id] ? "green" : "red",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "8px" }}>
            {passwordCriteria[criteria.id] ? "\u2713" : "\u2717"}
          </span>
          {criteria.label}
        </li>
      ))}
    </ul>
  );
};

export { PasswordStrength };
