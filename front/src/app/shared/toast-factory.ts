import { toast } from "angular2-materialize";

export class ToastFactory {

    public static errorToast(message: string, duration = 4000) {
        toast(message, duration, 'red');
    }

    public static warningToast(message: string, duration = 4000) {
        toast(message, duration, 'yellow');
    }

    public static successToast(message: string, duration = 4000) {
        toast(message, duration, 'green');
    }

    public static infoToast(message: string, duration = 4000) {
        toast(message, duration, 'light-blue');
    }
}
