/******************************************************************************************
 * 
 * Class: PartnerDetail
 * 
 * Description: This is a component -- rendered within the PartnerDetails and
 *              PartnerCreate component.  It holds info pertaining to a Partner
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
// react-international
import { FormattedMessage, defineMessages } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import * as config from '../config/config';
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

class PartnerDetail extends React.Component {

    constructor(props) {
        super(props);

        // TODO For CREATE.. we won't have a currentPartner
        const partner = this.props.currentPartner.partner;  // to save keystrokes :-)
        // Save local state Why? Needed when updating fields.  if (we set to the redux store, then the value 
        // will always be what is in the store...

       // this.updateStateFromStore();

        this.state = {
            partner: this.props.currentPartner.partner,
            guid: partner.guid,
            partnerName: partner.partnerName,
            partnerDisplayName: partner.displayName,
            partyLevel: partner.party.partyLevel,
            partnerType: partner.partnerCategory.partnerCategoryCode,
            isParty1: this.props.currentPartner.partner.party.partyLevel == 1 ? true : false,
            isParty3: this.props.currentPartner.partner.party.partyLevel == 3 ? true : false,
            partnerRegion: null
        };

        //alert( this.state.isParty1 + ' ' + this.state.isParty3 );

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

    }


    // Lifecycle methods
    componentDidMount() {


    }

    componentWillUnmount() {

    }

    shouldComponentUpdate() {
        
        console.log( 'Should update PartnerDetail? ' + this.props.partner.partnerName );
        
        this.setState( {partnerName: this.props.partner.partnerName } );
        setTimeout( () => { this.forceUpdate() }, 100 );
        return false;
    }

    /** 
     * Helper when debuggung to refresh view
     */
    refresh() {

        this.setState({ parterName: new Date().toString() });
    }

    savePartner() {

        // Construct partner object and send to callback to process

        this.props.close();
        let updatedPartner = {}
        updatedPartner.partnerName = this.props.partner.partnerName;
        updatedPartner.displayName = this.props.partner.displayName;
        updatedPartner.party = {}
        updatedPartner.party.partyLevel = (this.state.isParty1) ? 1 : 3;
        updatedPartner.partnerCategory = {}
        updatedPartner.partnerCategory.partnerCategoryCode = 'P01';
        updatedPartner.party.partyLevel = 3;
        updatedPartner.partnerStatus = {};
        updatedPartner.partnerStatus.partnerStatusCode = 'ACTIVE';
        
        this.props.callback(updatedPartner);
    }

    /**
     * Flip radio buttons for level... easily done when there are 2
     * @param {*} event 
     */
    onChangePartyLevel(event) {
        this.setState({ isParty1: !this.state.isParty1 });
        this.setState({ isParty3: !this.state.isParty3 });
    }

    /**
     * Render method.  Return template.
     */
    render() {
       
        console.log('In render for PartnerDetail');
        console.log('Props: ' + this.props.currentPartner.partner.guid +
            ' State: ' + this.state.partner.guid);



        let messages = GetI18NMessages.get(this.props.language.current);

        /* Return our template to React */
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>
                <div>
                    
                    <Form horizontal>
                        <FormGroup controlId='pd_global_uid'>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'global_partner_id'}
                                    defaultMessage='Global partner ID'
                                />
                            </Col>
                            <Col sm={10}>
                                <FormControl disabled={true} type='text' value={this.props.partner.guid} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='pd_partner_name'>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'partner_name_en'}
                                    defaultMessage='Partner Name (EN)'
                                />
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={(event) => {this.props.partner.partnerName = event.target.value;this.forceUpdate();}}
                                     type='text' value={this.props.partner.partnerName} />
                                    
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='pd_partner_name_local'>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'partner_name_local'}
                                    defaultMessage='Partner Name (Local)'
                                />
                            </Col>
                            <Col sm={10}>
                                <FormControl onChange={(event) => {this.props.partner.displayName = event.target.value;this.forceUpdate();}}
                                    type='text' value={this.props.partner.displayName} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'party_level'}
                                    defaultMessage='Party Level'
                                />
                            </Col>
                            <Col sm={10}>

                                <Radio inline id='pd_party_level_1' onClick={this.onChangePartyLevel.bind(this)}
                                    name='partyLevel' checked={this.state.isParty1}  >
                                    <FormattedMessage
                                        id={'first_party'}
                                        defaultMessage='1st Party: '
                                    />
                                </Radio>
                                <Radio inline id='pd_party_level_3' onClick={this.onChangePartyLevel.bind(this)}
                                    name='partyLevel' checked={this.state.isParty3} >
                                    <FormattedMessage
                                        id={'third_party'}
                                        defaultMessage='3rd Party: '
                                    />
                                </Radio>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='pd_partner_type'>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'partner_type'}
                                    defaultMessage='Partner Type'
                                />
                            </Col>
                            <Col sm={10}>

                                <Checkbox inline inline id='pd_isPublisher'>
                                    <FormattedMessage
                                        id={'publisher'}
                                        defaultMessage='Publisher'
                                    /></Checkbox>

                                <Checkbox inline inline id='pd_isDeveloper'>
                                    <FormattedMessage
                                        id={'developer'}
                                        defaultMessage='Developer'
                                    />
                                </Checkbox>

                                <Checkbox inline inline id='pd_isTANDM'>
                                    <FormattedMessage
                                        id={'tandm'}
                                        defaultMessage='T&M'
                                    />
                                </Checkbox>

                                <Checkbox inline inline id='pd_isVideo'>
                                    <FormattedMessage
                                        id={'video'}
                                        defaultMessage='Video'
                                    />
                                </Checkbox>

                                <Checkbox inline inline id='pd_isAcademic'>
                                    <FormattedMessage
                                        id={'academic'}
                                        defaultMessage='Academic'
                                    />
                                </Checkbox>

                            </Col>
                        </FormGroup>

                        <FormGroup controlId='pd_regions'>
                            <Col componentClass={ControlLabel} sm={2}>
                                <FormattedMessage
                                    id={'regions'}
                                    defaultMessage='Region(s)'
                                />
                            </Col>
                            <Col sm={10}>

                                <Checkbox inline>
                                    <FormattedMessage
                                        id={'europe'}
                                        defaultMessage='Europe'
                                    />
                                </Checkbox>
                                <Checkbox inline>
                                    <FormattedMessage
                                        id={'americas'}
                                        defaultMessage='Americas'
                                    />
                                </Checkbox>
                                <Checkbox inline>
                                    <FormattedMessage
                                        id={'japan'}
                                        defaultMessage='Japan'
                                    />
                                </Checkbox>
                                <Checkbox inline>
                                    <FormattedMessage
                                        id={'asia'}
                                        defaultMessage='Asia'
                                    />
                                </Checkbox>

                            </Col>
                        </FormGroup>

                    </Form>

                    <div className="pull-right" style={{ 'marginTop': '8px' }}>
                        <Button onClick={this.props.close}>Close</Button>&nbsp;
                        <Button className="btn btn-primary" onClick={this.savePartner.bind(this)}>Save</Button>
                        
                    </div>
                </div>
            </IntlProvider>


        );  // end render
    }
}

PartnerDetail.contextTypes = {
    intl: React.PropTypes.object.isRequired
};

// Use the entire store
function getStoreProps(state) {
    return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerDetail)
