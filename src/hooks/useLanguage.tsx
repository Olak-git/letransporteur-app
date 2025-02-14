// import '@/lang/i18n';
// import i18n from 'i18next';
// import { useTranslation } from 'react-i18next';
import fr from '@/lang/i18n/locales/fr';

export type LANGUAGE = 'en'|'fr';
export default function useLanguage() {
    // const { t } = useTranslation();

    const t = (k: string) => {
        const K = k.split('.'),
            L = K.length;
        var M = fr;
        for (let index = 0; index < L; index++) {
            // @ts-ignore
            M = M[K[index]]
        }
        console.log(k);
        return M;
    }

    return { t }

    // const setLanguage = (lang: LANGUAGE)=>{
    //     i18n.changeLanguage(lang)
    // }

    // return { t, setLanguage, language: i18n.language }
}