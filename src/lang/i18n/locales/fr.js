export default {
    code: {
        "state": {
            "pending": 'en attente',
            "approved": 'approuvé',
            "declined": '',
            "canceled": '', 
            "refunded": '', 
            "transferred": '',
            "started": '', 
            "processing": '', 
            "sent": '', 
            "failed": '',
    
            'en cours': 'En cours', // en: 'in progress'
            'annulé': 'Annulé',
            'livré': 'Livré', // en: 'delivered'
            'terminé': 'Terminé',
        },
        "withdrawal": 'Paiement',
        "deposit": 'Dépôt',
    },

    server_not_responsing: 'Server not responding.',
    back: 'Retour',
    next: 'Suivant',
    send: 'Envoyer',
    resend: "Renvoyer",
    to_valid: "Valider",
    continue: "Continuer",
    loading_data: 'Chargement des données en cours...',
    empty_data: 'Aucune donnée disponible',
    ask_validate_operation: "Êtes-vous sûre de vouloir valider cette course ?",
    cancel: "Annulé",
    state: {
        'en cours': 'En cours',
        'annulé': 'Annulé',
        'livré': 'Livré',
        'terminé': 'Terminé',
    },

    preset_screen: {
        cf: '',
        prs_desc: 'Nous vous faciliton la vie ...',
        next: 'Suivant',
    },

    error_empty_bad_inputs: 'Un ou plusieurs champs ne sont pas renseignés ou sont mal renseignés.',
    error_field_obligatory: 'Champ obligatoire',

    connexion_screen: {
        text_header: 'Connectez-vous pour accéder à votre compte',
        placeholder_phone_number: 'Numero de téléphone',
        placeholder_password: 'Mot de passe',
        remember_me: 'Se rappeler',
        forgot_password: 'Mot de passe oublié ?',
        btn_connexion: 'Se connecter',
        not_an_account: 'Pas de compte ?',
        btn_register: "S'inscrire",
        unsuccessful_authentification: "Echec d'authentication"
    },

    register_screen: {
        text_header: 'Inscrivez-vous',
        placeholder_fullname: 'Nom et prénom(s)',
        placeholder_phone_number: 'Numero de téléphone',
        placeholder_password: 'Mot de passe',
        placeholder_confirmation_password: 'Confirmer mot de passe',
        btn_register: "S'inscrire",
        has_an_account: 'Vous avez déjà un compte ?',
        btn_connexion: 'Se connecter',
        birth_date: 'Date de naissance',
        gender: {
            man: 'Homme',
            woman: 'Femme'
        },
        what_yr_gender: 'Quel est votre genre ?',
    },

    oups_register_screen: {
        not_delivery: 'Nous ne livrons pas encore dans cette région',
        info_not_delivery: 'Nous ajoutons régulièrement de nouveaux lieux à notre service. Il est possible que nous y soyons bientôt presents ! Si vous saisissez votre adresse e-mail, nous vous informerons dès que nous serons disponibles. Nous vous assurons de ne pas vous envoyer de courriers indésirables.',
        want_know: 'Je veux savoir',
        bell_disp: 'Me notifier de la disponibilité',
        placeholder_input: 'exemple@monmail.com',
        send: 'Envoyer'
    },

    otp_screen: {
        back_screen_text: 'Retour',
        header_text_confirm_mobile_no: 'Confirmez votre numéro',
        header_text_confirm_account: 'Confirmez votre compte',
        header_descr_confirm_mobile_no: 'Entrez le code OTP reçu par SMS pour confirmer votre compte.',
        header_descr_confirm_account: 'Entrez le code OTP reçu à votre adresse email pour confirmer votre compte.',
        helper_group_inputs: 'Renvoyer le code dans ',
        code_expire_at: 'Expire dans ',
        button_resend_text: 'Renvoyer',
        otp_resend_note: 'OTP renvoyé.',
        fail_network_text: "Problème de connexion ? Veuillez contacter notre équipe d'assistance à benin@letrans-porteur.com ou sur Whatsapp via:",
        bad_code: 'Mauvais code vérification.',
        no_get_otp: "Je n'ai pas reçu de code? ",
        resend: "Renvoyer",
        confirm: 'Confirmer',
        modal: {
            header_title: "Politique de confidentialité & Conditions d'utilisation",
            paragraph1: "Merci de vous êtes inscrit à notre application ! Avant de continuer, veuillez prendre un moment pour lire et accepter nos politiques de confidentialité et nos conditions d'utilisation.",
            paragraph2_title: 'Politique de confidentialité',
            paragraph2: "Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles. Nous nous engageons à protéger votre vie privée et à utiliser vos informations de manière responsable.",
            paragraph3_title: "Conditions d'utilisation",
            paragraph3: "Nos conditions d'utilisation énoncent les règles et les obligations que vous acceptez en utilisant notre application. Elles décrivent vos droits et responsabilités, ainsi que les limites de notre responsabilité.",
            paragraph4: "En acceptant nos politiques de confidentialité et nos conditions d'utilisation, vous confirmez votre consentement à partager vos informations et à respecter les règles de notre plateforme.",
            target_blink_text_link: "Lire les politiques de confidentialité et les conditions d'utilisation",
            back: 'Retour'
        }
    },

    reset_password_screen: {
        password_forget: 'Mot de passe oublié',
        infos_email: "Vous avez oublié votre mot de passe ? Veuillez fournir votre adresse email pour la réinitialisation de votre mot de passe.",
    },

    new_password_screen: {
        reset_password: "Réinitialisation mot de passe",
        infos_plus: "Veuillez fournir un nouveau mot de passe, le confirmer puis réinitialiser votre mot de passe.",
        back_connect: 'Je me ',
        connect: 'connecte',
        success_editing: 'Mot de passe mis à jour. Veuillez vous connecter!'
    },

    drawer_menu: {
        home: 'Accueil',
        my_profile: 'Mon profil',
        commands: 'Mes commandes',
        faq: 'FAQ',
        confidentiality: 'Politique de confidentialité',
        conditions_generals: 'Mention légale et Conditions Générales',
        help_support: 'Aide et support',
        disconnect: 'Déconnexion'
    },

    bottom_tab: {
        home: 'Accueil',
        wallet: 'Portefeuille',
        follow: 'Suivi',
        setting: 'Paramètre',
        profile: 'Mon profil',
        notifications: 'Notifications',
    },

    header_title: {
        delivery_boy: 'Livreur',
        e_store: 'E-Boutique',
        cart: 'Panier',
        commands: 'Mes Commandes',
        my_profile: 'Mon profil',
    },

    header_back_title: {
        delivery_boy: 'Livreur',
        race_infos: 'Information sur la course',
        commands: 'Mes Commandes',
        back: 'Retour'
    },

    home_screen: {
        delivery_boy: 'Livreur',
        goods_plans: 'Bons Plans',
        plan_food: 'Plan bouffe',
        e_shop: 'E-boutique',
        fret: 'Frêt',
        ticket: 'Billetterie'
    },

    notifications_screen: {
        empty_notification_title: 'Aucune notification à afficher',
        empty_notification_subtitle: "Vous verrez bientôt des notifications utiles à cet endroit. Restez à l'écoute !",
        delete_all: 'Tout supprimer'
    },

    commands_screen: {
        btn_new_command: 'Nouvelle Commande',
        p1_command_empty: 'Aucune commande pour le moment',
        p2_command_empty: 'Lorsque vous créez une nouvelle commande, elle sera affichée ici.',
        command: 'Commande',
        product: 'Produit',
        quantity: 'Qté',
        unit_price: 'P. Unitaire',
        total_command: 'Total de la commande',
        back: 'Retour',
        close: 'Quitter',
        cancel_command: 'Annuler la commande'
    },

    wallet_screen: {
        balance: 'Balance',
        add: 'Ajouter',
        history_trigger_action: 'Historique des transactions',
        btn_recap: 'Récapitulatif en PDF',
        paiement: 'Paiement',
        deposit: 'Dépot',
        withdrawal: 'Paiement',

        waiti: 'En attente',
        success: 'Succès',
        txt_descr: 'Description du virement',
        request_withdrawal: 'Demander un retrait',

        state: {
            // cas d'un dépot
            pending: 'en attente',
            approved: 'approuvé',
            declined: '',
            canceled: '', 
            refunded: '', 
            transferred: '',

            // cas d'un retrait
            pending: '', 
            started: '', 
            processing: '', 
            sent: '', 
            failed: ''
        }
    },

    follow_screen: {
        btn_new_delivery: 'Nouvelle Livraison',
        livraison: 'Livraison',
        'en cours': 'En cours',
        'annulé': 'Annulé',
        'livré': 'Livré',
        finished: 'Terminé',
        p1_delivery_empty: 'Aucune livraison pour le moment',
        p2_delivery_empty: "Lorsqu'une nouvelle course sera crée, elle sera affichée ici.",
        p3_delivery_empty: "Aucune livraison disponible."
    },

    settings_screen: {
        notifications_push: 'Notifications push',
        select_language: 'Langue préférée',
        french: 'Français',
        english: 'Anglais'
    },

    shops_screen: {
        header_title: 'E-Boutique',
        header_label: 'De quoi avez-vous besoin ?',
        input_search_placeholder: 'Cherchez un produit/boutique',
        best_sale: 'Meilleure vente',
        most_sale: 'Les plus courants',
        order_by_asc_price: 'Trier par les plus bas prix',
        stores: 'Les Boutiques',
        more_visit: 'Les plus visités',
        my_cart: 'Mon panier',
        details: 'Détails',
        restaurants: "restaurants"
    },

    my_cart_screen: {
        header_title: 'Panier',
        cart: 'Panier',
        products_in_cart: 'produits ajouter au panier pour',
        pay_for: 'Payer pour',
        reset_cart: 'Vider le panier'
    },

    track_screen: {
        delivery: 'Livraison',
        recuperative_address: 'Adresse de récupération',
        delivery_address: 'Adresse de livraison',
        back: 'Retour',
        cancel_delivery: 'Annuler la livraison'
    },

    race_screen: {
        found_address: 'Trouver une adresse',
        
        recuperative_address: 'Adresse de récupération',
        destination_address: 'Adresse de destination',
        next: 'Suivant',
        phone_number: 'Numéro de téléphone',
        person_contact: 'Personne à contacter',
        recuperative_person_contact: 'Personne à contacter à la récupération',
        destination_person_contact: 'Personne à contacter à la destination',

        back: 'Retour',
        cancel_delivery: 'Annuler la livraison',

        loading_request: 'Veuillez patienter, votre requête est en cours de traitement...',
        fixed_rate: 'Obtenir un tarif fixe',
        canceled_request: 'Annuler la demande',
        rate_race: 'Tarif course',

        congratulations: 'Félicitation!',
        success_save_order: 'Votre commande a bien été enregistrée.',
        success_save_delivery: 'Votre course a bien été enregistrée.',
        delivery_boy_accept: "Un livreur va prendre votre course et l'acheminer au point de destination indiqué.",
        delivery_boy_accept2: "Un livreur va prendre votre course et l'acheminer au point de livraison indiqué.",
        be_notified: "Vous recevrez une notification à cet effet.",
    },

    race_infos_screen: {
        placeholder: "Choisir ou entrer une adresse",
        recuperative_address: 'Adresse de récupération',
        destination_address: 'Adresse de destination',
        title_note_of_race: 'Titre et note de la course',
        enter_title: 'Entrer le titre de la course',
        details_race: 'Détails de la course',
        validate: 'Valider',
        no_empty_inputs: 'Veuillez renseigner tous les champs',

        addr_not_found: "Not Found.",
        current_position: "Choisir ma position actuelle",
        my_favourite_places: "Afficher ma liste de favoris",
        my_current_location: "Ma Position",
        clic_button: "Cliquez sur le bouton",
        to_valid: "VALIDER",
        copy_address_maps_search: "pour retenir le texte saisi comme adresse si l'adresse recherchée ne figure pas dans la liste d'adresses fournies.",

        get_title_for_best_followup: "Offrez-vous un meilleur suivi de course en y ajoutant un titre (précis et spécifique).",
        give_most_details: "Fournissez plus de détails pour permettre au livreur d'en savoir un peu plus sur le service demandé."
    },

    product_details_panel: {
        add_in_cart: 'Ajouter au panier'
    },

    my_profile_screen: {
        success_update_profile: 'Profil mis à jour avec succès.',
        success_update_password: 'Mot de passe changé avec succès.',
        success_update_profile_image: 'Photo de profil mis à jour avec succès.',
        field_current_password_is_necessary: 'Le champ mot de passe courant est obligatoire.',
        field_password_is_necessary: 'Le champ mot de passe est obligatoire.',
        field_confirmation_is_necessary: 'Le champ confirmation mot de passe est obligatoire.',
        field_profile_image: 'Veuillez sélectionner un fichier.',
        cancel: 'Annuler',
        save: 'Enregistrer',
        my_profile: 'Mon Profil',
        username: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        my_password: 'Mon mot de passe',
        current_password: 'Mot de passe courant',
        new_password: 'Nouveau mot de passe',
        confirmation_password: 'Confirmation mot de passe',
        edit: 'Modifier'
    }
}