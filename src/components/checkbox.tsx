import styles from '@/styles/Checkbox.module.css'

interface CheckboxUiProps {
    id: string,
    checked?: boolean,
    onCheckedChange?: (a:boolean)=>void,
    strokeColor?: string,
    disabled?: boolean
}
export default function CheckboxUi({
    id,
    checked,
    onCheckedChange,
    strokeColor,
    disabled
}: CheckboxUiProps) {
    return (
        <>
        <div className={styles.container}>
            <input 
                type="checkbox" 
                id={`_${id}`} 
                className={`${styles.cbx}`} 
                style={{ display: 'none' }} 
                checked={checked} 
                onChange={(e)=>{
                    if(onCheckedChange!==undefined) {
                        onCheckedChange(e.target.checked)
                    }
                }} 
                disabled={disabled}
            />
            <label htmlFor={`_${id}`} className={`${styles.check} ${disabled?'cursor-not-allowed':'cursor-pointer'}`}>
                <svg width="18px" height="18px" viewBox="0 0 18 18" className={`${disabled?'bg-[#dddddd] rounded':''}`} style={{ stroke: strokeColor }}>
                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
        </div>
        </>
    )
}
