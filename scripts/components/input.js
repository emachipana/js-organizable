export function input({
    label,
    id,
    name,
    placeholder = "",
    type,
    required = false,
    value = false,
    icon
}) {
    return `
        <div class="form__container-input">
            <label for="${id}" class="form__label">${label}</label>
            <div class="input-container">
                <img src="${icon}" alt="input-icon" />
                <input 
                    type="${type}"
                    placeholder="${placeholder}"
                    class="form__input"
                    id="${id}"
                    name="${name ? name : id}"
                    ${value ? `value="${value}"` : ""}
                    ${required ? "required" : ""}
                    />
            </div>
        </div>
    `
}