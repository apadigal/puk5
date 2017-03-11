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
 *****************************************************************************************/

import React from 'react';

import { connect } from 'react-redux';
import actions from '../actions/actions'
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
import Collapse from 'react-bootstrap/lib/Collapse';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Well from 'react-bootstrap/lib/Well';

import PartnerDetail from './PartnerDetail.jsx';

class PartnerDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            partner: {},
            readonly: 'readOnly',
            partnerId: this.props.partnerId,
            isActive: true
        };
        this.state.readonly = '';

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale



    }

    /**
     * Get details from DB using partner Id
     */
    componentDidMount() {

        axios.get(config.API_SERVICES_URL + '/partners/' + this.state.partnerId)
            .then(res => {
                // Save this in our state var of partnerData
                // This will be available when we render the component
                // TODO replace component state with REDUX Store!
                this.setState({ partner: res.data });
                this.props.dispatch(actions.setCurrentPartner( res.data ));

            });

    }

    componentWillUnmount() {
        //
    }

    shouldComponentUpdate() {
        // alert( 'Should component update in PartnerDetails' );

        return true;
    }

    /**
     * This method is fired when the user selects the 
     * status radio... Change state.
     */
    statusChange(status) {

        if (status === 'active') {
            this.setState({ 'isActive': true });
        } else {
            this.setState({ 'isActive': false });
        }
    }

    /**
     * Close details section.  Also called by PartnerDetail.jsx
     */
    closeDetails() {

        this.setState({ open: !this.state.open });

    }

    /**
     * Save partner object
     * @param {*} partner 
     */
    savePartner( updatedPartner) {

        // GET/PUT using axios
        axios.get(config.API_SERVICES_URL + '/partners/' + this.state.partner.guid)
            .then(res => {
                let partner = res.data;
                 // remove createdAt, updateAt... causes issues on updates
                delete partner.createdAt;
                delete partner.updatedAt;

                // PUT using axios
                partner.partnerName = updatedPartner.partnerName;
                partner.displayName = updatedPartner.displayName;
                partner.partyLevel = updatedPartner.partyLevel;
                axios.put(config.API_SERVICES_URL + '/partners/' + this.state.partner.guid, partner)
                    .then(res => {
                        this.props.dispatch(actions.setCurrentPartner(partner));
                    });
            });

    }

    /**
     * Render method.  Return template.
     */
    render() {
        
        if (undefined === this.props.currentPartner) {
            return (<div>Loading</div>);
        }

        // Note: Partner will be editable.  The reasn is that setState
        // runs asynchornously causing issues.. more on this later.
        let partner = this.props.currentPartner.partner;
        
        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);
        let isActive = 'checked';
        let isInactive = '';

        if (!this.state.isActive) {
            isActive = '';
            isInactive = 'checked';
        }

        /* Return our template to React */
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>

                <div>
                    <Button className='btn btn-primary btn-large' onClick={() => this.setState({ open: !this.state.open })}>
                        <FormattedMessage
                            id={'edit'}
                            defaultMessage='Edit'
                        />
                    </Button>

                    <table className='table table-responsive table-bordered table-striped table-hover'>
                        <thead>
                            <tr className='griddle'>
                                <th><FormattedMessage
                                    id={'global_partner_id'}
                                    defaultMessage='Global Partner ID'
                                />
                                </th>
                                <th><FormattedMessage
                                    id={'partner_name'}
                                    defaultMessage='Partner Name'
                                />
                                </th>
                                <th><FormattedMessage
                                    id={'party_level'}
                                    defaultMessage='Party Level'
                                />
                                </th>
                                <th><FormattedMessage
                                    id={'partner_type'}
                                    defaultMessage='Partner Type'
                                />
                                </th>
                                <th><FormattedMessage
                                    id={'partner_status'}
                                    defaultMessage='Status'
                                />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{partner.guid}</td>
                                <td>{partner.partnerName}</td>
                                <td>{partner.party.partyLevelName}</td>
                                <td>{partner.partnerCategory.partnerCategoryName}</td>
                                <td>{partner.partnerStatus.partnerStatusCode}</td>
                            </tr>


                        </tbody>

                    </table>

                    {/* Partner details */}

                    <Collapse in={this.state.open}>
                        <div>
                            <PartnerDetail partner={partner} close={this.closeDetails.bind(this)} callback={this.savePartner.bind(this)} />

                            <div style={{ 'margin-top': '8px' }}></div>

                        </div>
                    </Collapse>

                </div>
            </IntlProvider>

        );  // end render
    }
}

PartnerDetails.contextTypes = {
    intl: React.PropTypes.object.isRequired
};


// Use the entire store
function getStoreProps(state) {
    return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerDetails)
