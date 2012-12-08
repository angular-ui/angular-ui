describe('highlight', function () {
    var highlightFilter, testPhrase = 'Prefix Highlight Suffix';

    beforeEach(module('ui.filters'));
    beforeEach(inject(function ($filter) {
        highlightFilter = $filter('highlight');
    }));
    describe('case insensitive', function () {
        it('should highlight a matching phrase', function () {
            expect(highlightFilter(testPhrase, 'highlight')).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
        });
        it('should highlight a matching phrase at the start', function () {
            expect(highlightFilter(testPhrase, 'prefix')).toEqual('<span class="ui-match">Prefix</span> Highlight Suffix');
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, 'no match')).toEqual(testPhrase);
        });
        it('should highlight nothing for the undefined filter', function () {
            expect(highlightFilter(testPhrase, undefined)).toEqual(testPhrase);
        });
        it('should work correctly for number filters', function () {
            expect(highlightFilter('3210123', 0)).toEqual('321<span class="ui-match">0</span>123');
        });
        it('should work correctly for number text', function () {
            expect(highlightFilter(3210123, '0')).toEqual('321<span class="ui-match">0</span>123');
        });
    });
    describe('case sensitive', function () {
        it('should highlight a matching phrase', function () {
            expect(highlightFilter(testPhrase, 'Highlight', true)).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, 'no match', true)).toEqual(testPhrase);
        });
        it('should highlight nothing for the undefined filter', function () {
            expect(highlightFilter(testPhrase, undefined, true)).toEqual(testPhrase);
        });
        it('should work correctly for number filters', function () {
            expect(highlightFilter('3210123', 0, true)).toEqual('321<span class="ui-match">0</span>123');
        });
        it('should work correctly for number text', function () {
            expect(highlightFilter(3210123, '0', true)).toEqual('321<span class="ui-match">0</span>123');
        });
        it('should not highlight a phrase with different letter-casing', function () {
            expect(highlightFilter(testPhrase, 'highlight', true)).toEqual(testPhrase);
        });
    });
    it('should highlight nothing if empty filter string passed - issue #114', function () {
        expect(highlightFilter(testPhrase, '')).toEqual(testPhrase);
    });
    describe('case insensitive capture', function () {
        it('should highlight a matching phrase', function () {
            expect(highlightFilter(testPhrase, '(highlight)', false, true)).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, 'no match', false, true)).toEqual(testPhrase);
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, '(no match)', false, true)).toEqual(testPhrase);
        });
        it('should highlight nothing for the undefined filter', function () {
            expect(highlightFilter(testPhrase, undefined, false, true)).toEqual(testPhrase);
        });
        it('should work correctly for number text', function () {
            expect(highlightFilter(3210123, '(0)', false, true)).toEqual('321<span class="ui-match">0</span>123');
        });
    });
    describe('case sensitive capture', function () {
        it('should highlight a matching phrase', function () {
            expect(highlightFilter(testPhrase, '(Highlight)', true, true)).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix');
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, '(no match)', true, true)).toEqual(testPhrase);
        });
        it('should highlight nothing if no match found', function () {
            expect(highlightFilter(testPhrase, '(no match)', true, true)).toEqual(testPhrase);
        });
        it('should highlight nothing for the undefined filter', function () {
            expect(highlightFilter(testPhrase, undefined, true, true)).toEqual(testPhrase);
        });
        it('should not highlight a phrase with different letter-casing', function () {
            expect(highlightFilter(testPhrase, '(highlight)', true, true)).toEqual(testPhrase);
        });
    });
    describe('capture at start', function () {
        it('should highlight a matching phrase at the start', function () {
            expect(highlightFilter("this is a phrase", '(this)', true, true)).toEqual('<span class="ui-match">this</span> is a phrase');
        });
        it('should not highlight a matching phrase at the start', function () {
            expect(highlightFilter("this is a phrase", 'this', true, true)).toEqual('this is a phrase');
        });
    });
});