/**
 * Created by alireza on 3/15/2017.
 */


describe('bidi-value', function() {
    var prop = 'color', rtlValue = 'rgb(255, 0, 0)', ltrValue = 'rgb(0, 0, 255)';
    beforeEach(cleanup);
    it('should apply the value specified for rtl when an ancestor has dir=rtl', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'rtl');
        expect(subject.css(prop)).toEqual(rtlValue);
    });
    it('should apply the value specified for ltr when an ancestor has dir=ltr', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'ltr');
        expect(subject.css(prop)).toEqual(ltrValue);
    });
    it('should apply the value specified for ltr when no ancestor with explicit dir exists', function() {
        var subject = addTemplate();
        $('html').removeAttr('dir');
        expect(subject.css(prop)).toEqual(ltrValue);
    });
    it('should take any ancestor with dir property into account, not only html element', function() {
        var subject = addTemplate();
        $('#container').attr('dir', 'rtl');
        expect(subject.css(prop)).toEqual(rtlValue);
    });

    it('should behave based on the closest ancestor with explicit dir when multiple such ancestors exist', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'rtl');
        $('#container').attr('dir', 'ltr');
        expect(subject.css(prop)).toEqual(ltrValue);
        $('html').attr('dir', 'ltr');
        $('#container').attr('dir', 'rtl');
        expect(subject.css(prop)).toEqual(rtlValue);
    });
    it('should work when selected element itself has explicit dir', function() {
        var subject = addTemplate().attr('dir', 'rtl');
        expect(subject.css(prop)).toEqual(rtlValue);
        $('html').attr('dir', 'ltr');
        expect(subject.css(prop)).toEqual(rtlValue);
        $('html').attr('dir', 'rtl');
        subject.attr('dir', 'ltr');
        expect(subject.css(prop)).toEqual(ltrValue);
    });
    it('should work even inside boundaries of shadow root' /*should it?!*/, function(done) {
        var subject = addTemplate();
        var shadow = $('#container')[0]
            .attachShadow({mode: 'open'});
        // Add some text to shadow DOM
        shadow.append(subject[0]);
        var stylesLink = $('link[href$="styles.css"][rel=stylesheet]');
        stylesLink.detach();
        $.get(stylesLink.attr('href')).then(function(styles){
            $('body').attr('dir', 'rtl');
            shadow.append($('<style />').html(styles)[0]);
            expect(subject.css(prop)).toEqual(rtlValue);
            $('body').removeAttr('dir');
            $('#container').attr('dir', 'rtl');
            expect(subject.css(prop)).toEqual(rtlValue);
            $('body').append(stylesLink);
            done();
        })
    });
    function addTemplate(){
        return $('<div class="bidi-color-black-red">blue in ltr, red in rtl</div>').appendTo('#container');
    }
});

function cleanup(){
    $('#container').remove();
    $('body').prepend('<div id="container" />');
    $('*').removeAttr('dir');
}