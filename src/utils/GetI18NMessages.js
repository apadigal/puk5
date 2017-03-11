import enMessages from '../../i18n/en.json';
import jaMessages from '../../i18n/ja.json';

class GetI18NMessages  {

    /**
     * Given a region ("en, ja"), return the messages file
     * 
     * The default is "EN"
     */
    static get( locale ) {
        console.log( 'GetI18N: Locale is ' + locale );
       // alert( locale + ' from geti18nmessage..' );
        if ( locale == 'ja' ) {
            
            return jaMessages;

        } else {
           
            // default to en
            return enMessages;

        }

       
    }
}

module.exports = GetI18NMessages;