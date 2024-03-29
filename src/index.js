import { router, dom } from '@artevelde-uas/canvas-lms-app';

import __ from './i18n';

import styles from './index.module.css';


export default function () {
    router.onRoute([
        'profile.files',
        'groups.files',
        'courses.files'
    ], async () => {
        document.body.classList.add(styles.fileExplorerEnhancements);

        // Wait for UI elements to be available
        const [buttons, selectAllCheckbox, folderList, directory] = await Promise.all([
            dom.onElementReady('.ef-header .ef-header__secondary > .ui-buttonset'),
            dom.onElementReady('.ef-main #selectAllCheckbox'),
            dom.onElementReady('.ef-folder-list'),
            dom.onElementReady('.ef-directory')
        ]);

        // Use thin scrollbars on the folder list
        folderList.classList.add(styles.thinScrollbar);

        // Wait for view button
        dom.onElementReady('.btn-view').then(viewButton => {
            viewButton.insertAdjacentHTML('afterend', `
                <button type="button" class="ui-button" id="${styles.viewButtonShim}" disabled>
                    <i class="icon-eye"></i>
                </button>
            `.trim());
        });

        // Wait for 'Manage access' button
        dom.onElementReady('.btn-restrict').then(restrictButton => {
            /** Adds a temporary download button */
            function insertDownloadButtonShim() {
                restrictButton.insertAdjacentHTML('afterend', `
                    <button type="button" class="ui-button" id="${styles.downloadButtonShim}" disabled>
                        <i class="icon-download"></i>
                    </button>
                `.trim());
            }

            // Add the temporary download button
            insertDownloadButtonShim();

            // When the real button is added ...
            dom.onElementAdded('.btn-download', el => {
                // ... remove the temporary download
                const downloadButtonShim = document.getElementById(styles.downloadButtonShim);

                if (downloadButtonShim === null) return;

                downloadButtonShim.remove();
            }, { root: buttons });

            // When the real button is removed ...
            dom.onElementRemoved('.btn-download', el => {
                // ... add the temporary download button again
                insertDownloadButtonShim();
            }, { root: buttons });
        });

        // Disable click handler on label element
        directory.addEventListener('click', event => {
            if (event.target.matches('label')) {
                event.stopPropagation();
            }
        }, { useCapture: true });

        // Add a 'Select all' checkbox
        dom.onElementAdded('header.ef-directory-header', directoryHeader => {
            const selectAll = directoryHeader.querySelector('.ef-select-col > span:first-child');

            selectAll.classList.remove('screenreader-only');
            selectAll.classList.add(styles.selectAll);

            selectAll.title = __('select_all');

            // Add a tooltip
            jQuery(selectAll).tooltip({
                position: { my: 'bottom', at: 'top' },
                tooltipClass: 'center bottom vertical'
            });

            selectAll.addEventListener('click', () => {
                selectAllCheckbox.click();
            });
        });

        // Wait for selected count label
        dom.onElementReady('.ef-selected-count').then(selectCount => {
            dom.onTextContentChange(selectCount, () => {
                const selectAll = directory.querySelector('header.ef-directory-header .ef-select-col');
                const count = directory.querySelectorAll('.ef-item-row').length;
                const selectedCount = directory.querySelectorAll('.ef-item-row.ef-item-selected').length;

                selectAll.classList.toggle(styles.selected, selectedCount === count);
            });
        });
    });

    return {
        ...require('../package.json'),
        title: __('package.title'),
        description: __('package.description')
    };
}
