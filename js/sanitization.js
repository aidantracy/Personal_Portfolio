/**
 * This class provides sanitization methods for text and URLs.
 */
class sanitization {

    constructor() {
    }

    sanitizeText(input) {
        return input
            .trim()
            .replace(/[<>]/g, '')
            .replace(/['"]/g, '')
            .replace(/[;]/g, '');
    }
    
    sanitizeURL(url) {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.toString();
        } catch (e) {
            return '';
        }

    }
}



export default sanitization;