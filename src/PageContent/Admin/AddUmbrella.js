import React, { Component } from 'react';
import './AddUmbrella.css'
import { AccountType } from '../../Enums';
import { accountsRef, umbrellasRef, auth } from '../../FirebaseConfig';




class AddUmbrella extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        }

        this.createUmbrella = this.createUmbrella.bind(this);
    }

    createUmbrella(e) {
        e.preventDefault();
        if(e.target.confirmpass.value !== e.target.password.value) {
            alert("Passwords don't match");
            return;
        }

        let newUmbrellaName = e.target.name.value;
        let newUmbrella = { name : newUmbrellaName };
        let address = {
            city: e.target.city.value,
            officeNo: "",
            state: e.target.state.value,
            street1: e.target.address.value,
            street2: e.target.addresstwo.value ? e.target.addresstwo.value : "",
            zipcode: e.target.zip.value
        }
        let primaryContact = {
            name: e.target.contactname.value,
            email: e.target.contactemail.value,
            phone: e.target.contactphone.value,
            position: ""
        }
        auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then(user => {
                let postData = {
                    accountType: AccountType.UMBRELLA,
                    isActivated: true,
                    isVerified: true,
                    name: newUmbrellaName,
                    timezone: "America/Los_Angeles",
                    address: address,
                    primaryContact: primaryContact
                };
                let umbrellaData = {
                    name: newUmbrellaName
                }
                umbrellasRef.child(user.uid).set(umbrellaData);
                accountsRef.child(user.uid).set(postData);
                this.setState({ response : `Success! ${newUmbrellaName} has been added.`})
                auth.signOut();
            })
            .catch(error => {
                this.setState({ response : error})
            }); 
    }

    render() {
        return(
            <div className="form">
                {this.state.response &&
                    <div className="umbrella-response">{this.state.response}</div>
                }
                <form id={this.formId} onSubmit={this.createUmbrella}>
                    <div className="umbrella-descriptor">Umbrella Name</div>
                    <input name="name" type="text" className="umbrella-name-form" placeholder="University of Washington" required /><br />
                    <div className="umbrella-descriptor">Umbrella Account Email</div>
                    <input name="email" type="text" className="umbrella-name-form" placeholder="uwadmin@uw.edu" required /><br />
                    <div className="umbrella-descriptor">Password</div>
                    <input name="password" type="password" className="umbrella-name-form" required /><br />                
                    <div className="umbrella-descriptor">Confirm Password</div>
                    <input name="confirmpass" type="password" className="umbrella-name-form" required /><br />
                    <div className="umbrella-descriptor">Street Address</div>
                    <input name="address" type="text" className="umbrella-name-form" required /><br />
                    <div className="umbrella-descriptor">Street Address 2</div>
                    <input name="addresstwo" type="text" className="umbrella-name-form" /><br />
                    <div className="umbrella-descriptor">City</div>
                    <input name="city" type="text" className="umbrella-name-form"  required /><br />
                    <div className="umbrella-descriptor">State</div>
                    <select name="state" type="text" id="state" id="umbrella-name-select" required>
                        <option value="" disabled>Select State</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>
                    <div className="umbrella-descriptor">Zip</div>
                    <input name="zip" type="text" className="umbrella-name-form" required /><br />  
                    <div className="umbrella-descriptor">Primary Contact Name</div>
                    <input name="contactname" type="text" className="umbrella-name-form" required /><br />   
                    <div className="umbrella-descriptor">Primary Contact Email</div>
                    <input name="contactemail" type="text" className="umbrella-name-form" required /><br />    
                    <div className="umbrella-descriptor">Primary Contact Phone</div>
                    <input name="contactphone" type="text" className="umbrella-name-form" required /><br />          
                    <button type="submit" className="umbrella-form-submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddUmbrella;