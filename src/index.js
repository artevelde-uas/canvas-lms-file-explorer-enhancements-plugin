import './index.css';
import styles from './index.module.css';


export default function ({ router, dom }) {
    router.onRoute([
        'profile.files',
        'groups.files',
        'courses.files'
    ], async () => {
        // Make the file view full height
        document.body.classList.add(styles.fullHeight);

        // Wait for UI elements to be available
        let [buttons, selectAllCheckbox, directory] = await Promise.all([
            dom.onElementReady('.ef-header .ef-header__secondary > .ui-buttonset'),
            dom.onElementReady('.ef-main #selectAllCheckbox'),
            dom.onElementReady('.ef-directory')
        ]);

        // Insert a new button to select all files
        buttons.insertAdjacentHTML('afterbegin', `
            <button type="button" class="ui-button btn-select" title="Select all" data-tooltip="top" data-html-tooltip-title="Select all">
                <i class="icon-check-mark"></i>
            </button>
        `.trim());

        // Check the hidden checkbox when the button is clicked
        buttons.querySelector('.btn-select').addEventListener('click', () => {
            selectAllCheckbox.click();
        });

        // Disable click handler on label element
        directory.addEventListener('click', event => {
            if (event.target.matches('label')) {
                event.stopPropagation();
            }
        }, { useCapture: true });
    });
}
