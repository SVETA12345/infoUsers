


export function buildFormData(schema, ctx) {
    const {
        user,
        form,
        editing,
        onChange,
        errors = {},
    } = ctx;

    const current = editing ? form : user;

    return schema.map((f) => {
        const {
            key,
            label,
            type,
            options,
            renderView,
        } = f;

        const rawValue = current?.[key];

        const displayValue = renderView
            ? renderView(user, form)
            : rawValue ?? "—";

        return {
            label,
            fieldKey: key,
            value: displayValue,
            editing,
            form,
            onChange,
            options: options ?? null,
            type: type ?? "text",
            error: errors[key] || "",
        };
    });
}