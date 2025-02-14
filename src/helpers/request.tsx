import NotificationService from "@/components/NotificationService";
import { SERVER_NOT_RESPONSE } from "./constants";

export const PRODUCTION = false;
export const BASE_PATH = PRODUCTION ? 'https://estores.letrans-porteur.com' : 'http://localhost:3000'
export const API_PUBLIC_URI = PRODUCTION ? 'https://api.letrans-porteur.com' : 'http://127.0.0.1:8000'
export const API_URI = `${API_PUBLIC_URI}/api.professional`
export const API_STORAGE = `${API_PUBLIC_URI}/storage`

export const headers = {
    'Accept': "application/json", 
    'Access-Control-Allow-Origin': '*', 
    // 'Access-Control-Allow-Credentials': false, 
    'Content-Type': 'application/json', 
    // 'Authorization': 'Bearer ' + (data.token||'')
}

type METHOD = 'POST'|'PUT'|'GET'|'DELETE'
export async function request_api(uri: string, method: METHOD, _body: object|null, _headers: object = {}, bodyIsJson: boolean = true, lang: string = 'fr') {

    uri = uri.replace(/^(([/]?fr\/)|([/]?en\/))/i, '')
    uri = uri.startsWith('/')?uri:'/'+uri

    if(!bodyIsJson) {
        // @ts-ignore
        delete(headers['Content-Type']);
    }

    // @ts-ignore
    const body = bodyIsJson?
                // @ts-ignoreQQ
                (_body && Object.keys(_body).length>0?
                    JSON.stringify(_body):
                        undefined):
                            _body

    // console.log({ body })

    const response = await fetch(API_URI + '/' + lang + uri, {
                        method,
                        // @ts-ignore
                        body: body,
                        headers: Object.assign(headers, _headers)
                    })
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    })
                    .catch((e) => {
                        console.log({ catchError: e });
                        return e
                    })
    return response;

    // const response = await fetch(API_URI + uri, {
    //     method,
    //     body: JSON.stringify(_body),
    //     headers
    // });
    // if(!response.ok) {
    //     throw new Error(JSON.stringify(response))
    // }
    // return response.json()
}

export const catchError = (error: any, callAction?: ()=>void) => {
    if(callAction!==undefined) {
        callAction()
    }
    const MESSAGE = PRODUCTION ? ((error.message.indexOf('SQLSTATE')!=-1 || error.message.indexOf('query')!=-1 || error.message.indexOf('model')!=-1 || error.message.indexOf('route')!=-1) ? 'Error Undefined detected.' : error.message ) : error.message
    NotificationService.alert({
        type: 'error',
        // variant: 'ghost',
        title: 'Error Server',
        message: MESSAGE||SERVER_NOT_RESPONSE
    })
    throw new Error(MESSAGE);
    
}