
import { Endcrypt } from 'endcrypt';
import * as moment from 'moment';
import * as _ from 'lodash';

export class UtilService {
    constructor() {

    }

    static encryptText (msg) {
        const ciphertext = new Endcrypt().encryptWithKey(msg, 'sdf!3#d44kk45jk;45kjk3nmp[dsfp45k');
        return ciphertext;
    }

    static decryptText (cipher) {
        const text = new Endcrypt().decryptWithKey(cipher, 'sdf!3#d44kk45jk;45kjk3nmp[dsfp45k');
        return text;
    }

    // private methods

}

// module.exports.UtilService = new UtilService();