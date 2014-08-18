/**
 * Created by Alex on 8/17/2014.
 */

module.exports = function () {
    return function Character(row){
        this.pk = row.PK;
        this.users_pk = row.USERS_PK;
        this.campaigns_pk = row.CAMPAIGNS_PK;
        this.name = row.char_name;
        this.color = row.chat_color;
        this.xp = row.XP;
        this.lvl = row.lvl;
        this.charInitBase = row.char_init_base;
        this.charInitCur = row.char_init_cur;
        this.charSizeBase = row.char_size_base;
        this.charSizeCur = row.char_size_cur;
        this.hpBase = row.hp_base;
        this.hpCur = row.hp_cur;
        this.hdBase = row.hd_base;
        this.hdCur = row.hd_cur;
        this.acBase = row.ac_base;
        this.acCur = row.ac_cur;
        this.spdBase = row.spd_base;
        this.spdCur = row.spd_cur;
        this.abilStrBase = row.abil_str_base;
        this.abilStrCur = row.abil_str_cur;
        this.abilDexBase = row.abil_dex_base;
        this.abilDexCur = row.abil_dex_cur;
        this.abilConBase = row.abil_con_base;
        this.abilConCur = row.abil_con_cur;
        this.abilIntBase = row.abil_int_base;
        this.abilIntCur = row.abil_int_cur;
        this.abilWisBase = row.abil_wis_base;
        this.abilWisCur = row.abil_wis_cur;
        this.abilChaBase = row.abil_cha_base;
        this.abilChaCur = row.abil_cha_cur;
    }
}();