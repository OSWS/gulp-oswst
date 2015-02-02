var T = require('osws-templates');

with (T.with) {

module.exports = mixin(function(a){
    return content(1, a, '<%= b %>');
});

}