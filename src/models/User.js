/**
 * Created by Alex on 7/23/2014.
 */

module.exports = (function(){
    return function User(id, username, email, firstName, lastName){
        this.id=id;
        this.username=username;
        this.email=email;
        this.firstName=firstName;
        this.lastName=lastName;
    };
}());