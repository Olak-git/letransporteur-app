import { Button } from "./ui/button";
import Icon from "./ui/icon";

export default function ButtonPrimary({
    loader,
    trigger,
    hasError
}:{
    loader: boolean,
    trigger?: string,
    hasError?: boolean
}) {
    return (
        <Button
            disabled={loader}
            variant='outline'
            className={`${hasError?'bg-red-200 hover:bg-red-100 border border-red-800 text-red-800 hover:text-red-800':'bg-blue-400 dark:bg-gray-700 dark:hover:bg-accent text-white'} w-full uppercase font-light hover:font-semibold`}
        >
            {hasError && (
                <Icon.InfoIcon className="mr-2 h-4 w-4 text-red-800" />
            )}
            {loader && (
                <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {trigger ? trigger : 'payer'}
        </Button>
    )
}

export function CanceledButton({
    loader,
    onPress
}:{
    loader: boolean,
    onPress: (e:any)=>void
}) {
    return (
        <Button
            disabled={loader}
            variant='outline'
            className={`bg-[#000] w-full uppercase font-light hover:font-semibold text-white`}
            style={{ opacity: 1 }}
            onClick={onPress}
        >
            Annuler
        </Button>
    )
}