export const customGenerationFunction = () => (Math.random().toString(36) + '00000000000').substring(2, 16)

const downloader = (fileURL: string) => {
    fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
    })
    .then((response) => response.blob())
    .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `FileName.pdf`,
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link?.parentNode?.removeChild(link);
    });
}

export const format_price = (amount: number|null, separator:string='.') => {
    if(amount==null) {
        return amount;
    }
    let isNegatif = false
    if(amount.toString().startsWith('-')) {
        amount = Math.abs(amount)
        isNegatif = true
    }
    let $0 = '';
    let reg = /\.[0-9]*/g;
    let $1 = amount.toString().match(reg)

    if($1 && $1.length>0) {
        $0 = ','+($1[0].toString().replace('.', '')).slice(0,2);
        $0 = parseFloat('0'+($0.replace(',', '.'))).toString().replace('0.', ',')

        amount = parseInt(amount.toString().replace($1[0], ''))
    }
    // console.log({ $0 })

    const a1 = amount?.toString().split('').reverse()
    let b1=''
    for (let index = 0; index < a1?.length; index++) {
        b1+=a1[index]
        if((index+1)%3==0 && (index+1)<a1.length) {
           b1+=separator; 
        }
    }
    const a2 = b1.split('').reverse();
    return (isNegatif ? '-' : '') + a2.join('')
}

/**
 * Masks a portion of a string with a repeated character.
 *
 * @param  string  W
 * @param  string  $character
 * @param  number  $index
 * @param  number|undefined  $length
 * @param  number  $limit
 * @return string
 */
export const mask = (W:string|null, $character:string, $index:number, $length:number|undefined=undefined, limit?:number) => {
    if(W==null) {
        return W
    }

    const $segment = W.substring($index, $length);

    if ($segment === '') {
        return W;
    }

    const $strlen = W.length;
    let $startIndex = $index;

    if ($index < 0) {
        $startIndex = $index < -$strlen ? 0 : $strlen + $index;
    }

    const $start = W.substring(0, $startIndex);
    const $segmentLen = $segment.length;
    const $end = W.substring($startIndex + $segmentLen);

    let S = $segmentLen;
    if(limit && limit<S) {
        S = limit;
    }

    return $start+$character.substring(0, 1).repeat(S)+$end;

    // const L = W.length
    // const M = limit||3
    // return W.slice(0,M)+'...'+W.slice(L-M,L) 
}

export const formatDateToDayDateMonthYearToString = (date: Date) => {
    
}

export const truncateName = (name: string|undefined)=>{
    if(!name) {
        return name;
    }
    const names = name.split(' ');
    var N = names[0];
    for (let index = 1; index < names.length; index++) {
        N+=` ${names[index].slice(0, 1).toUpperCase()}.`;
    }
    return N;
}

export function getIntegerRandom(min: number, max: number)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const lineClamp = (s: string) => {
    const n = 10
    const l = s?.length>n? n+3 : n
    return s?.slice(0, n).padEnd(l, '...')
}

export const getFullDayToString = (day: number) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
    return days[day]
}
export const getDateToString = (day: number) => {
    const days = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam']
    return days[day]
}
export const getMonthToString = (month: number) => {
    const months = ['jan', 'fev', 'mar', 'avr', 'mai', 'ju', 'jui', 'aou', 'sept', 'oct', 'nov', 'dec']
    return months[month]
}

export const capitalizeFirstLetter = (str: string|undefined) => {
    if(!str) {
        return str
    }
    str = str.toLowerCase();
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

export const format_address = (address: string|undefined|null, city: string|undefined|null, country: string|undefined|null) => {
    return !address&&!city&&!country?'********':((address?address+', ':'')+(city?city+', ':'')+(country??''))
}

/**
 * vérifie si la chaine(A) [ou la décomposition en plusieurs sous-chaines] de caractères est contenue dans le B
 * @param {*} A : le mot recherché
 * @param {*} B : le mot principal
 * @returns boolean
 */
export const characters_exists = (A: string, B: string) => {
    // A: le mot recherché
    // B: le mot principal
    let _A = translate_character(A)
    let _B = translate_character(B)

    if(A.startsWith("") && A.endsWith('"')) {

        _A = _A.replace(/"/g, '');
        return _B.includes(_A);

    } else {

        let C = _A.split(' ')
        let include = true;
        C.map(c => {
            if(!_B.includes(c)) {
                include = false
            }
        })

        // console.log({ include, A: _A, B: _B });
        return include;
    }
}

/**
 * Format une chaîne de caractères en prenant le soin de remplacer certains caractères par leur équivalent en UTF8
 * @param {*} str 
 * @returns string
 */
export const translate_character = (str: string) => {
    let new_str = '';

    // str = str.replace(/[äæ]/ig, 'ae');
    // str = str.replace(/[å]/ig, 'aa');
    // str = str.replace(/[öœ]/ig, 'oe');
    // str = str.replace(/[ü]/ig, 'ue');
    // str = str.replace(/[ß]/g, 'ss');

    str = str.replace(/(ĳ)/ig, 'ij');
    str = str.replace(/[àáâäæãåā]/ig, 'a');
    str = str.replace(/[çćč]/ig, 'c');
    str = str.replace(/[èéêëēėę]/ig, 'e');
    str = str.replace(/[îïíīįì]/ig, 'i');
    str = str.replace(/[ł]/ig, 'l');
    str = str.replace(/[ñń]/ig, 'n');
    str = str.replace(/[ôöòóœøōõ]/ig, 'o');
    str = str.replace(/[ßśš]/ig, 's');
    str = str.replace(/[ûüùúū]/ig, 'u');
    str = str.replace(/[ÿ]/ig, 'y');
    str = str.replace(/[žźż]/ig, 'z');

    str = str.replace(/[£]/ig, '');

    return str.toLowerCase();
}

export const isNumber = (e: &any) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

// export const format_tel = (tel: number, _separate=' ') => {
//     let V='';
//     if(tel) {
//         let l = tel.length
//         let r2 = l%3
        
//         if(r2!=0) {
//             V += tel.slice(0, r2) + _separate;
//         }
//         for (let index = r2; index < tel.length; index+=3) {
//             V += tel.slice(index, index+3) + _separate;
//         }
//     }
//     return V.charAt(V.length-1)==_separate ? V.slice(0, V.length-1) : V
// }

// export const clear_format_tel = (v, _separate=' ') => {
//     return v.replaceAll(_separate, '')
// }