/******************************************************************************************
 * 
 * Class: Header
 * 
 * Description: Show a Common Header.. Masthead, user info
 *              WIP
 * 
 * I18N = TRUE
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 *****************************************************************************************/

import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actions'
import * as pmdbConstants from '../app/Constants';
import { FormattedMessage, defineMessages } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import GetI18NMessages from '../utils/GetI18NMessages';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            japanese: 'ja',
            english: 'en',
            titleId: this.props.titleId
        };

    }

    componentDidMount() {
        //
    }

    componentWillUnmount() {
        //
    }

    /**
     * Language switch.  Calls parent component.  Need a full render
     */
    bClick(language) {
        // Fire REDUX Action to change language in store
        this.props.dispatch(actions.changeLanguage( language ));
    }

    /**
     * Render method.  Return template.
     */
    render() {

        let enLocaleActive = true;    // Always default to 'EN'
        let jaLocaleActive = false;

        if (this.props.language.current === pmdbConstants.JALOCALE) {
            enLocaleActive = false;
            jaLocaleActive = true;
        }

         // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        /* Get language string via API because its used as a title in the Dropdown component*/
        var userLanguage = this.context.intl.formatMessage({ id: 'language', defaultmessage: 'Language', messages: messages });
        let headerStyle = {

            'width': '100%',
            'padding': '5px 0',
            'background': '#000',
            'textAlign': 'right',
            'maxHeight': '70px'

        };

        return (

            <div>

                <div style={headerStyle} >
                    <p style={{ 'maxWidth': '960px', 'margin': '0 auto', 'textAlign': 'right' }}>
                        <img src='/assets/logo_SONY.png' />
                    </p>
                </div>

                <div className='container-fluid headerBackground'>
                    <div className='row' >
                        <div className='col-sm-1 '></div>
                        <div className='col-sm-9 headerSub' >
                            <img style={{ 'marginRight': '24px', 'marginTop': '8px' }} src='/assets/logo_PSF.png' />
                            <img style={{ 'marginTop': '8px' }} src='/assets/logo_PSpartners.png' />
                        </div>

                        <div className='col-sm-2 '>

                            <DropdownButton title={userLanguage} className='btn btn-default' style={{'margin-top': '16px' }}
                                id='hdr_languageSelection' onSelect={this.bClick.bind(this)}>
                                <MenuItem id='hdr_languageSelection_en' active={enLocaleActive} eventKey={'en'} href='#'>English</MenuItem>
                                <MenuItem id='hdr_languageSelection_ja' active={jaLocaleActive} eventKey={'ja'} href='#'>日本語</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
               
                    </div>
                
            </div>
        );  // end render
    }
}

Header.contextTypes = {
    intl: React.PropTypes.object.isRequired
};

// Use the entire store
function getStoreProps(state) {
  return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(Header)