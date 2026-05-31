django.jQuery(function ($) {
    function convertAddButtonsToPopup() {
        $('.add-row a, .inline-group .addlink').each(function () {
            var $btn = $(this);
            if ($btn.data('popup-converted')) return;
            $btn.data('popup-converted', true);

            $btn.on('click', function (e) {
                var href = $btn.attr('href');
                if (!href || href === '#') return;
                e.preventDefault();
                e.stopPropagation();
                var url = href + (href.indexOf('?') === -1 ? '?' : '&') + '_popup=1';
                showRelatedObjectPopup({ href: url });
            });
        });
    }

    // Run on load and after any dynamic DOM changes (e.g. more inlines added)
    convertAddButtonsToPopup();
    $(document).on('formset:added', function () {
        convertAddButtonsToPopup();
    });
});
