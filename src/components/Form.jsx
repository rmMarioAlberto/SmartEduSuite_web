import React from 'react';

function Form({ fields, onSubmit, buttonText, error }) {
    const [formData, setFormData] = React.useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            ))}
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button">
                {buttonText}
            </button>
        </form>
    );
}

export default Form;