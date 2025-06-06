import { Router } from '@angular/router';
/**
 * Utility class for common functions.
 */
export class Utils {

    constructor() { }

    public static redirection404(router: Router): void {
        router.navigate(['error/404']);
    }
}