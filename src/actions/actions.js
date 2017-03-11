/******************************************************************************************
 * 
 * Class: Partner|Details
 * 
 * Description: This is a component -- rendered within the PartnerDetailsContainer.
 *              We show the partner detais such as name, display name, status ...
 * 
 * I18N = TRUE
 * 
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 */

// TODO - Use Constants for Action names
const actions = {

  changeLanguage: function( language ) {
    return {
      type: 'CHANGE_LANGUAGE',
      text: language
    }
  }, 
  
  setCurrentPartner: function( partner ) {
    return {
        type: 'SET_CURRENT_PARTNER',
        partner: partner
    }
  }
}

export default actions