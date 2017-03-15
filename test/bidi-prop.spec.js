/**
 * Created by alireza on 3/15/2017.
 */


describe('bidi-prop', function() {
    var propLtr = 'background-color', propRtl = 'color', value = 'rgb(255, 0, 0)';
    beforeEach(cleanup);
    it('should apply the property specified for rtl when an ancestor has dir=rtl', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'rtl');
        expect(subject.css(propRtl)).toEqual(value);
        expect(subject.css(propLtr)).not.toEqual(value);
    });
    it('should apply the value specified for ltr when an ancestor has dir=ltr', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'ltr');
        expect(subject.css(propLtr)).toEqual(value);
        expect(subject.css(propRtl)).not.toEqual(value);

    });
/*
    // don't came up with a solution which covers this:
    it('should apply the property specified for ltr when no ancestor with explicit dir exists', function() {
        var subject = addTemplate();
        expect(subject.css(propLtr)).toEqual(value);
    });*/
    it('should take any ancestor with dir property into account, not only html element', function() {
        var subject = addTemplate();
        $('#container').attr('dir', 'rtl');
        expect(subject.css(propRtl)).toEqual(value);
        expect(subject.css(propLtr)).not.toEqual(value);
    });
    /*
     // don't came up with a solution which covers this:
    it('should behave based on the closest ancestor with explicit dir when multiple such ancestors exist', function() {
        var subject = addTemplate();
        $('html').attr('dir', 'rtl');
        $('#container').attr('dir', 'ltr');
        expect(subject.css(propLtr)).toEqual(value);
        expect(subject.css(propRtl)).not.toEqual(value);

        $('html').attr('dir', 'ltr');
        $('#container').attr('dir', 'rtl');
        expect(subject.css(propLtr)).not.toEqual(value);
        expect(subject.css(propRtl)).toEqual(value);
    });*/
    it('should work when selected element itself has explicit dir', function() {
        var subject = addTemplate().attr('dir', 'rtl');
        expect(subject.css(propRtl)).toEqual(value);
        expect(subject.css(propLtr)).not.toEqual(value);

        $('html').attr('dir', 'ltr');
        subject.attr('dir', 'rtl');
        expect(subject.css(propRtl)).toEqual(value);
        expect(subject.css(propLtr)).not.toEqual(value);

        $('html').attr('dir', 'rtl');
        subject.attr('dir', 'ltr');
        expect(subject.css(propLtr)).toEqual(value);
        expect(subject.css(propRtl)).not.toEqual(value);

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
            shadow.append($('<style />').html(styles)[0]);

            $('body').attr('dir', 'rtl');
            expect(subject.css(propRtl)).toEqual(value);
            expect(subject.css(propLtr)).not.toEqual(value);

            $('body').attr('dir', 'ltr');
            expect(subject.css(propLtr)).toEqual(value);
            expect(subject.css(propRtl)).not.toEqual(value);


            $('body').append(stylesLink);
            done();
        })
    });
    function addTemplate(){
        return $('<div class="bidi-bg-fg-red">background red in ltr, foreground red in rtl</div>').appendTo('#container');
    }
});

function cleanup(){
    $('#container').remove();
    $('body').prepend('<div id="container" />');
    $('*').removeAttr('dir');
}