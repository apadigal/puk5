/******************************************************************************************
 * 
 * Class: 
 * 
 * Description: This is a component -- rendered within the PartnerDetailsContainer.
 *              We show the partner detais such as name, display name, status ...
 * 
 * I18N = TRUE
 * 
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 *****************************************************************************************/

import React from 'react';
import { connect } from 'react-redux';

// react-international
import { FormattedMessage, defineMessages } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import enLocale from 'react-intl/locale-data/en';
import jaLocale from 'react-intl/locale-data/ja';
import GetI18NMessages from '../utils/GetI18NMessages';

// http xhr helper
import axios from 'axios';

// bootstrap react componenets
import Collapse from 'react-bootstrap/lib/Collapse';

class PartnerContacts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        };

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    /**
     * Invoked by onclick in our edit icon
     */
    doEditMode() {

    }

    /**
     * Render method.  Return template.
     */
    render() {

        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        /* Return our template to React */
        return (
             <IntlProvider locale={this.props.language.current} messages={messages}>
            <div>
                <h3 style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ open: !this.state.open })}>
                    <FormattedMessage
                        id='contacts'
                        defaultMessage='Contacts'
                    />
                    <i className='fa fa-chevron-down pull-right' />
                </h3>

                <Collapse in={this.state.open}>
                    <div>
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        jd d hfldajs hl hdfkjl hdfhdflkdsj fhlkdsj fhkdjls fhkdjlsf hh fdskljh 
                        
                    </div>
                </Collapse>
            </div>
             </IntlProvider>
        );  // end render
    }
}

// Use the entire store
function getStoreProps(state) {
  return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerContacts)