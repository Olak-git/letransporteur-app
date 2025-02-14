// export type CountryType = {
//     id: number,
//     country: string,
//     code: string,
//     label?: string,
//     value?: string
// }

import { ContactLabelType, CoordsType, StateVerificationType } from "./type.data"

export type AdminConfigsType = {
    id: number,
    commission:  number,
    fedapay_public_key: string|null,
    fedapay_secret_key: string|null,
    fedapay_activated: boolean|null,
    fedapay_mode: 'SANDBOX'|'LIVE'|null,
    feexpay_token_key_api: string|null,
    feexpay_shop_id: string|null,
    feexpay_activated: boolean|null,
    feexpay_mode: 'SANDBOX'|'LIVE'|null,
    contact_phone: string|null,
    contact_whatsapp: string|null,
    contact_email: string|null,
    contact_labels: Array<string|ContactLabelType>|null,
    admin_id: number|null
}

export type CountryType = {
    id: number,
    country_code: string,
    country_name: string,
    country_name_en: string | null,
    calling_code: string,
    emoji: string | null,
    active: boolean
}

export type EvenCategoryType = {
    id: number,
    slug: string,
    trigger: string,
    description: string|null,
    admin_id: number|null,
    created_at: string|null,
    updated_at: string|null
}

export type FeexpayModeType = {
    id: number,
    mobile_service: string,
    mode: string,
    has_otp: boolean,
    collection: Array<string>,
    service: string | null,
    feexpay_payout_url: string|null,
    feexpay_payout_network: boolean,
    label?: string,
    value?: string,
    country_id: number,
    country?: CountryType|null,
}

export type FedapayModeType = {
    id: number,
    mobile_service: string,
    mode: string,
    label?: string,
    value?: string,
    country_id: number,
    country?: CountryType|null,
}

// export type MobileServiceType = {
//     id: number,
//     mobile_service: string,
//     admin_country_id: number,
//     country?: CountryType|null,
// }

export type FaqType = {
    id: number,
    asking: string,
    response: string,
    created_at: string,
    updated_at: string
}

export type UserType = {
    id: number,
    username: string,
    gender: string,
    birth_date: string,
    profile_image: string,
    country: string,
    country_code: string,
    country_name: string,
    calling_code: string,
    phone: string,
    full_phone: string,
    phone_verified_at: string|null,
    email: string|null,
    email_verified_at: string|null,
    created_at: string,
    updated_at: string
}

export type ProfessionalType = {
    id: number,
    username: string,
    gender: 'femme' | 'homme' | null,
    birth_date: string, // Date de naissance
    country: string | null, // pays de résidence
    country_code: string,
    country_name: string,
    calling_code: string,
    phone: string,
    full_phone: string,
    email: string | null,
    profile_image: string,
    type_identity_paper: 'Carte Nationale D\'identité' | 'Passeport' | 'Permis de conduire' | null, // type pièce d'identité
    number_identity_paper: string | null, // numero piece d'identite
    image_identity_paper: string | null, // photo piece d'identite
    ifu_number: string | null,
    rccm_number?: string | null,
    no_car: boolean, // Si oui, pas de vehicule a disposition. Est utile que si l'occurence est un livreur. Default: 0
    vehicle_id: number,
    type_car: string | null,
    car_mark_model: string | null, // marque et model du vehicule
    car_license_plate: string | null, // numero plaque
    image_car_registration_doc: string | null, // photo carte grise
    profile: 'seller' | 'delivery boy', // Default: delivery boy
    freelance: boolean, // A son role dans le cas des livreurs: 1 => en freelance, 0 => de la maison. Default: 0
    remember_token?: string | null,
    phone_verified_at: string | null,
    email_verified_at: string | null,
    state_verification: StateVerificationType, // Default: pending
    wallet: number,
    score: number,
    // vehicle?: CarType,
    created_at: string,
    updated_at: string,
}

export type WalletTransactionType = {
    id: number,
    transaction_id: number | null,
    transaction_status: string | null,
    payment_mode: string,
    country: string,
    phone: string,
    action: string,
    amount: number,
    user_id: number | null,
    professional_id: number | null,
    created_at: string,
    updated_at: string
}

export type PaymentModeType = {
    id: number,
    mode: string,
    label: string,
    admin_id: string | null
}

export type StoreType = {
    id: number,
    name: string,
    restaurant: boolean,
    country: string,
    city: string,
    address: string,
    coords_gps: CoordsType,
    creation_date: string,
    country_code: string,
    country_name: string,
    calling_code: string,
    phone: string,
    full_phone: string,
    rccm_number: string,
    rccm_image: string,
    ifu_number: string,
    ifu_image: string,
    logo: string | null,
    sales_point_image: string,
    professional_id: number,
    professional?: ProfessionalType,
    state_verification: StateVerificationType,
    verified_at: string | null,
}

export type ArticleType = {
    id: number,
    name: string,
    about: string | null,
    image: string,
    image2: string | null,
    image3: string | null,
    image4: string | null,
    price: number,
    stock: number | null,
    store_id: number,
    store?: StoreType,
    category_id: number,
    category_name?: string,
    deleted_at: string | null,
}

export type CartType = {
    id: number,
    article_name: string,
    unit_price_ht: number,
    quantity: number,
    total_price_ht: number,
    tax: number,
    total_price_ttc: number,
    other_details: string | null,
    order_id: number | null,
    article_id: number | null,
    article_image?: string,
}

export type OrderType = {
    id: number, 
    code: string, 

    transaction_id: string | null, 
    transaction_status: string | null, 
    transaction_mode: string | null, 

    amount: number, 
    delivery_price: number, 
    delivery_amount: number, 
    store_id: number | null, 
    user_id: number | null, 
    state: string | null, 
    progression: number, 

    delivery_boy?: ProfessionalType | null

    created_at: string
}

export type PaginateLinkType = {
    url: string,
    label: string,
    active: boolean
}