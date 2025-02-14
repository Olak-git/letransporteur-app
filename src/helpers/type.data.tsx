export type CoordsType = {
    latitude: number | null,
    longitude: number | null
}

export type StateVerificationType = 'pending' | 'in progress' | 'refused' | 'accepted';

export type ContactLabelType = {
    label: string,
    value: string
}