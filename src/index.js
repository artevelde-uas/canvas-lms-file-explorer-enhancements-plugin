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


        // Add a 'Select all' checkbox
        dom.onElementReady('header.ef-directory-header').then(directoryHeader => {
            const selectAll = directoryHeader.firstElementChild;

            selectAll.classList.remove('screenreader-only');
            selectAll.classList.add(styles.selectAll);

            selectAll.addEventListener('click', () => {
                selectAllCheckbox.click();
            });
        });

        // Wait for selected count label
        dom.onElementReady('.ef-selected-count').then(selectCount => {
            dom.onTextContentChange(selectCount, () => {
                const selectAll = directory.querySelector('header.ef-directory-header').firstElementChild;
                const count = directory.querySelectorAll('.ef-item-row').length;
                const selectedCount = directory.querySelectorAll('.ef-item-row.ef-item-selected').length;

                selectAll.classList.toggle(styles.selected, selectedCount === count);
            });
        });
        
        // Disable click handler on label element
        directory.addEventListener('click', event => {
            if (event.target.matches('label')) {
                event.stopPropagation();
            }
        }, { useCapture: true });
    });
}
