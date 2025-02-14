import React,{ useState } from "react"

export function useDialog() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState<string|undefined>(undefined)
    const [description, setDescription] = useState<string|undefined>(undefined)
    const [type, setType] = useState<string|undefined>(undefined)
    const [openCatch, setOpenCatch] = useState(false)

    const [dialog, setDialog] = useState({
        open: false,
        title: undefined,
        description: undefined
    })
    
    const openDialog = () => {
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false)
    }
    const editDescription = (a:string|undefined) => {
        setDescription(a)
    }
    const editTitle = (a:string|undefined) => {
        setTitle(a)
    }
    const editType = (a:string|undefined) => {
        setType(a)
    }

    return { 
        open, 
        openDialog, 
        closeDialog, 
        dialogTitle: title, 
        editDialogTitle: editTitle, 
        dialogDescription: description, 
        editDialogDescription: editDescription, 
        alertType: type,
        editAlertType: editType,
        openCatch, 
        setOpenCatch
    }
}
