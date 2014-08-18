/**
 * Created by Alex on 8/17/2014.
 */

module.exports = function () {
    return function Campaign(row){
        this.pk = row.PK;
        this.admin_pk = row.ADMIN_PK;
        this.name = row.campaign_name;
    }
};