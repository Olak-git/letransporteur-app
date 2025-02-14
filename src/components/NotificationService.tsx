import { AlertProps, NotificationWebRefProps } from "./NotificationWeb";

let _notificationRef : NotificationWebRefProps;

function setNotificationWebRef(notificattionRef: any) {
    _notificationRef = notificattionRef;
}

function alert(params:AlertProps) {
    _notificationRef.alert(params)
}

function hide() {
    _notificationRef.hide()
}

export default {
    setNotificationWebRef,
    alert,
    hide
}