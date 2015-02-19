var T = require('oswst');

with (T.with) {

module.exports = mixin(function(a){
    return data(1, a, '<%= b %>');
});

}