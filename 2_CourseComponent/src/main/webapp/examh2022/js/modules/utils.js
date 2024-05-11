export default {
    '_feettometer': 0.3048,

    metrestofeet(metres) {
        return metres / this._feettometer;
    },

    feettometres(feet) {
        return feet * this._feettometer;
    },

    unitInLanguage(unit, language) {
        try {
            const options = { 'style': 'unit', 'unit': unit, 'unitDisplay': 'long' };
            const unitstring = Number(1).toLocaleString(language, options);
            const unitreg = /\p{L}+/u;
            const res = unitstring.match(unitreg);
            if ((res instanceof Array) && (res.length == 1)) {
                return res[0];
            } else {
                console.log("Mangler A");
                return unit;
            }
        } catch (error) {
            console.log(`No support for language ${language} by browser. Install the language pack for application to work.`);
            return unit;
        }
    }
}
