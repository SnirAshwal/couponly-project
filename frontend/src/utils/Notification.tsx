import {
  DismissOptions,
  store as notificationStore,
} from "react-notifications-component";

export const addNotification = (
  title: string,
  message: string,
  type: "success" | "danger" | "info" | "default" | "warning" | undefined,
  insert: "top" | "bottom" | undefined,
  container:
    | "top-full"
    | "top-left"
    | "top-right"
    | "top-center"
    | "center"
    | "bottom-full"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center",
  width: number,
  animationIn: string[],
  animationOut: string[],
  dismiss: DismissOptions | undefined
) => {
  notificationStore.addNotification({
    title: title,
    message: message,
    type: type,
    insert: insert,
    container: container,
    width: width,
    animationIn: animationIn,
    animationOut: animationOut,
    dismiss: dismiss,
  });
};
