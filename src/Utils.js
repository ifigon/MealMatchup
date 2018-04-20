/**
 * Formats phone numbers as you type. Include in inputs components like so:
 *    `<input onChange={this.phoneFormat} type="tel" pattern={StringFormat.PHONE} placeholder="xxx-xxx-xxxx" />`
**/
export function formatPhone(e,f) {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10);
    let corrected = '';
    for (let i = 0; i < val.length; i++) {
        if (i === 3 || i === 6) {
            corrected += '-';
        }
        corrected += val.charAt(i);
    }
    e.target.value = corrected;
}