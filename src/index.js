import './index.css';


export default function ({ router, dom }) {
    router.onRoute([
        'profile.files',
        'groups.files',
        'courses.files'
    ], async () => {
        let [buttons, selectAllCheckbox] = await Promise.all([
            dom.onElementReady('.ef-header .ef-header__secondary > .ui-buttonset'),
            dom.onElementReady('.ef-main #selectAllCheckbox')
        ]);

        buttons.insertAdjacentHTML('afterbegin', `
            <button type="button" class="ui-button btn-select" title="Select all" data-tooltip="top" data-html-tooltip-title="Select all">
                <i class="icon-check-mark"></i>
            </button>
        `);

        buttons.querySelector('.btn-select').addEventListener('click', () => {
            selectAllCheckbox.click();
        });

        let directory = await dom.onElementReady('.ef-directory');

        // Disable click handler on label element
        directory.addEventListener('click', event => {
            if (event.target.matches('label')) {
                event.stopPropagation();
            }
        }, { useCapture: true });
    });
}
