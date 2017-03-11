/******************************************************************************************
 * 
 * Class: PartnerCreate
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
import actions from '../actions/actions'
import { browserHistory } from 'react-router';
import * as config from '../config/config';
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
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import PartnerDetail from './PartnerDetail.jsx';

class PartnerCreate extends React.Component {

    constructor(props) {
        super(props);

        // Create new Partner Object. (TODO move to its own class)
        let partner = {};
        partner.partnerName = '';
        partner.displayName = '';
        partner.partnerStatus = {};
        partner.partnerStatus.partnerStatusCode = 'ACTIVE';
        partner.party = {}
        partner.party.partylevel = 1;
        partner.partnerCategory = {}
        partner.partnerCategory.partnerCategoryCode = 'P01';
        partner.partnerCategory.partnerCategoryName = 'Category 1';
        this.props.dispatch(actions.setCurrentPartner(partner));

        this.state = {
            partner: partner
        };

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

    }

    createNewPartnerObject() {



    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    /**
     * Return to main screen... \Th isis a no-op for create
     */
    closeDetails() {
       // NOOP
    }

    /**
     * Create a Partner and return to the main landing page
     * @param {*} partner 
     */
    createPartner(partner) {
        axios.post(config.API_SERVICES_URL + '/partners/', partner)
            .then(res => {
                browserHistory.push('/');
            });
    }

    /**
     * Render method.  Return template.
     */
    render() {

        if (undefined === this.props.currentPartner) {
            return (<div><i className="fa fa-spinner" aria-hidden="true"></i></div>);
        }

        console.log('PartnerCreate render' + this.state.partner);
        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        /* Return our template to React */
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>
                <div>
                    <Header title='search_partner' />
                    <div className='row'>
                        <div className='col-sm-1'></div>
                        <div className='col-sm-10'>
                            <div className='panel-heading'>
                                <div className='panel-title'>
                                    PMDB -

                                    <FormattedMessage
                                        id={'create_partner'}
                                        defaultMessage='Create Partner'
                                    />

                                </div>
                            </div>
                            <PartnerDetail
                                close={this.closeDetails.bind(this)}
                                callback={this.createPartner.bind(this)}
                                partner={this.state.partner}
                            />
                        </div>
                        <div className='col-sm-1'></div>
                    </div>
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
export default connect(getStoreProps)(PartnerCreate)
