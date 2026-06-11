import { useRef, useState } from "react";
import Button from "./Button";

const initialForm = {
  firstName: "",
  lastName: "",
  track: "Frontend",
  score: "",
};

const MIN_NAME_LETTERS = 3;

const countLetters = (value) => {
  return (value.match(/[a-z]/gi) || []).length;
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateForm = ({ firstName, lastName, score }) => {
  const nextErrors = {};
  const scoreValue = Number(score);

  if (!firstName.trim()) {
    nextErrors.firstName = "First name is required.";
  } else if (countLetters(firstName) < MIN_NAME_LETTERS) {
    nextErrors.firstName = `First name must include at least ${MIN_NAME_LETTERS} letters.`;
  }

  if (!lastName.trim()) {
    nextErrors.lastName = "Last name is required.";
  } else if (countLetters(lastName) < MIN_NAME_LETTERS) {
    nextErrors.lastName = `Last name must include at least ${MIN_NAME_LETTERS} letters.`;
  }

  if (score === "" || scoreValue < 0 || scoreValue > 100) {
    nextErrors.score = "Score must be between 0 and 100.";
  }

  return nextErrors;
};

const EnrollForm = ({ tracks, onEnroll }) => {
  const [formData, setFormData] = useState({
    ...initialForm,
    track: tracks[0] || "",
  });
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const activeRef = useRef(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      ...initialForm,
      track: tracks[0] || "",
    });

    if (emailRef.current) {
      emailRef.current.value = "";
    }

    if (activeRef.current) {
      activeRef.current.checked = true;
    }

    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const isActive = activeRef.current.checked;
    const nextErrors = {
      ...validateForm(formData),
      ...(!isValidEmail(email) ? { email: "Enter a valid email address." } : {}),
    };

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onEnroll({
      id: crypto.randomUUID(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email,
      track: formData.track,
      score: Number(formData.score),
      isActive,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    });

    resetForm();
  };

  return (
    <section className="form-panel">
      <h2>Enroll New Student</h2>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Controlled Fields</legend>

          <div className="form-grid">
            <label>
              First Name
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </label>

            <label>
              Last Name
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </label>

            <label>
              Track
              <select name="track" value={formData.track} onChange={handleChange}>
                {tracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Score
              <input
                name="score"
                type="number"
                min="0"
                max="100"
                value={formData.score}
                onChange={handleChange}
              />
              {errors.score && <span className="error-text">{errors.score}</span>}
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Uncontrolled Fields</legend>

          <div className="form-grid">
            <label>
              Email (uncontrolled)
              <input ref={emailRef} type="email" defaultValue="" />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </label>

            <label className="checkbox-label">
              <input ref={activeRef} type="checkbox" defaultChecked />
              Active (uncontrolled)
            </label>
          </div>
        </fieldset>

        <p className="preview-line">
          {`Preview: ${formData.firstName || "First"} ${formData.lastName || "Last"} — ${formData.track} (${formData.score || "0"})`}
        </p>

        <Button
          title="Enroll"
          className="primary-button"
        />
      </form>
    </section>
  );
};

export default EnrollForm;
