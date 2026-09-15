// components/EntityCard/EntityCard.jsx
import {
    Card, CardContent, Stack, Typography, Chip, Divider, Box,
} from "@mui/material";

/**
 * value — либо строка/число, либо { label, color?, variant? } для Chip
 */
function RowValue({ value }) {
    if (value == null || value === "") {
        return (
            <Typography variant="caption" fontWeight={500} color="text.secondary">
                —
            </Typography>
        );
    }

    if (typeof value === "object" && "label" in value) {
        return (
            <Chip
                size="small"
                label={value.label}
                color={value.color ?? "default"}
                variant={value.variant ?? "outlined"}
            />
        );
    }

    return (
        <Typography variant="caption" fontWeight={500}>
            {String(value)}
        </Typography>
    );
}

export default function EntityCard({
    title,
    description,          // строка или JSX; не рендерится, если пусто
    statusChip = null,    // { label, color } — необязательный чип рядом с заголовком
    rows = [],            // [{ key, icon: MUIComponent, label, value }]
    tags = null,          // массив строк — необязательные теги
    actions = null,       // слот под иконки редактирования/удаления
    children,             // дополнительный контент внизу, если нужно
}) {
    return (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
                {/* Заголовок + статус + actions */}
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ flex: 1 }}>
                        {title || "—"}
                    </Typography>
                    {statusChip && (
                        <Chip
                            size="small"
                            label={statusChip.label}
                            color={statusChip.color}
                            sx={{ alignSelf: "flex-start" }}
                        />
                    )}
                    {actions}
                </Stack>

                {/* Описание */}
                {description != null && description !== "" && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {description}
                    </Typography>
                )}

                {/* Строки с иконками */}
                {rows.length > 0 && (
                    <>
                        <Divider sx={{ my: 1.5 }} />
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                            {rows.map((row) => {
                                const Icon = row.icon;
                                return (
                                    <Stack
                                        key={row.key ?? row.label}
                                        direction="row"
                                        spacing={0.5}
                                        alignItems="center"
                                    >
                                        {Icon && (
                                            <Icon fontSize="small" sx={{ color: "text.secondary" }} />
                                        )}
                                        {row.label && (
                                            <Typography variant="caption" color="text.secondary">
                                                {row.label}:
                                            </Typography>
                                        )}
                                        <RowValue value={row.value} />
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </>
                )}

                {/* Теги */}
                {tags?.length > 0 && (
                    <Box sx={{ mt: 1.5, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {tags.map((tag) => (
                            <Chip key={tag} size="small" label={`#${tag}`} variant="outlined" />
                        ))}
                    </Box>
                )}

                {children}
            </CardContent>
        </Card>
    );
}